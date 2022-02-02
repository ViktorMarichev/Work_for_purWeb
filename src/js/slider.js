const slides = document.querySelectorAll('.slider-item');
const sliderTrack = document.querySelector('.slider-track');
const slidePages = document.querySelector('.slide-pages');
const btnPrev = document.querySelector('.left-arrow');
const btnNext = document.querySelector('.right-arrow');
const copyItemRight = document.createElement('div');
const copyItemLeft = document.createElement('div');
const speedAnimation = 10;
let isAnimated = false;
copyItemLeft.classList.add('slider-item__copy');
copyItemRight.classList.add('slider-item__copy');
copyItemLeft.innerHTML = slides[slides.length - 1].innerHTML;
copyItemRight.innerHTML = slides[0].innerHTML;

const pages = [];

let width = 0;
let page = 0;

const init = () => {
  width = document.querySelector('.slider-container').offsetWidth;

  copyItemLeft.style.left = `${-width}px`;
  copyItemLeft.style.width = `${width}px`;

  copyItemRight.style.width = `${width}px`;
  copyItemRight.style.right = `${-width}px`;

  sliderTrack.prepend(copyItemLeft);
  sliderTrack.append(copyItemRight);

  sliderTrack.style.width = `${width * slides.length}px`;

  for (let i = 0; i < slides.length; i += 1) {
    slides[i].style.width = `${width}px`;
    slides[i].style.height = 'auto';
  }
  sliderTrack.style.left = `${-width * page}px`;
};

function moveRight(currentPage) {
  isAnimated = true;
  let difference = Math.abs(currentPage - page);
  if (page === slides.length - 1) {
    difference = 1;
  }
  const widthCount = -width * page;
  let progress = width;
  let counter = 0;
  const slideInterval = setInterval(() => {
    let left = Number(sliderTrack.style.left.slice(0, -2));
    left += 15;
    progress -= 15;
    sliderTrack.style.left = `${left}px`;
    if (progress <= 0) {
      counter += 1;
      progress = width;
    }
    if (difference === counter) {
      window.clearInterval(slideInterval);
      sliderTrack.style.left = `${widthCount}px`;
      isAnimated = false;
    }
  }, speedAnimation);
}
function moveLeft(currentPage) {
  isAnimated = true;
  let difference = Math.abs(currentPage - page);
  if (page === 0) {
    difference = 1;
  }
  const widthCount = -width * page;
  let progress = width;
  let counter = 0;
  const slideInterval = setInterval(() => {
    let left = Number(sliderTrack.style.left.slice(0, -2));
    left -= 15;
    progress -= 15;

    sliderTrack.style.left = `${left}px`;
    if (progress <= 0) {
      counter += 1;
      progress = width;
    }
    if (difference === counter) {
      window.clearInterval(slideInterval);
      sliderTrack.style.left = `${widthCount}px`;
      isAnimated = false;
    }
    /* console.log(sliderTrack.style.left); */
  }, speedAnimation);
}

function setActivePage(id) {
  document
    .querySelector('.page-label-active')
    .classList.remove('page-label-active');
  document.getElementById(id).classList.add('page-label-active');
}

function slidePage(event) {
  const { id } = event.target;
  const clickedPage = id.slice(5);
  const currentPage = page;

  if (clickedPage > page) {
    page = clickedPage;
    moveLeft(currentPage);
  } else {
    page = clickedPage;
    moveRight(currentPage);
  }

  setActivePage(id);
}
const computePages = () => {
  slidePages.innerHTML = '';
  slides.forEach((element, index) => {
    if (index === page) {
      slidePages.innerHTML += `<label id='page_${index}' class='page-label page-label-active'></label>`;
    } else {
      slidePages.innerHTML += `<label id='page_${index}' class='page-label'></label>`;
    }
  });
  document.querySelectorAll('.page-label').forEach((elem) => {
    elem.addEventListener('click', (event) => {
      if (!isAnimated) slidePage(event);
    });
    pages.push(elem);
  });
};

btnPrev.addEventListener('click', () => {
  if (isAnimated === false) {
    const currentPage = page;
    page -= 1;
    if (page < 0) {
      page = slides.length - 1;
    }
    setActivePage(`page_${page}`);
    moveRight(currentPage);
  }
});

btnNext.addEventListener('click', () => {
  if (isAnimated === false) {
    const currentPage = page;

    page += 1;
    if (page >= slides.length) {
      page = 0;
    }

    setActivePage(`page_${page}`);
    moveLeft(currentPage);
  }
});

window.addEventListener('resize', init);
init();
computePages();
