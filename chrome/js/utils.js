/**
 * generates html from a json object and an html template {{varname}}
 * @param template html string
 * @data shallow json object
 */
function renderTemplate(template, data, defaults){
    //console.log('template', data);
    var name, value, _template = (template || '').toString();
    var regex, d;
    
    for(name in data){
        d = defaults[name] || '';
        value = data[name] || d;
        if(value == ' '){
          value = d;
        }
        
        regex = new RegExp('{{'+name+'}}', 'gi');
        _template = _template.replace(regex, value);
    }
    
     _template = _template.replace(/{{[\w_-]*?}}/gi, '&nbsp;');
    // console.log('template', _template);
    return _template;
}

function getLocalFile(path){
    var xhr = new XMLHttpRequest(), resp;
    
    xhr.open("GET", chrome.extension.getURL(path), false);
    xhr.send();
    //resp = JSON.parse(xhr.responseText);
    resp = xhr.responseText;
    // console.log('getLocalFile', resp);
    return resp;
}

function fetchTemplate(templateName){
  var path = 'templates/' + templateName + '.html';
  var template = getLocalFile(path);
  // console.log('getTemplate', template);
  return template;
}