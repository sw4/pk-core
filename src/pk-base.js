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
    pk.attribute(el, attr, val){
        if(val===undefined){
            return (attr==='disabled' || attr==='checked') ? (el.hasAttribute(attr) ? true : false) : el.getAttribute(attr);
        }
        if(val===false && (attr==='disabled' || attr==='checked')){
            inputEl.removeAttribute(attr); 
        }else{
            el.setAttribute(attr,val);
        }               
    };
})(pk);
