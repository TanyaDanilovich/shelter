//document.addEventListener('DOMContentLoaded', function () {}


/* //GET JSON DATA */
const PETS = [];

fetch('../js/pets.json')
	.then(
		function (response) {
			// Examine the text in the response  
			response.json().then(function (data) {
				data.forEach((el) => { PETS.push(el); })
			});
		}
	)
	.catch(function (err) {
		console.log('Fetch Error :-S', err);
	});

//console.log(PETS);

//*********************************************************************** */

/* //SLIDER */
let order = [4, 7, 3];
console.log(order);
const BTN_LEFT = document.querySelector('#button-arrow-left');
//console.log(BTN_LEFT);
const BTN_RIGHT = document.querySelector('#button-arrow-right');
const SLIDER = document.querySelector('#slider__container');
const SCREEN_LEFT = document.querySelector('#slider-screen-left');
const SCREEN_RIGHT = document.querySelector('#slider-screen-right');

const moveLeft = () => {
	SLIDER.classList.add('transition-left');
	BTN_LEFT.removeEventListener('click', moveLeft)
	BTN_RIGHT.removeEventListener('click', moveRight)
}

const moveRight = () => {
	SLIDER.classList.add('transition-right');
	BTN_LEFT.removeEventListener('click', moveLeft)
	BTN_RIGHT.removeEventListener('click', moveRight)
}

BTN_LEFT.addEventListener('click', moveLeft)
BTN_RIGHT.addEventListener('click', moveRight)

SLIDER.addEventListener('animationend', (animationEvent) => {
	SLIDER.classList.remove('transition-right')
	SLIDER.classList.remove('transition-left')

	BTN_LEFT.addEventListener('click', moveLeft)
	BTN_RIGHT.addEventListener('click', moveRight)

	let changedScreen;
	if (animationEvent.animationName === 'move-left') {
		changedScreen = SCREEN_LEFT;

	} else {
		changedScreen = SCREEN_RIGHT;
	}

	document.querySelector('#slider-screen-active').innerHTML = changedScreen.innerHTML
	changedScreen.innerHTML = '';
	//console.log(order);
	order = getNewOrder(order)
	console.log(order);
	for (let i = 0; i < 3; i++) {
		const newCard = createCardTemplate(order[i]);
		changedScreen.appendChild(newCard);
	}


})

const createCardTemplate = (ident) => {
	const pet = getNodeContent(ident);
	const card = createElementTemplate('div', 'pets-card', 'main-pets-card')
	card.setAttribute("pets-id", `${pet.id}`);
	//card.id = `${pet.id}`;
	const img = createElementTemplate('img', 'card-img')
	img.alt = `${pet.type} ${pet.breed}`
	img.src = pet.img;
	img.width = '270'
	img.height = '270'
	const p = createElementTemplate('p', 'pets__title')
	p.innerText = pet.name;
	const btn = createElementTemplate('button', 'button', 'button__bordered', 'button__pets')
	btn.innerText = 'Learn more';
	card.appendChild(img);
	card.appendChild(p);
	card.appendChild(btn);
	return card;
}

const createElementTemplate = (elem, ...classes) => {
	const name = document.createElement(elem);
	name.classList.add(...classes);
	return name;
}

const getNodeContent = (num) => {
	return (PETS.find((el) => { return el.id === num }))
}

const getRandom = (max) => {
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - 1 + 1)) + 1;
}

const getNewOrder = (arr) => {
	while (arr.length < 6) {
		let randomId = getRandom(PETS.length);
		if (!arr.includes(randomId)) {
			arr.push(randomId)
		}
	}
	return arr.slice(-3)
}
/* //************************************************************************************************* */

/* HAMBURGER MENU */
const OVERLAY = document.querySelector('#overlay');
const LOGO = document.querySelector('#logo');
const HAMBURGER = document.querySelector('#hamburger');
const NAVIGATION = document.querySelector('#navigation');
const NAVIGATION_ITEM = document.querySelectorAll('.navigation-item');
const NAVIGATION_A = document.querySelectorAll('.navigation-a');
let navigation_aActive = document.querySelector('.navigation-a-active');

const toggleClasses = () => {
	OVERLAY.classList.toggle('overlay-active');
	HAMBURGER.classList.toggle('hamburger-rotate');
	LOGO.classList.toggle('hamburger-logo');
	NAVIGATION.classList.toggle('hamburger-navigation');
	navigation_aActive.classList.toggle('hamburger-a-active')
	NAVIGATION.classList.toggle('hamburger-navigation-visible')
	NAVIGATION.classList.toggle('move-to-active')
	HTML.classList.toggle('html-no-scroll')
	NAVIGATION_ITEM.forEach((el) => {
		el.classList.toggle('hamburger-item');
	})
	NAVIGATION_A.forEach((el) => {
		el.classList.toggle('hamburger-a');
	})
}

const removeClasses = () => {
	OVERLAY.classList.remove('overlay-active');
	HAMBURGER.classList.remove('hamburger-rotate');
	LOGO.classList.remove('hamburger-logo');
	NAVIGATION.classList.remove('hamburger-navigation');
	navigation_aActive.classList.remove('hamburger-a-active')
	NAVIGATION.classList.remove('hamburger-navigation-visible')
	NAVIGATION.classList.remove('move-to-active')
	HTML.classList.remove('html-no-scroll')
	NAVIGATION_ITEM.forEach((el) => {
		el.classList.remove('hamburger-item');
	})
	NAVIGATION_A.forEach((el) => {
		el.classList.remove('hamburger-a');
	})
}

HAMBURGER.addEventListener('click', () => toggleClasses())

NAVIGATION_A.forEach((li) => {
	li.addEventListener('click', () => { removeClasses() })
}
)
OVERLAY.addEventListener('click', () => removeClasses())

//******************************************************************* */

/* //MODAL WINDOW */

const HTML = document.querySelector('html')
const MODAL_OVERLAY = document.querySelector('#modal__overlay')
const MODAL_CLOSE_BTN = document.querySelector('#modal__button')
const MODAL_WINDOW = document.querySelector('#modal__wrapper');
const MODAL_IMG = document.querySelector('#modal__img');
const MODAL_NAME = document.querySelector('#modal__name');
const MODAL_BREED = document.querySelector('#modal__breed');
const MODAL_DESCRIPTION = document.querySelector('#modal__description');
const MODAL_AGE_TEXT = document.querySelector('#age__text');
const MODAL_INOCULATION_TEXT = document.querySelector('#inoculation__text');
const MODAL_DISEASES_TEXT = document.querySelector('#diseases__text');
const MODAL_PARASITES_TEXT = document.querySelector('#parasites__text');

const showModal = (pet) => {
	changeModalContent(pet)
	MODAL_WINDOW.classList.toggle('modal__wrapper-active')
	MODAL_OVERLAY.classList.toggle('overlay-active')
	HTML.classList.toggle('html-no-scroll')

}

const closeModal = () => {
	MODAL_WINDOW.classList.remove('modal__wrapper-active')
	MODAL_OVERLAY.classList.remove('overlay-active')
	HTML.classList.remove('html-no-scroll')
}

const changeModalContent = (pet) => {
	console.log(pet.id);
	MODAL_IMG.src = pet.img;
	MODAL_IMG.alt = `${pet.type} ${pet.breed}`;
	MODAL_NAME.innerText = pet.name;
	MODAL_BREED.innerText = pet.breed;
	MODAL_DESCRIPTION.innerText = pet.description;
	MODAL_AGE_TEXT.innerText = pet.age;
	MODAL_INOCULATION_TEXT.innerText = pet.inoculations;
	MODAL_DISEASES_TEXT.innerText = pet.diseases;
	MODAL_PARASITES_TEXT.innerText = pet.parasites;
}




document.querySelector('#slider-screen-active').addEventListener('click', (event) => {
	let petEvent;
	if (event.target.classList.contains('pets-card')) {
		petEvent = event.target;
		//console.log('pets-card', event.target
		//attributes['pet-id'].value)
	}
	if (event.target.classList.contains('card-img')) {
		petEvent = event.target.parentElement;
		//console.log('active-img', event.target.parentElement);
	}
	if (event.target.classList.contains('pets__title')) {
		petEvent = event.target.parentElement;
		//console.log('pets__title', event.target.parentElement);
	}
	if (event.target.classList.contains('button')) {
		petEvent = event.target.parentElement;
		//console.log('button', event.target.parentElement);
	}
	//console.log(getNodeContent((Number(petEvent.getAttribute('pets-id')))));
	showModal(getNodeContent((Number(petEvent.getAttribute('pets-id')))))

})

MODAL_OVERLAY.addEventListener('click', () => closeModal());
MODAL_CLOSE_BTN.addEventListener('click', () => closeModal());

