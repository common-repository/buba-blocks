import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';

registerBlockType( 'buba-blocks/form-textarea', {
	apiVersion: 2,
	title: __('Textarea', 'buba-blocks'),
	parent: [ 'buba-blocks/form' ], 
	icon: 'editor-paragraph',
	category: 'buba',
	attributes: {
		styles: {
			type: 'object',
			default: {}
		},
		text: {
			type: 'string',
			default: null
		},
		inspector: {
			type: 'object'
		}
	},
	edit,
	save
});
