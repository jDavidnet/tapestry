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

/**
 * generates html from a json object and an html template {{varname}}
 * @param template html string
 * @data shallow json object
 */
function renderTemplate(template, data){
    var html = '';
    var name, value;
    var regex;
    
    for(name in data){
        value = data[name];
        regex = new RegExp('{{'+name+'}}', 'gi');
        template = template.replace(regex, value);
    }
    return html;
}

init();