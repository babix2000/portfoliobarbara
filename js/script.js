$(document).ready(function(){

    $('i.fa.fa-arrow-left').on('click', function() {
        window.history.back();
    });

	$('.menu-hamburguer').click(function(){
		$(this).toggleClass('open');
		$('.navegacao').toggleClass('open');
	});

	//Ativar secções
	const navItems = $('.navegacao span');
    const sections = $('section');

    // Smooth scrolling when clicking navigation items
    navItems.click(function() {
        const sectionId = $(this).data('id');
        const offset = sectionId === 'projetos' ? 300 : 0; // Add 200px offset for "projetos" section
        $('html, body').animate({
            scrollTop: $('#' + sectionId).offset().top + offset
        }, 500, function() {
            // After scrolling, add 'ativo' and 'animate' class
            const currentSection = $('#' + sectionId);
            navItems.removeClass('ativo');
            navItems.filter('[data-id="' + sectionId + '"]').addClass('ativo');
            currentSection.addClass('animate');
        });
    });

    // Function to check which section is in view
    function checkSectionInView() {
        let currentSection;
        sections.each(function() {
            const section = $(this);
            const sectionId = section.attr('id');
            const sectionTop = section.offset().top - $(window).scrollTop();
            const sectionBottom = sectionTop + section.outerHeight();

            // Specific logic for the "projetos" section
            if (sectionId === 'projetos') {
                if (sectionTop <= ($(window).height() / 2) - 300 && sectionBottom > ($(window).height() / 2) - 200) {
                    currentSection = section;
                    return false; // Exit the loop
                }
            } else {
                if (sectionTop <= $(window).height() / 2 && sectionBottom > $(window).height() / 2) {
                    currentSection = section;
                    return false; // Exit the loop
                }
            }
        });

        if (currentSection) {
            const id = currentSection.attr('id');
            navItems.removeClass('ativo');
            navItems.filter('[data-id="' + id + '"]').addClass('ativo');
            currentSection.addClass('animate');

            // Logic for the "sobre" section
            if (id === 'sobre') {
                $('.wrapper-content .content').slideDown(1000);
            }
        }
    }


    // Check section in view on scroll and on page load
    $(window).on('scroll', checkSectionInView);
    checkSectionInView();

    if($('.wrapper-text-loop').length > 0){
       $(window).on('scroll', function() {
            var element = $('.wrapper-text-loop');
            var elementTop = element.offset().top;
            var elementBottom = elementTop + element.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && (elementTop + 300) < viewportBottom) {
                element.addClass('animate');
            }
        });  
    }
   
    if($('.content').length > 0){
        $(window).on('scroll', function() {
            $('.content').each(function() {
                var element = $(this);
                var elementTop = element.offset().top;
                var elementBottom = elementTop + element.outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();

                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    element.addClass('animate');
                }
            });
        });
    }


    //Sobre Mim Grid mobile
    if($(window).width() <= 500){
    	$('.wrapper-grid .grid > div').each(function(){
	    	var elemento = $(this);
	    	$(this).wrap('<div class="wrap-div"></div>');
	    	$('.overlay-div', this).insertAfter(elemento);

	    });

    	$('.wrapper-grid h5').html(function(_, html) {
	        return html.replace(/<br\s*\/?>/g, ' ');
	    });

	    $('.wrapper-etapas > div').each(function(){
	    	var etapa = $('.etapa', this);
	    	$('.data h3', this).appendTo(etapa);
	    	$('.data p', this).appendTo(etapa);

	    });
    }

    if($(window).width() <= 991){
    	$('.navegacao > span').click(function(){
    		$('.navegacao').toggleClass('open');
    		$('.menu-hamburguer').toggleClass('open');
    	});
    }
});	