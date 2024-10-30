import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

import { socialShareIcon } from '../../assets/icons/icons';
import {Icon} from '@wordpress/components';

registerBlockType('buba-blocks/social-share', {
    apiVersion: 2,
    title: __('Social Share', 'buba-blocks'),
    description: __('This block allows you to share posts/pages.', 'buba-blocks'),
    icon: <Icon icon={socialShareIcon} />,
    category: 'buba',
    attributes: {
        isSimilarWidth: {
            type: 'boolean',
            default: true
        },
        iconWidth: {
            type: 'number',
            default: 24
        },
        layout: {
            type: 'string',
            default: 'is-horizontal'
        },
        stackOn: {
            type: 'string',
            default: 'none'
        },
        size: {
            type: 'number',
            default: 24
        },
        gap: {
            type: 'number',
        },
        borderRadius: {
            type: 'number',
        },
        openInNewTab:{
            type: 'boolean',
            default: false
        }
    },
    example: {
        innerBlocks: [
            {
                name: 'core/social-link',
                attributes: {
                    service: 'wordpress',
                    url: 'https://wordpress.org',
                },
            },
            {
                name: 'core/social-link',
                attributes: {
                    service: 'facebook',
                    url: 'https://www.facebook.com/WordPress/',
                },
            },
            {
                name: 'core/social-link',
                attributes: {
                    service: 'twitter',
                    url: 'https://twitter.com/WordPress',
                },
            },
        ],
    },
    supports: {
        anchor: true,
        align: [
            'left',
            'center',
            'right'
        ],
    },
    providesContext: {
        openInNewTab: 'openInNewTab',
        size: 'size',
        borderRadius: 'borderRadius',
        gap: 'gap',
        iconWidth: 'iconWidth',
        isSimilarWidth: 'isSimilarWidth'
    },
    edit,
    save,
});
