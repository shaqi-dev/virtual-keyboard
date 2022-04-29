import createElement from "./services/index.js";
import codes from "./lib/codes.js";

for (let key in codes) {
    createElement({
        type: 'div',
        classes: ['key'], 
        attributes: {'data-code': key}, 
        eventHandlers: null,
        appendTo: null
    });
}