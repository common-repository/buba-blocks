!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=27)}([function(e,t){e.exports=window.wp.element},function(e,t){e.exports=window.wp.i18n},function(e,t){e.exports=window.wp.components},function(e,t){e.exports=window.wp.blockEditor},function(e,t,r){var n=r(22),o=r(23),l=r(24),a=r(26);e.exports=function(e,t){return n(e)||o(e,t)||l(e,t)||a()}},function(e,t,r){var n;
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var l=typeof n;if("string"===l||"number"===l)e.push(n);else if(Array.isArray(n)){if(n.length){var a=o.apply(null,n);a&&e.push(a)}}else if("object"===l)if(n.toString===Object.prototype.toString)for(var c in n)r.call(n,c)&&n[c]&&e.push(c);else e.push(n.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,r){var n=r(17),o=r(18),l=r(19),a=r(21);e.exports=function(e,t){return n(e)||o(e,t)||l(e,t)||a()},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){var r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(r){var n=new Uint8Array(16);e.exports=function(){return r(n),n}}else{var o=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),o[t]=e>>>((3&t)<<3)&255;return o}}},function(e,t){for(var r=[],n=0;n<256;++n)r[n]=(n+256).toString(16).substr(1);e.exports=function(e,t){var n=t||0,o=r;return[o[e[n++]],o[e[n++]],o[e[n++]],o[e[n++]],"-",o[e[n++]],o[e[n++]],"-",o[e[n++]],o[e[n++]],"-",o[e[n++]],o[e[n++]],"-",o[e[n++]],o[e[n++]],o[e[n++]],o[e[n++]],o[e[n++]],o[e[n++]]].join("")}},function(e,t){e.exports=window.wp.blocks},function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},function(e,t){function r(){return e.exports=r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},r.apply(this,arguments)}e.exports=r},function(e,t,r){var n=r(15),o=r(16),l=o;l.v1=n,l.v4=o,e.exports=l},function(e,t,r){var n,o,l=r(8),a=r(9),c=0,u=0;e.exports=function(e,t,r){var i=t&&r||0,b=t||[],s=(e=e||{}).node||n,p=void 0!==e.clockseq?e.clockseq:o;if(null==s||null==p){var f=l();null==s&&(s=n=[1|f[0],f[1],f[2],f[3],f[4],f[5]]),null==p&&(p=o=16383&(f[6]<<8|f[7]))}var d=void 0!==e.msecs?e.msecs:(new Date).getTime(),O=void 0!==e.nsecs?e.nsecs:u+1,m=d-c+(O-u)/1e4;if(m<0&&void 0===e.clockseq&&(p=p+1&16383),(m<0||d>c)&&void 0===e.nsecs&&(O=0),O>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");c=d,u=O,o=p;var y=(1e4*(268435455&(d+=122192928e5))+O)%4294967296;b[i++]=y>>>24&255,b[i++]=y>>>16&255,b[i++]=y>>>8&255,b[i++]=255&y;var v=d/4294967296*1e4&268435455;b[i++]=v>>>8&255,b[i++]=255&v,b[i++]=v>>>24&15|16,b[i++]=v>>>16&255,b[i++]=p>>>8|128,b[i++]=255&p;for(var j=0;j<6;++j)b[i+j]=s[j];return t||a(b)}},function(e,t,r){var n=r(8),o=r(9);e.exports=function(e,t,r){var l=t&&r||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var a=(e=e||{}).random||(e.rng||n)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t)for(var c=0;c<16;++c)t[l+c]=a[c];return t||o(a)}},function(e,t){e.exports=function(e){if(Array.isArray(e))return e},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,l=[],a=!0,c=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(l.push(n.value),!t||l.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(c)throw o}}return l}},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,r){var n=r(20);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},function(e,t){e.exports=function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,l=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,l=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw l}}return r}}},function(e,t,r){var n=r(25);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(e,t,r){"use strict";r.r(t);var n=r(1),o=r(10),l=r(0),a=r(5),c=r.n(a),u=(r(14),r(3)),i=r(6),b=r.n(i),s=r(7),p=r.n(s),f=r(2),d=r(11),O=r.n(d),m=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r={};if(e&&Object.keys(e).length>0)for(var n in e)r[t?"--"+t+"-"+n:"--"+n]=e[n];return r},y=function(e){return"string"==typeof e?function(e){if(!e&&0===e.length)return!1;var t={},r=e.split(" ");return t.top=r[0],t.right=r[1],t.bottom=r[2],t.left=r[3],t}(e):"object"===O()(e)&&(t=e,!(Object.keys(t).length<4)&&(r=t.top,r+=" "+t.right,r+=" "+t.bottom,r+=" "+t.left));var t,r},v=r(4),j=r.n(v),g=[],x=function(e){var t=e.label,r=e.color;return Object(l.createElement)("p",{style:{display:"flex",alignItems:"center",marginBottom:"0"}},Object(l.createElement)("strong",null,t),Object(l.createElement)(f.ColorIndicator,{colorValue:r}))},h=function(e){var t=e.label,r=e.value,o=e.onChange,a=e.gradientLock,c=e.is,i=[{name:"solid",title:Object(n.__)("Solid","buba-blocks"),className:"tab-solid"},{name:"gradient",title:Object(n.__)("Gradient","buba-blocks"),className:"tab-gradient"}],b=Object(u.useSetting)("color.gradients")||g,s=Object(u.useSetting)("color.palette")||g,p=Object(l.useState)(r||"#000"),d=j()(p,2),O=d[0],m=d[1];return Object(l.useMemo)((function(){o(O)}),[O]),!c&&Object(l.createElement)(f.PanelBody,{title:Object(l.createElement)(x,{color:O,label:t}),initialOpen:!1},Object(l.createElement)("div",{style:{marginTop:"20px"}}),a?Object(l.createElement)(f.ColorPalette,{colors:s,value:O,onChange:m}):Object(l.createElement)(f.TabPanel,{tabs:i,activeClass:"active-tab"},(function(e){return"solid"===e.name?Object(l.createElement)(f.ColorPalette,{colors:s,value:O,onChange:m}):"gradient"===e.name&&Object(l.createElement)(f.__experimentalGradientPicker,{value:O,onChange:m,gradients:b})})))},_=r(12),w=r.n(_),E=[{label:"None",value:"none"},{label:"Solid",value:"solid"},{label:"Dotted",value:"dotted"},{label:"Dashed",value:"dashed"},{label:"Double",value:"double"},{label:"Groove",value:"groove"},{label:"Inset",value:"inset"},{label:"Outset",value:"outset"},{label:"Ridge",value:"ridge"}];function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function S(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){w()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var P=function(e){var t=e.value,r=e.onChange,o=e.sizes||{top:"1px",bottom:"1px",right:"1px",left:"1px"},a=Object(l.useState)(t||{}),c=j()(a,2),u=c[0],i=c[1];return Object(l.useEffect)((function(){r(u)}),[u]),Object(l.createElement)(f.PanelBody,{title:Object(n.__)("Border","buba-blocks"),initialOpen:!1},Object(l.createElement)("div",{style:{marginTop:"20px"}}),Object(l.createElement)("div",{className:"buba-blocks-side-box"},Object(l.createElement)(h,{label:Object(n.__)("Color","buba-blocks"),value:u.borderColor||"#fff",onChange:function(e){return i(S(S({},u),{},{borderColor:e}))},gradientLock:!0})),Object(l.createElement)("div",{className:"buba-blocks-box-edit"},Object(l.createElement)(f.__experimentalBoxControl,{label:Object(n.__)("Width","buba-blocks"),value:y(u.borderWidth)||o,onChange:function(e){return i(S(S({},u),{},{borderWidth:y(e)}))},resetValues:o}),Object(l.createElement)(f.SelectControl,{label:Object(n.__)("Style","buba-blocks"),value:u.borderStyle||"solid",options:E,onChange:function(e){return i(S(S({},u),{},{borderStyle:e}))}})))},C=[{name:Object(n.__)("Small","buba-blocks"),slug:"small",size:12},{name:Object(n.__)("Normal","buba-blocks"),slug:"normal",size:16},{name:Object(n.__)("Medium","buba-blocks"),slug:"medium",size:20},{name:Object(n.__)("Big","buba-blocks"),slug:"big",size:26},{name:Object(n.__)("Huge","buba-blocks"),slug:"huge",size:40}],A=r(13),M=r.n(A),B=[{label:Object(n.__)("Pixels","buba-blocks"),value:"px"},{label:Object(n.__)("Percent","buba-blocks"),value:"%"},{label:Object(n.__)("Regarding parent FS","buba-blocks"),value:"em"},{label:Object(n.__)("Regarding window FS","buba-blocks"),value:"rem"},{label:Object(n.__)("Window height","buba-blocks"),value:"vh"},{label:Object(n.__)("Window width","buba-blocks"),value:"vw"}],D=function(e){var t=e.Component,r=e.onChange,n=e.label,o=e.value,a=Object(l.useState)(B[0].value),c=j()(a,2),u=c[0],i=c[1],b=Object(l.useState)(parseInt(o)),s=j()(b,2),p=s[0],d=s[1];Object(l.useMemo)((function(){r(p+u)}),[p,u]);return Object(l.createElement)(f.PanelBody,{title:n,initialOpen:!1},Object(l.createElement)(t,M()({},e,{onChange:d,value:p})),Object(l.createElement)("div",{style:{marginTop:"-20px"}}),Object(l.createElement)(f.SelectControl,{options:B,value:u,onChange:i}))},z=function(e){var t=e.value,r=e.onChange,n=(e.label,e.min),o=e.max,a=e.step,c=Object(l.useState)(t),u=j()(c,2),i=u[0],b=u[1];return Object(l.useEffect)((function(){r(i)}),[i]),Object(l.createElement)(f.RangeControl,{min:n||1,max:o||100,step:a||1,value:i,onChange:b})},I=function(e){var t=e.onChange,r=e.value,n=e.options,o=e.label,a=e.min,c=e.max,u=e.step;return Object(l.createElement)(D,{onChange:t,value:r,options:n,Component:z,label:o,min:a,max:c,step:u})};function T(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function R(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?T(Object(r),!0).forEach((function(t){b()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):T(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var q={top:"0px",left:"0px",right:"0px",bottom:"1px"},N={top:"20px",left:"0px",right:"0px",bottom:"20px"};function V(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?V(Object(r),!0).forEach((function(t){b()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):V(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var W=function(e){return function(t){var r=t.setAttributes,o=t.attributes,a=Object(l.useState)(o.inspector||{required:!1}),c=p()(a,2),i=c[0],b=c[1];return Object(l.useEffect)((function(){r({inspector:i})}),[i]),Object(l.createElement)(l.Fragment,null,Object(l.createElement)(u.InspectorControls,null,Object(l.createElement)(f.PanelBody,{title:Object(n.__)("Settings","buba-blocks"),initialOpen:!1},Object(l.createElement)(f.ToggleControl,{label:Object(n.__)("Required","buba-blocks"),checked:i.required||!1,onChange:function(e){return b(F(F({},i),{},{required:e}))}}))),Object(l.createElement)(e,t))}}(function(e){return function(t){var r=t.attributes,o=t.setAttributes,a=Object(l.useState)(r.styles||{}),c=p()(a,2),i=c[0],b=c[1];return Object(l.useMemo)((function(){o({styles:i})}),[i]),Object(l.createElement)(l.Fragment,null,Object(l.createElement)(u.InspectorControls,null,Object(l.createElement)(f.PanelBody,{title:Object(n.__)("Styles","buba-blocks"),initialOpen:!1},Object(l.createElement)("div",{className:"buba-blocks-side-box"},Object(l.createElement)(P,{value:i.border||{},onChange:function(e){return b(R(R({},i),e))},sizes:q}),Object(l.createElement)(I,{onChange:function(e){return b(R(R({},i),{},{borderRadius:e}))},value:i.borderRadius||0,label:Object(n.__)("Border radius","buba-blocks")}),Object(l.createElement)(h,{label:Object(n.__)("Background","buba-blocks"),value:i.background||"transparent",onChange:function(e){return b(R(R({},i),{},{background:e}))}}),Object(l.createElement)(h,{label:Object(n.__)("Color","buba-blocks"),value:i.color||"#fff",onChange:function(e){return b(R(R({},i),{},{color:e}))},gradientLock:!0}),Object(l.createElement)(f.PanelBody,{title:Object(n.__)("Font size","buba-blocks"),initialOpen:!1},Object(l.createElement)(f.FontSizePicker,{value:i.fontSize?parseInt(i.fontSize):16,fallbackFontSize:18,fontSizes:C,onChange:function(e){return b(R(R({},i),{},{fontSize:e+"px"}))}})),Object(l.createElement)(f.PanelBody,{title:Object(n.__)("Padding","buba-blocks"),initialOpen:!1},Object(l.createElement)("div",{style:{marginTop:"20px"}}),Object(l.createElement)(f.__experimentalBoxControl,{value:y(i.padding)||N,onChange:function(e){return b(R(R({},i),{},{padding:y(e)}))},resetValues:N}))))),Object(l.createElement)(e,t))}}((function(e){var t=e.attributes,r=e.setAttributes,o=t.styles,a=t.text,i=(t.inspector,Object(u.useBlockProps)({className:c()("buba-blocks-tel-input"),style:m(o,"buba-blocks-tel-input")}));return Object(l.createElement)("p",i,Object(l.createElement)("input",{value:a,onChange:function(e){return r({text:e.target.value})},placeholder:Object(n.__)("Enter placeholder...","buba-blocks"),type:"text"}))}))),G=function(e){var t=e.attributes,r=t.styles,n=t.text,o=t.inspector;return Object(l.createElement)("div",u.useBlockProps.save({className:c()("buba-blocks-tel-input"),style:m(r,"buba-blocks-tel-input")}),Object(l.createElement)("input",{placeholder:n,name:"tel",type:"tel",required:o.required}))};Object(o.registerBlockType)("buba-blocks/form-tel",{apiVersion:2,title:Object(n.__)("Telephone","buba-blocks"),parent:["buba-blocks/form"],icon:"smartphone",category:"buba",attributes:{styles:{type:"object",default:{}},text:{type:"string",default:null},inspector:{type:"object"}},edit:W,save:G})}]);