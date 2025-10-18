class ImageAutoSlider {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            images: [
                "carro-veiculo-vermelho.jpg",
                "carro-veiculo-vermelho.jpg",
                "carro-veiculo-vermelho.jpg",
                "carro-veiculo-vermelho.jpg",
                "carro-veiculo-vermelho.jpg",
                "carro-veiculo-vermelho.jpg",
                "carro-veiculo-vermelho.jpg",
                "carro-veiculo-vermelho.jpg"
            ],
            speed: 40, // seconds for one complete loop
            ...options
        };

        this.init();
    }

    init() {
        this.createSlider();
    }

    createSlider() {
        const scrollContainer = this.container.querySelector('.infinite-scroll');
        const duplicatedImages = [...this.options.images, ...this.options.images];

        // Set animation duration
        scrollContainer.style.animationDuration = `${this.options.speed}s`;

        // Create image elements
        duplicatedImages.forEach((image, index) => {
            const imageItem = document.createElement('div');
            imageItem.className = `
    image-item flex-shrink-0 
    w-72 h-92     /* 📱 mobile: um pouco maior que 48 */
    sm:w-64 sm:h-64  /* 📱 tablets pequenos */
    md:w-72 md:h-72  /* 💻 tablets grandes */
    lg:w-80 lg:h-80  /* 🖥️ desktop */
    rounded-xl overflow-hidden shadow-2xl cursor-pointer
`.replace(/\s+/g, ' ');


            const img = document.createElement('img');
            img.src = image;
            img.alt = `Gallery image ${(index % this.options.images.length) + 1}`;
            img.className = 'w-full h-full object-cover';
            img.loading = 'lazy';

            imageItem.appendChild(img);
            scrollContainer.appendChild(imageItem);
        });
    }


    // Method to update images
    updateImages(newImages) {
        this.options.images = newImages;
        const scrollContainer = this.container.querySelector('.infinite-scroll');
        scrollContainer.innerHTML = '';
        this.createSlider();
    }

    // Method to change speed
    setSpeed(newSpeed) {
        this.options.speed = newSpeed;
        const scrollContainer = this.container.querySelector('.infinite-scroll');
        scrollContainer.style.animationDuration = `${newSpeed}s`;
    }
}

// Initialize the slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.pause-animation').parentElement;
    const slider = new ImageAutoSlider(sliderContainer, {
        speed: 25, // Adjust speed as needed
        images: [
            "carro-veiculo-vermelho.jpg",
            "carro-veiculo-vermelho.jpg",
            "carro-veiculo-vermelho.jpg",
            "carro-veiculo-vermelho.jpg",
            "carro-veiculo-vermelho.jpg",
            "carro-veiculo-vermelho.jpg",
            "carro-veiculo-vermelho.jpg",
            "carro-veiculo-vermelho.jpg"
        ]
    });

    // Example of how to use the API methods:
    // slider.setSpeed(20); // Change speed to 20 seconds
    // slider.updateImages([...newImagesArray]); // Update images
});