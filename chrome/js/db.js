var html5rocks = {};
window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

if ('webkitIndexedDB' in window) {
  window.IDBTransaction = window.webkitIDBTransaction;
  window.IDBKeyRange = window.webkitIDBKeyRange;
}

html5rocks.indexedDB = {};
html5rocks.indexedDB.db = null;

html5rocks.indexedDB.onerror = function(e) {
  console.log(e);
};

html5rocks.indexedDB.open = function() {
  var request = indexedDB.open("events");

  request.onsuccess = function(e) {
    var v = 1;
    html5rocks.indexedDB.db = e.target.result;
    var db = html5rocks.indexedDB.db;
    // We can only create Object stores in a setVersion transaction;
    if (v != db.version) {
      var setVrequest = db.setVersion(v);

      // onsuccess is the only place we can create Object Stores
      setVrequest.onerror = html5rocks.indexedDB.onerror;
      setVrequest.onsuccess = function(e) {
        if(db.objectStoreNames.contains("event")) {
          db.deleteObjectStore("event");
        }

        var store = db.createObjectStore("event", { keyPath: "id" });
        e.target.transaction.oncomplete = function() {
          console.log('BLAH');
          html5rocks.indexedDB.getAllEvents();
        };
      };
    } else {
      html5rocks.indexedDB.getAllEvents();
    }
  };
  request.onerror = html5rocks.indexedDB.onerror;
};

html5rocks.indexedDB.addEvent = function(data) {
  var db = html5rocks.indexedDB.db;
  var trans = db.transaction(["event"], "readwrite");
  var store = trans.objectStore("event");
  
  data.id = new Date().getTime();
  var request = store.put(data);

  request.onsuccess = function(e) {
    // html5rocks.indexedDB.getAllEvents();
  };

  request.onerror = function(e) {
    console.log("Error Adding: ", e);
  };
};

html5rocks.indexedDB.deleteEvent = function(id) {
  var db = html5rocks.indexedDB.db;
  var trans = db.transaction(["event"], "readwrite");
  var store = trans.objectStore("event");

  var request = store.delete(id);

  request.onsuccess = function(e) {
    html5rocks.indexedDB.getAllEvents();
  };

  request.onerror = function(e) {
    console.log("Error Adding: ", e);
  };
};

html5rocks.indexedDB.getAllEvents = function() {
  // var todos = document.getElementById("todoItems");
  // todos.innerHTML = "";

  var db = html5rocks.indexedDB.db;
  var trans = db.transaction(["event"], "readwrite");
  var store = trans.objectStore("event");

  // Get everything in the store;
  var cursorRequest = store.openCursor();

  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;
    if(!!result == false)
      return;
    
    events.push(result.value);
    result.continue();
  };

  cursorRequest.onerror = html5rocks.indexedDB.onerror;
};

html5rocks.indexedDB.open();
