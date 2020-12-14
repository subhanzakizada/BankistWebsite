'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.getElementById('section--1')
const btnLearnMore = document.querySelector('.btn--scroll-to')
const tabs = document.querySelectorAll('.operations__tab')  // nodes, "instant transfers" , "instant loans" and "instant closing" buttons
const tabsContainer = document.querySelector('.operations__tab-container')
const operationsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')
const header = document.querySelector('.header')
const allSections = document.querySelectorAll('.section')

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

// smooth scroll when clicking on, "Features" , "Operations" and "Testimonials"
document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault()
    if(e.target.classList.contains('nav__link')) {
        // section we want to scroll to
        const section = e.target.getAttribute('href')
        // scrolling logic
        document.querySelector(section).scrollIntoView({behavior: 'smooth'})
    }
})

// adding functionality to tabs
tabsContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.operations__tab')
    if(!clicked) return
    // updating the active class for tabs
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'))
    clicked.classList.add('operations__tab--active')
 
    // updating the operation text content
    operationsContent.forEach(operation => operation.classList.remove('operations__content--active'))
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// adding hover mouse functionality
const handlerHover = function(e) {
    if(e.target.classList.contains('nav__link')){
        const link = e.target
        const siblings = link.closest('.nav').querySelectorAll('.nav__link')
        const logo = nav.querySelector('img')
        siblings.forEach(sibling => sibling !== link ? sibling.style.opacity = this : undefined)
        logo.style.opacity = this
    } 
}

nav.addEventListener('mouseover', handlerHover.bind(0.5))
nav.addEventListener('mouseout', handlerHover.bind(1))

// Adding a Sticky Navigation Bar 
// navigation height to use for exact moment to show the navigation bar
const navHeight = nav.getBoundingClientRect().height

// call back for the observer
const observerCB = entries => {
    const entry = entries[0] // we need [0] because "isIntersecting" is in it
    if(entry.isIntersecting) nav.classList.remove('sticky')
    else nav.classList.add('sticky')
}

// options to use in observer
const observerHeaderOptions = {
    root: null,
    threshold: 0,
    rootMargin: `${navHeight}px`
}

// header observer
const observerHeader = new IntersectionObserver(observerCB, observerHeaderOptions)
observerHeader.observe(header)

// Revealing the Section Info when scrolling
// call back for observer
const sectionObserverCB = (entries, observer) => {
    const entry = entries[0]
    if(!entry.isIntersecting) return
    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
}

// options
const observerSectionsOptions = {
    root: null,
    threshold: 0.15
}

// observer
const sectionObserver = new IntersectionObserver(sectionObserverCB, observerSectionsOptions)

allSections.forEach(section => {
    sectionObserver.observe(section)
    section.classList.add('section--hidden')
    })