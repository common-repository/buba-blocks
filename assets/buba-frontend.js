jQuery(document).ready(function ($) {

    if ($('.slick-slider-wrap').length) {
        $('.slick-slider-wrap').slick();
    }

    if ($('.is-masonry').length) {
        $('.is-masonry').masonry();
    }

    if ($('.buba-blocks-slider-images').length) {
        $('.buba-blocks-slider-images').slick();
    }
    
    if ($('.buba-blocks-slider').length) {
        $('.buba-blocks-slider').slick();
    }

    $('body').on('submit', '.buba-blocks-form', e => {
        e.preventDefault();

        const loader = new BubaLoader();


        const self = $(e.target);
        const formData = self.serializeArray();
        const sendData = new FormData();
        const notyNormalize = {
            layout: 'topRight',
            timeout: 3000
        }
        const newForm = {};

        formData.forEach( value => {
            newForm[value.name] = value.value;
        });

        sendData.append( 'action', 'buba_blocks_form_send_mail' );
        sendData.append( 'theme', self.attr('noty') );
        sendData.append( 'subject', self.attr('subject') );
        sendData.append( 'to', self.attr('to') );
        sendData.append( 'body', JSON.stringify( newForm ) );

        // fetch options
        const url = '/wp-admin/admin-ajax.php';
        const options = {
            method: 'POST',
            body: sendData
        };

        fetch( url, options )
            .then( res => res.json() )
            .then( data => {
                loader.delete();
                notyNormalize.theme = data.theme || 'relax';

                if ( data.status !== 200 )
                    return new Noty({
                        ...notyNormalize,
                        text: data.message,
                        type: 'error'
                    }).show();

                return new Noty({
                    ...notyNormalize,
                    text: data.message,
                    type: 'success'
                }).show();
            })
            .catch( err => {
                loader.delete();
                console.error(err);

                return new Noty({
                    ...notyNormalize,
                    text: 'Something went wrong, try again...',
                    type: 'error',
                    theme: 'relax'
                }).show();
            });
    });

    var wow = new WOW(
        {
            boxClass: 'buba-wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0,          // distance to the element when triggering the animation (default is 0)
            mobile: true,       // trigger animations on mobile devices (default is true)
            live: true,       // act on asynchronously loaded content (default is true)
            callback: function (box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null,    // optional scroll container selector, otherwise use window,
            resetAnimation: true,     // reset animation on end (default is true)
        }
    );
    wow.init();
    function ScrollTo() {
        let box = this.parentElement.getBoundingClientRect();
        $('body, html').animate({
            scrollTop: box.top + pageYOffset + box.height
        }, 1000);
    }
    const scrollButton = document.getElementById('buba-scroll');
    if (scrollButton){  
        scrollButton.addEventListener('click', ScrollTo);
    }
    $(document).on('click','.buba-accordion__title-wrap',function (){
       $(this).next().slideToggle();
       $(this).toggleClass('buba-open');
    });
    if ($('.buba-table-of-contents').length){
        const headersLinks = [];
        const headerItems = $(".buba-table-of-contents").find(".buba-table-of-contents__list-link");
        headerItems.each(function () {
            headersLinks.push({link: $(this).attr('href'),text: $(this).text(), level: $(this).data('level'), elem: $(this)});
        });
        headersLinks.forEach(function (item, index) {
            let title = $('body').find('h'+item.level);
            title.each(function () {
                if ($(this).text() === item.text){
                    $(this).before('<span class="buba-table-of-contents__slug" id="'+item.link.replace('#','')+'"></span>');
                }
            });

        });
    }
});