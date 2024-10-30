import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import { buttonIcon } from '../../assets/icons/icons';
import {Icon} from '@wordpress/components';

registerBlockType( 'buba-blocks/button', {
	apiVersion: 2,
	title: __('Button', 'buba-blocks'),
	icon: <Icon icon={buttonIcon} />,
	category: 'buba',
	attributes: {
		isSubmit: {
			type: 'boolean',
			default: false
		},
		buttonPadding: {
			type: 'object',
			default: {
				top: '15px',
				bottom: '15px',
				left: '30px',
				right: '30px'
			}
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href'
		},
		iconPosition: {
			type: 'string',
			default: 'left'
		},
		title: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'title'
		},
		text: {
			type: 'string'
		},
		linkTarget: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'target'
		},
		rel: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'rel'
		},
		placeholder: {
			type: 'string'
		},
		borderRadius: {
			type: 'number',
			default: 0
		},
		style: {
			type: 'object'
		},
		backgroundColor: {
			type: 'string'
		},
		textColor: {
			type: 'string'
		},
		gradient: {
			type: 'string'
		},
		buttonIcon: {
			type: 'string'
		},
		alignment: {
			type: 'string',
			default: 'none'
		},
		duration: {
			type: 'number',
			default: 200
		},
		textHover: {
			type: 'string',
			default: '#fff'
		}, 
		backgroundHover: {
			type: 'string',
			default: '#000'
		},
		width:{
			type: 'number'
		},
	},
	supports: {
		anchor: true,
		align: false,
		alignWide: false,
		reusable: false,
		lightBlockWrapper: true
	},
	example: {
		attributes: {
			className: 'is-style-fill',
			backgroundColor: 'vivid-green-cyan',
			text: __( 'Call to Action', 'buba-blocks' ),
			alignment: 'center',
		},
	},
	styles: [
		{ name: 'fill', label: __( 'Fill', 'buba-blocks' ), isDefault: true },
		{ name: 'outline', label: __( 'Outline', 'buba-blocks' ) },
		{ name: 'text', label: __( 'Text', 'buba-blocks' ) },
	],
	edit,
	save,
	deprecated,
	merge: ( a, { text = '' } ) => ( {
		...a,
		text: ( a.text || '' ) + text,
	} ),

} );
