import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

import { containerIcon } from '../../assets/icons/icons';
import {Icon} from '@wordpress/components';

registerBlockType('buba-blocks/container', {
    apiVersion: 2,
    title: __( 'Container', 'buba-blocks'),
    category: 'buba',
    icon: <Icon icon={containerIcon}/>,
    attributes: {
        verticalAlignment: {
            type: 'string'
        },
        width: {
            type: 'number',
        },
        spacing: {
            type: 'object',
            default: {
                padding: {
                    top: {
                        typeSpacing: 'none',
                        number: 0,
                        label: __('Padding Top', 'buba-blocks'),
                    },
                    right: {
                        typeSpacing: 'none',
                        number: 0,
                        label: __('Padding Right', 'buba-blocks'),

                    },
                    bottom: {
                        typeSpacing: 'none',
                        number: 0,
                        label: __('Padding Bottom', 'buba-blocks'),

                    },
                    left: {
                        typeSpacing: 'none',
                        number: 0,
                        label: __('Padding Left', 'buba-blocks'),
                    },
                },
                margin: {
                    top: {
                        typeSpacing: 'none',
                        number: 0,
                        label: __('Margin Top', 'buba-blocks'),
                    },
                    bottom: {
                        typeSpacing: 'none',
                        number: 0,
                        label: __('Margin Bottom', 'buba-blocks'),

                    },
                }
            }
        },
        mediaId: {
            type: 'number'
        },
        mediaUrl: {
            type: 'string',
        },
        mediaType: {
            type: 'string'
        },
        backgroundSize:{
            type: 'string',
            default: 'cover',
        },
        backgroundPosition:{
            type: 'string',
            default: '',
        },
        backgroundRepeat:{
          type: 'string',
        },
        focalPoint: {
            type: 'object',
            default:{
              x: 0.5,
              y: 0.5,
            },
        },
        backgroundAttachment:{
            type: 'string',
            default: '',
        },
        dimRatio: {
            type: 'number',
            default: 50
        },
        overlayColor: {
            type: 'string',
            default: '',
        },
        customOverlayColor: {
            type: 'string'
        },
        gradient: {
            type: 'string',
        },
        customGradient: {
            type: 'string'
        },
    },
    supports: {
        anchor: true,
        lightBlockWrapper: true,
        color: { // This also enables text and background UI controls.
            gradient: true // Enable gradients UI control.
        }
    },
    edit,
    save,
});
