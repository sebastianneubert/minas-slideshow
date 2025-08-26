class PhotoSlideshow {
    constructor() {
        this.images = [];
        this.currentSlide = 0;
        this.isPlaying = true;
        this.slideInterval = null;
        this.progressInterval = null;
        this.slideSpeed = 4000; // 4 seconds

        this.init();
    }

    async init() {
        try {
            this.loadImages();
            if (this.images.length > 0) {
                this.createSlides();
                this.setupControls();
                this.startSlideshow();
            } else {
                this.showError();
            }
        } catch (error) {
            console.error('Error initializing slideshow:', error);
            this.showError();
        }
    }

    loadImages() {
        // AUTO-GENERATED IMAGE LIST - DO NOT EDIT MANUALLY
        // Use update-slideshow.sh to regenerate this list
        const imageList = [
            { path: 'images/20200215_143329.jpg', name: '20200215_143329.jpg' },
            { path: 'images/20200215_144311.jpg', name: '20200215_144311.jpg' },
            { path: 'images/20200912_161608.jpg', name: '20200912_161608.jpg' },
            { path: 'images/20200913_110918.jpg', name: '20200913_110918.jpg' },
            { path: 'images/20201007_173124.jpg', name: '20201007_173124.jpg' },
            { path: 'images/20201113_163042.jpg', name: '20201113_163042.jpg' },
            { path: 'images/20201113_163639.jpg', name: '20201113_163639.jpg' },
            { path: 'images/20210728_161918.jpg', name: '20210728_161918.jpg' },
            { path: 'images/20210728_162930.jpg', name: '20210728_162930.jpg' },
            { path: 'images/20210802_163501.jpg', name: '20210802_163501.jpg' },
            { path: 'images/20210802_165239.jpg', name: '20210802_165239.jpg' },
            { path: 'images/20210815_175158.jpg', name: '20210815_175158.jpg' },
            { path: 'images/20210920_170341.jpg', name: '20210920_170341.jpg' },
            { path: 'images/20210920_170420.jpg', name: '20210920_170420.jpg' },
            { path: 'images/20210920_171529.jpg', name: '20210920_171529.jpg' },
            { path: 'images/20210920_171531.jpg', name: '20210920_171531.jpg' },
            { path: 'images/20220721_102017.jpg', name: '20220721_102017.jpg' },
            { path: 'images/20220924_104052.jpg', name: '20220924_104052.jpg' },
            { path: 'images/20221008_153224.jpg', name: '20221008_153224.jpg' },
            { path: 'images/20230129_152316.jpg', name: '20230129_152316.jpg' },
            { path: 'images/20230508_125333.jpg', name: '20230508_125333.jpg' },
            { path: 'images/20230530_101035.jpg', name: '20230530_101035.jpg' },
            { path: 'images/20230530_155115.jpg', name: '20230530_155115.jpg' },
            { path: 'images/20230610_120444.jpg', name: '20230610_120444.jpg' },
            { path: 'images/20230613_104556.jpg', name: '20230613_104556.jpg' },
            { path: 'images/20230629_105721.jpg', name: '20230629_105721.jpg' },
            { path: 'images/20230707_191703.jpg', name: '20230707_191703.jpg' },
            { path: 'images/20230817_092318.jpg', name: '20230817_092318.jpg' },
            { path: 'images/20230901_160557.jpg', name: '20230901_160557.jpg' },
            { path: 'images/20230913_141847.jpg', name: '20230913_141847.jpg' },
            { path: 'images/20230916_113059.jpg', name: '20230916_113059.jpg' },
            { path: 'images/20231002_163404.jpg', name: '20231002_163404.jpg' },
            { path: 'images/20231229_111708.jpg', name: '20231229_111708.jpg' },
            { path: 'images/20240307_114944.jpg', name: '20240307_114944.jpg' },
            { path: 'images/20240307_115004.jpg', name: '20240307_115004.jpg' },
            { path: 'images/20240312_143217.jpg', name: '20240312_143217.jpg' },
            { path: 'images/20240424_093354.jpg', name: '20240424_093354.jpg' },
            { path: 'images/20240424_093407.jpg', name: '20240424_093407.jpg' },
            { path: 'images/20240424_093614.jpg', name: '20240424_093614.jpg' },
            { path: 'images/20240424_094802.jpg', name: '20240424_094802.jpg' },
            { path: 'images/20240424_102942.jpg', name: '20240424_102942.jpg' },
            { path: 'images/20240424_103342.jpg', name: '20240424_103342.jpg' },
            { path: 'images/20240424_105916.jpg', name: '20240424_105916.jpg' },
            { path: 'images/20240424_105926.jpg', name: '20240424_105926.jpg' },
            { path: 'images/20240430_145519.jpg', name: '20240430_145519.jpg' },
            { path: 'images/20240511_110442.jpg', name: '20240511_110442.jpg' },
            { path: 'images/20240604_153452.jpg', name: '20240604_153452.jpg' },
            { path: 'images/20240604_161930.jpg', name: '20240604_161930.jpg' },
            { path: 'images/20240604_161938.jpg', name: '20240604_161938.jpg' },
            { path: 'images/20240619_120713.jpg', name: '20240619_120713.jpg' },
            { path: 'images/20240701_121552.jpg', name: '20240701_121552.jpg' },
            { path: 'images/20240701_121603.jpg', name: '20240701_121603.jpg' },
            { path: 'images/20240701_123050.jpg', name: '20240701_123050.jpg' },
            { path: 'images/20240701_123051.jpg', name: '20240701_123051.jpg' },
            { path: 'images/20240704_132229.jpg', name: '20240704_132229.jpg' },
            { path: 'images/20240708_100635.jpg', name: '20240708_100635.jpg' },
            { path: 'images/20240723_125350.jpg', name: '20240723_125350.jpg' },
            { path: 'images/20240723_130749.jpg', name: '20240723_130749.jpg' },
            { path: 'images/20240725_170142.jpg', name: '20240725_170142.jpg' },
            { path: 'images/20240821_145120.jpg', name: '20240821_145120.jpg' },
            { path: 'images/20240821_152808.jpg', name: '20240821_152808.jpg' },
            { path: 'images/20240830_143456.jpg', name: '20240830_143456.jpg' },
            { path: 'images/20240830_144138.jpg', name: '20240830_144138.jpg' },
            { path: 'images/20240830_150300.jpg', name: '20240830_150300.jpg' },
            { path: 'images/20240901_160148.jpg', name: '20240901_160148.jpg' },
            { path: 'images/20241027_164528.jpg', name: '20241027_164528.jpg' },
            { path: 'images/20241213_141725.jpg', name: '20241213_141725.jpg' },
            { path: 'images/20250105_163345.jpg', name: '20250105_163345.jpg' },
            { path: 'images/20250105_165226.jpg', name: '20250105_165226.jpg' },
            { path: 'images/20250115_110540.jpg', name: '20250115_110540.jpg' },
            { path: 'images/20250117_181018.jpg', name: '20250117_181018.jpg' },
            { path: 'images/20250303_111603.jpg', name: '20250303_111603.jpg' },
            { path: 'images/20250304_121341.jpg', name: '20250304_121341.jpg' },
            { path: 'images/20250304_130728.jpg', name: '20250304_130728.jpg' },
            { path: 'images/20250317_113323.jpg', name: '20250317_113323.jpg' },
            { path: 'images/20250323_123305.jpg', name: '20250323_123305.jpg' },
            { path: 'images/20250323_123311.jpg', name: '20250323_123311.jpg' },
            { path: 'images/20250401_143715.jpg', name: '20250401_143715.jpg' },
            { path: 'images/20250416_150207.jpg', name: '20250416_150207.jpg' },
            { path: 'images/20250529_120147(0).jpg', name: '20250529_120147(0).jpg' },
            { path: 'images/20250529_122003.jpg', name: '20250529_122003.jpg' },
            { path: 'images/20250529_124456 (1).jpg', name: '20250529_124456 (1).jpg' },
            { path: 'images/20250601_135828.jpg', name: '20250601_135828.jpg' },
            { path: 'images/20250611_103409.jpg', name: '20250611_103409.jpg' },
            { path: 'images/20250611_103439.jpg', name: '20250611_103439.jpg' },
            { path: 'images/20250611_112916.jpg', name: '20250611_112916.jpg' },
            { path: 'images/20250719_133149.jpg', name: '20250719_133149.jpg' },
            { path: 'images/20250719_133231.jpg', name: '20250719_133231.jpg' },
            { path: 'images/20250722_102722.jpg', name: '20250722_102722.jpg' },
            { path: 'images/20250722_111240.jpg', name: '20250722_111240.jpg' },
            { path: 'images/IMG-20200215-WA0029.jpg', name: 'IMG-20200215-WA0029.jpg' },
            { path: 'images/IMG-20210705-WA0006.jpg', name: 'IMG-20210705-WA0006.jpg' },
            { path: 'images/IMG-20210729-WA0001.jpg', name: 'IMG-20210729-WA0001.jpg' },
            { path: 'images/IMG-20210807-WA0010.jpg', name: 'IMG-20210807-WA0010.jpg' },
            { path: 'images/IMG-20210807-WA0022.jpg', name: 'IMG-20210807-WA0022.jpg' },
            { path: 'images/IMG-20210808-WA0005.jpg', name: 'IMG-20210808-WA0005.jpg' },
            { path: 'images/IMG-20220507-WA0003.jpg', name: 'IMG-20220507-WA0003.jpg' },
            { path: 'images/IMG-20230908-WA0008.jpg', name: 'IMG-20230908-WA0008.jpg' },
            { path: 'images/IMG-20231002-WA0004.jpg', name: 'IMG-20231002-WA0004.jpg' },
            { path: 'images/IMG-20241105-WA0002.jpg', name: 'IMG-20241105-WA0002.jpg' },
            { path: 'images/IMG-20241215-WA0014.jpg', name: 'IMG-20241215-WA0014.jpg' },
            { path: 'images/IMG-20241215-WA0016.jpg', name: 'IMG-20241215-WA0016.jpg' },
            { path: 'images/IMG-20241215-WA0017.jpg', name: 'IMG-20241215-WA0017.jpg' },
            { path: 'images/VideoCapture_20220927-193057.jpg', name: 'VideoCapture_20220927-193057.jpg' },
            { path: 'images/VideoCapture_20230524-195953.jpg', name: 'VideoCapture_20230524-195953.jpg' },
            { path: 'images/VideoCapture_20240606-220121.jpg', name: 'VideoCapture_20240606-220121.jpg' },
            { path: 'images/VideoCapture_20240606-220344.jpg', name: 'VideoCapture_20240606-220344.jpg' },
            { path: 'images/VideoCapture_20250304-202144.jpg', name: 'VideoCapture_20250304-202144.jpg' },
            { path: 'images/VideoCapture_20250530-140715.jpg', name: 'VideoCapture_20250530-140715.jpg' },
            { path: 'images/VideoCapture_20250811-092154.jpg', name: 'VideoCapture_20250811-092154.jpg' },
            { path: 'images/VideoCapture_20250811-095921.jpg', name: 'VideoCapture_20250811-095921.jpg' },
            { path: 'images/VideoCapture_20250811-100009.jpg', name: 'VideoCapture_20250811-100009.jpg' },
            { path: 'images/WhatsApp Image 2025-08-17 at 09.18.29.jpeg', name: 'WhatsApp Image 2025-08-17 at 09.18.29.jpeg' }
        ];

        console.log(`Loaded ${imageList.length} images from predefined list`);
        this.images = imageList;
    }

    createSlides() {
        const container = document.getElementById('slides-container');
        const dotsContainer = document.getElementById('dotsContainer');

        this.images.forEach((imageObj, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;

            const img = document.createElement('img');
            img.src = imageObj.path;
            img.alt = imageObj.name;
            img.loading = index < 3 ? 'eager' : 'lazy';

            // Add error handling for broken images
            img.onerror = () => {
                console.warn(`Failed to load image: ${imageObj.path}`);
                slide.style.display = 'none';
            };

            const counter = document.createElement('div');
            counter.className = 'slide-counter';
            counter.textContent = `${index + 1} / ${this.images.length}`;

            const filename = document.createElement('div');
            filename.className = 'slide-filename';
            filename.textContent = imageObj.name;

            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.style.width = '0%';

            slide.appendChild(img);
            slide.appendChild(counter);
            slide.appendChild(filename);
            slide.appendChild(progressBar);
            container.appendChild(slide);

            // Create dot
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.title = imageObj.name;
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        document.getElementById('loading').style.display = 'none';
        document.getElementById('controls').style.display = 'flex';
        document.getElementById('dotsContainer').style.display = 'flex';
    }

    setupControls() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const playPauseBtn = document.getElementById('playPauseBtn');

        prevBtn.addEventListener('click', () => this.previousSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());
        playPauseBtn.addEventListener('click', () => this.togglePlayPause());

        // Touch/swipe support
        let startX = null;
        let startY = null;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;

            const diffX = startX - endX;
            const diffY = startY - endY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }

            startX = null;
            startY = null;
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    this.nextSlide();
                    break;
                case ' ':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
                case 'Home':
                    this.goToSlide(0);
                    break;
                case 'End':
                    this.goToSlide(this.images.length - 1);
                    break;
            }
        });
    }

    showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (slides[index]) {
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            this.currentSlide = index;

            this.resetProgressBar();
        }
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.images.length;
        this.showSlide(next);
    }

    previousSlide() {
        const prev = (this.currentSlide - 1 + this.images.length) % this.images.length;
        this.showSlide(prev);
    }

    goToSlide(index) {
        this.showSlide(index);
    }

    updateProgressBar() {
        const activeSlide = document.querySelector('.slide.active .progress-bar');
        if (activeSlide && this.isPlaying) {
            const width = (Date.now() - this.slideStartTime) / this.slideSpeed * 100;
            activeSlide.style.width = Math.min(width, 100) + '%';
        }
    }

    resetProgressBar() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => bar.style.width = '0%');
        this.slideStartTime = Date.now();
    }

    startSlideshow() {
        if (this.isPlaying && this.images.length > 1) {
            this.slideStartTime = Date.now();

            this.slideInterval = setInterval(() => {
                this.nextSlide();
            }, this.slideSpeed);

            this.progressInterval = setInterval(() => {
                this.updateProgressBar();
            }, 50);
        }
    }

    stopSlideshow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }

        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => bar.style.width = '0%');
    }

    togglePlayPause() {
        const btn = document.getElementById('playPauseBtn');
        if (this.isPlaying) {
            this.stopSlideshow();
            btn.textContent = '▶';
            this.isPlaying = false;
        } else {
            this.startSlideshow();
            btn.textContent = '⏸';
            this.isPlaying = true;
        }
    }

    showError() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
    }
}

// Start the slideshow when the page loads
window.addEventListener('load', () => {
    new PhotoSlideshow();
});
