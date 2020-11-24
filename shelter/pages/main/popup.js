function showPopup(el) {
   darkLayer.style.display = 'block';
   darkLayer.style.opacity = '0.5';
   const popup = document.createElement("div");
   popup.className = "popup";
   const element = `<div class="popup__img">
                        <img src='${el.img}' id="PopupImg"/>
                     </div>
                     <div class="popup__content">
                        <h3 class="popup__title">${el.name}</h3>
                        <h4 class="popup__subtitle">${el.type} - ${el.breed}</h4>
                        <p class="popup__description">${el.description}</p>
                        <ul class="popup__list">
                           <li>Age: ${el.age}</li>
                           <li>Inoculations: ${el.inoculations}</li>
                           <li>Diseases: ${el.piseases}</li>
                           <li>Parasites: ${el.parasites}</li>
                        </ul>
                     </div>
                     <div class="popup__button">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
                        </svg>
                  </div>`;
   popup.innerHTML = element;
   document.body.appendChild(popup);
   const popupImg = document.getElementById('PopupImg');
   popupImg.onload = popup.classList.add('active');
   const popupButton = popup.querySelector('.popup__button');
   popupButton.addEventListener('click', hidePopup);
}
function hidePopup() {
   let popup = document.querySelector('.popup');
   if(popup) {
      popup.classList.remove('active');
      darkLayer.style.display = 'none';
      darkLayer.style.opacity = '0';
      popup.addEventListener('animationend', () => popup.remove());
   }
}