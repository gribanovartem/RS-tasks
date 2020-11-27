const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');

let firstCurrentItem = 0;
let secondCurrentItem = 1;
let thirdCurrentItem = 2;
let isAnimation = false;

arrowRight.addEventListener('click', function() {
   let countCards = document.querySelectorAll('.active').length;
   if(!isAnimation) {
      isAnimation = true;
      let cards = document.querySelectorAll('.card');
      firstCurrentItem = (firstCurrentItem+1 + cards.length) % cards.length;
      secondCurrentItem = (countCards===2 || countCards===3) ? (secondCurrentItem+1 + cards.length) % cards.length : null;
      thirdCurrentItem  = (countCards===3) ? (thirdCurrentItem+1 + cards.length) % cards.length : null;
      cards.forEach((el, i) => {
         if(i === firstCurrentItem || i === secondCurrentItem || i === thirdCurrentItem) {
            if(i === firstCurrentItem) {
               if(countCards > 1) {
                  el.classList.add('to-left');
                  el.addEventListener('animationend', function() {
                     el.className = 'card active first';
                  })
               } else {
                  el.classList.add('next');
                  el.classList.add('from-right');
                  el.addEventListener('animationend', function() {
                     el.className = 'card active first';
                     isAnimation = false;
                  })
               }
            } else if(i === secondCurrentItem) {
               if(countCards > 2) {
                  el.classList.add('to-left');
                  el.addEventListener('animationend', function() {
                     el.className = 'card active second';
                  })
               } else {
                  el.classList.add('next');
                  el.classList.add('from-right');
                  el.addEventListener('animationend', function() {
                     el.className = 'card active second';
                     isAnimation = false;
                  })
               }
            } else {
               el.classList.add('next');
               el.classList.add('from-right');
               el.addEventListener('animationend', function() {
                  el.className = 'card active third';
                  isAnimation = false;
               })
            }
         } else {
            el.classList.add('to-left');
            el.addEventListener('animationend', function() {
               el.className = 'card inactive';
            })
         }
      })
   }
});
arrowLeft.addEventListener('click', function() {
   let countCards = document.querySelectorAll('.active').length;
   if(!isAnimation) {
      isAnimation = true;
      let cards = document.querySelectorAll('.card');
      firstCurrentItem = (firstCurrentItem-1 + cards.length) % cards.length;
      secondCurrentItem = (countCards===2 || countCards===3) ? (secondCurrentItem-1 + cards.length) % cards.length : null;
      thirdCurrentItem  = (countCards===3) ? (thirdCurrentItem-1 + cards.length) % cards.length : null;
      cards.forEach((el, i) => {
         if(i === firstCurrentItem || i === secondCurrentItem || i === thirdCurrentItem) {
            if(i === firstCurrentItem) {
               if(countCards > 1) {
                  el.className = 'card active first';
                  el.classList.add('previous');
                  el.classList.add('from-left');
                  el.addEventListener('animationend', function() {
                     el.className = 'card active first';
                  })
               } else {
                  el.classList.add('previous');
                  el.classList.add('from-left');
                  el.addEventListener('animationend', function() {
                     el.className = 'card active first';
                     isAnimation = false;
                  })
               }
               
            } else if(i === secondCurrentItem) {
               if(countCards > 2) {
                  el.classList.add('to-right');
                  el.addEventListener('animationend', function() {
                     el.className = 'card active second';
                  })
               } else {
                  el.classList.add('to-right');
                  el.addEventListener('animationend', function() {
                     el.className = 'card active second';
                     isAnimation = false;
                  })
               }
               
            } else {
               el.classList.add('to-right');
               el.addEventListener('animationend', function() {
                  el.className = 'card active third';
                  isAnimation = false;
               })
            }
         } else {
            el.classList.add('to-right');
            el.addEventListener('animationend', function() {
               el.className = 'card inactive';
            })
         }
      })
   }
   
});