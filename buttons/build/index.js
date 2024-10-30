!function(){var e={42:function(e,t){var n;!function(){"use strict";var o={}.hasOwnProperty;function l(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var a=typeof n;if("string"===a||"number"===a)e.push(n);else if(Array.isArray(n)){if(n.length){var r=l.apply(null,n);r&&e.push(r)}}else if("object"===a){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var s in n)o.call(n,s)&&n[s]&&e.push(s)}}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):void 0===(n=function(){return l}.apply(t,[]))||(e.exports=n)}()}},t={};function n(o){var l=t[o];if(void 0!==l)return l.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,n),a.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";var e=window.wp.element,t=window.wp.i18n,o=window.wp.blocks,l=n(42),a=n.n(l),r=window.wp.blockEditor,s=window.wp.components,i=[{label:(0,t.__)("Pixels","buba-blocks"),value:"px"},{label:(0,t.__)("Percent","buba-blocks"),value:"%"},{label:(0,t.__)("Regarding parent FS","buba-blocks"),value:"em"},{label:(0,t.__)("Regarding window FS","buba-blocks"),value:"rem"},{label:(0,t.__)("Window height","buba-blocks"),value:"vh"},{label:(0,t.__)("Window width","buba-blocks"),value:"vw"}],c=t=>{const{Component:n,onChange:o,label:l,value:a}=t,[r,c]=(0,e.useState)(i[0].value),[u,b]=(0,e.useState)(parseInt(a));return(0,e.useMemo)((()=>{o(u+r)}),[u,r]),(0,e.createElement)(s.PanelBody,{title:l,initialOpen:!1},(0,e.createElement)(n,{...t,onChange:b,value:u}),(0,e.createElement)("div",{style:{marginTop:"-20px"}}),(0,e.createElement)(s.SelectControl,{options:i,value:r,onChange:c}))};const u=t=>{const{value:n,onChange:o,min:l,max:a,step:r}=t,[i,c]=(0,e.useState)(n);return(0,e.useEffect)((()=>{o(i)}),[i]),(0,e.createElement)(s.RangeControl,{min:l||1,max:a||100,step:r||1,value:i,onChange:c})};var b=t=>{const{onChange:n,value:o,options:l,label:a,min:r,max:s,step:i}=t;return(0,e.createElement)(c,{onChange:n,value:o,options:l,Component:u,label:a,min:r,max:s,step:i})};const p=(e,t=null)=>{const n={};if(e&&Object.keys(e).length>0)for(const o in e)n[t?"--"+t+"-"+o:"--"+o]=e[o];return n},C=["buba-blocks/button"],m=[[["buba-blocks/button"]]],f={type:"default",alignments:[]},v=["left","center","right"],g=["left","center","right","space-between"];var d,k=(d=t=>{const{attributes:n,setAttributes:o}=t,{contentJustification:l,orientation:s,styles:i}=n,c=(0,r.useBlockProps)({className:a()({[`is-content-justification-${l}`]:l,"wp-block-buba-blocks-buttons--vertical":"vertical"===s}),style:p(i,"buba-blocks-buttons")}),u=(0,r.useInnerBlocksProps)(c,{allowedBlocks:C,template:m,orientation:s,__experimentalLayout:f,templateInsertUpdatesSelection:!0}),b="vertical"===s?v:g;return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(r.BlockControls,{group:"block"},(0,e.createElement)(r.JustifyContentControl,{allowedControls:b,value:l,onChange:e=>o({contentJustification:e}),popoverProps:{position:"bottom right",isAlternate:!0}})),(0,e.createElement)("div",{...u}))},n=>{const{attributes:o,setAttributes:l}=n,[a,i]=(0,e.useState)(o.styles||{});return(0,e.useEffect)((()=>{l({styles:a})}),[a,l,o]),(0,e.createElement)(e.Fragment,null,(0,e.createElement)(r.InspectorControls,null,(0,e.createElement)(s.PanelBody,{title:(0,t.__)("Styles","buba-blocks"),initialOpen:!1},(0,e.createElement)(b,{onChange:e=>i({...a,gap:e}),value:a.gap||5,label:(0,t.__)("Set the gap and type of gap","buba-blocks"),min:5,max:100,step:5}))),(0,e.createElement)(d,{...n}))}),h=[{name:"buttons-horizontal",isDefault:!0,title:(0,t.__)("Horizontal","buba-blocks"),description:(0,t.__)("Buttons shown in a row.","buba-blocks"),attributes:{orientation:"horizontal"},scope:["transform"]},{name:"buttons-vertical",title:(0,t.__)("Vertical","buba-blocks"),description:(0,t.__)("Buttons shown in a column.","buba-blocks"),attributes:{orientation:"vertical"},scope:["transform"]}],w=[{supports:{align:["center","left","right"],anchor:!0},save(){return(0,e.createElement)("div",null,(0,e.createElement)(r.InnerBlocks.Content,null))},isEligible({align:e}){return e&&["center","left","right"].includes(e)},migrate(e){return{...e,align:void 0,contentJustification:e.align}}}],y=window.wp.richText;const E="buba-blocks/buttons";var _={from:[{type:"block",isMultiBlock:!0,blocks:["buba-blocks/button"],transform:e=>(0,o.createBlock)(E,{},e.map((e=>(0,o.createBlock)("buba-blocks/button",e))))},{type:"block",isMultiBlock:!0,blocks:["core/paragraph"],transform:e=>(0,o.createBlock)(E,{},e.map((e=>{const t=(0,y.__unstableCreateElement)(document,e.content),n=t.innerText||"",l=t.querySelector("a"),a=l?.getAttribute("href");return(0,o.createBlock)("buba-blocks/button",{text:n,url:a})}))),isMatch:e=>e.every((e=>{const t=(0,y.__unstableCreateElement)(document,e.content),n=t.innerText||"",o=t.querySelectorAll("a");return n.length<=30&&o.length<=1}))}]};(0,o.registerBlockType)("buba-blocks/buttons",{apiVersion:2,title:(0,t.__)("Buttons","buba-blocks"),icon:(0,e.createElement)(s.Icon,{icon:()=>(0,e.createElement)(s.SVG,{width:"64",height:"64",viewBox:"0 0 64 64",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(s.Path,{d:"M32 0C25.671 0 19.4841 1.87677 14.2218 5.39297C8.95939 8.90918 4.85787 13.9069 2.43587 19.7541C0.0138652 25.6014 -0.619842 32.0355 0.614885 38.2429C1.84961 44.4503 4.89732 50.1521 9.3726 54.6274C13.8479 59.1027 19.5497 62.1504 25.7571 63.3851C31.9645 64.6199 38.3987 63.9862 44.2459 61.5642C50.0931 59.1421 55.0908 55.0406 58.607 49.7783C62.1232 44.5159 64 38.329 64 32C63.9908 23.5159 60.6165 15.3819 54.6173 9.38272C48.6181 3.38354 40.4841 0.00917622 32 0V0ZM32 58.6667C26.7258 58.6667 21.5701 57.1027 17.1848 54.1725C12.7995 51.2424 9.38156 47.0776 7.36323 42.2049C5.34489 37.3322 4.8168 31.9704 5.84574 26.7976C6.87468 21.6248 9.41443 16.8732 13.1438 13.1438C16.8732 9.41442 21.6248 6.87467 26.7976 5.84573C31.9704 4.81679 37.3322 5.34488 42.2049 7.36321C47.0776 9.38155 51.2424 12.7995 54.1725 17.1848C57.1027 21.5701 58.6667 26.7258 58.6667 32C58.6589 39.0701 55.8469 45.8483 50.8476 50.8476C45.8483 55.8469 39.0701 58.6589 32 58.6667ZM45.3334 32C45.3334 32.7072 45.0524 33.3855 44.5523 33.8856C44.0522 34.3857 43.3739 34.6667 42.6667 34.6667H34.6667V42.6667C34.6667 43.3739 34.3857 44.0522 33.8856 44.5523C33.3855 45.0524 32.7073 45.3333 32 45.3333C31.2928 45.3333 30.6145 45.0524 30.1144 44.5523C29.6143 44.0522 29.3333 43.3739 29.3333 42.6667V34.6667H21.3333C20.6261 34.6667 19.9478 34.3857 19.4477 33.8856C18.9476 33.3855 18.6667 32.7072 18.6667 32C18.6667 31.2928 18.9476 30.6145 19.4477 30.1144C19.9478 29.6143 20.6261 29.3333 21.3333 29.3333H29.3333V21.3333C29.3333 20.6261 29.6143 19.9478 30.1144 19.4477C30.6145 18.9476 31.2928 18.6667 32 18.6667C32.7073 18.6667 33.3855 18.9476 33.8856 19.4477C34.3857 19.9478 34.6667 20.6261 34.6667 21.3333V29.3333H42.6667C43.3739 29.3333 44.0522 29.6143 44.5523 30.1144C45.0524 30.6145 45.3334 31.2928 45.3334 32Z",fill:"black"}),(0,e.createElement)(s.Path,{d:"M32 0C25.671 0 19.4841 1.87677 14.2218 5.39297C8.95939 8.90918 4.85787 13.9069 2.43587 19.7541C0.0138652 25.6014 -0.619842 32.0355 0.614885 38.2429C1.84961 44.4503 4.89732 50.1521 9.3726 54.6274C13.8479 59.1027 19.5497 62.1504 25.7571 63.3851C31.9645 64.6199 38.3987 63.9862 44.2459 61.5642C50.0931 59.1421 55.0908 55.0406 58.607 49.7783C62.1232 44.5159 64 38.329 64 32C63.9908 23.5159 60.6165 15.3819 54.6173 9.38272C48.6181 3.38354 40.4841 0.00917622 32 0V0ZM32 58.6667C26.7258 58.6667 21.5701 57.1027 17.1848 54.1725C12.7995 51.2424 9.38156 47.0776 7.36323 42.2049C5.34489 37.3322 4.8168 31.9704 5.84574 26.7976C6.87468 21.6248 9.41443 16.8732 13.1438 13.1438C16.8732 9.41442 21.6248 6.87467 26.7976 5.84573C31.9704 4.81679 37.3322 5.34488 42.2049 7.36321C47.0776 9.38155 51.2424 12.7995 54.1725 17.1848C57.1027 21.5701 58.6667 26.7258 58.6667 32C58.6589 39.0701 55.8469 45.8483 50.8476 50.8476C45.8483 55.8469 39.0701 58.6589 32 58.6667ZM45.3334 32C45.3334 32.7072 45.0524 33.3855 44.5523 33.8856C44.0522 34.3857 43.3739 34.6667 42.6667 34.6667H34.6667V42.6667C34.6667 43.3739 34.3857 44.0522 33.8856 44.5523C33.3855 45.0524 32.7073 45.3333 32 45.3333C31.2928 45.3333 30.6145 45.0524 30.1144 44.5523C29.6143 44.0522 29.3333 43.3739 29.3333 42.6667V34.6667H21.3333C20.6261 34.6667 19.9478 34.3857 19.4477 33.8856C18.9476 33.3855 18.6667 32.7072 18.6667 32C18.6667 31.2928 18.9476 30.6145 19.4477 30.1144C19.9478 29.6143 20.6261 29.3333 21.3333 29.3333H29.3333V21.3333C29.3333 20.6261 29.6143 19.9478 30.1144 19.4477C30.6145 18.9476 31.2928 18.6667 32 18.6667C32.7073 18.6667 33.3855 18.9476 33.8856 19.4477C34.3857 19.9478 34.6667 20.6261 34.6667 21.3333V29.3333H42.6667C43.3739 29.3333 44.0522 29.6143 44.5523 30.1144C45.0524 30.6145 45.3334 31.2928 45.3334 32Z",fill:"url(#paint0_linear)"}),(0,e.createElement)("defs",null,(0,e.createElement)("linearGradient",{id:"paint0_linear",x1:"0",y1:"64",x2:"68.382",y2:"58.9137",gradientUnits:"userSpaceOnUse"},(0,e.createElement)("stop",{"stop-color":"#EB9440"}),(0,e.createElement)("stop",{offset:"0.302083","stop-color":"#FA4259"}),(0,e.createElement)("stop",{offset:"0.651042","stop-color":"#CC4CC2"}),(0,e.createElement)("stop",{offset:"1","stop-color":"#7140FF"}))))}),category:"buba",attributes:{styles:{type:"Object",default:null}},supports:{anchor:!0,align:!1},example:{},styles:[],edit:k,save:t=>{const{attributes:n}=t,{contentJustification:o,orientation:l,styles:s}=n;return(0,e.createElement)("div",{...r.useBlockProps.save({className:a()({[`is-content-justification-${o}`]:o,"wp-block-buba-blocks-buttons--vertical":"vertical"===l}),style:p(s,"buba-blocks-buttons")})},(0,e.createElement)(r.InnerBlocks.Content,null))},variations:h,deprecated:w,transforms:_})}()}();