chrome.extension.sendMessage({getMetaData: true}, function(response) {

  ogObjects = response.getMetaData;

  var $container = $('#container');
 
  var ogObject = null;
  
  
  console.log(response)
   
  console.log(ogObjects.length)
   
  for(var i = 0; i<ogObjects.length; i++){
  
    ogObject = ogObjects[i];

    $container.append('<div class="ogBrick"><img src="'+ ogObject.meta['og:image']+'" alt="" />	</div>');
    
  }    

  $container.imagesLoaded( function(){
    $container.masonry({
        itemSelector : '.ogBrick'
      });

  });


});
