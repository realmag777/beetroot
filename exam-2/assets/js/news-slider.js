class NewsSlider {
    constructor(id) {
        this.id = id;
        this.count = document.getElementById(this.id).querySelectorAll('.news__item').length;
        this.offset = 0; //slide num
        this.slides = [];
        this.init();
    }

    init() {

        if (this.count) {

            document.getElementById(this.id).querySelectorAll('.news__item').forEach((slide) => {
                this.slides.push(slide);
            });

            this.btn_left = document.getElementById(this.id).querySelector('.news__slider_nav_left');
            if (this.btn_left) {
                this.btn_left.addEventListener('click', () => {
                    this.slide();
                });
            }

            this.btn_right = document.getElementById(this.id).querySelector('.news__slider_nav_right');
            if (this.btn_right) {
                this.btn_right.addEventListener('click', () => {
                    this.slide('right');
                });
            }

            this.generate_nav();
        }
    }

    generate_nav() {
        if (document.querySelector(`[data-slider="${this.id}"]`)) {
            this.nav = document.querySelector(`[data-slider="${this.id}"]`);

            for (let i = 0; i < this.count; i++) {
                let a = document.createElement('a');
                a.setAttribute('href', '#');
                a.dataset.num = i;

                if (i === 0) {
                    a.classList.add('selected');
                }

                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    slider_num = parseInt(a.dataset.num);
                    this.slide('left', slider_num);
                    this.set_nav_selected(parseInt(a.dataset.num));
                    return false;
                });

                this.nav.appendChild(a);
            }
        }
    }

    set_nav_selected(slider_num) {
        this.nav.querySelector('.selected').classList.remove('selected');
        this.nav.querySelectorAll('a')[slider_num].classList.add('selected');
    }

    slide(dir = 'left', slide_num = -1) {
        let offset_w = -1 * (this.slides[0].offsetWidth + parseInt(window.getComputedStyle(this.slides[0]).marginRight)); //px

        if (dir !== 'left') {
            if (this.offset > 0) {
                this.offset--;
            }
        } else {
            this.offset++;
            if (this.offset >= this.count - 1) {
                this.offset = 0;
            }
        }


        //+++

        if (slide_num > -1) {
            this.offset = slide_num;
            offset_w = offset_w * slide_num;
        } else {
            offset_w = offset_w * this.offset;
            this.set_nav_selected(this.offset);
        }

        if (this.btn_right) {
            if (this.offset > 0) {
                this.btn_right.style.opacity = 1;
            } else {
                this.btn_right.style.opacity = 0;
            }
        }

        this.slides.forEach((slide) => {
            slide.style.left = `${offset_w}px`;
        });


    }
}