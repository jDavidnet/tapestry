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

function getLocalFile(path){
    var xhr = new XMLHttpRequest(), resp;
    
    xhr.open("GET", chrome.extension.getURL("path"), false);
    xhr.send();
    //resp = JSON.parse(xhr.responseText);
    resp = xhr.responseText;
    console.log('getLocalFile', resp);
    return resp;
}

function fetchTemplate(templateName){
  var path = 'templates/' + templateName + '.html';
  var template = getLocalFile(path);
  console.log('getTemplate', template);
  return template;
}