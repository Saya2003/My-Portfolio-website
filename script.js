// Initialize EmailJS with your public key
emailjs.init('Cj6fBkkArtLP6vpM2'); // Replace with your actual EmailJS public key

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

function main() {

    (function () {
        'use strict';
      /* ==============================================
         Page Scrolling
         =============================================== */

        $('a.scroll-nav, .navbar-nav li a').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                let target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 40
                    }, 900);
                    return false;
                }
            }
        });

        /*====================================
         Show Menu on Scroll & Section Detection
         ======================================*/
        $(globalThis).bind('scroll', function() {
            let homeHeight = $('#home').offset().top + $('#home').height();
            let scrollTop = $(globalThis).scrollTop();
            
            // Show pink nav bar only when user scrolls past home page
            if (scrollTop > homeHeight) {
                $('.navbar-default').addClass('pink-nav');
            } else {
                $('.navbar-default').removeClass('pink-nav');
            }
            
            // Fade in about section
            if ($('#about').length) {
                let aboutTop = $('#about').offset().top;
                let aboutTrigger = aboutTop - $(globalThis).height() + 100;
                if (scrollTop > aboutTrigger && !$('#about').hasClass('fade-in')) {
                    $('#about').addClass('fade-in');
                }
            }
            
            // Fade in contact section
            if ($('#contact').length) {
                let contactTop = $('#contact').offset().top;
                let contactTrigger = contactTop - $(globalThis).height() + 100;
                if (scrollTop > contactTrigger && !$('#contact').hasClass('fade-in')) {
                    $('#contact').addClass('fade-in');
                }
            }
        });
        /* ==============================================
         Scroll Spy
         =============================================== */
        $('body').scrollspy({
            target: '.navbar-default',
            offset: 80
        })
        
        /* ==============================================
         Contact Form Handler
         =============================================== */
        $('#contactform').on('submit', function(e) {
            e.preventDefault();
            
            let name = $('#name').val();
            let email = $('#email').val();
            let message = $('#comments').val();
            
            // Validate fields
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return false;
            }
            
            // Prepare template parameters
            let templateParams = {
                from_name: name,
                from_email: email,
                message: message + "\n\n--- Sender Details ---\nName: " + name + "\nEmail: " + email,
                to_email: 'mubianasaya@gmail.com'
            };
            
            // Send email using EmailJS
            emailjs.send('service_m8g9yc5', 'template_3jvir6m', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    // Show success modal
                    document.getElementById('successModal').style.display = 'flex';
                    // Reset form
                    document.getElementById('contactform').reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Failed to send message. Please try again or email directly at mubianasaya@gmail.com');
                });
            
            return false;
        });
     
       }());
      }
main();