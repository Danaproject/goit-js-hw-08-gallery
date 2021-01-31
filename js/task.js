import galleryItems from "./gallery-items.js"

const galleryRef = document.querySelector('.js-gallery');
const largeImageRef = document.querySelector('.lightbox__image');
const lightboxRef = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');

function createGaleryItem(item) {
    const itemRef = document.createElement('li');
    const linkRef = document.createElement('a');
    const imageRef = document.createElement('img');
    itemRef.appendChild(linkRef);
    linkRef.appendChild(imageRef);
    
    itemRef.setAttribute('class', 'gallery__item');
    linkRef.setAttribute('class', 'gallery__link');
    linkRef.setAttribute('href', `${item.original}`);
    imageRef.setAttribute('class', 'gallery__image');
    imageRef.setAttribute('src', `${item.preview}`);
    imageRef.setAttribute('alt', `${item .description}`);
    imageRef.setAttribute('data-source', `${item.original}`);
    return itemRef;
};
const galleryItemsList = galleryItems.map(item => createGaleryItem(item));
galleryRef.append(...galleryItemsList);


galleryRef.addEventListener('click', onGaleryClick);

function onGaleryClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') return;
    
    setLargeImageSrc(event.target.dataset.source);

    openLighbox();

}
function setLargeImageSrc(url) {
    largeImageRef.src = url;
}

function openLighbox() {
    lightboxRef.classList.add('is-open');
}
function closeLightbox() {
    lightboxRef.classList.remove('is-open');
    largeImageRef.src = "";
}

closeModalBtn.addEventListener('click', closeLightbox);
lightboxRef.addEventListener('click', (event) => {
    if(event.target.classList.contains('lightbox__overlay')) closeLightbox();
});
window.addEventListener('keydown', (event) => {
    const currentItemIndex = galleryItems.findIndex((elem) => elem.original === largeImageRef.src)
    const lastItemIndex = Object.keys(galleryItems).length; 
    
    if (event.code === "ArrowRight") {
        if (currentItemIndex === lastItemIndex - 1) {
            setLargeImageSrc(galleryItems[0].original);
        } else {
            setLargeImageSrc(galleryItems[currentItemIndex + 1].original);
        }
    };
    if (event.code === "ArrowLeft") {
        if (currentItemIndex === 0) {
            setLargeImageSrc(galleryItems[lastItemIndex - 1].original);
        } else {
            setLargeImageSrc(galleryItems[currentItemIndex - 1].original);
        }
    };
     if (event.code === "Escape") closeLightbox();
});


