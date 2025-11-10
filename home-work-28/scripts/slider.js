class Slider {
  constructor(container, options = {}) {
    this.sliderContainer = container;
    this.totalSlides = this.sliderContainer.querySelectorAll('.slide').length;

    this.config = {
      autoplay: true,
      duration: 4000,
      indicators: true,
      navButtons: true,
      progressBar: true,
      pausePlayBtn: true,
      controlPanel: true,
      ...this.getDataConfig(),
      ...options
    };

    this.currentSlideIndex = 0;
    this.isPlaying = this.config.autoplay;
    this.isAutoplayOn = this.config.autoplay;
    this.autoTimer = null;
    this.progressTimer = null;

    this.sliderWrapper = this.sliderContainer.querySelector('.slider');
    this.slidesContainer = this.sliderContainer.querySelector('.slides');
    this.indicatorsContainer = this.sliderContainer.querySelector('#indicators');
    this.progressBarContainer = this.sliderContainer.querySelector('.progress');
    this.progressBarWrapper = this.sliderContainer.querySelector('.progress-bar');
    this.playBtnTextContainer = this.sliderContainer.querySelector('.play-pause-btn');
    this.playBtnText = this.sliderContainer.querySelector('#playText');

    this.controlsPanel = this.sliderContainer.querySelector('.controls');
    this.hintContainer = this.sliderContainer.querySelector('.hint');

    this.currentDragPosition = 0;
    this.prevDragPosition = 0;
    this.dragDistance = 0;
    this.initialXCoordinate = 0;

    if (!this.slidesContainer || !this.totalSlides) {
      console.error('No slides');
      return;
    }

    this.init();
  }

  getDataConfig() {
    const config = this.sliderContainer.getAttribute('data-slider-config');
    try {
      return config ? JSON.parse(config) : {};
    } catch(error) {
      console.log('Parse data config error');
      return {};
    }
  }

  init() {
    this.config.navButtons && this.createNavButtons();
    this.config.indicators && this.config.controlPanel && this.createIndicators();

    if (!this.config.progressBar || !this.config.controlPanel) {
      this.progressBarWrapper.style.display = 'none';
    }

    if (!this.config.pausePlayBtn || !this.config.controlPanel) {
      this.playBtnTextContainer.style.display = 'none';
    }

    if (!this.config.controlPanel) {
      this.controlsPanel.style.display = 'none';
      this.hintContainer.style.display = 'none';
    }

    this.bindEvents();
    this.updateSlide();

    if (this.isPlaying) {
      this.startAutoPlay();
    }

    this.updatePlayButton();
  }

  createNavButtons() {
    this.createButton('prev');
    this.createButton('next');
  }

  createButton(direction) {
    const button = document.createElement('button');

    button.classList.add('nav-button', direction);
    button.setAttribute('data-action', direction);
    button.textContent = direction === 'prev' ? '‹' : '›';

    this.sliderWrapper.appendChild(button);
  }

  createIndicators() {
    if (!this.indicatorsContainer) return;

    this.indicatorsContainer.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement('button');
      indicator.classList.add('indicator');
      indicator.setAttribute('data-slide', `${i}`);
      indicator.addEventListener('click', () => this.goToSlide(i));
      this.indicatorsContainer.appendChild(indicator);
    }
  }

  goToSlide(index) {
    this.currentSlideIndex = index;
    this.updateSlide();
    this.resetAutoPlay();
  }

  prevSlide() {
    this.currentSlideIndex = this.currentSlideIndex === 0 ? this.totalSlides - 1 : this.currentSlideIndex - 1;
    this.updateSlide();
    this.resetAutoPlay();
  }

  nextSlide() {
    this.currentSlideIndex = this.currentSlideIndex === this.totalSlides - 1 ? 0 : this.currentSlideIndex + 1;
    this.updateSlide();
    this.resetAutoPlay();
  }

  resetAutoPlay() {
    if (this.isPlaying) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  updatePlayButton() {
    if (this.playBtnTextContainer && this.playBtnText) {
      this.playBtnText.textContent = this.isPlaying ? 'Pause' : 'Play';
    }
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    this.isAutoplayOn = !this.isAutoplayOn;

    if (this.isPlaying) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }

    this.updatePlayButton();
  }

  bindEvents() {
    this.bindContextForDragEvents();
    this.bindClickBtnEvents();
    this.bindSliderHoverEvents();

    this.slidesContainer.addEventListener('mousedown', this.mouseDownHandler);
    this.slidesContainer.addEventListener('touchstart', this.touchStartHandler);

    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          this.prevSlide();
          break;
        case 'ArrowRight':
          this.nextSlide();
          break;
        case ' ':
          event.preventDefault();
          this.togglePlay();
          break;
      }
    });
  }

  bindContextForDragEvents() {
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.touchStartHandler = this.touchStartHandler.bind(this);
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);
  }

  bindSliderHoverEvents() {
    this.slidesContainer.addEventListener('mouseover', () => {
      if (this.isPlaying) {
        this.isPlaying = !this.isPlaying;

        this.stopAutoPlay();
        this.updatePlayButton();
      }
    });

    this.slidesContainer.addEventListener('mouseleave', () => {
      if (this.isAutoplayOn) {
        this.isPlaying = !this.isPlaying;

        this.startAutoPlay();
        this.updatePlayButton();
      }
    });
  }

  bindClickBtnEvents() {
    if (this.config.controlPanel || this.config.navButtons) {
      this.sliderContainer.addEventListener('click', (event) => {
        const action = event.target.getAttribute('data-action');

        switch (action) {
          case 'prev':
            this.prevSlide();
            break;
          case 'next':
            this.nextSlide();
            break;
          case 'toggle':
            this.togglePlay();
            break;
        }
      });
    }
  }

  updateSlide() {
    const translateX = -this.currentSlideIndex * 100;
    this.slidesContainer.style.transform = `translateX(${translateX}%)`;

    if (this.indicatorsContainer) {
      const indicators = this.indicatorsContainer.querySelectorAll('.indicator');
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === this.currentSlideIndex);
      })
    }
  }

  startAutoPlay() {
    if (!this.config.autoplay) return;
    this.autoTimer = setInterval(() => {
      this.nextSlide();
    }, this.config.duration);

    this.startProgressBar();
  }

  stopAutoPlay() {
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
      this.autoTimer = null;
    }

    this.stopProgressBar();
  }

  startProgressBar() {
    if (!this.progressBarContainer) return;

    let startTime = Date.now();
    const updateProgress = () => {
      if (!this.isPlaying || !this.autoTimer) return;

      const elapsed = Date.now() - startTime;
      const progressPercent = (elapsed / this.config.duration) * 100;

      if (progressPercent >= 100) {
        this.progressBarContainer.style.width = '100%';
        setTimeout(() => {
          this.progressBarContainer.style.width = '0%';
          startTime = Date.now();
        }, 100);
      } else {
        this.progressBarContainer.style.width = `${progressPercent}%`;
      }
      this.progressTimer = requestAnimationFrame(updateProgress);
    };

    updateProgress();
  }

  stopProgressBar() {
    if (this.progressTimer) {
      cancelAnimationFrame(this.progressTimer);
      this.progressTimer = null;
    }

    this.progressBarContainer.style.width = '0%';
  }

  dragStartHandler(event)  {
    if (event.type === 'touchmove') {
      this.dragDistance = event.touches[0].clientX - this.initialXCoordinate;
    } else {
      this.dragDistance = event.clientX - this.initialXCoordinate;
    }

    this.currentDragPosition = this.dragDistance + this.prevDragPosition;
  };

  dragEndHandler() {
    if (this.currentDragPosition < this.prevDragPosition) {
      this.nextSlide();
    } else if (this.currentDragPosition > this.prevDragPosition) {
      this.prevSlide();
    }

    this.slidesContainer.removeEventListener('mousemove', this.dragStartHandler);
    this.slidesContainer.removeEventListener('touchmove', this.dragStartHandler);
  };

  mouseDownHandler(event) {
    this.initialXCoordinate = event.clientX;
    this.slidesContainer.addEventListener('mousemove', this.dragStartHandler);

    this.prevDragPosition += this.dragDistance;
    this.slidesContainer.addEventListener('mouseup', this.dragEndHandler);
  };

   touchStartHandler (event) {
     this.initialXCoordinate = event.touches[0].clientX;
     this.slidesContainer.addEventListener('touchmove', this.dragStartHandler);

     this.prevDragPosition += this.dragDistance;
     this.slidesContainer.addEventListener('touchend', this.dragEndHandler);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    new Slider(sliderContainer, {
      indicators: true,
      navButtons: true,
      progressBar: false,
      pausePlayBtn: true,
      controlPanel: true
    });
  }
});