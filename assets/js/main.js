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
    setupToggle('alp', 2); // 2 buttons for 'alp' section
    setupToggle('hydro', 2); // 1 button for 'hydro' section
    setupToggle('comp', 1);
	setupToggle('tai', 1); 

    // Add more sections as needed
});

function setupToggle(section, numButtons) {
    const toggleButtons = Array.from({ length: numButtons }, (_, index) =>
        document.getElementById(`${section}-toggleButton${index + 1}`)
    );
    const toggleContents = Array.from({ length: numButtons }, (_, index) =>
        document.getElementById(`${section}-p${index + 1}`)
    );

    toggleButtons.forEach((button, index) => {
        if (button && toggleContents[index]) {
            button.addEventListener('click', function () {
                toggleContents.forEach((content, i) => {
                    if (button && content) {
                        content.style.display = (content.style.display === 'none') ? 'block' : 'none';
                        button.style.display = (content.style.display === 'none') ? 'inline-flex' : 'none';
                    }
                });
            });
        }
    });
}

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

// function adjustImageSizes(rowSelector) {
//     var rows = document.querySelectorAll(rowSelector);

//     rows.forEach(function(row) {
//       var images = row.querySelectorAll('.image-container img');
//       var minHeight = Math.min.apply(null, Array.from(images).map(img => img.height));

//       images.forEach(function(img) {
//         img.style.width = '100%';
//         img.style.height = minHeight + 'px';
//       });
//     });
//   }

//   // Call the function for each row
//   adjustImageSizes('.image-row');


//   function adjustImageSizes(rowSelector) {
//     var rows = document.querySelectorAll(rowSelector);

//     function setImagesHeight(images) {
//       var minHeight = Math.min.apply(null, Array.from(images).map(img => img.height));
      
//       images.forEach(function(img) {
//         img.style.height = minHeight + 'px';
//       });
//     }

//     function handleResize() {
//       rows.forEach(function(row) {
//         var images = row.querySelectorAll('.image-container img');
//         setImagesHeight(images);
//       });
//     }

//     // Initial setup
//     handleResize();

//     // Recalculate on window resize
//     window.addEventListener('resize', handleResize);
//   }

//   // Call the function for each row
//   adjustImageSizes('.image-row');

// var lang = {
// 	"html": "100%",
// 	"css": "90%",
// 	"javascript": "70%",
// 	"php": "55%",
// 	"angular": "65%"
//   };
  
//   var multiply = 4;
  
//   $.each( lang, function( language, pourcent) {
  
// 	var delay = 700;
	
// 	setTimeout(function() {
// 	  $('#'+language+'-pourcent').html(pourcent);
// 	},delay*multiply);
	
// 	multiply++;
  
//   });


// 3. Progress-bar

	// var dataToggleTooTip = $('[data-toggle="tooltip"]');
	// var progressBar = $(".progress-bar");
	// if (progressBar.length) {
	// 	progressBar.appear(function () {
	// 		dataToggleTooTip.tooltip({
	// 			trigger: 'manual'
	// 		}).tooltip('show');
	// 		progressBar.each(function () {
	// 			var each_bar_width = $(this).attr('aria-valuenow');
	// 			$(this).width(each_bar_width + '%');
	// 		});
	// 	});
	// }
	document.addEventListener('DOMContentLoaded', function () {
		const skillsColumn1 = document.getElementById('skillsColumn1');
		// const skillsColumn2 = document.getElementById('skillsColumn2');
	
		function createSkill(skillName, percentage, rating) {
			const barWrapper = document.createElement('div');
			barWrapper.classList.add('barWrapper');
	
			const progressText = document.createElement('span');
			progressText.classList.add('progressText');
			progressText.textContent = skillName;
	
			const progress = document.createElement('div');
			progress.classList.add('progress');
			const progressBar = document.createElement('div');
			progressBar.classList.add('progress-bar');
			progressBar.style.width = '0'; // Initial width set to 0
			progressBar.classList.add('fillProgressBar'); // Apply animation class dynamically
	
			progress.appendChild(progressBar);
	
			const singleProgressTxt = document.createElement('div');
			singleProgressTxt.classList.add('single-progress-txt');
			singleProgressTxt.appendChild(progress);
			const h3 = document.createElement('h3');
			h3.textContent = '0%'; // Initial text set to 0%
			singleProgressTxt.appendChild(h3);
	
			barWrapper.appendChild(progressText);
			barWrapper.appendChild(singleProgressTxt);
	
			// Intersection Observer to trigger animation when element is in the viewport
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						progressBar.style.width = percentage + '%'; // Set width when in viewport
						h3.textContent = rating; // Update text when in viewport
					} else {
						progressBar.style.width = '0'; // Reset width when leaving viewport
						h3.textContent = '0%'; // Reset text when leaving viewport
					}
				});
			});
	
			observer.observe(barWrapper);
	
			return barWrapper;
		}
	
		// Skills for column 1
		skillsColumn1.appendChild(createSkill('Frontend', 90, "Can get by"));
		skillsColumn1.appendChild(createSkill('Frontend', 70, "Monkey Presses Buttons and Some Things Work"));
		// skillsColumn1.appendChild(createSkill('Adobe Illustrator', 85, ));
		// skillsColumn1.appendChild(createSkill('Adobe After Effects', 97));
		// skillsColumn1.appendChild(createSkill('Sketch', 90));
	
		// Skills for column 2
		// skillsColumn2.appendChild(createSkill('HTML 5', 90));
		// skillsColumn2.appendChild(createSkill('CSS 3 Animation', 85));
		// skillsColumn2.appendChild(createSkill('Communication', 97));
		// skillsColumn2.appendChild(createSkill('Creativity', 90));
	});
	