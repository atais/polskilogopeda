import { Loader } from '@googlemaps/js-api-loader';

const mapsLoader = new Loader({
    apiKey: "AIzaSyAMJAcHJ5guuewluHOFjymc6DGuIPiDF1I",
    version: "weekly",
});

(function ($) {
    "use strict"; // Start of use strict

    /* Google map
    ----------------------------------------------*/
    function initializeMap() {
        var $el = $("#google-map");
        if (!$el.length) return;

        var img        = $el.attr("data-address-details");
        var address    = $el.attr("data-address");
        var mapElement = $el[0];

        Promise.all([
            mapsLoader.importLibrary("maps"),
            mapsLoader.importLibrary("geocoding"),
            mapsLoader.importLibrary("marker"),
        ]).then(function ([ mapsLib, geocodingLib, markerLib ]) {
            var geocoder = new geocodingLib.Geocoder();
            geocoder.geocode({ address: address }, function (results, status) {
                if (status === "OK") {
                    var location = results[0].geometry.location;

                    var map = new mapsLib.Map(mapElement, {
                        zoom: 15,
                        center: location,
                        scrollwheel: false,
                        mapTypeId: "roadmap",
                        mapId: "polski_logopeda_map",
                    });

                    var marker = new markerLib.AdvancedMarkerElement({
                        map: map,
                        position: location,
                    });

                    var contentDiv = document.createElement('div');
                    contentDiv.innerHTML = "<div class='navbar-brand maps'><img src='" + img + "' class='mr-2 d-inline-block align-top' />Polski Logopeda</div>";

                    var infoWindow = new mapsLib.InfoWindow({ headerContent: contentDiv });

                    marker.addEventListener("gmp-click", function () {
                        infoWindow.open(map, marker);
                    });

                    infoWindow.open(map, marker);
                } else {
                    console.error("Geocoding error: " + status);
                }
            });
        }).catch(function (e) {
            console.error("Google Maps failed to load", e);
        });
    }

    $(document).ready(function () {
        // Smooth scrolling using jQuery easing
        $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
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

        // Collapse Navbar
        var navbarCollapse = function () {
            if ($("#appNavbar").offset().top > 100) {
                $("#appNavbar").addClass("navbar-scrolled");
            } else {
                $("#appNavbar").removeClass("navbar-scrolled");
            }
        };

        if ($(".mainNav").length != 0) {
            // Collapse now if page is not at top
            navbarCollapse();
            // Collapse the navbar when page is scrolled
            $(window).scroll(navbarCollapse);
        }

        if ($("#google-map").length) {
            initializeMap();
        }


        /* Contact form
        ----------------------------------------------*/
        $("#contact-form").submit(function (e) {
            e.preventDefault(); // avoid to execute the actual submit of the form.
            $.ajax({
                url: "https://formspree.io/f/xwkwblve",
                method: "POST",
                dataType: "json",
                data: $(this).serialize(), // serializes the form's elements.
                success: function (data) {
                    // console.log(data);
                    $("#form-success").removeClass("d-none");
                    $("#contact-form").parent().addClass("blur");
                },
                error: function (data) {
                    // console.log(data);
                    $("#form-failure").removeClass("d-none");
                    $("#contact-form").parent().addClass("blur");
                }
            });
        });
    });
})($);
// End of use strict
