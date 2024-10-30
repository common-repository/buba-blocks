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
		className: classnames( 'buba-blocks-text-input' ),
		style: styles2cssV( styles, 'buba-blocks-text-input' ),
	});

	return (
		<p {...blockProps}>
			<input
				value={ text }
				onChange={ e => setAttributes({ text: e.target.value }) }
				placeholder={ __( 'Enter placeholder...', 'buba-blocks' ) }
				name={ inspector?.field_name || 'text_'+v4() }
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