var img_template = fetchTemplate('image');
var txt_template = fetchTemplate('text');

chrome.extension.sendMessage({ getMetaData: true }, handleMetaData);

$('.js-delete-events').click(function() {
  chrome.extension.sendMessage({ deleteAllEvents: true });
  var $container = $('#content').empty();
})

function handleMetaData(response) {
  // console.log('getMetaData', arguments );
  var ogObjects = response.getMetaData;
  var $container = $('#content');
  var ogObject = null;
  var html = '';
  var defaults = {
    'image_url':'/images/unicorn.png',
    'blockquote-class':''
  };
    
  // console.log('image_template', img_template);
  ogObjects.reverse();
  for(var i = 0, ol = ogObjects.length; i < ol; i++){
    ogObject = ogObjects[i];
    // console.log(ogObject.image_url)
    if (ogObject.description && ogObject.description.length > 120) {
      ogObject.description = ogObject.description.substring(0, 120) + '...';
    }
    
    if (!ogObject.description) {
      ogObject['blockquote-class'] = 'hidden-blockquote';
    }
    
    if (ogObject.image_url && ogObject.image_url.length > 0) {
      var html = renderTemplate(img_template, ogObject, defaults);
    } else {
      var html = renderTemplate(txt_template, ogObject, defaults);
    }
    //$container.append('<div class="ogBrick"><img src="'+ ogObject.image_url+'" alt="" />	</div>');
    // console.log('html', html);
    $container.append(html);
  }    

  $container.imagesLoaded( function(){
    $container.masonry({
      itemSelector : '.ogBrick'
    });
  });
}