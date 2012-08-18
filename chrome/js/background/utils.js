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