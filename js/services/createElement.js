/* eslint-disable import/extensions */
import codes from '../lib/codes.js';

export default function createElement({
  type,
  classes,
  attributes,
  eventHandlers,
  appendTo,
}) {
  const elementType = type || 'div';
  const elementClasses = classes || [];
  const elementAttributes = attributes || {};
  const elementEventHandlers = eventHandlers || {};
  const elementAppendTo = appendTo || 'body';

  const element = document.createElement(elementType);
  elementClasses.forEach((className) => { element.classList.add(className); });
  Object.keys(elementAttributes).forEach((key) => {
    element.setAttribute(key, elementAttributes[key]);
  });
  Object.keys(elementEventHandlers).forEach((key) => {
    element.addEventListener(key, elementEventHandlers[key]);
  });

  if (element.dataset.code) {
    const elementCode = codes[element.dataset.code];
    const elementContent = document.createElement('div');
    elementContent.classList.add('key__content');
    Object.keys(elementCode).forEach((key) => {
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
    });

    element.append(elementContent);
  }

  document.querySelector(elementAppendTo).append(element);

  return element;
}
