chrome.extension.sendMessage({getMetaData: true}, function(response) {

  ogObjects = response.getMetaData;

  var $container = $('#container');
 
  var ogObject = null;
  
  
   
   
  for(var i = 0; i<ogObjects.length; i++){
  
    ogObject = ogObjects[i];

    $container.append('<div class="ogBrick"><img src="'+ ogObject.image_url+'" alt="" />	</div>');
    
  }    

  $container.imagesLoaded( function(){
    $container.masonry({
        itemSelector : '.ogBrick'
      });

  });


});
