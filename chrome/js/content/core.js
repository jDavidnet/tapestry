console.log('start tapestry');

$(document).ready(function(){
    var data = {
      meta:{},
      links:{},
      href:window.location.href, 
      hostname:window.location.hostname
    };
    
     $('meta[property][content]').each(function(index, element){
         var $tag = $(element);
         //console.log('each', arguments);
         var name = $tag.attr('property');
         var content = $tag.attr('content')
         data.meta[name] = content;
     });
     $('meta[name][value]').each(function(index, element){
         var $tag = $(element);
         //console.log('each', arguments);
         var name = $tag.attr('name');
         var content = $tag.attr('value')
         data.meta[name] = content;
     });
     
     $('meta[name][content]').each(function(index, element){
         var $tag = $(element);
         //console.log('each', arguments);
         var name = $tag.attr('name');
         var content = $tag.attr('value')
         data.meta[name] = content;
     });
     
     $('link[rel][href]').each(function(index, element){
         var $tag = $(element);
         //console.log('each', arguments);
         var name = $tag.attr('rel');
         var content = $tag.attr('href')
         data.links[name] = content;
     });
     
     // console.log('tapestry-meta', data);
     //console.log('tapestry-meta', JSON.stringify(data) );
     sendMetaData(data);
});

function sendMetaData(data, callback, error){
  chrome.extension.sendMessage({
    sendMetaData: data
  }, function(response) {
    // console.log('sendMetaData', response);
    if(typeof(callback) == 'function'){
        callback.apply(this, arguments);
    }
  });
};