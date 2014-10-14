pk-base
========

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
pk.bindEvent(e, el, fn) // browser agnostic event binding
pk.offset(el) // get element top, right, bottom, left, height and width values
pk.index(el) // get DOM index of 'el' within the parent node
pk.wrap(el, str) // wrap the element 'el' with the element created from 'str'
pk.createEl(str) // create a DOM element from a string
```
