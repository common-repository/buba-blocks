import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import deprecated from './deprecated';
import edit from './edit';
import save from './save';
import transforms from './transforms';

import { infoBoxIcon } from '../../assets/icons/icons';
import {Icon} from '@wordpress/components';

registerBlockType( 'buba-blocks/card', {
	apiVersion: 2,
	title: __('Card', 'buba-blocks'),
	icon: <Icon icon={infoBoxIcon} />,
	category: 'buba',
	attributes: {
		mediaAlt: {
			type: 'string',
			source: 'attribute',
			selector: 'figure img',
			attribute: 'alt',
			default: ''
		},
		mediaId: {
			type: 'number'
		},
		mediaUrl: {
			type: 'string',
			source: 'attribute',
			selector: 'figure video,figure img',
			attribute: 'src'
		},
		mediaLink: {
			type: 'string'
		},
		linkDestination: {
			type: 'string'
		},
		linkTarget: {
			type: 'string',
			source: 'attribute',
			selector: 'figure a',
			attribute: 'target'
		},
		href: {
			type: 'string',
			source: 'attribute',
			selector: 'figure a',
			attribute: 'href'
		},
		rel: {
			type: 'string',
			source: 'attribute',
			selector: 'figure a',
			attribute: 'rel'
		},
		linkClass: {
			type: 'string',
			source: 'attribute',
			selector: 'figure a',
			attribute: 'class'
		},
		mediaType: {
			type: 'string'
		},
		mediaWidth: {
			type: 'number',
			default: 100
		},
		height: {
			type: 'number',
			default: 350,
		},
		isStackedOnMobile: {
			type: 'boolean',
			default: true
		},
	},
	supports: {
		anchor: true,
		html: false,
		lightBlockWrapper: true,
		color: { // This also enables text and background UI controls.
			gradient: false, // Enable gradients UI control.
			background: true, // Disable background UI control.
			text: false, // Enable gradients UI control.
		}
	},
	example: {
		attributes: {
			mediaType: 'image',
			mediaUrl:
				'https://s.w.org/images/core/5.3/Biologia_Centrali-Americana_-_Cantorchilus_semibadius_1902.jpg',
		},
		innerBlocks: [
			{
				name: 'core/heading',
				attributes: {
					content: __(
						'Card Title.', 'buba-blocks'
					),
					align: 'center',
				},
			},
			{
				name: 'core/paragraph',
				attributes: {
					content: __( '— Kobayashi Issa (一茶)', 'buba-blocks' ),
				},
			},
		],
	},
	styles: [
		{ name: 'elevated', label: __( 'Elevated (shadowed)', 'buba-blocks' ) },
		{ name: 'outline', label: __( 'Outline', 'buba-blocks' ), isDefault: true },
	],
	transforms,
	edit,
	save,
	deprecated,
} );
