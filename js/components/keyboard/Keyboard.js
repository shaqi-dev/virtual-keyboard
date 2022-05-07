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
        this.capslock = false;
        this.shift = false;
    }

    init() {
        this.textarea = document.querySelector(`#${this.textareaId}`);
        textarea.value = "console.log('Hello RS Student!');";
        console.log('Hello RS Student!');
        this.initKeyboard();
        this.initKeys();
        this.updateKeys();
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
                    'mouseup': this.handleEvent
                },
                appendTo: `#${this.id}`
            });
        }

        this.keys = document.querySelectorAll('.key');
        this.keyValues = document.querySelectorAll('.key__value');
        this.keyValuesDefaultEN = document.querySelectorAll('.key__values_en .key__value_default');
        this.keyValuesShiftEN = document.querySelectorAll('.key__values_en .key__value_shift');
        this.keyValuesDefaultRU = document.querySelectorAll('.key__values_ru .key__value_default');
        this.keyValuesShiftRU = document.querySelectorAll('.key__values_ru .key__value_shift');
    }

    initListeners() {
        document.addEventListener('keydown', this.handleEvent);
        document.addEventListener('keyup', this.handleEvent);
    }

    setFocus() {
        this.textarea.focus();
    }

    removeFocus() {
        this.textarea.blur();
    }

    toggleActiveLanguage() {
        this.languages.en = !this.languages.en
        this.languages.ru = !this.languages.ru
    
        this.updateKeys();
    }

    removeActiveClasses() {
        this.keyValues.forEach(key => key.classList.remove('key__value_active'));
    }

    toggleCapsLock() {
        this.capslock = !this.capslock;
        const capsLockKey = [...this.keys].find(key => key.dataset.code === 'CapsLock');
        capsLockKey.classList.toggle('key_functional_active', this.capslock);
        this.updateKeys();
    }

    toggleShift(code) {
        this.shift = !this.shift;
        const capsLockKey = [...this.keys].find(key => key.dataset.code === code);
        capsLockKey.classList.toggle('key_functional_active', this.shift);
        this.updateKeys();
    }

    updateKeys() {
        this.removeActiveClasses();

        if (this.shift) {
            const keyValues = this.languages.en ? this.keyValuesShiftEN : this.keyValuesShiftRU
            keyValues.forEach(key => key.classList.add('key__value_active'));
        } else if (this.capslock) {
            const keyValuesDefault = this.languages.en ? this.keyValuesDefaultEN : this.keyValuesDefaultRU;
            const keyValuesShift = this.languages.en ? this.keyValuesShiftEN : this.keyValuesShiftRU;
            const additionalCharsRU = ['Backquote', 'BracketLeft', 'BracketRight', 'Semicolon', 'Quote', 'Comma', 'Period']
            const keyValuesFiltered = [...keyValuesShift].filter(key => {
                const code = key.parentElement.parentElement.parentElement.dataset.code;

                if (this.languages.en) {
                    if (code.slice(0, 3) === 'Key') {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (code.slice(0, 3) === 'Key' || additionalCharsRU.includes(code)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });
            
            keyValuesDefault.forEach(key => key.classList.add('key__value_active'));
            keyValuesFiltered.forEach(key => {
                key.parentElement.querySelector('.key__value_active').classList.remove('key__value_active');
                key.classList.add('key__value_active');
            });
        } else {
            const keyValuesDefault = this.languages.en ? this.keyValuesDefaultEN : this.keyValuesDefaultRU;
            keyValuesDefault.forEach(key => key.classList.add('key__value_active'));
        }
    }

    getPosition() {
        return {
            start: this.textarea.selectionStart, 
            end: this.textarea.selectionEnd
        };
    }

    setPosition(start, end) {
        this.textarea.selectionStart = start;
        this.textarea.selectionEnd = end;
    };

    deleteChar(code) {
        const value = this.textarea.value;
        const length = this.textarea.length;
        const pos = this.getPosition();

        const setValue = (first, second) => {
            this.textarea.value = value.slice(first[0], first[1]) + value.slice(second[0], second[1]);
        }
        
        if (pos.start !== pos.end) {
            setValue([0, pos.start], [pos.end, length]);
        } else if (code === 'Backspace' && pos.start !== 0) {
            setValue([0, pos.start - 1], [pos.end, length]);
            pos.start -= 1;
            pos.end -= 1;
        } else if (code === 'Delete' && pos.end !== length) {
            setValue([0, pos.start], [pos.end + 1, length]);
        }

        this.setPosition(pos.start, pos.start);
    }

    addChar(char) {
        const value = this.textarea.value;
        const length = this.textarea.length;
        const pos = this.getPosition();

        const setValue = (first, second) => {
            this.textarea.value = value.slice(first[0], first[1]) + char + value.slice(second[0], second[1]);
            pos.start += 1;
            pos.end += 1;
        }
        
        setValue([0, pos.start], [pos.end, length]);
        
        this.setPosition(pos.start, pos.start);
    }

    dispatchAction(eventType, code, value) {
        if (eventType === 'keydown') {
            if (
                code === 'Backspace' ||
                code === 'ArrowUp' ||
                code === 'ArrowRight' ||
                code === 'ArrowDown' ||
                code === 'ArrowLeft' ||
                code === 'AltLeft' ||
                (code === 'KeyZ' && (this.keyMap['ControlLeft'] || this.keyMap['ControlRight']))
                ) {
                this.setFocus();
                return;
            }
        } 

        switch (code) {
            case 'Backspace':
                this.deleteChar(code);
                break;
            case 'Delete':
                this.deleteChar(code);
                break;
            case 'CapsLock':
                this.toggleCapsLock();
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                this.toggleShift(code);
                break;
            case 'Space':
                this.addChar(' ');
                break;
            case 'Tab':
                this.setFocus();
                this.addChar('\t');
                break;
            case 'Enter':
                this.addChar('\n');
                break;
            case 'KeyZ':
                if (this.keyMap['ControlLeft'] || this.keyMap['ControlRight']) {
                    this.setFocus();
                } else {
                    this.addChar(value);
                }
                break;
            case 'ControlLeft':
            case 'ControlRight':
                this.setFocus();                
                break;
            case 'AltLeft':
                if (this.shift) {
                    this.toggleActiveLanguage();
                }
            case 'AltRight':
            case 'MetaLeft':
            case 'MetaRight':
                break;
            default:
                this.addChar(value);
                break;
        } 
    }

    handleEvent = (e) => {
        switch (e.type) {
            case 'mousedown': {
                const key = e.currentTarget;
                const code = key.dataset.code;

                this.dispatchAction(e.type, code, e.target.innerText);
            
                break;
            }
            case 'mouseup': {
                this.setFocus();
                break;
            }
            case 'keydown': {
                const code = e.code;
                const key = [...this.keys].find(key => key.dataset.code === code);

                if (code === 'Tab' || code === 'AltLeft') {
                    e.preventDefault();
                }
               
                if (key) {
                    const keyValue = key.querySelector('.key__value_active').innerText;                 

                    if (code === 'ShiftLeft' || code === 'ShiftRight') {
                        if (!this.shift) {
                            this.dispatchAction(e.type, code, keyValue);
                        }                                   
                    } else if (code === 'CapsLock') {
                        this.toggleCapsLock();
                        
                    } else {
                        this.removeFocus();

                        if (key.classList.contains('key_functional')) {
                            key.classList.add('key_functional_active');
                        } else {
                            key.classList.add('key_active');
                        }

                        this.dispatchAction(e.type, code, keyValue);                        
                    }
                }

                this.keyMap[code] = true;
                
                if (this.shift && this.keyMap['AltLeft']) {
                    this.toggleActiveLanguage();
                };

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

                if (code === 'ShiftLeft' || code === 'ShiftRight') {
                    this.toggleShift(code);
                } else {
                    this.updateKeys();
                }

                this.keyMap[code] = false;

                this.setFocus();

                break;
            }
        }   
    }
}