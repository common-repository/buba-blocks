import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';

registerBlockType( 'buba-blocks/form-email', {
	apiVersion: 2,
	title: __('Email', 'buba-blocks'),
	parent: [ 'buba-blocks/form' ], 
	icon: 'email',
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
