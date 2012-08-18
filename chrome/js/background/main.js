var events = [];
function init(){
    chrome.browserAction.onClicked.addListener( openTab('html/tapestry.html') );
    events = loadLocal();
}

chrome.extension.onMessage.addListener(onMessage);


function onMessage(request, sender, sendResponse) {
  console.log('EVENT message contentScript', request);
  if (request.sendMetaData) {
    saveEvent(request.sendMetaData);
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

function loadLocal() {
  var string = localStorage.getItem('events') || '[]';
  return JSON.parse(string);
}

function saveEvent(newEvent) {
  events.push(newEvent);
  // localStorage.setItem('events', JSON.stringify(events));
}

init();