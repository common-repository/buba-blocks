/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */

const transforms = {
    from: [
        {
            type: 'block',
            isMultiBlock: true,
            blocks: [ 'core/button' ],
            transform: ( buttons ) =>
                // Creates the buttons block
                createBlock(
                    { "name": "gutenberg-examples/button"},
                    {},
                    // Loop the selected buttons
                    buttons.map( ( attributes ) =>
                        // Create singular button in the buttons block
                        createBlock( 'gutenberg-examples/button', attributes )
                    )
                ),
        },
    ],
};

export default transforms;