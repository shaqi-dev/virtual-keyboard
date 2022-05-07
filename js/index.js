import createElement from "./services/index.js";
import Keyboard from "./components/keyboard/Keyboard.js";

createElement({
    type: 'div',
    classes: ['app'],
    attributes: null,
    eventHandlers: null,
    appendTo: null
});

createElement({
    type: 'textarea',
    classes: ['textarea'],
    attributes: {'id': 'textarea'},
    eventHandlers: null,
    appendTo: '.app'
});

const keyboard = new Keyboard('keyboard', 'textarea', '.app');

keyboard.init();


