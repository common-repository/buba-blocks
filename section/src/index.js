import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

import { sectionIcon } from '../../assets/icons/icons';
import {Icon} from '@wordpress/components';

registerBlockType('buba-blocks/section', {
    apiVersion: 2,
    title: __('Section', 'buba-blocks'),
    category: 'buba',
    icon: <Icon icon={sectionIcon} />,
    attributes: {
        border: {
            type: 'object',
            default: {
                borderStyle: 'none',
                borderWidth: '1px',
                borderColor: '#000'
            }
        },
        borderRadius: {
            type: 'number',
            default: 0
        },
        verticalAlignment: {
            type: 'string'
        },
        typeWidth: {
            type: 'string',
            default: 'default',
        },
        width: {
            type: 'number',
            min: 0,
            max: 100
        },
        spacing: {
            type: 'object',
            default: {
                padding: {
                    top: {
                        typeSpacing: 'default',
                        number: 0,
                        label: __('Padding Top', 'buba-blocks'),
                    },
                    right: {
                        typeSpacing: 'default',
                        number: 0,
                        label: __('Padding Right', 'buba-blocks'),

                    },
                    bottom: {
                        typeSpacing: 'default',
                        number: 0,
                        label: __('Padding Bottom', 'buba-blocks'),

                    },
                    left: {
                        typeSpacing: 'default',
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
                    right: {
                        typeSpacing: 'auto',
                        number: 0,
                        label: __('Margin Right', 'buba-blocks'),

                    },
                    bottom: {
                        typeSpacing: 'none',
                        number: 0,
                        label: __('Margin Bottom', 'buba-blocks'),

                    },
                    left: {
                        typeSpacing: 'auto',
                        number: 0,
                        label: __('Margin Left', 'buba-blocks'),
                    },
                }
            }
        },
        desktopHeight: {
            type: 'string',
            default: '700px'
        },
        tabletHeight: {
            type: 'boolean',
            default: false
        },
        mobileHeight: {
            type: 'boolean',
            default: false
        },
        animationType: {
            type: 'string',
            default: 'none',
        },
        animationDuration: {
            type: 'string',
            default: '1500ms'
        },
        animationDelay: {
            type: 'number',
            default: 200,
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
        backgroundSize: {
            type: 'string',
            default: 'cover',
        },
        backgroundPosition: {
            type: 'string',
            default: '',
        },
        focalPoint: {
            type: 'object',
            default: {
                x: 0.5,
                y: 0.5,
            },
        },
        backgroundAttachment: {
            type: 'string',
            default: '',
        },
        backgroundRepeat: {
            type: 'string',
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
        showScrollDown: {
            type: 'boolean',
            default: false,
        },
        scrollDownText: {
            type: 'string',
            default: __('Scroll Down', 'buba-blocks'),
        },
        leftPositionScrollDown:{
            type: 'string',
            default: '16px',
        },
        bottomPositionScrollDown:{
            type: 'string',
            default: '30px',
        },
    },
    supports: {
        anchor: true,
        lightBlockWrapper: true,
    },
    edit,
    save,
});
