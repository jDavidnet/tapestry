

chrome.extension.sendMessage({getMetaData: true}, function(response) {

  ogObjects = response.getMetaData;

  var $container = $('#container');
 
  var ogObject = null;
  
  for(var i = 0; i<ogObjects.length; i++){
  
    ogObject = ogObjects[i];

    $container.append.renderTemplate((fetchTemplate('image.html'), ogObject));    
  }    

  $container.imagesLoaded( function(){
    $container.masonry({
        itemSelector : '.ogBrick'
      });

  });


});
