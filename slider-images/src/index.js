import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import edit from './edit';
import save from './save';

import { imageSliderIcon } from '../../assets/icons/icons';
import {Icon} from '@wordpress/components';

registerBlockType( 'buba-blocks/slider-images', {
	apiVersion: 2,
	title: __('Slider images', 'buba-blocks'),
	description: __( 'Display multiple images in a slider.', 'buba-blocks' ),
	icon: <Icon icon={imageSliderIcon} />,
	example: {
		attributes: {
			columns: 2,
			images: [
				{
					url:
						'https://s.w.org/images/core/5.3/Glacial_lakes%2C_Bhutan.jpg',
				},
				{
					url:
						'https://s.w.org/images/core/5.3/Sediment_off_the_Yucatan_Peninsula.jpg',
				},
			],
		},
	},
	category: 'buba',
	attributes:{
		sliderSetting: {
			type: 'object'
		},
		images: {
			type: 'array',
			default: [],
			source: 'query',
			selector: '.buba-blocks-slider-images-item',
			query: {
				url: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'src'
				},
				fullUrl: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'data-full-url'
				},
				link: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'data-link'
				},
				alt: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'alt',
					default: ''
				},
				id: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'data-id'
				},
				caption: {
					type: 'string',
					source: 'html',
					selector: '.buba-blocks-slider-images__caption'
				}
			}
		},
		ids: {
			type: 'array',
			items: {
				type: 'number'
			},
			default: []
		},
		caption: {
			type: 'string',
			source: 'html',
			selector: '.buba-blocks-slider-images-caption'
		},
		imageCrop: {
			type: 'boolean',
			default: true
		},
		linkTo: {
			type: 'string'
		},
		sizeSlug: {
			type: 'string',
			default: 'large'
		},
		countSlides: {
			type: 'number',
			default: 1,
		},
	},
	supports: {
		anchor: true,
		// align: true,
	},
	edit,
	save,
} );
