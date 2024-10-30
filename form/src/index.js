import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';

registerBlockType( 'buba-blocks/form', {
	apiVersion: 2,
	title: __('Form', 'buba-blocks'),
	icon: 'email-alt',
	category: 'buba',
	attributes: {
		styles: {
			type: "object",
			default: {}
		},
		inspector: {
			type: 'object',
			default: {}
		}
	},
	supports: {
		anchor: true,
		align: false
	},
	edit,
	save
});
