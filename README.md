pk-core
========

[![Build Status](https://travis-ci.org/sw4/pk-core.svg?branch=master)](https://travis-ci.org/sw4/pk-core)

Javascript helper functions for use as a standalone library or pre-requisite for other pk-libraries

**Licensed under [cc by-sa 3.0](http://creativecommons.org/licenses/by-sa/3.0/) with attribution required**


###Usage

Where `e` is an event object, `el` a DOM element and `fn` a function

```javascript
pk.preventBubble(e) // browser / situational agnostic event bubbling prevention
pk.center(el) // vertical and horzontal centering
pk.getStyle(el, styleName) // get computed style value
pk.addClass(el, className) // add CSS class
pk.removeClass(el, className) // remove CSS class
pk.hasClass(el, className) // check for CSS class
pk.toggleClass(el, className, bool) // toggles class on/off or according to bool
pk.bindEvent(e, el, fn) // browser agnostic event binding
pk.bindListeners(l, el) // bind an object consisting of various event listeners to el
pk.layout(el) // get element top, right, bottom, left, height and width values
pk.getIndex(el) // get DOM index of 'el' within the parent node
pk.wrapEl(el, str) // wrap the element 'el' with the element created from 'str'
pk.createEl(str) // create a DOM element from a string
pk.getRand(min, max) // get a random integer between min and max
pk.attribute(el, attr, val) // gets or sets an attribute value intelligently
pk.replaceEl(el, str) // replace the element el with the element created from str, copying all attributes
```
