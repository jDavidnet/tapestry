function init(){
    chrome.browserAction.onClicked.addListener( openTab('html/tapestry.html') );
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

init();