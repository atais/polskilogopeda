(function($, google) {
  "use strict"; // Start of use strict
  $(document).ready(function () {
  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#appNavbar',
    offset: 75
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#appNavbar").offset().top > 100) {
      $("#appNavbar").addClass("navbar-scrolled");
    } else {
      $("#appNavbar").removeClass("navbar-scrolled");
    }
  };

  if($(".mainNav").length != 0) {
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  }

  // Magnific popup calls
  $('#portfolio').each(function(el) {
    el.magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1]
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
      }
    });
  });

  /* Google map
  ----------------------------------------------*/
  $("#google-map").each(function () {
    var img = $(this).attr("data-address-details");
    var address = $(this).attr("data-address");

    $(this).gmap3({
        address: address,
        zoom: 15,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      })
      .marker({
        address: address,
        draggable: false,
      })
      .infowindow({
        content: "<div class='navbar-brand maps'><img src=" + img + ' class="mr-2 d-inline-block align-top" />Polski Logopeda</div>',
      })
      .then(function (infowindow) {
        var map = this.get(0);
        var marker = this.get(1);
        marker.addListener("click", function () {
          infowindow.open(map, marker);
        });
        infowindow.open(map, marker);
      });
  });
  });
})($, google);
// End of use strict
