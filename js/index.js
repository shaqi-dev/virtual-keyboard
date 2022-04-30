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

const textarea = document.querySelector('#textarea');
const keys = document.querySelectorAll('.key');
const keyValues = document.querySelectorAll('.key__value');
const keyValuesDefaultEN = document.querySelectorAll('.key__values_en .key__value_default');
const keyValuesShiftEN = document.querySelectorAll('.key__values_en .key__value_shift');
const keyValuesDefaultRU = document.querySelectorAll('.key__values_ru .key__value_default');
const keysValuesShiftRU = document.querySelectorAll('.key__values_ru .key__value_shift');
const keyMap = {};
const languages = { en: true, ru: false }

textarea.focus();

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function hanleKeyClick(e) {
    if (!keyMap[e.currentTarget.dataset.code] || !keyMap[e.currentTarget.dataset.code] === false) {
        const keyText = e.target.innerText;
        textarea.value += keyText;
    } 
}

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

function setActiveShiftKeys() {
    removeActiveClasses();
    
    const keyValues = languages.en ? keyValuesShiftEN : keysValuesShiftRU
    keyValues.forEach(key => key.classList.add('key__value_active'));
}

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

function handleKeyUp(e) {
    const keyOnKeyboard = [...keys].find(key => key.dataset.code === e.code);
    if (keyOnKeyboard) { keyOnKeyboard.classList.remove('key_active'); }

    keyMap[e.code] = false;

    if (!textarea.value) { textarea.blur(); }
    
    setActiveDefaultKeys();
}


