/* eslint-disable import/extensions */
import createElement from './services/index.js';
import Keyboard from './components/keyboard/Keyboard.js';

createElement({
  type: 'div',
  classes: ['app'],
  attributes: null,
  eventHandlers: null,
  appendTo: null,
});

const textarea = createElement({
  type: 'textarea',
  classes: ['textarea'],
  attributes: { id: 'textarea' },
  eventHandlers: null,
  appendTo: '.app',
});

textarea.value = 'console.log("Hello RS Student!");';

createElement({
  type: 'div',
  classes: ['description'],
  attributes: null,
  eventHandlers: null,
  appendTo: '.app',
});

const info1 = createElement({
  type: 'span',
  classes: ['description__item'],
  attributes: null,
  eventHandlers: null,
  appendTo: '.description',
});

const info2 = createElement({
  type: 'span',
  classes: ['description__item'],
  attributes: null,
  eventHandlers: null,
  appendTo: '.description',
});

info1.innerText = 'The keyboard was created on Windows';
info2.innerText = 'Use Shift + Alt to switch the language';

const keyboard = new Keyboard('keyboard', 'textarea', '.app');

keyboard.init();
