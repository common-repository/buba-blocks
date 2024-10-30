/**
 * External dependencies
 */
import classnames from 'classnames';
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { ResizableBox, withNotices } from '@wordpress/components';
import {
    BlockControls,
    BlockIcon,
    MediaPlaceholder,
    MediaReplaceFlow,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useViewportMatch } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import icon from './media-container-icon';

/**
 * Constants
 */
const ALLOWED_MEDIA_TYPES = [ 'image', 'video' ];


function ResizableBoxContainer( { isSelected, isStackedOnMobile, ...props } ) {
    const isMobile = useViewportMatch( 'small', '<' );
    return (
        <ResizableBox
            showHandle={ isSelected && ( ! isMobile || ! isStackedOnMobile ) }
            { ...props }
        />
    );
}

function ToolbarEditButton( { mediaId, mediaUrl, onSelectMedia } ) {
    return (
        <BlockControls>
            <MediaReplaceFlow
                mediaId={ mediaId }
                mediaURL={ mediaUrl }
                allowedTypes={ ALLOWED_MEDIA_TYPES }
                accept="image/*,video/*"
                onSelect={ onSelectMedia }
            />
        </BlockControls>
    );
}

function PlaceholderContainer( {
                                   className,
                                   noticeOperations,
                                   noticeUI,
                                   onSelectMedia,
                               } ) {
    const onUploadError = ( message ) => {
        noticeOperations.removeAllNotices();
        noticeOperations.createErrorNotice( message );
    };

    return (
        <MediaPlaceholder
            icon={ <BlockIcon icon={ icon } /> }
            labels={ {
                title: __( 'Media area', 'buba-blocks' ),
            } }
            className={ className }
            onSelect={ onSelectMedia }
            accept="image/*,video/*"
            allowedTypes={ ALLOWED_MEDIA_TYPES }
            notices={ noticeUI }
            onError={ onUploadError }
        />
    );
}

function MediaContainer( props ) {
    const {
        className,
        isSelected,
        isStackedOnMobile,
        mediaAlt,
        mediaId,
        mediaType,
        mediaUrl,
        mediaWidth,
        height,
        onSelectMedia,
        setAttributes
    } = props;

    const { toggleSelection } = useDispatch( 'core/block-editor' );

    if ( mediaType && mediaUrl ) {

        const mediaTypeRenderers = {
            image: () => <img src={ mediaUrl } alt={ mediaAlt } />,
            video: () => <video controls src={ mediaUrl } />,
        };

        return (
            <ResizableBoxContainer
                as="figure"
                className={ classnames(
                    className,
                    'editor-media-container__resizer'
                ) }
                size={ { height } }
                minWidth="10%"
                maxWidth="100%"
                isSelected={ isSelected }
                isStackedOnMobile={ isStackedOnMobile }
                enable={ {
                    top: false,
                    right: false,
                    bottom: true,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                } }
                onResizeStop={ ( event, direction, elt, delta ) => {
                    setAttributes( {
                        height: parseInt( height + delta.height, 10 ),
                    } );
                    toggleSelection( true );
                } }
                onResizeStart={ () => {
                    toggleSelection( false );
                } }
            >
                <ToolbarEditButton
                    onSelectMedia={ onSelectMedia }
                    mediaUrl={ mediaUrl }
                    mediaId={ mediaId }
                />
                { ( mediaTypeRenderers[ mediaType ] || noop )() }
            </ResizableBoxContainer>
        );
    }

    return <PlaceholderContainer { ...props } />;
}

export default withNotices( MediaContainer );