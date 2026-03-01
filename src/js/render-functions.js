import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader-wrapper");
const loadMoreBtn = document.querySelector(".load-more-btn");
const SLbGallery = new SimpleLightbox(".gallery a");


export function createGallery(images) {
    const markup = images.map((image) =>
        `<li class="gallery-item">
    <a href="${image.largeImageURL}">
    <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" title=""></a>
    <ul class="info">
    <li class="info-item">likes: ${image.likes}</li>
    <li class="info-item">views: ${image.views}</li>
    <li class="info-item">comments: ${image.comments}</li>
    <li class="info-item">downloads: ${image.downloads}</li>
    </ul>
    
</li>`
    ).join("");

    gallery.insertAdjacentHTML('beforeend', markup);
    SLbGallery.refresh();
}

export function clearGallery() {
    gallery.innerHTML = "";
}

export function showLoader() {
    loader.classList.add("active");
}

export function hideLoader() {
    loader.classList.remove("active");
}

export function showLoadMoreButton() {
    loadMoreBtn.classList.add("visible");
}

export function hideLoadMoreButton() {
    loadMoreBtn.classList.remove("visible");
}