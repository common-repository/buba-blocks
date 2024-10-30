import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

import { infoBoxIcon } from '../../assets/icons/icons';
import {Icon} from '@wordpress/components';

registerBlockType('buba-blocks/info-box', {
    apiVersion: 2,
    title: __('Info box', 'buba-blocks'),
    description: __('This block allows adding a heading prefix, heading, description, icon and more.', 'buba-blocks'),
    icon: <Icon icon={infoBoxIcon}/>,
    category: 'buba',
    attributes: {
        // image attributes
        isIcon: {
            type: 'boolean',
            default: false,
        },
        iconBox: {
            type: 'object',
            default: {
                top: '20px',
                bottom: '20px',
                left: '20px',
                right: '20px'
            },
        },
        isIconSize: {
            type: 'boolean',
            default: true,
        },
        iconSize: {
            type: 'array',
            default: [50, 50],
        },
        iconIsOneSize: {
            type: 'boolean',
            default: false,
        },
        image: {
            type: 'string',
            default: null,
        },
        icon: {
            type: 'string',
            default: null,
        },
        imageMB: {
            type: 'string',
            default: '25px',
        },
        imageHeight: {
            type: 'string',
            default: '450px',
        },

        // title attributes
        title: {
            type: 'string',
            default: null
        },
        titleMarginBottom: {
            type: 'string',
            default: '10px',
        },
        titlePaddingBottom: {
            type: 'string',
            default: '0',
        },
        titleDecoration: {
            type: 'boolean',
            default: false,
        },
        titleLinePositionX: {
            type: 'string',
            default: 'left',
        },
        titleLineColor: {
            type: 'string',
            default: '#14CBCB',
        },
        titlePosition: {
            type: 'string',
            default: 'left',
		},
        titleTag: {
            type: 'string',
            default: 'h3',
		},

        // text attributes
        text: {
            type: 'string',
            default: null,
        },
        textPosition: {
            type: 'string',
            default: 'left',
        },
        textSize: {
            type: 'string',
            default: '16px',
        },
    },
    example: {
        
    },
    supports: {
        align: true,
        html: false
    },
    edit,
    save,
});
