export default function createElement({
    type, 
    styles, 
    attributes, 
    props, 
    eventHandlers, 
    appendTo }) {
    let elementType = type || 'div';
    let elementStyles = styles || {};
    let elementAttributes = attributes || {};
    let elementProps = props || {};
    let elementEventHandlers = eventHandlers || {};
    let elementAppendTo = appendTo || 'body';
  
    let element = document.createElement(elementType);
    for (let key in elementStyles) { element.style[key] = elementStyles[key] }
    for (let key in elementAttributes) { element.setAttribute(key, elementAttributes[key]) }
    for (let key in elementProps) { element[key] = elementProps[key] }
    for (let key in elementEventHandlers) { element.addEventListener(key, elementEventHandlers[key]) }
    document.querySelector(elementAppendTo).append(element);
    
    return element;
  }