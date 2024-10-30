import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

import {accordionIcon} from '../../assets/icons/icons';
import {Icon} from '@wordpress/components';

registerBlockType('buba-blocks/accordion', {
    apiVersion: 2,
    title: __('Accordion', 'buba-blocks'),
    icon: <Icon icon={accordionIcon} />,
    category: 'buba',
    attributes: {
        accordionTitle: {
            type: 'array',
            selector: '.buba-accordion__title',
            source: 'children',
        },
		accordionText: {
            type: 'array',
            selector: '.buba-accordion__text',
            source: 'children',
        },
		accordionAlignment: {
            type: 'string',
        },
		accordionFontSize: {
            type: 'number',
            default: undefined,
        },
		accordionOpen: {
            type: 'boolean',
            default: false,
        },
        accordionOpenColor: {
            type: 'string',
            default: '#E95D4E'
        },
        accordionOpenBgColor: {
            type: 'string',
            default: '#eee'
        },
        borderOpenColor: {
            type: 'string',
            default: '#000'
        },
        border: {
            type: 'object'
        },
        color: {
            type: 'string',
            default: '#000'
        },
        borderRadius: {
            type: 'number',
            default: 0
        },
        background: {
            type: 'string',
            default: '#fff'
        }
    },
    supports: {

    },
    example: {
        innerBlocks: [
            {
                name: 'core/heading',
                attributes: {
                    content: __('title.', 'buba-blocks'),
                    align: 'left',
                },
            },
            {
                name: 'core/paragraph',
                attributes: {
                    content: __('— Kobayashi Issa (一茶)', 'buba-blocks'),
                },
            },
        ],
    },
    edit,
    save,
});
