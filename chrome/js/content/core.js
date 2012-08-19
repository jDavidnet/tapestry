console.log('start tapestry');

$(document).ready(function(){
    var data = {
      meta:{},
      links:{},
      href:window.location.href, 
      hostname:window.location.hostname,
      origin: window.location.origin
    };
    
     $('meta[property][content]').each(function(index, element){
         var $tag = $(element);
         //console.log('each', arguments);
         var name = $tag.attr('property');
         var content = $tag.attr('content')
         data.meta[name] = content;
     });
     
     data.meta['head.title'] = $('title').text();
     data.meta['body.h1'] = $('h1').text();
     
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
         var content = $tag.get(0).href;
         data.links[name] = content;
     });
     
     setTimeout(function(){
         var img2 = [];
         var images = $('img[src]:visible').filter(function(){
           var $img = $(this);

           if($img.width() <= 50){ return false; } 
           if($img.height() <= 50){ return false; }
           
           img2.push({
             width:$img.width(),
             height:$img.height(),
             href:$img.get(0).src
           });
           
           return this;
         });
         console.log('images', $.makeArray(images));
         img2.sort(function(img){
           //var img = $(this);
           var area = img.height * img.width;
           return area;
         });
         console.log('images', img2);
         
         if(img2){
           data.images = img2;
           //var large_image = img2.pop();
           data.large_image = img2[img2.length - 1];
         }

         console.log('tapestry-meta', data);
         //console.log('tapestry-meta', JSON.stringify(data) );
         sendMetaData(data);
     }, 1000);
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