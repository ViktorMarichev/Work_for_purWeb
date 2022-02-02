let animItems = document.querySelectorAll('._anim-items');
function offset(el) {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

if (animItems.length > 0) {
  const animOnScroll = () => {
    for (let index = 0; index < animItems.length; index += 1) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add('_active');
      } else {
        animItem.classList.remove('_active');
      }
    }
  };

  window.addEventListener('scroll', animOnScroll);
}
document.querySelector('.cookie-hint__button').onclick = () => {
  const { filter } = Array.prototype;
  const cookieHint = document.querySelector('.cookie-hint');
  cookieHint.classList.remove('_active');
  cookieHint.classList.remove('_anim-items');
  animItems = filter.call(animItems, (elem) => elem !== cookieHint);
};
