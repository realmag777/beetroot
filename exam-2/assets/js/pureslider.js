 //wrap to class on optimization
 var offset = 0;
 var slider_num = 0;
 var count_slides = document.querySelectorAll('ul.pureslider > li').length;
 var container = document.getElementById('slider1');
 var slider = container.querySelector('ul');
 var slides = container.querySelectorAll('ul.pureslider > li');
 var nav = null;

 document.addEventListener('DOMContentLoaded', function() {

     setTimeout(function() {
         container.style.height = slides[0].clientHeight + 'px';
         generate_nav();
     }, 333);

 }, false);


 function generate_nav() {
     if (document.querySelector('[data-slider="slider1"]')) {
         nav = document.querySelector('[data-slider="slider1"]');

         for (let i = 0; i < count_slides; i++) {
             let a = document.createElement('a');
             a.setAttribute('href', '#');
             a.dataset.num = i;
             //a.textContent = i + 1;
             if (i === 0) {
                 a.classList.add('selected');
             }
             a.addEventListener('click', function(e) {
                 e.preventDefault();

                 slider_num = parseInt(this.dataset.num);
                 offset = 0;

                 if (slider_num > 0) {
                     for (let i = 0; i < slider_num; i++) {
                         offset += slides[i].clientHeight;
                     }
                 }

                 slider.style.top = '-' + offset + 'px';
                 container.style.height = slides[slider_num].clientHeight + 'px';
                 set_selected(slider_num);

                 return false;
             });

             nav.appendChild(a);
         }
     }
 }

 function set_selected(slider_num) {
     nav.querySelector('.selected').classList.remove('selected');
     nav.querySelectorAll('a')[slider_num].classList.add('selected');
 }

 function next_slider() {
     slider_num++;

     if (slider_num < count_slides) {
         let current = slides[slider_num - 1];
         let next = slides[slider_num];
         offset += current.clientHeight;
         slider.style.top = '-' + offset + 'px';
         container.style.height = next.clientHeight + 'px';
         set_selected(slider_num);
     } else {
         nav.querySelectorAll('a')[0].click();
     }
 }

 function prev_slider() {
     slider_num--;

     if (slider_num >= 0) {
         let prev = slides[slider_num];
         offset -= prev.clientHeight;
         container.style.height = prev.clientHeight + 'px';
         slider.style.top = '-' + offset + 'px';
         set_selected(slider_num);
     } else {
         nav.querySelectorAll('a')[count_slides - 1].click();
     }
 }