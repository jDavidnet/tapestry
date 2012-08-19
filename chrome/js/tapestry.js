var img_template = fetchTemplate('image');

chrome.extension.sendMessage(
  {
    getMetaData: true
  }, 
  function(response) {
    console.log('getMetaData', arguments );
    var ogObjects = response.getMetaData;
    var $container = $('#content');
    var ogObject = null;
    var html = '';
    var defaults = {
      'image_url':'/images/unicorn.png'
    };
    
    console.log('image_template', img_template);
    
    for(var i = 0, ol = ogObjects.length; i < ol; i++){
      ogObject = ogObjects[i];
      var html = renderTemplate(img_template, ogObject, defaults);
      //$container.append('<div class="ogBrick"><img src="'+ ogObject.image_url+'" alt="" />	</div>');
      console.log('html', html);
      $container.append(html);
    }    

    $container.imagesLoaded( function(){
      $container.masonry({
        itemSelector : '.ogBrick'
      });

    });


  });
