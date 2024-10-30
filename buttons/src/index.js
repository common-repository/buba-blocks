import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import variations from './variations';
import deprecated from './deprecated';
import transforms from './transforms';
import { buttonIcon } from '../../assets/icons/icons';
import {Icon} from '@wordpress/components';

registerBlockType( 'buba-blocks/buttons', {
	apiVersion: 2,
	title: __('Buttons', 'buba-blocks'),
	icon: <Icon icon={buttonIcon} />,
	category: 'buba',
	attributes: {
		styles: {
			type: "Object",
			default: null
		}
	},
	supports: {
		anchor: true,
		align: false,
	},
	example: {
	},
	styles: [
	],
	edit,
	save,
	variations,
	deprecated,
	transforms
});
