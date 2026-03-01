import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery } from "./js/render-functions";
import { clearGallery } from "./js/render-functions";
import { showLoader } from "./js/render-functions";
import { hideLoader } from "./js/render-functions";
import { hideLoadMoreButton } from "./js/render-functions";
import { showLoadMoreButton } from "./js/render-functions";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more-btn");

let currentQuery = "";
let currentPage = 1;
const PER_PAGE = 15; 

form.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", handleLoadMore);

async function handleSubmit(event) {
    event.preventDefault();
    
    const inputValue = document.querySelector('[name="search-text"]').value.trim();

    if (inputValue === "") {
        iziToast.show({
            message: "You need to type sonething for searching.",
            color: "red",
            position: "topRight"
        });
        return;
    }

    currentQuery = inputValue;
    currentPage = 1;

    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const response = await getImagesByQuery(currentQuery, currentPage);
        hideLoader();

        if (response.hits.length === 0) {
            iziToast.show({
                message: "Sorry, there are no images matching your search query. Please try again!",
                color: 'red',
                position: 'topRight'
            });
            return;
        }
        
        createGallery(response.hits);
        checkEndOfCollection(response.totalHits);
        
    } catch (error) {
        hideLoader();
        iziToast.show({
                message: "Something went wrong. Please try again!",
                color: 'red',
                position: 'topRight'
        });
    }
}

async function handleLoadMore() {
    currentPage += 1;
    showLoader();

    try {
        const response = await getImagesByQuery(currentQuery, currentPage);
        hideLoader();

        smoothScroll();
        createGallery(response.hits);
        checkEndOfCollection(response.totalHits);


    } catch (error) {
        hideLoader();
        iziToast.show({
            message: "Something went wrong. Please try again!",
            color: 'red',
            position: 'topRight'
        });
    }
}

function checkEndOfCollection(totalHits) {
    if (currentPage * PER_PAGE >= totalHits) {
        hideLoadMoreButton();
        iziToast.show({
            message: "We're sorry, but you've reached the end of search results.",
            color: 'red',
            position: 'topRight',
        });
    }
    else {
        showLoadMoreButton();
    }
}

function smoothScroll() {
    const firstCard = document.querySelector(".gallery-item");
    if (!firstCard) {
        return;
    }
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth"
    });
}