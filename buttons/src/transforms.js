/**
 * WordPress dependencies
 */
 import { createBlock } from '@wordpress/blocks';
 import { __unstableCreateElement as createElement } from '@wordpress/rich-text';
 
 /**
  * Internal dependencies
  */
const name = 'buba-blocks/buttons';
 
 const transforms = {
   from: [
     {
       type: 'block',
       isMultiBlock: true,
       blocks: [ 'buba-blocks/button' ],
       transform: ( buttons ) =>
         // Creates the buttons block
         createBlock(
           name,
           {},
           // Loop the selected buttons
           buttons.map( ( attributes ) =>
             // Create singular button in the buttons block
             createBlock( 'buba-blocks/button', attributes )
           )
         ),
     },
     {
       type: 'block',
       isMultiBlock: true,
       blocks: [ 'core/paragraph' ],
       transform: ( buttons ) =>
         // Creates the buttons block
         createBlock(
           name,
           {},
           // Loop the selected buttons
           buttons.map( ( attributes ) => {
             const element = createElement(
               document,
               attributes.content
             );
             // Remove any HTML tags
             const text = element.innerText || '';
             // Get first url
             const link = element.querySelector( 'a' );
             const url = link?.getAttribute( 'href' );
             // Create singular button in the buttons block
             return createBlock( 'buba-blocks/button', {
               text,
               url,
             } );
           } )
         ),
       isMatch: ( paragraphs ) => {
         return paragraphs.every( ( attributes ) => {
           const element = createElement(
             document,
             attributes.content
           );
           const text = element.innerText || '';
           const links = element.querySelectorAll( 'a' );
           return text.length <= 30 && links.length <= 1;
         } );
       },
     },
   ],
 };
 
 export default transforms;