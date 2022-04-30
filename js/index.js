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

const textarea = document.querySelector('#textarea');
textarea.focus();

function hanleKeyClick(e) {
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

const languages = {
    en: false,
    ru: true
}

const keys = document.querySelectorAll('.key');
const keyValues = document.querySelectorAll('.key__value');
const keyValuesDefaultEN = document.querySelectorAll('.key__values_en .key__value_default');
const keyValuesShiftEN = document.querySelectorAll('.key__values_en .key__value_shift');
const keyValuesDefaultRU = document.querySelectorAll('.key__values_ru .key__value_default');
const keysValuesShiftRU = document.querySelectorAll('.key__values_ru .key__value_shift');

console.log();

function removeActiveClasses() {
    keyValues.forEach(key => key.classList.remove('key__value_active'));
}

function setActiveDefaultKeys() {
    removeActiveClasses();
    const keyValues = languages.en ? keyValuesDefaultEN : keyValuesDefaultRU
    keyValues.forEach(key => key.classList.add('key__value_active'));
}

setActiveDefaultKeys();

function toggleActiveLanguage() {
    languages.en = !languages.en
    languages.ru = !languages.ru
    setActiveDefaultKeys();
}

const keyMap = {};

function setActiveShiftKeys() {
    removeActiveClasses();
    const keyValues = languages.en ? keyValuesShiftEN : keysValuesShiftRU
    keyValues.forEach(key => key.classList.add('key__value_active'));
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keypress', handleKeyPress);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(e) {
    const keyOnKeyboard = [...keys].find(key => key.dataset.code === e.code);

    if (keyOnKeyboard) { keyOnKeyboard.classList.add('key_active'); }

    if (!keyMap[e.code] || keyMap[e.code] === false) {
        keyMap[e.code] = true; 
        if (keyMap['ShiftLeft'] && keyMap['AltLeft']) {
            toggleActiveLanguage();
        };
        if (keyMap['ShiftLeft'] && !keyMap['AltLeft']) {
            setActiveShiftKeys();
        };
    }

    textarea.focus();
}

function handleKeyPress(e) {
    textarea.value += e.key;
}

function handleKeyUp(e) {
    const keyOnKeyboard = [...keys].find(key => key.dataset.code === e.code);

    if (keyOnKeyboard) { keyOnKeyboard.classList.remove('key_active'); }

    keyMap[e.code] = false;
    
    setActiveDefaultKeys();

    textarea.blur();
}


