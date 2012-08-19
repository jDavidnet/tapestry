var events = [];
function init(){
    chrome.browserAction.onClicked.addListener( openTab('html/tapestry.html') );
}

chrome.extension.onMessage.addListener(onMessage);

function onMessage(request, sender, sendResponse) {
  console.log('EVENT message contentScript', request);
  if (request.sendMetaData) {
    saveEvent(request.sendMetaData);
  }
  if (request.getMetaData) {
    sendResponse({getMetaData: events });
  }
}

function openTab(url) {
    console.log('create OpenNewTab Func for ', url);
    url = chrome.extension.getURL(url)
    return function (tab){
        console.log('EVENT click browserAction', tab, arguments);
        var createProperties = {
            url:url
        };
        chrome.tabs.create(createProperties, function () {
            console.log('EVENT new browserAction - windowOpen', arguments);
        });
    }
};

function getPriorityData(priority, data){
    var p;
    for(p in priority){
        console.log('getPriorityData', priority, p, priority[p], data[priority[p]]);
        if(typeof(data[priority[p]]) == 'string'){
            return data[priority[p]];
        }
    }
}

function getCanonicalIcon(data){
  var data = data || {hostname:'',links:{}, meta:{}, href:''};
  var icon = {
      'favicon':'http://' + data.hostname + '/favicon.ico',
      'shortcut_icon': data.links['shortcut_icon']
    }
    
    return getPriorityData( ['shortcut_icon', 'favicon'], icon )
}

function getCanonicalData(data){
    console.log('getCanonicalData', arguments);
    var data =  data || JSON.parse('{"meta":{"og:url":"http://www.youtube.com/watch?v=Oiu6rI5k3oI","og:title":"Def Con: 20 years of hacker evolution","og:description":"Every year for the last two decades, the information security community has descended upon Las Vegas to trade knowledge, sharpen skills, and challenge author...","og:type":"video","og:image":"http://i4.ytimg.com/vi/Oiu6rI5k3oI/mqdefault.jpg","og:video":"http://www.youtube.com/v/Oiu6rI5k3oI?version=3&autohide=1","og:video:type":"application/x-shockwave-flash","og:video:width":"1920","og:video:height":"1080","og:site_name":"YouTube","fb:app_id":"87741124305","twitter:player:width":"1920","twitter:player:height":"1080","twitter:card":"player","twitter:site":"@youtube","twitter:player":"https://www.youtube.com/embed/Oiu6rI5k3oI"},"links":{"search":"http://www.youtube.com/opensearch?locale=en_US","icon":"http://s.ytimg.com/yt/favicon-vfldLzJxy.ico","shortcut icon":"http://s.ytimg.com/yt/favicon-vfldLzJxy.ico","canonical":"/watch?v=Oiu6rI5k3oI","alternate":"http://www.youtube.com/oembed?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOiu6rI5k3oI&format=xml","shortlink":"http://youtu.be/Oiu6rI5k3oI","stylesheet":"http://s.ytimg.com/yt/cssbin/www-core-vflwHDG3u.css"}}');
    var cdata = {
        'description' : getPriorityData( ['og:description', 'description'], data.meta ),
        'title' : getPriorityData( ['og:title', 'title'], data.meta ),
        'image_url' : getPriorityData( ['og:image', 'thumbnail_url'], data.meta ),
        'type' : getPriorityData( ['og:type'], data.meta ),
        'favicon' : getCanonicalIcon(data)
    };
    
    console.log('getCanonicalData - return', cdata);
    return cdata;
}

function saveEvent(newEvent) {
  newEvent = getCanonicalData(newEvent);
  events.push(newEvent);
  // localStorage.setItem('events', JSON.stringify(events));
  html5rocks.indexedDB.addEvent(newEvent);
}

init();