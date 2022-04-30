import createElement from "../../services/createElement.js";
import codes from "../../lib/codes.js";

export default class Keyboard {
    constructor(id, textareaId, appendTo) {
        this.id = id;
        this.textareaId = textareaId;
        this.appendTo = appendTo;
        this.keyMap = {};
        this.languages = { en: true, ru: false };
        this.functionalKeys = [
            'Tab', 'CapsLock', 'ShiftLeft', 'ControlLeft', 'AltLeft', 'ShiftRight', 
            'ControlRight', 'AltRight', 'MetaLeft', 'MetaRight', 'Backspace', 'Delete', 
            'Enter', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Space'
        ];
    }

    init() {
        this.textarea = document.querySelector(`#${this.textareaId}`);
        textarea.value = "console.log('Hello RS Student!');";
        console.log('Hello RS Student!');
        this.initKeyboard();
        this.initKeys();
        this.setDefaultKeys();
        this.initListeners();
    }

    initKeyboard() {
        this.keyboard = createElement({
            type: 'div',
            classes: ['keyboard'],
            attributes: {'id': this.id},
            eventHandlers: null,
            appendTo: this.appendTo
        });
    }

    initKeys() {
        for (let key in codes) {
            const classes = ['key'];
    
            if (this.functionalKeys.includes(key)) {
                if (key !== 'Space') {
                    classes.push('key_functional');
                    classes.push(`key_${key.toLowerCase()}`);
                } else {
                    classes.push(`key_${key.toLowerCase()}`);
                }
            }
        
            createElement({
                type: 'div',
                classes: [...classes], 
                attributes: {'data-code': key}, 
                eventHandlers: {
                    'mousedown': this.handleEvent,
                },
                appendTo: `#${this.id}`
            });
        }

        this.keys = document.querySelectorAll('.key');
        this.keyValues = document.querySelectorAll('.key__value');
        this.keyValuesDefaultEN = document.querySelectorAll('.key__values_en .key__value_default');
        this.keyValuesShiftEN = document.querySelectorAll('.key__values_en .key__value_shift');
        this.keyValuesDefaultRU = document.querySelectorAll('.key__values_ru .key__value_default');
        this.keysValuesShiftRU = document.querySelectorAll('.key__values_ru .key__value_shift');
    }

    initListeners() {
        document.addEventListener('keydown', this.handleEvent);
        document.addEventListener('keyup', this.handleEvent);
    }

    setFocus() {
        this.textarea.focus();
    }

    toggleActiveLanguage() {
        this.languages.en = !this.languages.en
        this.languages.ru = !this.languages.ru
    
        this.setDefaultKeys();
    }

    removeActiveClasses() {
        this.keyValues.forEach(key => key.classList.remove('key__value_active'));
    }

    setDefaultKeys() {
        this.removeActiveClasses();

        const keyValues = this.languages.en ? this.keyValuesDefaultEN : this.keyValuesDefaultRU
        keyValues.forEach(key => key.classList.add('key__value_active'));
    }

    setShiftKeys() {
        this.removeActiveClasses();
        
        const keyValues = this.languages.en ? this.keyValuesShiftEN : this.keysValuesShiftRU
        keyValues.forEach(key => key.classList.add('key__value_active'));
    }

    handleEvent = (e) => {
        switch (e.type) {
            case 'mousedown': {
                const key = e.currentTarget;
                const code = key.dataset.code;
                
                const handleDeleteChar = (code) => {
                    const value = this.textarea.value;
                    const length = this.textarea.length;
                    const pos = {
                        start: this.textarea.selectionStart, 
                        end: this.textarea.selectionEnd
                    };
            
                    const setValue = (first, second) => {
                        this.textarea.value = value.slice(first[0], first[1]) + value.slice(second[0], second[1]);
                    }
            
                    const setPosition = () => {
                        this.textarea.selectionStart = pos.start;
                        this.textarea.selectionEnd = pos.start;
                    };
                    
                    if (pos.start !== pos.end) {
                        setValue([0, pos.start], [pos.end, length]);
                    } else if (code === 'Backspace' && pos.start !== 0) {
                        setValue([0, pos.start - 1], [pos.end, length]);
                        pos.start -= 1;
                        pos.end -= 1;
                    } else if (code === 'Delete' && pos.end !== length) {
                        setValue([0, pos.start], [pos.end + 1, length]);
                    }
            
                    setPosition();
                    this.setFocus();
                }

                if (!this.keyMap[code] || this.keyMap[code] === false) {
                    switch (code) {
                        case 'Backspace':
                            handleDeleteChar(code);
                            break;
                        case 'Delete':
                            handleDeleteChar(code);
                            break;
                        default:
                            this.textarea.value += e.target.innerText;
                            this.setFocus();
                            break;
                    }
                }
        
                break;
            }   
            case 'keydown': {
                const code = e.code;
                const key = [...this.keys].find(key => key.dataset.code === code);

                if (key) {
                    if (code === 'CapsLock') {
                        if (key.classList.contains('key_functional')) {
                            key.classList.toggle('key_functional_active', !key.classList.contains('key_functional_active'));
                        } else {
                            key.classList.toggle('key_active', !key.classList.contains('key_active'));
                        }
                    } else {
                        if (key.classList.contains('key_functional')) {
                            key.classList.add('key_functional_active');
                        } else {
                            key.classList.add('key_active');
                        }
                    }  
                }
                console.log(!this.keyMap[code]);
                if (!this.keyMap[code]) {
                    this.keyMap[code] = true;
                    
                    if (code === 'CapsLock') {
                        this.setShiftKeys();
                    }
                    if (this.keyMap['ShiftLeft'] || this.keyMap['ShiftRight']) {
                        this.setShiftKeys();
                    };
                    if ((this.keyMap['ShiftLeft'] || this.keyMap['ShiftRight']) && this.keyMap['AltLeft']) {
                        this.toggleActiveLanguage();
                    };
                } else {
                    if (code === 'CapsLock') {
                        this.keyMap[code] = false;
                        this.setDefaultKeys();
                    }
                }

                console.log(this.keyMap)
        
                this.setFocus();
                break;
            }
            case 'keyup': {
                const code = e.code;
                const key = [...this.keys].find(key => key.dataset.code === code);
                if (key && code !== 'CapsLock') {
                    if (key.classList.contains('key_functional')) {
                        key.classList.remove('key_functional_active'); 
                    } else {
                        key.classList.remove('key_active'); 
                    }
                }

                if (code !== 'CapsLock') {
                    this.keyMap[code] = false;
                }

                console.log(this.keyMap)

                if (!this.keyMap['CapsLock'] && !this.keyMap['ShiftLeft'] && !this.keyMap['ShiftRight']) {
                    this.setDefaultKeys();
                };
                break;
            }
        }   
    }

    handleKeyUp = (e) => {
        

        // if (!this.textarea.value) { this.textarea.blur(); }
    }
}