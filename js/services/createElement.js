import codes from "../lib/codes.js";

export default function createElement({
    type,
    classes,
    // styles, 
    attributes, 
    // props, 
    eventHandlers,
    appendTo }) {
    let elementType = type || 'div';
    let elementClasses = classes || [];
    // let elementStyles = styles || {};
    let elementAttributes = attributes || {};
    // let elementProps = props || {};
    let elementEventHandlers = eventHandlers || {};
    let elementAppendTo = appendTo || 'body';

    let element = document.createElement(elementType);
    for (let className of elementClasses) { element.classList.add(className) }
    // for (let key in elementStyles) { element.style[key] = elementStyles[key] }
    for (let key in elementAttributes) { element.setAttribute(key, elementAttributes[key]) }
    // for (let key in elementProps) { element[key] = elementProps[key] }
    for (let key in elementEventHandlers) { element.addEventListener(key, elementEventHandlers[key]) }
    
    if (elementAttributes['data-code']) element.innerHTML = `${codes[elementAttributes['data-code']].en.default}`;

    document.querySelector(elementAppendTo).append(element);

    return element;
  }