/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import StylesComponent from './styles-editor';
import InspectorComponent from './inspector-form';
import { styles2cssV } from '../../assets/funcs';

const ALLOWED_BLOCKS_FOR_WRAPPER = [
	'core/image',
	'core/paragraph',
	'core/heading',
	'core/separator',
	'core/spacer',
	'core/map',
	'buba-blocks/map',
	'buba-blocks/button',
	'buba-blocks/buttons',
	'buba-blocks/social-share',
	'buba-blocks/form-input',
	'buba-blocks/form-email',
	'buba-blocks/form-name',
	'buba-blocks/form-telephone',
	'buba-blocks/form-textarea',
];

const ONCE_BLOCKS = [
	'buba-blocks/form-email',
	'buba-blocks/form-name',
	'buba-blocks/form-telephone'
];

const getClassByNamespace = namespace => {
	const classBlock = namespace.split('/')[1];
	return 'editor-block-list-item-buba-blocks-'+classBlock;
}

const edit = props => { 
	const {
		attributes,
		clientId
	} = props;

	const {
		styles 
	} = attributes;

	const {
		addAction,
		removeAction,
		hasAction
	} = wp.hooks;



	const hookName = 'buba_blocks_editor_click';
	const hookNamespace = 'buba-blocks/form';
	const formClickHandler = e => {
		setTimeout(() => {
			document.querySelectorAll( '.block-editor-block-types-list__item' ).forEach( menuItem => {
				menuItem.classList.remove('buba-blocks-menu-item-disabled');
			});
	
			const { getBlockOrder, getBlock } = wp.data.select( 'core/block-editor' );
			const innerBlockIds = getBlockOrder( clientId );
	
			innerBlockIds.forEach( innerBlockId => {
				const block = getBlock( innerBlockId );
				ONCE_BLOCKS.forEach( value => {
					if ( block.name === value ) {
						document.querySelectorAll( '.'+getClassByNamespace(value) ).forEach( menuItem => {
							menuItem.classList.add('buba-blocks-menu-item-disabled');
						});
					};
				});
			});
		}, 100);
	};

	if ( hasAction( hookName, hookNamespace ) ) {
		removeAction( hookName, hookNamespace, formClickHandler );
	}
	addAction( hookName, hookNamespace, formClickHandler );

	// Props for any static element
	const blockProps = useBlockProps({ 
		className: classnames( 'buba-blocks-form' ),
		style: styles2cssV( styles, 'buba-blocks-form' )
	});

	return (
		<form {...blockProps}>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS_FOR_WRAPPER }
				templateInsertUpdatesSelection={ true }
			/>
		</form>
	);
}

export default  InspectorComponent( StylesComponent( edit ) );