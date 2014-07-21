(function() {
  $(function() {
    $('.panel-body .page-title a').click(function(e) {
      e.preventDefault();
      return $("#page-content").load($(this).attr('href'));
    });
    $('.page-new a').click(function(e) {
      e.preventDefault();
      return $("#page-content").load($(this).attr('href'));
    });
    $('.menu').on('click', function() {
      return $('.navbar-nav').toggleClass('open');
    });
    $('.four_oven_gas .color-chip').on('click', function(e) {
      var folder, image, imageName, lastClass;
      lastClass = $(this).attr('class').split(' ').pop();
      imageName = lastClass.split('-').pop();
      folder = $(this).parent().attr('class').split(' ')[0];
      image = folder + '/4oven_cont_' + imageName + '.jpg';
      return $.ajax({
        data: {
          'image': image
        },
        type: 'POST',
        url: '/pages/update_image'
      });
    });
    return $('.four_oven_electric .color-chip').on('click', function(e) {
      var folder, image, imageName, lastClass;
      lastClass = $(this).attr('class').split(' ').pop();
      imageName = lastClass.split('-').pop();
      folder = $(this).parent().attr('class').split(' ')[0];
      image = folder + '/4-oven-30-amp-aga_-' + imageName + '.png';
      return $.ajax({
        data: {
          'image': image
        },
        type: 'POST',
        url: '/pages/update_image'
      });
    });
  });

}).call(this);
