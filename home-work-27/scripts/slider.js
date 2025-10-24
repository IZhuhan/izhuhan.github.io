const slidesContainer = document.querySelector('#slides');
const indicatorsContainer = document.querySelector('#indicators');
const progressBarContainer = document.querySelector('#progress');
const playBtnText = document.querySelector('#playText');

const SLIDER_TICK = 4000;

let currentSlideIndex = 0;
let totalSlides = slidesContainer.querySelectorAll('.slide').length;
let isPlaying = true;
let autoTimer = null;
let progressTimer = null;

let currentDragPosition = 0;
let prevDragPosition = 0;
let dragDistance = 0;
let initialXCoordinate;

const dragStartHandler = (event) => {
  if (event.type === 'touchmove') {
    dragDistance = event.touches[0].clientX - initialXCoordinate;
  } else {
    dragDistance = event.clientX - initialXCoordinate;
  }

  currentDragPosition = dragDistance + prevDragPosition;
};

const dragEndHandler = () => {
  if (currentDragPosition < prevDragPosition) {
    nextSlide();
  } else if (currentDragPosition > prevDragPosition) {
    prevSlide();
  }

  slidesContainer.removeEventListener('mousemove', dragStartHandler);
  slidesContainer.removeEventListener('touchmove', dragStartHandler);
};

const mouseDownHandler = (event) => {
  initialXCoordinate = event.clientX;
  slidesContainer.addEventListener('mousemove', dragStartHandler);

  prevDragPosition += dragDistance;
  slidesContainer.addEventListener('mouseup', dragEndHandler);
};

const touchStartHandler = (event) => {
  initialXCoordinate = event.touches[0].clientX;
  slidesContainer.addEventListener('touchmove', dragStartHandler);

  prevDragPosition += dragDistance;
  slidesContainer.addEventListener('touchend', dragEndHandler);
};

const nextSlide = () => {
  currentSlideIndex++;

  if (currentSlideIndex >= totalSlides) {
    currentSlideIndex = 0;
  }

  updateSlider();
  resetAutoPlay();
};

const prevSlide = () => {
  currentSlideIndex--;

  if (currentSlideIndex < 0) {
    currentSlideIndex = totalSlides - 1;
  }

  updateSlider();
  resetAutoPlay();
};

const goToSlide = (slideIndex) => {
  currentSlideIndex = slideIndex;

  updateSlider();
  resetAutoPlay();
};

const updateSlider = () => {
  const moveDistance = -currentSlideIndex * 100;
  slidesContainer.style.transform = `translateX(${moveDistance}%)`;

  const indicatorsList = indicatorsContainer.querySelectorAll('.indicator');
  indicatorsList.forEach((item, index) => {
    if (index === currentSlideIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  })
};

const togglePlay = () => {
  if (isPlaying) {
    stopAutoPlay();
    isPlaying = false;
    playBtnText.textContent = 'Пуск';
  } else {
    isPlaying = true;
    startAutoPlay();
    playBtnText.textContent = 'Пауза';
  }
};

const startAutoPlay = () => {
  autoTimer = setInterval(() => {
    nextSlide();
  }, SLIDER_TICK);

  startProgressBar();
};

const stopAutoPlay = () => {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }

  stopProgressBar();
};

const resetAutoPlay = () => {
  if (isPlaying) {
    stopAutoPlay();
    startAutoPlay();
  }
};

const startProgressBar = () => {
  let startTime = Date.now();

  const updateProgress = () => {
    if (!isPlaying) return;
    const elapsed = Date.now() - startTime;
    const progressPercent = (elapsed / SLIDER_TICK) * 100;

    if (progressPercent >= 100) {
      progressBarContainer.style.width = '100%';
      setTimeout(() => {
        progressBarContainer.style.width = '0%';
      }, 100)
    } else {
      progressBarContainer.style.width = `${progressPercent}%`;
    }

    progressTimer = requestAnimationFrame(updateProgress);
  };

  updateProgress();
};

const stopProgressBar = () => {
  if (progressTimer) {
    cancelAnimationFrame(progressTimer);
    progressTimer = null;
  }
  progressBarContainer.style.width = '0%';
};

const handleKeyboard = (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      prevSlide();
      break;
    case 'ArrowRight':
      nextSlide();
      break;
    case ' ':
      event.preventDefault();
      togglePlay();
      break;
  }
};

const createIndicators = () => {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.classList.add('indicator');
    dot.onclick = () => goToSlide(i);
    indicatorsContainer.appendChild(dot);
  }
};

const initSlider = () => {
  createIndicators();
  updateSlider();
  startAutoPlay();
  document.addEventListener('keydown', handleKeyboard);

  slidesContainer.addEventListener('mousedown', mouseDownHandler);
  slidesContainer.addEventListener('touchstart', touchStartHandler);
};

document.addEventListener('DOMContentLoaded', initSlider);