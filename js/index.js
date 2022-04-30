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

// function renderKeys() {
//     const functional = [
//         'Tab',
//         'CapsLock',
//         'ShiftLeft',
//         'ControlLeft',
//         'AltLeft',
//         'ShiftRight',
//         'ControlRight',
//         'AltRight',
//         'MetaLeft',
//         'MetaRight',
//         'Backspace',
//         'Delete',
//         'Enter',
//         'ArrowUp',
//         'ArrowLeft',
//         'ArrowDown',
//         'ArrowRight',
//         'Space'
//     ]

//     for (let key in codes) {
//         const classes = ['key'];

//         if (functional.includes(key)) {
//             if (key !== 'Space') {
//                 classes.push('key_functional');
//                 classes.push(`key_${key.toLowerCase()}`);
//             } else {
//                 classes.push(`key_${key.toLowerCase()}`);
//             }
//         }

//         createElement({
//             type: 'div',
//             classes: [...classes], 
//             attributes: {'data-code': key}, 
//             eventHandlers: {
//                 'mousedown': handleKeyMouseDown,
//             },
//             appendTo: '.keyboard'
//         });
//     }
// }

// renderKeys();

// const textarea = document.querySelector('#textarea');
// const keys = document.querySelectorAll('.key');
// const keyValues = document.querySelectorAll('.key__value');
// const keyValuesDefaultEN = document.querySelectorAll('.key__values_en .key__value_default');
// const keyValuesShiftEN = document.querySelectorAll('.key__values_en .key__value_shift');
// const keyValuesDefaultRU = document.querySelectorAll('.key__values_ru .key__value_default');
// const keysValuesShiftRU = document.querySelectorAll('.key__values_ru .key__value_shift');
// const keyMap = {};
// const languages = { en: true, ru: false }

// textarea.value = "console.log('Hello RS Student!');";
// console.log('Hello RS Student!');

// function setFocus() {
//     textarea.focus();
// }

// function toggleActiveLanguage() {
//     languages.en = !languages.en
//     languages.ru = !languages.ru

//     setActiveDefaultKeys();
// }

// setFocus();

// document.addEventListener('keydown', handleKeyDown);
// document.addEventListener('keyup', handleKeyUp);

// function handleKeyMouseDown(e) {
//     const key = e.currentTarget;
//     const keyCode = key.dataset.code;

//     if (!keyMap[keyCode] || keyMap[keyCode] === false) {
//         switch (keyCode) {
//             case 'Backspace':
//                 handleDeleteChar(keyCode);
//                 break;
//             case 'Delete':
//                 handleDeleteChar(keyCode);
//                 break;
//             default:
//                 textarea.value += e.target.innerText;
//                 setFocus();
//                 break;
//         }
//     }

//     function handleDeleteChar(keyCode) {
//         const value = textarea.value;
//         const length = textarea.length;
//         const pos = {
//             start: textarea.selectionStart, 
//             end: textarea.selectionEnd
//         };

//         function setValue(first, second) {
//             textarea.value = value.slice(first[0], first[1]) + value.slice(second[0], second[1]);
//         }

//         function setPosition() {
//             textarea.selectionStart = pos.start;
//             textarea.selectionEnd = pos.start;
//         };
        
//         if (pos.start !== pos.end) {
//             setValue([0, pos.start], [pos.end, length]);
//         } else if (keyCode === 'Backspace' && pos.start !== 0) {
//             setValue([0, pos.start - 1], [pos.end, length]);
//             pos.start -= 1;
//             pos.end -= 1;
//         } else if (keyCode === 'Delete' && pos.end !== length) {
//             setValue([0, pos.start], [pos.end + 1, length]);
//         }

//         setPosition();
//         setFocus();
//     }
// }

// function removeActiveClasses() {
//     keyValues.forEach(key => key.classList.remove('key__value_active'));
// }

// function setActiveDefaultKeys() {
//     removeActiveClasses();

//     const keyValues = languages.en ? keyValuesDefaultEN : keyValuesDefaultRU
//     keyValues.forEach(key => key.classList.add('key__value_active'));
// }

// setActiveDefaultKeys();

// function setActiveShiftKeys() {
//     removeActiveClasses();
    
//     const keyValues = languages.en ? keyValuesShiftEN : keysValuesShiftRU
//     keyValues.forEach(key => key.classList.add('key__value_active'));
// }

// function handleKeyDown(e) {
//     const keyCode = e.code;
//     const keyOnKeyboard = [...keys].find(key => key.dataset.code === keyCode);
//     if (keyOnKeyboard) {
//         if (keyOnKeyboard.classList.contains('key_functional')) {
//             keyOnKeyboard.classList.add('key_functional_active'); 
//         } else {
//             keyOnKeyboard.classList.add('key_active'); 
//         }
//     }

//     if (!keyMap[keyCode] || keyMap[keyCode] === false) {
//         keyMap[keyCode] = true;
//         console.log(keyMap);
//         if (keyMap['ShiftLeft'] && keyMap['AltLeft']) {
//             toggleActiveLanguage();
//         };
//         if (keyMap['ShiftLeft']) {
//             setActiveShiftKeys();
//         };
//     }

//     textarea.focus();
// }

// function handleKeyUp(e) {
//     const keyCode = e.code;
//     const keyOnKeyboard = [...keys].find(key => key.dataset.code === keyCode);
//     if (keyOnKeyboard) {
//         if (keyOnKeyboard.classList.contains('key_functional')) {
//             keyOnKeyboard.classList.remove('key_functional_active'); 
//         } else {
//             keyOnKeyboard.classList.remove('key_active'); 
//         }
//     }

//     keyMap[keyCode] = false;

//     if (!keyMap['ShiftLeft']) {
//         setActiveDefaultKeys();
//     };

//     if (!textarea.value) { textarea.blur(); }
// }


