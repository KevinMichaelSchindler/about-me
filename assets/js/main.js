/*
	Big Picture by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

	// Breakpoints.
		breakpoints({
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');
		else {

			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});

		}

	// Fix: IE flexbox fix.
		if (browser.name == 'ie') {

			var $main = $('.main.fullscreen'),
				IEResizeTimeout;

			$window
				.on('resize.ie-flexbox-fix', function() {

					clearTimeout(IEResizeTimeout);

					IEResizeTimeout = setTimeout(function() {

						var wh = $window.height();

						$main.each(function() {

							var $this = $(this);

							$this.css('height', '');

							if ($this.height() <= wh)
								$this.css('height', (wh - 50) + 'px');

						});

					});

				})
				.triggerHandler('resize.ie-flexbox-fix');

		}

	// Gallery.
		$window.on('load', function() {

			var $gallery = $('.gallery');

			$gallery.poptrox({
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#1f2328',
				overlayOpacity: 0.65,
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 50,
				usePopupNav: true
			});

			// Hack: Adjust margins when 'small' activates.
				breakpoints.on('>small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 50;
					});
				});

				breakpoints.on('<=small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 5;
					});
				});

		});

	// Section transitions.
		if (browser.canUse('transition')) {

			var on = function() {

				// Galleries.
					$('.gallery')
						.scrollex({
							top:		'30vh',
							bottom:		'30vh',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Generic sections.
					$('.main.style1')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

					$('.main.style2')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Contact.
					$('#contact')
						.scrollex({
							top:		'50%',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

			};

			var off = function() {

				// Galleries.
					$('.gallery')
						.unscrollex();

				// Generic sections.
					$('.main.style1')
						.unscrollex();

					$('.main.style2')
						.unscrollex();

				// Contact.
					$('#contact')
						.unscrollex();

			};

			breakpoints.on('<=small', off);
			breakpoints.on('>small', on);

		}

	// Events.
		var resizeTimeout, resizeScrollTimeout;

		$window
			.on('resize', function() {

				// Disable animations/transitions.
					$body.addClass('is-resizing');

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(function() {

					// Update scrolly links.
						$('a[href^="#"]').scrolly({
							speed: 1500,
							offset: $header.outerHeight() - 1
						});

					// Re-enable animations/transitions.
						setTimeout(function() {
							$body.removeClass('is-resizing');
							$window.trigger('scroll');
						}, 0);

				}, 100);

			})
			.on('load', function() {
				$window.trigger('resize');
			});

})(jQuery);


$(function(){
    var TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
      };
      
      TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
      
        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
      
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
      
        var that = this;
        var delta = 200 - Math.random() * 100;
      
        if (this.isDeleting) { delta /= 2; }
      
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 100;
        }
      
        setTimeout(function() {
          that.tick();
        }, delta);
      };
      
      window.onload = function() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-rotate');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0em solid #666 ; }";
        document.body.appendChild(css);
      };
})

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('alp-toggleButton1');
    const toggleContent = document.getElementById('alp-p1');
	const toggleButton2 = document.getElementById('alp-toggleButton2');
    const toggleContent2 = document.getElementById('alp-p2');
	// const toggleButtonh2 = document.getElementById('alp-togglebutton-h2');
    toggleButton.addEventListener('click', function () {
		toggleButton2.style.display = (toggleContent.style.display === 'none') ? 'inline-flex' : 'none';
        toggleContent.style.display = (toggleContent.style.display === 'none') ? 'block' : 'none';
		toggleButton.style.display = (toggleContent.style.display === 'none') ? 'block' : 'none';
        // toggleButton.innerText = (toggleContent.style.display === 'none') ? 'More' : 'Less';
    });

	toggleButton2.addEventListener('click', function () {
		toggleContent2.style.display = (toggleContent2.style.display === 'none') ? 'block' : 'none';
		toggleButton2.style.display = (toggleContent.style.display === 'none') ? 'inline-flex' : 'none';
        // toggleButton.innerText = (toggleContent.style.display === 'none') ? 'More' : 'Less';
    });

	// toggleButtonh2.addEventListener('click', function () {
	// 	var content = this.nextElementSibling;
	// 	if (content.style.display === "block") {
	// 		toggleContent.style.display = 'none';
	// 		toggleContent2.style.display = 'none';
	// 		toggleButton.style.display = 'inline-flex';
	// 		toggleButton2.style.display = 'none';
	// 	}

    // });

	
});



document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('hydro-toggleButton1');
    const toggleContent = document.getElementById('hydro-p1');
	const toggleButton2 = document.getElementById('hydro-toggleButton2');
    const toggleContent2 = document.getElementById('hydro-p2');
	// const toggleButtonh2 = document.getElementById('hydro-togglebutton-h2');
    toggleButton.addEventListener('click', function () {
		toggleButton2.style.display = (toggleContent.style.display === 'none') ? 'inline-flex' : 'none';
        toggleContent.style.display = (toggleContent.style.display === 'none') ? 'block' : 'none';
		toggleButton.style.display = (toggleContent.style.display === 'none') ? 'block' : 'none';
        // toggleButton.innerText = (toggleContent.style.display === 'none') ? 'More' : 'Less';
    });

	toggleButton2.addEventListener('click', function () {
		toggleContent2.style.display = (toggleContent2.style.display === 'none') ? 'block' : 'none';
		toggleButton2.style.display = (toggleContent.style.display === 'none') ? 'inline-flex' : 'none';
        // toggleButton.innerText = (toggleContent.style.display === 'none') ? 'More' : 'Less';
    });
});

// document.addEventListener('DOMContentLoaded', function () {
// 	const toggleButton = document.getElementById('toggleButton');
// 	const toggleContent = document.querySelector('.toggle-content');

// 	toggleButton.addEventListener('click', function () {
// 		toggleContent.style.display = (toggleContent.style.display === 'none') ? 'block' : 'none';
// 		toggleButton.innerText = (toggleContent.style.display === 'none') ? 'More' : 'Less';
// 	});
// });


// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.maxHeight){
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     }
//   });
// }

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function () {
		this.classList.toggle("active");
		var content = this.nextElementSibling;
		if (content.style.display === "block") {
			content.style.display = "none";
		} else {
			content.style.display = "block";
		}
	});
}

var image1 = document.getElementById('image1');
var image2 = document.getElementById('image2');

// Calculate minimum height
var minHeight = Math.min(image1.height, image2.height);

// Apply minimum height to both images
image1.style.height = minHeight + 'px';
image2.style.height = minHeight + 'px';