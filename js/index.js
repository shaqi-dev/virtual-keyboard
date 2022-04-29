import createElement from "./services/index.js";
import codes from "./lib/codes.js";

createElement({
    type: 'div',
    classes: ['wrapper'],
    attributes: null,
    eventHandlers: null,
    appendTo: null
});

createElement({
    type: 'textarea',
    classes: ['textarea'],
    attributes: {'id': 'textarea'},
    eventHandlers: null,
    appendTo: '.wrapper'
});

createElement({
    type: 'div',
    classes: ['keyboard'],
    attributes: {'id': 'keyboard'},
    eventHandlers: null,
    appendTo: '.wrapper'
});

function hanleKeyClick(e) {
    const textarea = document.querySelector('#textarea');
    const keyText = e.target.innerText;
    
    textarea.value += keyText;
}

for (let key in codes) {
    createElement({
        type: 'div',
        classes: ['key'], 
        attributes: {'data-code': key}, 
        eventHandlers: {
            'click': hanleKeyClick
        },
        appendTo: '.keyboard'
    });
}

const keysDefaultEN = document.querySelectorAll('.key__values_en .key__value_default');
const keysOnShiftEN = document.querySelectorAll('.key__values_en .key__value_shift');
const keysDefaultRU = document.querySelectorAll('.key__values_ru .key__value_default');
const keysOnShiftRU = document.querySelectorAll('.key__values_ru .key__value_shift');

keysDefaultEN.forEach(key => key.classList.add('key__value_active'));