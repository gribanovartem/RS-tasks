const burger = document.getElementById('burger');
const menu = document.getElementById('Menu');
const firstLink = document.getElementById('FirstLink');
const darkLayer = document.getElementById('DarkLayer');
let burgerIsActive = false;
burger.addEventListener('click', () => {
   if(!burgerIsActive) {
      burger.classList.add('navigation__burger_active');
      burger.style.position = 'fixed';
      burger.style.right = '54px';
      menu.classList.add('navigation__list__mobile_active');
      darkLayer.style.display = 'block';
      darkLayer.style.opacity = '0.5';
      burgerIsActive = true;
   } else {
      burger.classList.remove('navigation__burger_active');
      burger.style.position = 'absolute';
      burger.style.right = '54px';
      menu.classList.remove('navigation__list__mobile_active');
      darkLayer.style.display = 'none';
      darkLayer.style.opacity = '0';
      burgerIsActive = false;
   }
});
firstLink.addEventListener('click', () => {
   burger.classList.remove('navigation__burger_active');
   menu.classList.remove('navigation__list__mobile_active');
   darkLayer.style.display = 'none';
   darkLayer.style.opacity = '0';
   burgerIsActive = false;
});
darkLayer.addEventListener('click', () => {
   burger.classList.remove('navigation__burger_active');
   menu.classList.remove('navigation__list__mobile_active');
   darkLayer.style.display = 'none';
   darkLayer.style.opacity = '0';
   burgerIsActive = false;
});