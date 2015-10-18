$(document).ready(function () {
    var AFFIX_TOP_LIMIT = 300;
    var AFFIX_OFFSET = 49;
	$('#menu-left').localScroll({hash:true, onAfterFirst:function(){$('html, body').scrollTo( {top:'-=25px'}, 'fast' );}});
	
	$(function () {
  $('.click-nav > ul').toggleClass('no-js js');
  $('.click-nav .js ul').hide();
  $('.click-nav .js').click(function(e) {
    $(this).find('ul').slideToggle(200);
    $('.clicker').toggleClass('active');
	if($(e.target).attr('href') == '#') {e.preventDefault();}
    e.stopPropagation();
  });
  $(document).click(function() {
    if ($('.click-nav .js ul').is(':visible')) {
      $('.click-nav .js ul', this).slideUp();
      $('.clicker').removeClass('active');
    }
  });
});

$(document).ready(function() {
    $('#existing-content-menu').sidr({
      name: 'sidr-existing-content',
      source: '.docs-nav'
   		});
	});
	
 //this code is close sidr menu if clicked outside  {optional}
 $(document).on("click", function () {
     $.sidr('close', 'sidr-existing-content');
 });
 
// Menu Scroll 
 
   //initiating jQuery 
   jQuery(function($) { 
   	$(document).ready( function() { 
		//enabling stickUp on the '.navbar-wrapper' class 
		$('.sticky').stickUp(); }); });

    $(".docs-nav").each(function () {
        var $affixNav = $(this),
			$container = $affixNav.parent(),
			affixNavfixed = false,
			originalClassName = this.className,
			current = null,
			$links = $affixNav.find("a");

        function getClosestHeader(top) {
            var last = $links.first();

            if (top < AFFIX_TOP_LIMIT) {
                return last;
            }

            for (var i = 0; i < $links.length; i++) {
                var $link = $links.eq(i),
					href = $link.attr("href");

                if (href.charAt(0) === "#" && href.length > 1) {
                    var $anchor = $(href).first();

                    if ($anchor.length > 0) {
                        var offset = $anchor.offset();

                        if (top < offset.top - AFFIX_OFFSET) {
                            return last;
                        }

                        last = $link;
                    }
                }
            }
            return last;
        }

        $(window).on("scroll", function (evt) {
            var top = window.scrollY,
		    	height = $affixNav.outerHeight(),
		    	max_bottom = $container.offset().top + $container.outerHeight(),
		    	bottom = top + height + AFFIX_OFFSET;

            if (affixNavfixed) {
                if (top <= AFFIX_TOP_LIMIT) {
                    $affixNav.removeClass("fixed");
                    $affixNav.css("top", 0);
                    affixNavfixed = false;
                } else if (bottom > max_bottom) {
                    $affixNav.css("top", (max_bottom - height) - top);
                } else {
                    $affixNav.css("top", AFFIX_OFFSET);
                }
            } else if (top > AFFIX_TOP_LIMIT) {
                $affixNav.addClass("fixed");
                affixNavfixed = true;
            }

            var $current = getClosestHeader(top);

            if (current !== $current) {
                $affixNav.find(".active").removeClass("active");
                $current.addClass("active");
                current = $current;
            }
        });
    });
	
    prettyPrint();
});
