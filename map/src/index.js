import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

import { mapsIcon } from '../../assets/icons/icons';
import {Icon} from '@wordpress/components';

registerBlockType('buba-blocks/map', {
    apiVersion: 2,
    title: __('Map', 'buba-blocks'),
    description: __( 'This block allows you to place a Google Map location.', 'buba-blocks' ),
    icon: <Icon icon={mapsIcon}/>,
    category: 'buba',
    attributes: {
        key:{
            type: 'string',
            default: 'AIzaSyDS0z7KLO5emd6DR579BD4vQclxJNZAmc4',
        },
        address:{
            type: 'string',
            default: 'Eiffel Tower,Paris France'
        },
        height:{
            type: 'string',
            default: '300px'
        },
        zoom:{
            type: 'number',
            default: 12
        },
        language:{
          type: 'string',
          default: 'en'
        },
    },
    example: {
        attributes: {

        },
    },
    supports: {
        anchor: true,
        multiple: true,
    },
    edit,
    save,
});
