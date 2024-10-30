import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';

registerBlockType( 'buba-blocks/form-name', {
	apiVersion: 2,
	title: __('Name', 'buba-blocks'),
	parent: [ 'buba-blocks/form' ], 
	icon: 'admin-users',
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
