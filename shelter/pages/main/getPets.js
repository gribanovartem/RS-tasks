let countPets;
function getCountPets() {
   let deviceWidth = window.innerWidth;
   if(!countPets) {
      if(deviceWidth>=1280) {
         countPets = 3;
      } else if (deviceWidth>=768 && deviceWidth<1280) {
         countPets = 2;
      } else {
         countPets = 1;
      }
   } else {
      
      if(deviceWidth>=1280) {
         if(countPets !== 3) {
            const cards = document.querySelectorAll('.card');
            cards.forEach(el => {
               el.remove();
            });
            countPets = 3;
            getPets();
            firstCurrentItem = 0;
            secondCurrentItem = 1;
            thirdCurrentItem = 2;
         }
         
      } else if (deviceWidth>=768 && deviceWidth<1280) {
         if(countPets !== 2) {
            const cards = document.querySelectorAll('.card');
            cards.forEach(el => {
               el.remove();
            });
            countPets = 2;
            getPets();
            firstCurrentItem = 0;
            secondCurrentItem = 1;
            thirdCurrentItem = 2;
         }
      } else {
         if(countPets !== 1) {
            const cards = document.querySelectorAll('.card');
            cards.forEach(el => {
               el.remove();
            });
            countPets = 1;
            getPets();
            firstCurrentItem = 0;
            secondCurrentItem = 1;
            thirdCurrentItem = 2;
         }
      }
   }
}
document.addEventListener("DOMContentLoaded", getCountPets);
window.addEventListener(`resize`, getCountPets, false);

async function getPets() {
   const response = await fetch('../../assets/pets.json');
   const pets = await response.json();
   const carousel = document.querySelector('.carousel');
   pets.forEach((element, i) => {
      if(i<countPets) {
         let card = document.createElement('div');
         card.className = 'card active';
         const el = `<div class="image__wrapper">
                           <img class="card__image" src=${element.img} alt=${element.name}>
                        </div>
                        <div class="card__title">${element.name}</div>
                        <button class="btn btn-bordered card__btn">Learn more</button>`;
         card.innerHTML = el;
         carousel.appendChild(card);
      } else {
         let card = document.createElement('div');
         card.className = 'card inactive';
         const el = `<div class="image__wrapper">
                           <img class="card__image" src=${element.img} alt=${element.name}>
                        </div>
                        <div class="card__title">${element.name}</div>
                        <button class="btn btn-bordered card__btn">Learn more</button>`;
         card.innerHTML = el;
         carousel.appendChild(card);
      }
   });
}
getPets();




