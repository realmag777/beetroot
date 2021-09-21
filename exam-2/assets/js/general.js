var menu_timer = null;

window.addEventListener('load', function() {
    setInterval(function() {
        next_slider();
    }, 4000);

    //+++
    //nav scrolling
    document.querySelectorAll('a.navigation').forEach(function(a) {
        a.addEventListener('click', function(e) {
            e.preventDefault();

            let href = this.getAttribute('href');

            try {
                if (!document.querySelector(href)) {
                    return;
                }
            } catch (e) {
                return false;
            }

            set_menu_item_selected(href);

            let to = document.querySelector(href).offsetTop - 100,
                duration = 777;


            let start = window.scrollY,
                change = to - start,
                currentTime = 0,
                increment = 20;

            Math.easeInOutQuad = function(t, b, c, d) {
                t /= d / 2;
                if (t < 1)
                    return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            };


            const animateScroll = function() {
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime, start, change, duration);
                window.scrollTo(to, val);
                if (currentTime < duration) {
                    setTimeout(animateScroll, increment);
                }
            };

            animateScroll();

            return false;
        });
    });

    //fixed menu
    window.addEventListener('scroll', function(e) {
        if (window.scrollY > document.querySelector('body > header').clientHeight - 100) {
            document.querySelector('body > header .header__menu_nav').classList.add('sticky-menu');
        } else {
            document.querySelector('body > header .header__menu_nav').classList.remove('sticky-menu');
        }

        //+++

        //console.log(window.pageYOffset);
        document.querySelectorAll('body > header .header__menu_nav a').forEach(function(a, index) {

            let id = a.getAttribute('href');
            const el = document.querySelector(id);

            const observer = new window.IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {

                    if (menu_timer) {
                        clearTimeout(menu_timer);
                    }

                    menu_timer = setTimeout(() => {
                        set_menu_item_selected(id);
                    }, 333);


                    return true;
                }

                return false;
            }, {
                root: null,
                threshold: 0.1, // set offset 0.1 means trigger if atleast 10% of element in viewport
            })


            try {
                observer.observe(el);
            } catch (e) {
                //***
            }
        });



    });


    //gallery navigation
    document.addEventListener('keydown', e => {

        if (document.querySelectorAll('.woot-gallery-lightbox:target').length > 0) {
            let current = null;

            switch (e.keyCode) {
                case 37:
                    //left
                    current = document.querySelector('.woot-gallery-lightbox:target .woot-gallery-nav-left a');
                    if (current) {
                        location.hash = current.hash;
                    }
                    break;

                case 39:
                    //right
                    current = document.querySelector('.woot-gallery-lightbox:target .woot-gallery-nav-right a');
                    if (current) {
                        location.hash = current.hash;
                    }
                    break;

                case 27:
                    //escape
                    current = document.querySelector('.woot-gallery-lightbox:target a.woot-gallery-close');
                    if (current) {
                        location.hash = current.hash;
                    }
                    break;
            }
        }



    });

    //+++

    generate_popup_gallery();


    let news_slider = new NewsSlider('news_slider_1');
    setInterval(function() {
        news_slider.slide();
    }, 4000);


    initMap();

});

function set_menu_item_selected(id) {
    document.querySelector('a.navigation.selected').classList.remove('selected');
    document.querySelector(`[href="${id}"]`).classList.add('selected');
}

function call_popup(selector, popup_title = '', title_info = '') {
    let popup = new Popup23();
    popup.set_title(popup_title);

    if (title_info.length > 0) {
        popup.set_title_info(title_info);
    }

    popup.set_content(document.querySelector(selector).innerHTML);

    return false;
}

function generate_popup_gallery() {
    let count = 25;
    let html = '<div class="col woot-gallery" id="woot-gallery2">';

    for (let i = 0; i < count; i++) {
        html += `<div class="woot-gallery-nav"><img src="assets/img/slider/${i+1}.jpg" loading="lazy" alt=""><a href="#woot-gallery-lightbox-${i}">&nbsp;</a></div>`;
    }

    html += '</div>';

    html += `<div class="woot-gallery-lightbox" id="woot-gallery-lightbox-0" tabindex="-1">


    <div class="woot-gallery-content"><img src="assets/img/slider/1.jpg" loading="lazy" alt="">
        <div class="woot-gallery-title">Title #1</div>
        <a class="woot-gallery-close" href="#/woot-gallery"></a>
    </div>

    <div class="woot-gallery-nav woot-gallery-nav-right">
        <a href="#woot-gallery-lightbox-1"><img src="assets/img/slider/2.jpg" loading="lazy" width="60" height="40" alt=""></a>
    </div>

</div>`;


    for (let i = 1; i < count - 1; i++) {
        html += `<div class="woot-gallery-lightbox" id="woot-gallery-lightbox-${i}" tabindex="-1">

        <div class="woot-gallery-nav woot-gallery-nav-left">
            <a href="#woot-gallery-lightbox-${i-1}"><img src="assets/img/slider/${i}.jpg" loading="lazy" width="60" height="40" alt=""></a>
        </div>

        <div class="woot-gallery-content"><img src="assets/img/slider/${i+1}.jpg" loading="lazy" alt="">
            <div class="woot-gallery-title">Title #${i+1}</div>
            <a class="woot-gallery-close" href="#/woot-gallery"></a>
        </div>

        <div class="woot-gallery-nav woot-gallery-nav-right">
            <a href="#woot-gallery-lightbox-${i+1}"><img src="assets/img/slider/${i+2}.jpg" loading="lazy" width="60" height="40" alt=""></a>
        </div>

    </div>`;
    }

    html += ` <div class="woot-gallery-lightbox" id="woot-gallery-lightbox-${count-1}" tabindex="-1">

    <div class="woot-gallery-nav woot-gallery-nav-left">
        <a href="#woot-gallery-lightbox-${count-2}"><img src="assets/img/slider/${count-1}.jpg" loading="lazy" width="60" height="40" alt=""></a>
    </div>

    <div class="woot-gallery-content"><img src="assets/img/slider/${count}.jpg" loading="lazy" alt="">
        <div class="woot-gallery-title">Title #${count}</div>
        <a class="woot-gallery-close" href="#/woot-gallery"></a>
    </div>


</div>`;



    document.getElementById('full-gallery').innerHTML = html;
}

function initMap() {
    // The location of Uluru
    const uluru = { lat: 38.397978248035834, lng: -0.524576163275201 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: uluru,
        //https://developers.google.com/maps/documentation/javascript/styling
        //https://console.cloud.google.com/google/maps-apis/studio/styles?project=fresh-tape-288917
        mapId: '742e02f5d1b4c3ab'
    });

    //var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: 'https://pluginus.net/wp-content/uploads/2021/09/Pin.png'
    });
}