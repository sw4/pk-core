// Javascript Polyfill


// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {

    var k;

    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      var kValue;
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

// Pocketknife Core

var pk = pk || {};
(function (pk) {
    pk.preventBubble = function (e) {
        if (e.preventDefault) {e.preventDefault();}
        if (e.stopPropagation) {e.stopPropagation();}
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    };
    pk.toggleClass = function(el, c, t){
        if(t === true){
            pk.addClass(el,c);
            return;
        }else if(t===false){
            pk.removeClass(el,c);
            return;
        }
        pk.toggleClass(el, c, !pk.hasClass(el,c));
    };
    pk.hasClass=function(el, c){
        var ca = el.getAttribute('class') || '';
        return (ca && ca.indexOf(c) > -1) ? true : false;
    };
    pk.center = function (el) {
        el.style.top = el.parentNode.clientHeight / 2 - (el.offsetHeight / 2) + 'px';
        el.style.left = el.parentNode.clientWidth / 2 - (el.offsetWidth / 2) + 'px';
    };
    pk.getStyle = function (el, p) {
        return window.getComputedStyle(el).getPropertyValue(p);
    };
    pk.addClass = function (el, c) {
        if (pk.hasClass(el,c)){ return;}
        var ca = el.getAttribute('class') || '';
        el.setAttribute('class', (ca ? ca + ' ' : '') + c);
        return el;
    };
    pk.removeClass = function (el, c) {
        var ca = el.getAttribute('class');
        if (!ca){return;}
        el.setAttribute('class', ca.replace(c, ''));
        return el;
    };
    pk.bindEvent = function (e, el, fn) {
        if(e==="mousewheel"){
            e = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x  
        }
        if (el.addEventListener) {
            el.addEventListener(e, fn, false);
        } else {
            el.attachEvent("on" + e, fn);
        }
    };
    pk.layout = function (el, offset) {
        var t = offset ? el.offsetTop : el.getBoundingClientRect().top,
            l = offset ? el.offsetLeft : el.getBoundingClientRect().left,
            h = el.offsetHeight,
            w = el.offsetWidth;
        return {
            top: t,
            left: l,
            right: l + w,
            bottom: t + h,
            height: h,
            width: w
        };
    };
    pk.bindListeners=function(l, el){
        for(var e in l){
            pk.bindEvent(e, el, l[e]);                
        }
    };
    pk.getRand = function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    pk.wrapEl = function(el, str){
        var helperEl = pk.createEl(str);    
        el.parentNode.insertBefore(helperEl, el);
        helperEl.appendChild(el);
        return helperEl;
    };
    pk.createEl=function(str){
        var el = document.createElement('div');        
        el.innerHTML=str;        
        return el.children[0];
    };
    pk.getIndex=function(el){
        if(!el){return null;}
        var prop = document.body.previousElementSibling ? 'previousElementSibling' : 'previousSibling';
        var i = 1;
        while (el = el[prop]) { ++i; }
        return i-1;        
    }; 
    pk.replaceEl = function(el,str) {
        var newEl = pk.createEl(str);         
        for(var i = 0; i < el.attributes.length; i++) {
            newEl.setAttribute(el.attributes[i].nodeName, el.attributes[i].nodeValue);
        }
        while (el.firstChild) {
            newEl.appendChild(el.firstChild);
        }
        el.parentNode.replaceChild(newEl, el);
        return newEl;
    };
    pk.toArr = function(v) {
        var a=[];
        if (v && typeof v !== "object") {
            if(v.indexOf(',') !== -1){
                a = v.split(',');
            }else{
                a.push(v);
            }
        }else{
             a=v;   
        }
        return a;
    };    
    pk.attribute = function (el, attr, val){
        
        attr = el.hasAttribute(attr) ? attr : el.hasAttribute('data-'+attr) ? 'data-'+attr : attr;        
        if(val===undefined){
            return (attr==='selected' || attr==='disabled' || attr==='checked') ? (el.hasAttribute(attr) ? true : false) : el.getAttribute(attr);
        }
        if(val===false && (attr==='selected' || attr==='disabled' || attr==='checked')){
            el.removeAttribute(attr); 
        }else{
            el.setAttribute(attr,val);
        }               
    };
})(pk);
