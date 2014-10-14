var pk = pk || {};
(function (pk) {
    pk.preventBubble = function (e) {
        if (e.preventDefault) {e.preventDefault();}
        if (e.stopPropagation) {e.stopPropagation();}
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    };
    pk.center = function (el) {
        el.style.top = el.parentNode.clientHeight / 2 - (el.offsetHeight / 2) + 'px';
        el.style.left = el.parentNode.clientWidth / 2 - (el.offsetWidth / 2) + 'px';
    };
    pk.getStyle = function (el, p) {
        return window.getComputedStyle(el).getPropertyValue(p);
    };
    pk.addClass = function (el, c) {
        var ca = el.getAttribute('class') || '';
        if (ca && ca.indexOf(c) > -1){ return;}
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
        if (el.addEventListener) {
            el.addEventListener(e, fn, false);
        } else {
            el.attachEvent("on" + e, fn);
        }
    };
    pk.offset = function (el) {
        var t = el.getBoundingClientRect().top,
            l = el.getBoundingClientRect().left,
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

    pk.getRand = function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    pk.wrap = function(el, str){
        var helperEl = pk.createEl(str);    
        el.parentNode.insertBefore(helperEl, el);
        helperEl.appendChild(el);
        return helperEl;
    };
    pk.getEl=function(str){
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
    pk.replaceEl(el,str) {
        var newEl = pk.createEl(str); 
        foreach (el.attributes as a) {
            newEl.setAttribute(a.nodeName, a.nodeValue);
        }
        while (el.firstChild) {
        newEl.appendChild(el.firstChild);
        }
        return el.parentNode.replaceChild(newEl);
    }    
    
})(pk);
