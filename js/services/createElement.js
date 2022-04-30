import codes from "../lib/codes.js";

export default function createElement({
    type,
    classes,
    attributes, 
    eventHandlers,
    appendTo }) {
    let elementType = type || 'div';
    let elementClasses = classes || [];
    let elementAttributes = attributes || {};
    let elementEventHandlers = eventHandlers || {};
    let elementAppendTo = appendTo || 'body';

    let element = document.createElement(elementType);
    for (let className of elementClasses) { element.classList.add(className) }
    for (let key in elementAttributes) { element.setAttribute(key, elementAttributes[key]) }
    for (let key in elementEventHandlers) { element.addEventListener(key, elementEventHandlers[key]) }
    
    if (element.dataset.code) {
      const elementCode = codes[element.dataset.code];
      const elementContent = document.createElement('div');
      elementContent.classList.add('key__content');

      // if (element.dataset.code === 'Backspace') {
      //   const innerIcon = document.createElement('object');
      //   innerIcon.setAttribute('type', "image/svg+xml");
      //   innerIcon.setAttribute('data', `../../assets/icons/${element.dataset.code.toLowerCase()}.svg`);
      //   innerIcon.classList.add('key__icon');
      //   elementContent.append(innerIcon);
      // } else 
      // {
        for (let key in elementCode) {
          const innerText = document.createElement('div');
          const innerTextDefault = document.createElement('span');
          const innerTextOnShift = document.createElement('span');
          innerText.classList.add('key__values', `key__values_${key}`);
          innerTextDefault.classList.add('key__value', 'key__value_default');
          innerTextOnShift.classList.add('key__value', 'key__value_shift');
          innerTextDefault.innerText = `${elementCode[key].default}`;
          innerTextOnShift.innerText = `${elementCode[key].shift}`;
          innerText.append(innerTextDefault);
          innerText.append(innerTextOnShift);
          elementContent.append(innerText);
        // }
      }

      element.append(elementContent);
    }

    document.querySelector(elementAppendTo).append(element);

    return element;
  }