!function(){var e={42:function(e,t){var r;!function(){"use strict";var a={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=typeof r;if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)){if(r.length){var o=i.apply(null,r);o&&e.push(o)}}else if("object"===n){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){e.push(r.toString());continue}for(var l in r)a.call(r,l)&&r[l]&&e.push(l)}}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r)}()}},t={};function r(a){var i=t[a];if(void 0!==i)return i.exports;var n=t[a]={exports:{}};return e[a](n,n.exports,r),n.exports}r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";var e=window.wp.element,t=window.wp.i18n,a=window.wp.blocks;function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function n(e,t,r){return(t=function(e){var t=function(e,t){if("object"!==i(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var a=r.call(e,"string");if("object"!==i(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===i(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var o=r(42),l=r.n(o),c=window.lodash,s=window.wp.blockEditor;function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=function(e){if(!e.customBackgroundColor)return e;var t={color:{background:e.customBackgroundColor}};return m(m({},(0,c.omit)(e,["customBackgroundColor"])),{},{style:t})},g={align:{type:"string",default:"wide"},backgroundColor:{type:"string"},mediaAlt:{type:"string",source:"attribute",selector:"figure img",attribute:"alt",default:""},mediaPosition:{type:"string",default:"left"},mediaId:{type:"number"},mediaType:{type:"string"},mediaWidth:{type:"number",default:50},isStackedOnMobile:{type:"boolean",default:!1}},p=[{attributes:m(m({},g),{},{customBackgroundColor:{type:"string"},mediaLink:{type:"string"},linkDestination:{type:"string"},linkTarget:{type:"string",source:"attribute",selector:"figure a",attribute:"target"},href:{type:"string",source:"attribute",selector:"figure a",attribute:"href"},rel:{type:"string",source:"attribute",selector:"figure a",attribute:"rel"},linkClass:{type:"string",source:"attribute",selector:"figure a",attribute:"class"},verticalAlignment:{type:"string"},imageFill:{type:"boolean"},focalPoint:{type:"object"}}),migrate:d,save:function(t){var r,a=t.attributes,i=a.backgroundColor,o=a.customBackgroundColor,u=a.isStackedOnMobile,m=a.mediaAlt,d=a.mediaPosition,g=a.mediaType,p=a.mediaUrl,b=a.mediaWidth,f=a.mediaId,h=a.verticalAlignment,v=a.imageFill,y=a.focalPoint,k=a.linkClass,C=a.href,E=a.linkTarget,w=a.rel,_=(0,c.isEmpty)(w)?void 0:w,S=(0,e.createElement)("img",{src:p,alt:m,className:f&&"image"===g?"wp-image-".concat(f):null});C&&(S=(0,e.createElement)("a",{className:k,href:C,target:E,rel:_},S));var O,x={image:function(){return S},video:function(){return(0,e.createElement)("video",{controls:!0,src:p})}},M=(0,s.getColorClassName)("background-color",i),P=l()((n(r={"has-media-on-the-right":"right"===d,"has-background":M||o},M,M),n(r,"is-stacked-on-mobile",u),n(r,"is-vertically-aligned-".concat(h),h),n(r,"is-image-fill",v),r)),T=v?imageFillStyles(p,y):{};50!==b&&(O="right"===d?"auto ".concat(b,"%"):"".concat(b,"% auto"));var I={backgroundColor:M?void 0:o,gridTemplateColumns:O};return(0,e.createElement)("div",{className:P,style:I},(0,e.createElement)("figure",{className:"wp-block-media-text__media",style:T},(x[g]||c.noop)()),(0,e.createElement)("div",{className:"wp-block-media-text__content"},(0,e.createElement)(s.InnerBlocks.Content,null)))}},{attributes:m(m({},g),{},{customBackgroundColor:{type:"string"},mediaUrl:{type:"string",source:"attribute",selector:"figure video,figure img",attribute:"src"},verticalAlignment:{type:"string"},imageFill:{type:"boolean"},focalPoint:{type:"object"}}),migrate:d,save:function(t){var r,a,i=t.attributes,o=i.backgroundColor,u=i.customBackgroundColor,m=i.isStackedOnMobile,d=i.mediaAlt,g=i.mediaPosition,p=i.mediaType,b=i.mediaUrl,f=i.mediaWidth,h=i.mediaId,v=i.verticalAlignment,y=i.imageFill,k=i.focalPoint,C={image:function(){return(0,e.createElement)("img",{src:b,alt:d,className:h&&"image"===p?"wp-image-".concat(h):null})},video:function(){return(0,e.createElement)("video",{controls:!0,src:b})}},E=(0,s.getColorClassName)("background-color",o),w=l()((n(r={"has-media-on-the-right":"right"===g},E,E),n(r,"is-stacked-on-mobile",m),n(r,"is-vertically-aligned-".concat(v),v),n(r,"is-image-fill",y),r)),_=y?imageFillStyles(b,k):{};50!==f&&(a="right"===g?"auto ".concat(f,"%"):"".concat(f,"% auto"));var S={backgroundColor:E?void 0:u,gridTemplateColumns:a};return(0,e.createElement)("div",{className:w,style:S},(0,e.createElement)("figure",{className:"wp-block-media-text__media",style:_},(C[p]||c.noop)()),(0,e.createElement)("div",{className:"wp-block-media-text__content"},(0,e.createElement)(s.InnerBlocks.Content,null)))}},{attributes:m(m({},g),{},{customBackgroundColor:{type:"string"},mediaUrl:{type:"string",source:"attribute",selector:"figure video,figure img",attribute:"src"}}),save:function(t){var r,a,i=t.attributes,o=i.backgroundColor,u=i.customBackgroundColor,m=i.isStackedOnMobile,d=i.mediaAlt,g=i.mediaPosition,p=i.mediaType,b=i.mediaUrl,f=i.mediaWidth,h={image:function(){return(0,e.createElement)("img",{src:b,alt:d})},video:function(){return(0,e.createElement)("video",{controls:!0,src:b})}},v=(0,s.getColorClassName)("background-color",o),y=l()((n(r={"has-media-on-the-right":"right"===g},v,v),n(r,"is-stacked-on-mobile",m),r));50!==f&&(a="right"===g?"auto ".concat(f,"%"):"".concat(f,"% auto"));var k={backgroundColor:v?void 0:u,gridTemplateColumns:a};return(0,e.createElement)("div",{className:y,style:k},(0,e.createElement)("figure",{className:"wp-block-media-text__media"},(h[p]||c.noop)()),(0,e.createElement)("div",{className:"wp-block-media-text__content"},(0,e.createElement)(s.InnerBlocks.Content,null)))}}],b=window.wp.data,f=window.wp.components;function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},h.apply(this,arguments)}var v=window.wp.compose,y=(0,e.createElement)(f.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(f.Path,{d:"M18 2l2 4h-2l-2-4h-3l2 4h-2l-2-4h-1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2zm2 12H10V4.4L11.8 8H20z"}),(0,e.createElement)(f.Path,{d:"M14 20H4V10h3V8H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3h-2z"}),(0,e.createElement)(f.Path,{d:"M5 19h8l-1.59-2H9.24l-.84 1.1L7 16.3 5 19z"})),k=["isSelected","isStackedOnMobile"],C=["image","video"];function E(t){var r=t.isSelected,a=t.isStackedOnMobile,i=function(e,t){if(null==e)return{};var r,a,i=function(e,t){if(null==e)return{};var r,a,i={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}(t,k),n=(0,v.useViewportMatch)("small","<");return(0,e.createElement)(f.ResizableBox,h({showHandle:r&&(!n||!a)},i))}function w(t){var r=t.mediaId,a=t.mediaUrl,i=t.onSelectMedia;return(0,e.createElement)(s.BlockControls,null,(0,e.createElement)(s.MediaReplaceFlow,{mediaId:r,mediaURL:a,allowedTypes:C,accept:"image/*,video/*",onSelect:i}))}function _(r){var a=r.className,i=r.noticeOperations,n=r.noticeUI,o=r.onSelectMedia;return(0,e.createElement)(s.MediaPlaceholder,{icon:(0,e.createElement)(s.BlockIcon,{icon:y}),labels:{title:(0,t.__)("Media area","buba-blocks")},className:a,onSelect:o,accept:"image/*,video/*",allowedTypes:C,notices:n,onError:function(e){i.removeAllNotices(),i.createErrorNotice(e)}})}var S=(0,f.withNotices)((function(t){var r=t.className,a=t.isSelected,i=t.isStackedOnMobile,n=t.mediaAlt,o=t.mediaId,s=t.mediaType,u=t.mediaUrl,m=(t.mediaWidth,t.height),d=t.onSelectMedia,g=t.setAttributes,p=(0,b.useDispatch)("core/block-editor").toggleSelection;if(s&&u){var f={image:function(){return(0,e.createElement)("img",{src:u,alt:n})},video:function(){return(0,e.createElement)("video",{controls:!0,src:u})}};return(0,e.createElement)(E,{as:"figure",className:l()(r,"editor-media-container__resizer"),size:{height:m},minWidth:"10%",maxWidth:"100%",isSelected:a,isStackedOnMobile:i,enable:{top:!1,right:!1,bottom:!0,left:!1,topRight:!1,bottomRight:!1,bottomLeft:!1,topLeft:!1},onResizeStop:function(e,t,r,a){g({height:parseInt(m+a.height,10)}),p(!0)},onResizeStart:function(){p(!1)}},(0,e.createElement)(w,{onSelectMedia:d,mediaUrl:u,mediaId:o}),(f[s]||c.noop)())}return(0,e.createElement)(_,t)})),O=[["core/heading",{fontSize:"large",placeholder:(0,t._x)("Title…","title placeholder")}],["core/paragraph",{fontSize:"normal",placeholder:(0,t._x)("Content…","content placeholder")}]],x={from:[{type:"block",blocks:["core/image"],transform:function(e){var t=e.alt,r=e.url,i=e.id,n=e.anchor;return(0,a.createBlock)("core/media-text",{mediaAlt:t,mediaId:i,mediaUrl:r,mediaType:"image",anchor:n})}},{type:"block",blocks:["core/video"],transform:function(e){var t=e.src,r=e.id,i=e.anchor;return(0,a.createBlock)("core/media-text",{mediaId:r,mediaUrl:t,mediaType:"video",anchor:i})}}],to:[{type:"block",blocks:["core/image"],isMatch:function(e){var t=e.mediaType;return!e.mediaUrl||"image"===t},transform:function(e){var t=e.mediaAlt,r=e.mediaId,i=e.mediaUrl,n=e.anchor;return(0,a.createBlock)("core/image",{alt:t,id:r,url:i,anchor:n})}},{type:"block",blocks:["core/video"],isMatch:function(e){var t=e.mediaType;return!e.mediaUrl||"video"===t},transform:function(e){var t=e.mediaId,r=e.mediaUrl,i=e.anchor;return(0,a.createBlock)("core/video",{id:t,src:r,anchor:i})}}]};(0,a.registerBlockType)("buba-blocks/card",{apiVersion:2,title:(0,t.__)("Card","buba-blocks"),icon:(0,e.createElement)(f.Icon,{icon:function(){return(0,e.createElement)(f.SVG,{width:"64",height:"64",viewBox:"0 0 64 64",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(f.Path,{d:"M40 53.3333H13.3333C9.79841 53.3291 6.40949 51.923 3.90992 49.4234C1.41035 46.9239 0.00423429 43.5349 0 40L0 13.3333C0.00423429 9.79841 1.41035 6.40949 3.90992 3.90992C6.40949 1.41035 9.79841 0.00423429 13.3333 0L40 0C43.5349 0.00423429 46.9239 1.41035 49.4234 3.90992C51.923 6.40949 53.3291 9.79841 53.3333 13.3333V40C53.3291 43.5349 51.923 46.9239 49.4234 49.4234C46.9239 51.923 43.5349 53.3291 40 53.3333ZM13.3333 5.33333C11.2116 5.33333 9.17677 6.17619 7.67648 7.67648C6.17619 9.17677 5.33333 11.2116 5.33333 13.3333V40C5.33333 42.1217 6.17619 44.1566 7.67648 45.6569C9.17677 47.1571 11.2116 48 13.3333 48H40C42.1217 48 44.1566 47.1571 45.6569 45.6569C47.1571 44.1566 48 42.1217 48 40V13.3333C48 11.2116 47.1571 9.17677 45.6569 7.67648C44.1566 6.17619 42.1217 5.33333 40 5.33333H13.3333ZM64 50.6667V16C64 15.2928 63.7191 14.6145 63.219 14.1144C62.7189 13.6143 62.0406 13.3333 61.3333 13.3333C60.6261 13.3333 59.9478 13.6143 59.4477 14.1144C58.9476 14.6145 58.6667 15.2928 58.6667 16V50.6667C58.6667 52.7884 57.8238 54.8232 56.3235 56.3235C54.8232 57.8238 52.7884 58.6667 50.6667 58.6667H16C15.2928 58.6667 14.6145 58.9476 14.1144 59.4477C13.6143 59.9478 13.3333 60.6261 13.3333 61.3333C13.3333 62.0406 13.6143 62.7189 14.1144 63.219C14.6145 63.7191 15.2928 64 16 64H50.6667C54.2016 63.9958 57.5905 62.5897 60.0901 60.0901C62.5897 57.5905 63.9958 54.2016 64 50.6667Z",fill:"black"}),(0,e.createElement)(f.Path,{d:"M40 53.3333H13.3333C9.79841 53.3291 6.40949 51.923 3.90992 49.4234C1.41035 46.9239 0.00423429 43.5349 0 40L0 13.3333C0.00423429 9.79841 1.41035 6.40949 3.90992 3.90992C6.40949 1.41035 9.79841 0.00423429 13.3333 0L40 0C43.5349 0.00423429 46.9239 1.41035 49.4234 3.90992C51.923 6.40949 53.3291 9.79841 53.3333 13.3333V40C53.3291 43.5349 51.923 46.9239 49.4234 49.4234C46.9239 51.923 43.5349 53.3291 40 53.3333ZM13.3333 5.33333C11.2116 5.33333 9.17677 6.17619 7.67648 7.67648C6.17619 9.17677 5.33333 11.2116 5.33333 13.3333V40C5.33333 42.1217 6.17619 44.1566 7.67648 45.6569C9.17677 47.1571 11.2116 48 13.3333 48H40C42.1217 48 44.1566 47.1571 45.6569 45.6569C47.1571 44.1566 48 42.1217 48 40V13.3333C48 11.2116 47.1571 9.17677 45.6569 7.67648C44.1566 6.17619 42.1217 5.33333 40 5.33333H13.3333ZM64 50.6667V16C64 15.2928 63.7191 14.6145 63.219 14.1144C62.7189 13.6143 62.0406 13.3333 61.3333 13.3333C60.6261 13.3333 59.9478 13.6143 59.4477 14.1144C58.9476 14.6145 58.6667 15.2928 58.6667 16V50.6667C58.6667 52.7884 57.8238 54.8232 56.3235 56.3235C54.8232 57.8238 52.7884 58.6667 50.6667 58.6667H16C15.2928 58.6667 14.6145 58.9476 14.1144 59.4477C13.6143 59.9478 13.3333 60.6261 13.3333 61.3333C13.3333 62.0406 13.6143 62.7189 14.1144 63.219C14.6145 63.7191 15.2928 64 16 64H50.6667C54.2016 63.9958 57.5905 62.5897 60.0901 60.0901C62.5897 57.5905 63.9958 54.2016 64 50.6667Z",fill:"url(#paint0_linear)"}),(0,e.createElement)("defs",null,(0,e.createElement)("linearGradient",{id:"paint0_linear",x1:"0",y1:"64",x2:"68.382",y2:"58.9137",gradientUnits:"userSpaceOnUse"},(0,e.createElement)("stop",{"stop-color":"#EB9440"}),(0,e.createElement)("stop",{offset:"0.302083","stop-color":"#FA4259"}),(0,e.createElement)("stop",{offset:"0.651042","stop-color":"#CC4CC2"}),(0,e.createElement)("stop",{offset:"1","stop-color":"#7140FF"}))))}}),category:"buba",attributes:{mediaAlt:{type:"string",source:"attribute",selector:"figure img",attribute:"alt",default:""},mediaId:{type:"number"},mediaUrl:{type:"string",source:"attribute",selector:"figure video,figure img",attribute:"src"},mediaLink:{type:"string"},linkDestination:{type:"string"},linkTarget:{type:"string",source:"attribute",selector:"figure a",attribute:"target"},href:{type:"string",source:"attribute",selector:"figure a",attribute:"href"},rel:{type:"string",source:"attribute",selector:"figure a",attribute:"rel"},linkClass:{type:"string",source:"attribute",selector:"figure a",attribute:"class"},mediaType:{type:"string"},mediaWidth:{type:"number",default:100},height:{type:"number",default:350},isStackedOnMobile:{type:"boolean",default:!0}},supports:{anchor:!0,html:!1,lightBlockWrapper:!0,color:{gradient:!1,background:!0,text:!1}},example:{attributes:{mediaType:"image",mediaUrl:"https://s.w.org/images/core/5.3/Biologia_Centrali-Americana_-_Cantorchilus_semibadius_1902.jpg"},innerBlocks:[{name:"core/heading",attributes:{content:(0,t.__)("Card Title.","buba-blocks"),align:"center"}},{name:"core/paragraph",attributes:{content:(0,t.__)("— Kobayashi Issa (一茶)","buba-blocks")}}]},styles:[{name:"elevated",label:(0,t.__)("Elevated (shadowed)","buba-blocks")},{name:"outline",label:(0,t.__)("Outline","buba-blocks"),isDefault:!0}],transforms:x,edit:function(r){var a=r.attributes,i=r.isSelected,n=r.setAttributes,o=a.href,c=a.isStackedOnMobile,u=a.linkClass,m=a.linkDestination,d=a.linkTarget,g=a.mediaAlt,p=a.mediaId,h=a.mediaType,v=a.mediaUrl,y=a.mediaWidth,k=a.rel,C=a.height,E=(0,b.useSelect)((function(e){return p&&i?e("core").getMedia(p):null}),[i,p]),w=function(e){var t=e.attributes,r=t.linkDestination,a=t.href,i=e.setAttributes;return function(e){var t,n,o,l;"image"===(t=e.media_type?"image"===e.media_type?"image":"video":e.type)&&(n=(null===(o=e.sizes)||void 0===o||null===(o=o.large)||void 0===o?void 0:o.url)||(null===(l=e.media_details)||void 0===l||null===(l=l.sizes)||void 0===l||null===(l=l.large)||void 0===l?void 0:l.source_url));var c=a;"media"===r&&(c=e.url),"attachment"===r&&(c=e.link),i({mediaAlt:e.alt,mediaId:e.id,mediaType:t,mediaUrl:n||e.url,mediaLink:e.link||void 0,href:c})}}({attributes:a,setAttributes:n}),_=l()({"is-selected":i,"is-stacked-on-mobile":c}),x=(0,e.createElement)(f.PanelBody,{title:(0,t.__)("Media & Text settings","buba-blocks")},(0,e.createElement)(f.ToggleControl,{label:(0,t.__)("Stack on mobile","buba-blocks"),checked:c,onChange:function(){return n({isStackedOnMobile:!c})}}),"image"===h&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(f.TextareaControl,{label:(0,t.__)("Alt text (alternative text)","buba-blocks"),value:g,onChange:function(e){n({mediaAlt:e})},help:(0,e.createElement)(e.Fragment,null,(0,e.createElement)(f.ExternalLink,{href:"https://www.w3.org/WAI/tutorials/images/decision-tree"},(0,t.__)("Describe the purpose of the image","buba-blocks")),(0,t.__)("Leave empty if the image is purely decorative.","buba-blocks"))}),(0,e.createElement)(f.__experimentalNumberControl,{isShiftStepEnabled:!0,onChange:function(e){return n({height:parseInt(e)})},shiftStep:1,label:(0,t.__)("Height(px)","buba-blocks"),value:C}))),M=(0,s.useBlockProps)({className:_});return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(s.InspectorControls,null,x),(0,e.createElement)(s.BlockControls,null,"image"===h&&(0,e.createElement)(f.ToolbarGroup,null,(0,e.createElement)(s.__experimentalImageURLInputUI,{url:o||"",onChangeUrl:function(e){n(e)},linkDestination:m,mediaType:h,mediaUrl:E&&E.source_url,mediaLink:E&&E.link,linkTarget:d,linkClass:u,rel:k}))),(0,e.createElement)("div",M,(0,e.createElement)(S,{className:"wp-block-card__media",onSelectMedia:w,isSelected:i,isStackedOnMobile:c,mediaAlt:g,mediaId:p,mediaType:h,mediaUrl:v,mediaWidth:y,height:C,setAttributes:n}),(0,e.createElement)(s.InnerBlocks,{__experimentalTagName:"div",__experimentalPassedProps:{className:"wp-block-card__content"},template:O,templateInsertUpdatesSelection:!1})))},save:function(t){var r=t.attributes,a=r.isStackedOnMobile,i=r.mediaAlt,n=r.mediaType,o=r.mediaUrl,u=r.mediaId,m=r.linkClass,d=r.href,g=r.linkTarget,p=r.rel,b=r.height,f=(0,c.isEmpty)(p)?void 0:p,h=(0,e.createElement)("img",{src:o,alt:i,className:u&&"image"===n?"wp-image-".concat(u):null});d&&(h=(0,e.createElement)("a",{className:m,href:d,target:g,rel:f},h));var v={image:function(){return h},video:function(){return(0,e.createElement)("video",{controls:!0,src:o})}},y=l()("buba-card-block",{"is-stacked-on-mobile":a});return(0,e.createElement)("div",s.useBlockProps.save({className:y}),(0,e.createElement)("figure",{className:"wp-block-card__media",style:{height:b||0===b?b+"px":void 0}},(v[n]||c.noop)()),(0,e.createElement)("div",{className:"wp-block-card__content"},(0,e.createElement)(s.InnerBlocks.Content,null)))},deprecated:p})}()}();