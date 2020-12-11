'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.getElementById('section--1')
const btnLearnMore = document.querySelector('.btn--scroll-to')

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// using loop because there is 2 of "open account" button
btnsOpenModal.forEach(i => i.addEventListener('click', function(e) {
    openModal()    
}))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// scrolling smoothly when click on, "Learn more ↓"
btnLearnMore.addEventListener('click', () => {
    section1.scrollIntoView({behavior: 'smooth'})
})

// smooth scroll when clicking on, "Features" , "Operations" , "Testimonials"
document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault()
    if(e.target.classList.contains('nav__link')) {
        // section we want to scroll to
        const section = e.target.getAttribute('href')
        // scrolling logic
        document.querySelector(section).scrollIntoView({behavior: 'smooth'})
    }
})