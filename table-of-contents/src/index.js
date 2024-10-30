import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

import { tableOfContentIcon } from '../../assets/icons/icons';
import {Icon} from '@wordpress/components';

registerBlockType('buba-blocks/table-of-contents', {
    apiVersion: 2,
    title: __('Table of Contents', 'buba-blocks'),
    description: __( 'This block allows you to place a Table of Contents for Pages/Posts.', 'buba-blocks' ),
    icon: <Icon icon={tableOfContentIcon} />,
    category: 'buba',
    attributes: {
        title: {
          type: 'string',
          default: 'Table of contents',
        },
        titleFontSize: {
            type: 'number',
            default: 18,
        },
        titleColor: {
            type: 'string',
            default: '#000',
        },
        titleBottomSpacing: {
            type: 'number',
        },
        titleAlign: {
          type: 'string',
          default: 'left',
        },
        horizontalPadding: {
          type: 'number',
          default: 30,
        },
        contentFontSize: {
          type: 'number',
          default: 16,
        },
        contentColor: {
            type: 'string',
            default: '#000',
        },
        contentAlign: {
            type: 'string',
            default: 'left',
        },
        borderStyle: {
            type: 'string',
            default: 'none',
        },
        borderWidth: {
            type: 'number',
            default: 1,
        },
        borderRadius: {
            type: 'number',
        },
        borderColor: {
            type: 'string',
            default: '#000'
        },
        verticalPadding: {
          type: 'number',
          default: 30,
        },
        verticalMargin:{
            type: 'number',
        },
        horizontalMargin:{
            type: 'number',
        },
        include_h1:{
            type: 'boolean',
            default: false,
        },
        include_h2:{
            type: 'boolean',
            default: true,
        },
        include_h3:{
            type: 'boolean',
            default: true,
        },
        include_h4:{
            type: 'boolean',
            default: true,
        },
        include_h5:{
            type: 'boolean',
            default: true,
        },
        include_h6:{
            type: 'boolean',
            default: true,
        },
        backgroundColor: {
          type: 'string',
          default: '#eee'
        },
        customWidth: {
            type: 'boolean',
            default: false,
        },
        desktopWidth: {
            type: 'string',
        },
        tabletWidth: {
            type: 'boolean',
            default: false
        },
        mobileWidth: {
            type: 'boolean',
            default: false
        },
        headersCount:{
          type: 'number',
        },
        headersItems: {
            type: 'array',
            default: [],
            source: 'query',
            selector: '.buba-table-of-contents__list-item',
            query: {
                level: {
                    type: 'string',
                    source: 'attribute',
                    selector: '.buba-table-of-contents__list-link',
                    attribute: 'data-level'
                },
                slug: {
                    type: 'string',
                    source: 'attribute',
                    selector: '.buba-table-of-contents__list-link',
                    attribute: 'data-link'
                },
                text: {
                    type: 'string',
                    source: 'html',
                    selector: '.buba-table-of-contents__list-link'
                }
            }
        },
    },
    supports: {
        anchor: true,
        align: true,
        multiple: false,
    },
    example: {
        attributes: {
            headersItems: [
                {
                    level: 2,
                    slug: 'head-1',
                    text: 'Head 1'
                },
                {
                    level: 2,
                    slug: 'head-2',
                    text: 'Head 2'
                },
                {
                    level: 2,
                    slug: 'head-3',
                    text: 'Head 3'
                }
            ],
        },
    },
    edit,
    save,
});
