(function(t){var i={};function e(s){if(i[s]){return i[s].exports}var c=i[s]={i:s,l:false,exports:{}};t[s].call(c.exports,c,c.exports,e);c.l=true;return c.exports}e.m=t;e.c=i;e.d=function(t,i,s){if(!e.o(t,i)){Object.defineProperty(t,i,{configurable:false,enumerable:true,get:s})}};e.r=function(t){Object.defineProperty(t,"__esModule",{value:true})};e.n=function(t){var i=t&&t.__esModule?function i(){return t["default"]}:function i(){return t};e.d(i,"a",i);return i};e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)};e.p=".";return e(e.s=0)})({"./src/stickyElement.css":function(t,i){},"./src/stickyElement.js":function(t,i,e){"use strict";(function(t){function i(i){var y=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};this.selector=i;t.vcStickyElements=[];this.vp=v();this.body=document.querySelector("body");this.options={wrap:y.wrap||true,marginTop:y.marginTop||0,stickyFor:y.stickyFor||0,stickyClass:y.stickyClass||null,stickyAttribute:y.stickyAttribute||null,stickyContainer:y.stickyContainer||"body",isFullWidth:y.isFullWidth||false,stickyZIndex:y.isFullWidth||null};m=m.bind(this);e=e.bind(this);s=s.bind(this);c=c.bind(this);n=n.bind(this);r=r.bind(this);o=o.bind(this);k=k.bind(this);u=u.bind(this);f=f.bind(this);d=d.bind(this);p=p.bind(this);v=v.bind(this);m=m.bind(this);b=b.bind(this);g=g.bind(this);m();t.addEventListener("load",m);t.addEventListener("scroll",m);e()}i.prototype.destroy=function(){b(t.vcStickyElements,function(t){r(t);l(t);delete t.sticky})};function e(){var t=this;var i=setInterval(function(){if(document.readyState==="complete"){clearInterval(i);var e=document.querySelectorAll(t.selector);b(e,function(t){return s(t)})}},10)}function s(t){t.sticky={};t.sticky.active=false;t.sticky.marginTop=parseInt(t.getAttribute("data-margin-top"))||this.options.marginTop;t.sticky.stickyFor=parseInt(t.getAttribute("data-sticky-for"))||this.options.stickyFor;t.sticky.stickyClass=t.getAttribute("data-sticky-class")||this.options.stickyClass;t.sticky.stickyAttribute=t.getAttribute("data-sticky-attribute")||this.options.stickyAttribute;t.sticky.stickyOffsetAttribute="data-vcv-sticky-element-active-offset";t.sticky.wrap=t.hasAttribute("data-sticky-wrap")?true:this.options.wrap;t.sticky.stickyContainer=t.getAttribute("data-vce-sticky-container")||this.options.stickyContainer;t.sticky.stickyZIndex=t.getAttribute("data-vce-sticky-z-index")||this.options.stickyZIndex;t.sticky.isFullWidth=t.getAttribute("data-vce-full-width")==="true"||this.options.isFullWidth;t.sticky.container=d(t);t.sticky.container.rect=p(t.sticky.container,true,t.sticky.isFullWidth);t.sticky.rect=p(t,false,t.sticky.isFullWidth);g(t,a({zIndex:t.sticky.stickyZIndex},t.sticky.isFullWidth));if(t.tagName.toLowerCase()==="img"){t.onload=function(){return t.sticky.rect=p(t,false,t.sticky.isFullWidth)}}c(t)}function c(i){if(i.sticky.rect.top+i.sticky.rect.height<i.sticky.container.rect.top+i.sticky.container.rect.height&&i.sticky.stickyFor<this.vp.width&&!i.sticky.active){i.sticky.active=true}if(t.vcStickyElements.indexOf(i)<0){t.vcStickyElements.push(i)}if(!i.sticky.resizeEvent){n(i);i.sticky.resizeEvent=true}if(!i.sticky.scrollEvent){y(i);i.sticky.scrollEvent=true}u(i)}function n(i){i.sticky.resizeListener=function(){return o(i)};t.addEventListener("resize",i.sticky.resizeListener)}function r(i){if(i&&i.sticky){t.removeEventListener("resize",i.sticky.resizeListener)}}function o(t){this.vp=v();t.sticky.rect=p(t,false,t.sticky.isFullWidth);t.sticky.container.rect=p(t.sticky.container,true,t.sticky.isFullWidth);if(t.sticky.rect.top+t.sticky.rect.height<t.sticky.container.rect.top+t.sticky.container.rect.height&&t.sticky.stickyFor<this.vp.width&&!t.sticky.active){t.sticky.active=true}else if(t.sticky.rect.top+t.sticky.rect.height>=t.sticky.container.rect.top+t.sticky.container.rect.height||t.sticky.stickyFor>=this.vp.width&&t.sticky.active){t.sticky.active=false}u(t)}function y(i){i.sticky.scrollListener=function(){return k(i)};t.addEventListener("scroll",i.sticky.scrollListener)}function l(i){if(i&&i.sticky){t.removeEventListener("scroll",i.sticky.scrollListener)}}function k(t){if(t&&t.sticky&&t.sticky.active){u(t)}}function a(t,i){if(i){delete t.width;delete t.left}return t}function u(t){g(t,a({position:"",width:"",top:"",left:""},t.sticky.isFullWidth));if(!t.sticky.rect.width){t.sticky.rect=p(t,false,t.sticky.isFullWidth)}if(t.sticky.wrap){g(t.parentNode,a({display:"block",width:t.sticky.rect.width+"px",height:t.sticky.rect.height+"px"},t.sticky.isFullWidth))}if(t.sticky.rect.top===0&&t.sticky.container===this.body){g(t,a({position:"fixed",top:t.sticky.rect.top+"px",left:t.sticky.rect.left+"px",width:t.sticky.rect.width+"px"},t.sticky.isFullWidth))}else if(this.scrollTop>t.sticky.rect.top-t.sticky.marginTop){g(t,a({position:"fixed",width:t.sticky.rect.width+"px",left:t.sticky.rect.left+"px"},t.sticky.isFullWidth));if(this.scrollTop+t.sticky.rect.height+t.sticky.marginTop>t.sticky.container.rect.top+t.sticky.container.offsetHeight){if(t.sticky.stickyClass){t.classList.remove(t.sticky.stickyClass)}if(t.sticky.stickyAttribute){t.removeAttribute(t.sticky.stickyAttribute)}t.setAttribute(t.sticky.stickyOffsetAttribute,true);g(t,a({top:t.sticky.container.rect.top+t.sticky.container.offsetHeight-(this.scrollTop+t.sticky.rect.height)+"px"},t.sticky.isFullWidth))}else{if(t.sticky.stickyClass){t.classList.add(t.sticky.stickyClass)}if(t.sticky.stickyAttribute){t.setAttribute(t.sticky.stickyAttribute,true)}t.removeAttribute(t.sticky.stickyOffsetAttribute);g(t,a({top:t.sticky.marginTop+"px"},t.sticky.isFullWidth))}}else{if(t.sticky.stickyClass){t.classList.remove(t.sticky.stickyClass)}if(t.sticky.stickyAttribute){t.removeAttribute(t.sticky.stickyAttribute)}t.removeAttribute(t.sticky.stickyOffsetAttribute);g(t,a({position:"",width:"",top:"",left:""},t.sticky.isFullWidth));if(t.sticky.wrap){g(t.parentNode,a({display:"",width:"",height:""},t.sticky.isFullWidth))}}}function f(){b(t.vcStickyElements,function(t){t.sticky.rect=p(t,false,t.sticky.isFullWidth);t.sticky.container.rect=p(t.sticky.container,true,t.sticky.isFullWidth);c(t);u(t)})}function d(t){var i=h(t,t.sticky.stickyContainer);if(!i){i=this.body}return i}function h(t,i){var e=void 0;["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].some(function(t){if(typeof document.body[t]==="function"){e=t;return true}return false});var s=void 0;while(t){s=t.parentElement;if(s&&s[e](i)){return s}t=s}return null}function p(i){var e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var s=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;g(i,a({position:"",width:"",top:"",left:""},s));if(!e){g(i.parentElement,a({position:"",width:"",top:"",left:""},s))}var c=i.getBoundingClientRect();var n=document.body;var r=document.documentElement;var o=t.pageYOffset||r.scrollTop||n.scrollTop;var y=t.pageXOffset||r.scrollLeft||n.scrollLeft;var l=r.clientTop||n.clientTop||0;var k=r.clientLeft||n.clientLeft||0;var u=c.top+o-l;var f=c.left+y-k;var d=c.width;var h=c.height;return{top:u,left:f,width:d,height:h}}function v(){return{width:Math.max(document.documentElement.clientWidth,t.innerWidth||0),height:Math.max(document.documentElement.clientHeight,t.innerHeight||0)}}function m(){this.scrollTop=(t.pageYOffset||document.scrollTop)-(document.clientTop||0)||0}function b(t,i){for(var e=0,s=t.length;e<s;e++){i(t[e])}}function g(t,i){if(!t){return}for(var e in i){if(i.hasOwnProperty(e)){t.style[e]=i[e]}}}t.vcSticky=i})(window)},"./src/stickyElementStarter.js":function(t,i,e){"use strict";(function(t){t.vcStickySettings=null;t.vcv.on("ready",function(i,e){if(i!=="merge"){var s="[data-vce-sticky-element]";var c=document.querySelector(s);if(c){var n={wrap:true,stickyAttribute:"data-vcv-sticky-element-active"};var r=i?500:10;console.log(t.vcStickySettings);if(t.vcSticky){setTimeout(function(){if(t.vcStickySettings){t.vcStickySettings.destroy()}t.vcStickySettings=new t.vcSticky(s,n)},r)}else{console.error("vcSticky library is not enqueued")}}}})})(window)},0:function(t,i,e){e("./src/stickyElement.js");e("./src/stickyElementStarter.js");t.exports=e("./src/stickyElement.css")}});