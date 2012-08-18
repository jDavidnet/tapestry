  $(function(){
 
    var $container = $('#container');
 
    $container.imagesLoaded( function(){
      $container.masonry({
        itemSelector : '.masonryImage'
      });
    });
 
  });