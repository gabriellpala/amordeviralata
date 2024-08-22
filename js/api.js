document.addEventListener('DOMContentLoaded', async function () {
    const host = 'http://localhost/admin';
    const apiURL = `${host}/api/carousel.php`;

    let imagesSaved = [];

    async function loadImages() {
        try {
            const response = await fetch(apiURL);
            imagesSaved = await response.json();
        } catch (error) {
            console.error('Erro ao carregar as imagens:', error);
        }
    }

    function calculateItemsPerSlide() {
        return window.innerWidth < 576 ? 1 : window.innerWidth < 768 ? 2 : 3;
    }

    function buildCarousel() {
        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.innerHTML = '';

        const itemsPerSlide = calculateItemsPerSlide();

        // Agrupando imagens em slides
        imagesSaved.forEach((image, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active'); // Primeiro slide como ativo
            }

            const row = document.createElement('div');
            row.classList.add('row');

            for (let j = 0; j < itemsPerSlide; j++) {

                const col = document.createElement('div');
                col.classList.add('col-md-4', 'col-sm-6', 'col-12');
                col.style = "position: relative; padding: 0px 10px;";

                const imgIndex = (index + j) % imagesSaved.length;
                const img = document.createElement('img');

                const title = document.createElement('h5');
                title.style = `
                margin: 0;
                text-align: center;
                color: white;
                background-color: rgba(0, 0, 0, 0.5);
                padding: 10px;
                position: relative;     
                margin-top: -40px; /* Margem negativa para sobrepor a imagem */
            `;
                img.classList.add('d-block', 'w-100', 'img-fluid');
                img.src = `${host}/${imagesSaved[imgIndex].src}`;
                img.alt = imagesSaved[imgIndex].alt;
                title.innerHTML = imagesSaved[imgIndex].alt;

                col.appendChild(img);
                col.appendChild(title);
                row.appendChild(col);
            }

            carouselItem.appendChild(row);
            carouselInner.appendChild(carouselItem);
        })
    }

    await loadImages();
    buildCarousel();

    window.addEventListener('resize', buildCarousel);
});
