/**
 * External dependencies
 */
import classnames from 'classnames';
import { v4 } from 'uuid';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {
	useBlockProps
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import StylesComponent from './styles-editor';
import { styles2cssV } from '../../../../assets/funcs';
import InspectorComponent from './inspector-input';

const edit = props => {
	const {
		attributes,
		setAttributes
	} = props;

	const {
		styles,
		text,
		inspector
	} = attributes;
   
	// Props for any static element
	const blockProps = useBlockProps({
		className: classnames( 'buba-blocks-textarea' ),
		style: styles2cssV( styles, 'buba-blocks-textarea' ),
	});


	return (
		<p {...blockProps}>
			<textarea
				value={ text }
				onChange={ e => setAttributes({ text: e.target.value }) }
				placeholder={ __( 'Enter placeholder...', 'buba-blocks' ) }
				name={ inspector.field_name }
			/>
		</p>
	);
}

export default 
	InspectorComponent( 
		StylesComponent(
			edit 
		) 
	);