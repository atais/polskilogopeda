(function ($) {
    "use strict"; // Start of use strict

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
