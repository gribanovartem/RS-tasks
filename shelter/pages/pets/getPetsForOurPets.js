let countPets;
let currentPage = 1;
let paginationCount;
let petsArr;
function getCountPets() {
   let deviceWidth = window.innerWidth;
   if(!countPets) {
      if(deviceWidth>=1280) {
         countPets = 8;
      } else if (deviceWidth>=768 && deviceWidth<1280) {
         countPets = 6;
      } else {
         countPets = 3;
      }
   } else {
      
      if(deviceWidth>=1280) {
         if(countPets !== 8) {
            countPets = 8;
            paginationCount = 6;
            createCards(petsArr, currentPage)
         }
         
      } else if (deviceWidth>=768 && deviceWidth<1280) {
         if(countPets !== 6) {
            countPets = 6;
            paginationCount = 8;
            createCards(petsArr, currentPage)
         }
      } else {
         if(countPets !== 3) {
            countPets = 3;
            paginationCount = 16;
            createCards(petsArr, currentPage)
         }
      }
   }
}
document.addEventListener("DOMContentLoaded", getCountPets);
window.addEventListener('resize', getCountPets, false);

async function getPets() {
   const response = await fetch('../../assets/pets.json');
   const pets = await response.json();
   let newPets = [];
   for(let i=0; i<6; i++) {
      let tempArr = [...pets];
      for(let j=pets.length; j>0; j--) {
         let randIndex = Math.floor(Math.random() * j);
         const randElement = tempArr.splice(randIndex, 1)[0]
         tempArr.push(randElement);
      }
      newPets = [...newPets, ...tempArr]
   }
   paginationCount = newPets.length / countPets;
   petsArr = [...newPets];
   createCards(newPets, 1);

   const nextPage = document.querySelector('.next-page');
   nextPage.addEventListener('click', () => createCards(newPets, currentPage + 1));

   const prevPage = document.querySelector('.prev-page');
   prevPage.addEventListener('click', () => createCards(newPets, currentPage - 1));

   const lastPage = document.querySelector('.last-page');
   lastPage.addEventListener('click', () => createCards(newPets, paginationCount))

   const firstPage = document.querySelector('.first-page');
   firstPage.addEventListener('click', () => createCards(newPets, 1))
}
getPets();

function createCards(arr, page) {
   if(page > paginationCount || page < 1) {
      return;
   }
   currentPage = page;
   const oldCards = document.querySelectorAll('.card');
   if(oldCards.length !== 0) {
      for(let i = 0; i < oldCards.length; i++) {
         oldCards[i].remove();
      }
      document.querySelector('.pagination_active').remove();
   }
   const petsCards = document.querySelector('.pets__cards');
   for(let i = 0; i < countPets; i++) {
      let el = (page===1) ? arr[i] : arr[i + ((page-1) * countPets)];
      const card = document.createElement("div");
      card.className = "card";
      let cardInner = `<img class="card__image" src=${el.img} alt=${el.name}>
                        <div class="card__title">${el.name}</div>
                        <button class="btn btn-bordered card__btn">Learn more</button>`
      card.innerHTML = cardInner;
      petsCards.appendChild(card);
      card.onclick = () => showPopup(el);
   }
   const paginationDiv = document.querySelector('.pagination');
   const pagination = document.createElement("div");
   pagination.className = "arrow pagination_active";
   pagination.textContent = page;
   paginationDiv.appendChild(pagination);

   if(page === paginationCount) {
      const arrowRight = document.querySelectorAll('.arrow-right'); 
      arrowRight.forEach((item) => {
         item.classList.add('arrow_disabled')
         item.setAttribute('disabled', 'disabled');
         const path = item.querySelector('path');
         path.setAttribute('fill', '#CDCDCD');
      });
   } else {
      const arrowRight = document.querySelectorAll('.arrow-right'); 
      arrowRight.forEach((item) => {
         item.classList.remove('arrow_disabled')
         item.removeAttribute('disabled');
         const path = item.querySelector('path');
         path.setAttribute('fill', '#292929');
      });
   }
   if(page === 1) {
      const arrowLeft = document.querySelectorAll('.arrow-left'); 
      arrowLeft.forEach((item) => {
         item.classList.add('arrow_disabled')
         item.setAttribute('disabled', 'disabled');
         const path = item.querySelector('path');
         path.setAttribute('fill', '#CDCDCD');
      });
   } else {
      const arrowLeft = document.querySelectorAll('.arrow-left'); 
      arrowLeft.forEach((item) => {
         item.classList.remove('arrow_disabled')
         item.removeAttribute('disabled');
         const path = item.querySelector('path');
         path.setAttribute('fill', '#292929');
      });
   }
}