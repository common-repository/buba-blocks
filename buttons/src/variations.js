/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'buttons-horizontal',
		isDefault: true,
		title: __( 'Horizontal', 'buba-blocks' ),
		description: __( 'Buttons shown in a row.', 'buba-blocks' ),
		attributes: { orientation: 'horizontal' },
		scope: [ 'transform' ],
	},
	{
		name: 'buttons-vertical',
		title: __( 'Vertical', 'buba-blocks' ),
		description: __( 'Buttons shown in a column.', 'buba-blocks' ),
		attributes: { orientation: 'vertical' },
		scope: [ 'transform' ],
	},
];

export default variations;