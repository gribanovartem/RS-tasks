const burger = document.getElementById('burger');
const menu = document.getElementById('Menu');
const darkLayer = document.getElementById('DarkLayer');
const secondLink = document.getElementById('SecondLink');
let burgerIsActive = false;
burger.addEventListener('click', () => {
   if(!burgerIsActive) {
      burger.classList.add('navigation__burger_active');
      menu.classList.add('navigation__list__mobile_active');
      darkLayer.style.opacity = '0.5';
      burgerIsActive = true;
   } else {
      burger.classList.remove('navigation__burger_active');
      menu.classList.remove('navigation__list__mobile_active');
      darkLayer.style.opacity = '0';
      burgerIsActive = false;
   }
});
darkLayer.addEventListener('click', () => {
   burger.classList.remove('navigation__burger_active');
   menu.classList.remove('navigation__list__mobile_active');
   darkLayer.style.opacity = '0';
   burgerIsActive = false;
});
secondLink.addEventListener('click', () => {
   burger.classList.remove('navigation__burger_active');
   menu.classList.remove('navigation__list__mobile_active');
   darkLayer.style.opacity = '0';
   burgerIsActive = false;
});