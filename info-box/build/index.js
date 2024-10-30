!function(e){var t={};function l(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,l),o.l=!0,o.exports}l.m=e,l.c=t,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)l.d(n,o,function(t){return e[t]}.bind(null,o));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l(l.s=5)}([function(e,t){!function(){e.exports=this.wp.element}()},function(e,t){!function(){e.exports=this.wp.components}()},function(e,t){!function(){e.exports=this.wp.i18n}()},function(e,t){!function(){e.exports=this.wp.blockEditor}()},function(e,t){!function(){e.exports=this.wp.blocks}()},function(e,t,l){"use strict";l.r(t);var n=l(0),o=l(2),i=l(4),a=l(3),c=l(1);function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.attributes,l=t.icon,o=t.isIcon,i=t.iconSize,a=t.image,c=t.imageMB,r=t.imageHeight,b=t.iconBox;return o&&l?Object(n.createElement)("div",{className:"wp-block-info-box__icon-wrapper",style:{padding:b.top+" "+b.right+" "+b.bottom+" "+b.left}},Object(n.createElement)("img",{src:l?l.sizes.full.url:null,alt:l?l.alt:null,style:{width:i[0],height:i[0],objectFit:"contain"}})):!(o||!a)&&Object(n.createElement)("div",{className:"wp-block-info-box__img-wrapper",style:{marginBottom:c}},Object(n.createElement)("img",{src:a?a.sizes.full.url:null,alt:a?a.alt:null,style:{width:"100%",height:a?r:"0",objectFit:"cover"}}))}var b=function(e){var t=e.attributes,l=e.setAttributes,i=null,b=null,u=null,s=null,m=null,p=null,g=t.titleDecoration,_=t.titleLineColor,O=t.titleMarginBottom,j=t.titlePaddingBottom,d=t.title,f=t.titlePosition,C=t.titleTag,x=t.textPosition,h=t.textSize,v=t.text,y=t.isIcon,E=t.isIconSize,B=t.iconSize,S=t.image,w=t.imageMB,k=t.imageHeight,P=t.iconBox,T=t.icon,M=Object(a.useBlockProps)({className:"wp-block-info-box"});return g&&(m=Object(n.createElement)(n.Fragment,null,Object(n.createElement)("p",null,"Line color:"),Object(n.createElement)(c.ColorPalette,{colors:[{name:Object(o.__)("Blue-sky"),color:"#14CBCB"},{name:Object(o.__)("Green"),color:"#B8D736"},{name:Object(o.__)("Orange"),color:"#FF8C1A"}],value:_,onChange:function(e){return l({titleLineColor:e})}})),p=Object(n.createElement)("div",{className:"wp-block-info-box__line",style:{backgroundColor:_}})),null!==S&&""!==S&&void 0!==S&&(u=Object(n.createElement)("img",{src:S.url,width:"100",height:"60",style:{objectFit:"cover",marginBottom:"10px",display:"block"}})),null!==T&&""!==T&&void 0!==T&&(s=Object(n.createElement)("img",{src:T.url,width:"60",height:"60",style:{objectFit:"cover",marginBottom:"10px",display:"block"}})),b=y?Object(n.createElement)(n.Fragment,null,s,Object(n.createElement)(a.MediaUpload,{onSelect:function(e){return l({icon:e})},allowedTypes:["image"],value:T,render:function(e){var t=e.open;return Object(n.createElement)(c.Button,{onClick:t,className:"is-large",isPrimary:!0,style:{marginBottom:"20px"}},Object(n.createElement)(c.Dashicon,{icon:"upload",style:{marginRight:"5px"}}),Object(o.__)("Select icon"))}}),T?Object(n.createElement)(c.Button,{onClick:function(){return l({icon:null})},isStadnard:!0,style:{marginBottom:"20px",marginLeft:"5px"}},Object(n.createElement)(c.Dashicon,{icon:"trash",style:{marginRight:"5px"}}),Object(o.__)("Reset icon")):null,Object(n.createElement)(c.CheckboxControl,{label:Object(o.__)("Same width and height"),checked:E,onChange:function(e){l({isIconSize:e}),e&&l({iconSize:[B[0],B[0]]})}}),Object(n.createElement)(c.RangeControl,{label:E?Object(o.__)("Icon size(px):"):Object(o.__)("Icon width(px):"),value:B[0],onChange:function(e){l({iconSize:[e,B[1]]}),E&&l({iconSize:[e,e]})},min:10,max:140}),Object(n.createElement)(c.__experimentalBoxControl,{label:Object(o.__)("Icon padding:"),values:P,onChange:function(e){return l({iconBox:e})}})):Object(n.createElement)(n.Fragment,null,u,Object(n.createElement)(a.MediaUpload,{onSelect:function(e){return l({image:e})},allowedTypes:["image"],value:S,render:function(e){var t=e.open;return Object(n.createElement)(c.Button,{onClick:t,className:"is-large",isPrimary:!0,style:{marginBottom:"20px"}},Object(n.createElement)(c.Dashicon,{icon:"upload",style:{marginRight:"5px"}}),Object(o.__)("Select image"))}}),S?Object(n.createElement)(c.Button,{onClick:function(){return l({image:null})},isStadnard:!0,style:{marginBottom:"20px",marginLeft:"5px"}},Object(n.createElement)(c.Dashicon,{icon:"trash",style:{marginRight:"5px"}}),Object(o.__)("Reset image")):null,Object(n.createElement)(c.SelectControl,{label:Object(o.__)("Image margin bottom:"),value:w,options:[{label:Object(o.__)("Small"),value:"15px"},{label:Object(o.__)("Medium"),value:"25px"},{label:Object(o.__)("Large"),value:"35px"}],onChange:function(e){return l({imageMB:e})}}),Object(n.createElement)(c.SelectControl,{label:Object(o.__)("Image height:"),value:k,options:[{label:Object(o.__)("Small"),value:"300px"},{label:Object(o.__)("Medium"),value:"450px"},{label:Object(o.__)("Large"),value:"600px"}],onChange:function(e){return l({imageHeight:e})}})),!E&&y&&(i=Object(n.createElement)(c.RangeControl,{label:Object(o.__)("Icon height(px):"),value:B[1],onChange:function(e){return l({iconSize:[B[0],e]})},min:10,max:140})),Object(n.createElement)(n.Fragment,null,Object(n.createElement)(a.InspectorControls,null,Object(n.createElement)(c.PanelBody,{title:Object(o.__)("Header settings"),initialOpen:!1},Object(n.createElement)(c.ToggleControl,{label:Object(o.__)("Select image/icon"),checked:y,onChange:function(e){return l({isIcon:e})}}),b,i),Object(n.createElement)(c.PanelBody,{title:Object(o.__)("Title settings"),initialOpen:!1},Object(n.createElement)(c.SelectControl,{label:Object(o.__)("Title tag:"),value:C,options:[{label:Object(o.__)("H2"),value:"h2"},{label:Object(o.__)("H3"),value:"h3"},{label:Object(o.__)("H4"),value:"h4"},{label:Object(o.__)("H5"),value:"h5"},{label:Object(o.__)("H6"),value:"h6"}],onChange:function(e){return l({titleTag:e})}}),Object(n.createElement)(c.SelectControl,{label:Object(o.__)("Title position:"),value:f,options:[{label:Object(o.__)("Left"),value:"left"},{label:Object(o.__)("Right"),value:"right"},{label:Object(o.__)("Center"),value:"center"}],onChange:function(e){return l({titlePosition:e})}}),Object(n.createElement)(c.SelectControl,{label:Object(o.__)("Title margin bottom:"),value:O,options:[{label:Object(o.__)("Small"),value:"10px"},{label:Object(o.__)("Medium"),value:"25px"},{label:Object(o.__)("Large"),value:"40px"}],onChange:function(e){return l({titleMarginBottom:e})}}),Object(n.createElement)(c.SelectControl,{label:Object(o.__)("Title padding bottom:"),value:j,options:[{label:Object(o.__)("None"),value:"0"},{label:Object(o.__)("Small"),value:"10px"},{label:Object(o.__)("Medium"),value:"15px"},{label:Object(o.__)("Large"),value:"20px"}],onChange:function(e){return l({titlePaddingBottom:e})}}),Object(n.createElement)(c.ToggleControl,{label:Object(o.__)("Title decoration line"),checked:g,onChange:function(e){return l({titleDecoration:e})}}),m),Object(n.createElement)(c.PanelBody,{title:Object(o.__)("Text settings"),initialOpen:!1},Object(n.createElement)(c.SelectControl,{label:Object(o.__)("Text position:"),value:x,options:[{label:Object(o.__)("Left"),value:"left"},{label:Object(o.__)("Right"),value:"right"},{label:Object(o.__)("Center"),value:"center"}],onChange:function(e){return l({textPosition:e})}}),Object(n.createElement)(c.SelectControl,{label:Object(o.__)("Text size:"),value:h,options:[{label:Object(o.__)("Small"),value:"14px"},{label:Object(o.__)("Normal"),value:"16px"},{label:Object(o.__)("Medium"),value:"18px"},{label:Object(o.__)("Large"),value:"20px"},{label:Object(o.__)("Extra-large"),value:"24px"}],onChange:function(e){return l({textSize:e})}}))),Object(n.createElement)("div",M,Object(n.createElement)(r,{attributes:t}),Object(n.createElement)("div",{className:"wp-block-info-box__title-wrapper wp-block-info-box__title-wrapper--position_".concat(f),style:{marginBottom:O,paddingBottom:j}},Object(n.createElement)(a.RichText,{key:"editable",tagName:C,value:d,placeholder:Object(o._x)("Title…","title placeholder"),onChange:function(e){return l({title:e})},className:"wp-block-info-box__title"}),p),Object(n.createElement)(a.RichText,{key:"editable",tagName:"p",value:v,placeholder:Object(o._x)("Content…","content placeholder"),onChange:function(e){return l({text:e})},className:"wp-block-info-box__text",style:{fontSize:h,textAlign:x}})))};Object(i.registerBlockType)("buba-blocks/info-box",{apiVersion:2,title:Object(o.__)("Info box"),description:Object(o.__)("This block allows adding a heading prefix, heading, description, icon and more."),icon:Object(n.createElement)(c.Icon,{icon:function(){return Object(n.createElement)(c.SVG,{width:"64",height:"64",viewBox:"0 0 64 64",xmlns:"http://www.w3.org/2000/svg"},Object(n.createElement)(c.Path,{d:"M40 53.3333H13.3333C9.79841 53.3291 6.40949 51.923 3.90992 49.4234C1.41035 46.9239 0.00423429 43.5349 0 40L0 13.3333C0.00423429 9.79841 1.41035 6.40949 3.90992 3.90992C6.40949 1.41035 9.79841 0.00423429 13.3333 0L40 0C43.5349 0.00423429 46.9239 1.41035 49.4234 3.90992C51.923 6.40949 53.3291 9.79841 53.3333 13.3333V40C53.3291 43.5349 51.923 46.9239 49.4234 49.4234C46.9239 51.923 43.5349 53.3291 40 53.3333ZM13.3333 5.33333C11.2116 5.33333 9.17677 6.17619 7.67648 7.67648C6.17619 9.17677 5.33333 11.2116 5.33333 13.3333V40C5.33333 42.1217 6.17619 44.1566 7.67648 45.6569C9.17677 47.1571 11.2116 48 13.3333 48H40C42.1217 48 44.1566 47.1571 45.6569 45.6569C47.1571 44.1566 48 42.1217 48 40V13.3333C48 11.2116 47.1571 9.17677 45.6569 7.67648C44.1566 6.17619 42.1217 5.33333 40 5.33333H13.3333ZM64 50.6667V16C64 15.2928 63.7191 14.6145 63.219 14.1144C62.7189 13.6143 62.0406 13.3333 61.3333 13.3333C60.6261 13.3333 59.9478 13.6143 59.4477 14.1144C58.9476 14.6145 58.6667 15.2928 58.6667 16V50.6667C58.6667 52.7884 57.8238 54.8232 56.3235 56.3235C54.8232 57.8238 52.7884 58.6667 50.6667 58.6667H16C15.2928 58.6667 14.6145 58.9476 14.1144 59.4477C13.6143 59.9478 13.3333 60.6261 13.3333 61.3333C13.3333 62.0406 13.6143 62.7189 14.1144 63.219C14.6145 63.7191 15.2928 64 16 64H50.6667C54.2016 63.9958 57.5905 62.5897 60.0901 60.0901C62.5897 57.5905 63.9958 54.2016 64 50.6667Z",fill:"black"}),Object(n.createElement)(c.Path,{d:"M40 53.3333H13.3333C9.79841 53.3291 6.40949 51.923 3.90992 49.4234C1.41035 46.9239 0.00423429 43.5349 0 40L0 13.3333C0.00423429 9.79841 1.41035 6.40949 3.90992 3.90992C6.40949 1.41035 9.79841 0.00423429 13.3333 0L40 0C43.5349 0.00423429 46.9239 1.41035 49.4234 3.90992C51.923 6.40949 53.3291 9.79841 53.3333 13.3333V40C53.3291 43.5349 51.923 46.9239 49.4234 49.4234C46.9239 51.923 43.5349 53.3291 40 53.3333ZM13.3333 5.33333C11.2116 5.33333 9.17677 6.17619 7.67648 7.67648C6.17619 9.17677 5.33333 11.2116 5.33333 13.3333V40C5.33333 42.1217 6.17619 44.1566 7.67648 45.6569C9.17677 47.1571 11.2116 48 13.3333 48H40C42.1217 48 44.1566 47.1571 45.6569 45.6569C47.1571 44.1566 48 42.1217 48 40V13.3333C48 11.2116 47.1571 9.17677 45.6569 7.67648C44.1566 6.17619 42.1217 5.33333 40 5.33333H13.3333ZM64 50.6667V16C64 15.2928 63.7191 14.6145 63.219 14.1144C62.7189 13.6143 62.0406 13.3333 61.3333 13.3333C60.6261 13.3333 59.9478 13.6143 59.4477 14.1144C58.9476 14.6145 58.6667 15.2928 58.6667 16V50.6667C58.6667 52.7884 57.8238 54.8232 56.3235 56.3235C54.8232 57.8238 52.7884 58.6667 50.6667 58.6667H16C15.2928 58.6667 14.6145 58.9476 14.1144 59.4477C13.6143 59.9478 13.3333 60.6261 13.3333 61.3333C13.3333 62.0406 13.6143 62.7189 14.1144 63.219C14.6145 63.7191 15.2928 64 16 64H50.6667C54.2016 63.9958 57.5905 62.5897 60.0901 60.0901C62.5897 57.5905 63.9958 54.2016 64 50.6667Z",fill:"url(#paint0_linear)"}),Object(n.createElement)("defs",null,Object(n.createElement)("linearGradient",{id:"paint0_linear",x1:"0",y1:"64",x2:"68.382",y2:"58.9137",gradientUnits:"userSpaceOnUse"},Object(n.createElement)("stop",{"stop-color":"#EB9440"}),Object(n.createElement)("stop",{offset:"0.302083","stop-color":"#FA4259"}),Object(n.createElement)("stop",{offset:"0.651042","stop-color":"#CC4CC2"}),Object(n.createElement)("stop",{offset:"1","stop-color":"#7140FF"}))))}}),category:"buba",attributes:{isIcon:{type:"boolean",default:!1},iconBox:{type:"object",default:{top:"20px",bottom:"20px",left:"20px",right:"20px"}},isIconSize:{type:"boolean",default:!0},iconSize:{type:"array",default:[50,50]},iconIsOneSize:{type:"boolean",default:!1},image:{type:"string",default:null},icon:{type:"string",default:null},imageMB:{type:"string",default:"25px"},imageHeight:{type:"string",default:"450px"},title:{type:"string",default:null},titleMarginBottom:{type:"string",default:"10px"},titlePaddingBottom:{type:"string",default:"0"},titleDecoration:{type:"boolean",default:!1},titleLinePositionX:{type:"string",default:"left"},titleLineColor:{type:"string",default:"#14CBCB"},titlePosition:{type:"string",default:"left"},titleTag:{type:"string",default:"h3"},text:{type:"string",default:null},textPosition:{type:"string",default:"left"},textSize:{type:"string",default:"16px"}},example:{},supports:{align:!0,html:!1},edit:b,save:function(e){var t=e.attributes,l=t.titleDecoration,o=t.titleLineColor,i=t.titleMarginBottom,c=t.titlePaddingBottom,b=t.title,u=t.titlePosition,s=t.titleTag,m=t.textPosition,p=t.textSize,g=t.text,_=null;return l&&(_=Object(n.createElement)("div",{className:"wp-block-info-box__line",style:{backgroundColor:o}})),Object(n.createElement)("div",a.useBlockProps.save({className:"wp-block-info-box"}),Object(n.createElement)(r,{attributes:t}),Object(n.createElement)("div",{className:"wp-block-info-box__title-wrapper wp-block-info-box__title-wrapper--position_".concat(u),style:{marginBottom:i,paddingBottom:c}},Object(n.createElement)(a.RichText.Content,{className:"wp-block-info-box__title",tagName:s,value:b}),_),g?Object(n.createElement)(a.RichText.Content,{className:"wp-block-info-box__text",tagName:"p",value:g,style:{fontSize:p,textAlign:m}}):null)}})}]);