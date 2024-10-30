import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

import { socialShareIcon } from '../../assets/icons/icons';
import {Icon} from '@wordpress/components';

registerBlockType('buba-blocks/social-share-child', {
    apiVersion: 2,
    title: __('Social Share Child', 'buba-blocks'),
    description: __( 'Display an icon linking to a social media profile or website.', 'buba-blocks' ),
    icon: <Icon icon={socialShareIcon} />,
    category: 'buba',
    parent: [
        'buba-blocks/social-share'
    ],
    attributes: {
        isSimilarWidth: {
            type: 'boolean'
        },
        iconWidth: {
            type: 'number'
        },
        typeShareLink:{
            type: 'string',
            default: 'facebook'
        },
        typeIcon:{
            type: 'string',
            default: 'icon'
        },
        icon:{
            type: 'number',
            default: 57705,
        },
        iconColor: {
           type: 'string'
        },
        iconBackground: {
            type: 'string'
        },
        customLink:{
          type: 'string'
        },
        mediaId:{
          type: 'number'
        },
        mediaUrl:{
            type: 'string'
        },
        iconSize:{
            type: 'string'
        },
        iconBorderRadius:{
            type: 'number'
        },
        iconGap:{
            type: 'number'
        }
    },
    example: {
        attributes: {

        },
    },
    supports: {
        'reusable': false,
        'html': false,
    },
    usesContext: [
        'openInNewTab',
        'size',
        'borderRadius',
        'gap',
        'iconWidth',
        'isSimilarWidth'
    ],
    edit,
    save,
});
