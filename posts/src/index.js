import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';

import edit from './edit';

import { postsGridIcon } from '../../assets/icons/icons';
import {Icon} from '@wordpress/components';

registerBlockType('buba-blocks/posts', {
    apiVersion: 2,
    title: __('Posts Grid', 'buba-blocks'),
    description: __('This block allows you to display a list of your posts pr pages in a grid layout.', 'buba-blocks'),
    icon: <Icon icon={postsGridIcon} />,
    category: 'buba',
    attributes: {
        text_after_title_text: {
            type: 'array'
        },
        slider_element_before_title_link: {
            type: 'array'
        },
        cardStyle: {
            type: 'object',
            default: {
                card: {
                    backgroundColor: 'rgb(228, 228, 228)',
                    color: '#000'
                },
                title: {
                    fontSize: '32px',
                    color: '#000'
                },
                text: {
                    fontSize: '20px',
                    color: '#000'
                },
                another: {
                    fontSize: '16px',
                    color: '#000'
                },
            }
        },
        mobileColumns: {
            type: 'number'
        },
        tableColumns: {
            type: 'number'
        },
        desktopColumns: {
            type: 'number'
        },
        postStyle: {
          type: 'string',
          default: 'grid'
        },
        postType: {
          type: 'string',
          default: 'post'
        },
        categories: {
            type: 'array',
            items: {
                type: 'object'
            }
        },
        selectedAuthor: {
            type: 'number'
        },
        postsToShow: {
            type: 'number',
            default: 5
        },
        displayPostContent: {
            type: 'boolean',
            default: false
        },
        displayPostContentRadio: {
            type: 'string',
            default: 'excerpt'
        },
        excerptLength: {
            type: 'number',
            default: 55
        },
        displayAuthor: {
            type: 'boolean',
            default: false
        },
        displayPostDate: {
            type: 'boolean',
            default: false
        },
        postLayout: {
            type: 'string',
            default: 'list'
        },
        columns: {
            type: 'number',
            default: 3
        },
        order: {
            type: 'string',
            default: 'desc'
        },
        orderBy: {
            type: 'string',
            default: 'date'
        },
        displayFeaturedImage: {
            type: 'boolean',
            default: false
        },
        featuredImageAlign: {
            type: 'string',
            enum: [
                'left',
                'center',
                'right'
            ]
        },
        featuredImageSizeSlug: {
            type: 'string',
            default: 'thumbnail'
        },
        featuredImageSizeWidth: {
            type: 'number',
            default: null
        },
        featuredImageSizeHeight: {
            type: 'number',
            default: null
        },
        addLinkToFeaturedImage: {
            type: 'boolean',
            default: false
        },
        masonryGap: {
            type: 'number',
            default: 20
        },
        isText: {
            type: 'boolean',
            default: true
        },
        sliderSetting: { 
            type: 'object'
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
        align: true,
        html: false
    },
    edit,
});
