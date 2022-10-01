const menuTriggers = document.querySelectorAll('.menu-trigger');
[...menuTriggers].map((trigger) => {
  trigger.addEventListener('click', ({ target }) => {
    const menuWrapper = target.closest('.menu-wrapper');
    menuWrapper.classList.toggle('expanded');
  });
});