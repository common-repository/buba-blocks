/**
 * External dependencies
 */
import { get, includes, invoke, isUndefined, pickBy } from 'lodash';
import classnames from 'classnames';
import Masonry from 'react-masonry-css';

/**
 * WordPress dependencies
 */
import { useState, RawHTML, useEffect, useRef, createRef } from '@wordpress/element';
import {
    BaseControl,
    PanelBody,
    Placeholder,
    QueryControls,
    RadioControl,
    RangeControl, SelectControl,
    Spinner,
    ToggleControl,
    ToolbarGroup,
    Dashicon
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { __, sprintf } from '@wordpress/i18n';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';
import {
    InspectorControls,
    BlockAlignmentToolbar,
    BlockControls,
    __experimentalImageSizeControl as ImageSizeControl,
    useBlockProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { pin, list, grid, columns as sliderIcon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
    MIN_EXCERPT_LENGTH,
    MAX_EXCERPT_LENGTH,
    MAX_POSTS_COLUMNS, POST_TYPE
} from './constants';
import MasonryEdit from './masonry-edit';
import CardEdit from './card-edit';
import { SliderEdit, Slider } from '../../components/slider-edit';

/**
 * Module Constants
 */
const CATEGORIES_LIST_QUERY = {
    per_page: -1,
};
const USERS_LIST_QUERY = {
    per_page: -1,
};

export default function LatestPostsEdit( { attributes, setAttributes } ) {
    /**
     * Hooks
     */
    const {
        doAction,
        didAction
    } = wp.hooks;

    const postTypePush = obj => {
        if ( Array.isArray(obj) ) {
            obj.forEach(index => {
                POST_TYPE.push(index);
            });
        }
        else
            POST_TYPE.push(obj);
    };
    if ( !didAction('buba_blocks_posts_another_post_type') )
        doAction( 'buba_blocks_posts_another_post_type', {postTypePush} );

    const {
        postsToShow,
        order,
        orderBy,
        categories,
        selectedAuthor,
        displayFeaturedImage,
        displayPostContentRadio,
        displayPostContent,
        displayPostDate,
        displayAuthor,
        postLayout,
        columns,
        excerptLength,
        featuredImageAlign,
        featuredImageSizeSlug,
        featuredImageSizeWidth,
        featuredImageSizeHeight,
        addLinkToFeaturedImage,
        postType,
        desktopColumns,
        tableColumns,
        mobileColumns,
        isText,
        sliderSetting,
        cardStyle,
        text_after_title_text,
        slider_element_before_title_link
    } = attributes;

    const {
        imageSizeOptions,
        latestPosts,
        defaultImageWidth,
        defaultImageHeight
    } = useSelect(
        ( select ) => {
            postLayout === 'masonry' ?? setAttributes({featuredImageSizeSlug: 'full'});

            const { getEntityRecords, getMedia } = select( 'core' );
            const { getSettings } = select( 'core/block-editor' );

            const { imageSizes, imageDimensions } = getSettings();
            const catIds =
                categories && categories.length > 0
                    ? categories.map( ( cat ) => cat.id )
                    : [];
            const latestPostsQuery = pickBy(
                {
                    categories: catIds,
                    author: selectedAuthor,
                    order,
                    orderby: orderBy,
                    per_page: postsToShow,
                },
                ( value ) => ! isUndefined( value )
            );

            const latestPagesQuery = pickBy(
                {
                    author: selectedAuthor,
                    order,
                    orderby: orderBy,
                    per_page: postsToShow,
                },
                ( value ) => ! isUndefined( value )
            );

            const posts = {};

            POST_TYPE.forEach(index => {
                const value = index.value;
                posts[value] = getEntityRecords(
                    'postType',
                    postType,
                    postType === 'page' ? latestPagesQuery : latestPostsQuery 
                );
            });

            return {
                defaultImageWidth: get( 
                    imageDimensions,
                    [ featuredImageSizeSlug, 'width' ],
                    0
                ),
                defaultImageHeight: get(
                    imageDimensions,
                    [ featuredImageSizeSlug, 'height' ],
                    0
                ),
                imageSizeOptions: imageSizes
                    .map( ( { name, slug } ) => ( {
                        value: slug,
                        label: name,
                    } ) ),
                latestPosts: ! Array.isArray( posts[postType] )
                    ? posts[postType]
                    : posts[postType].map( ( post ) => {
                        if ( ! post.featured_media ) return post;

                        const image = getMedia( post.featured_media );
                        let url = get(
                            image,
                            [
                                'media_details',
                                'sizes',
                                featuredImageSizeSlug,
                                'source_url',
                            ],
                            null
                        );
                        if ( ! url ) {
                            url = get( image, 'source_url', null );
                        }
                        const featuredImageInfo = {
                            url,
                            // eslint-disable-next-line camelcase
                            alt: image?.alt_text,
                        };
                        return { ...post, featuredImageInfo };
                    } ),
            };
        },
        [
            featuredImageSizeSlug,
            postsToShow,
            order,
            orderBy,
            categories,
            selectedAuthor,
            postType,
            POST_TYPE
        ]
    );
    const [ categoriesList, setCategoriesList ] = useState( [] );
    const [ authorList, setAuthorList ] = useState( [] );
    const categorySuggestions = categoriesList.reduce(
        ( accumulator, category ) => ( {
            ...accumulator,
            [ category.name ]: category,
        } ),
        {}
    );
    const selectCategories = ( tokens ) => {
        const hasNoSuggestion = tokens.some(
            ( token ) =>
                typeof token === 'string' && ! categorySuggestions[ token ]
        );
        if ( hasNoSuggestion ) {
            return;
        }
        // Categories that are already will be objects, while new additions will be strings (the name).
        // allCategories nomalizes the array so that they are all objects.
        const allCategories = tokens.map( ( token ) => {
            return typeof token === 'string'
                ? categorySuggestions[ token ]
                : token;
        } );
        // We do nothing if the category is not selected
        // from suggestions.
        if ( includes( allCategories, null ) ) {
            return false;
        }
        setAttributes( { categories: allCategories } );
    };

    const masonryRef = createRef();
    const isStillMounted = useRef();

    useEffect( () => {
        isStillMounted.current = true;

        apiFetch( {
            path: addQueryArgs( `/wp/v2/categories`, CATEGORIES_LIST_QUERY ),
        } )
            .then( ( data ) => {
                if ( isStillMounted.current ) {
                    setCategoriesList( data );
                }
            } )
            .catch( () => {
                if ( isStillMounted.current ) {
                    setCategoriesList( [] );
                }
            } );
        apiFetch( {
            path: addQueryArgs( `/wp/v2/users`, USERS_LIST_QUERY ),
        } )
            .then( ( data ) => {
                if ( isStillMounted.current ) {
                    setAuthorList( data );
                }
            } )
            .catch( () => {
                if ( isStillMounted.current ) {
                    setAuthorList( [] );
                }
            } );

        return () => {
            isStillMounted.current = false;
        };
    }, [] );

    const onChangeTextAfterTitle = value => {
        setAttributes({text_after_title_text: value});
    };

    const onChangeElemBeforeTitleLink = value => {
        setAttributes({slider_element_before_title_link: value});
    }

    useEffect( () => {
        if ( latestPosts ) {

            if ( !text_after_title_text ) {
                let items = false;

                latestPosts.forEach( post => {
                    if ( post.price ) {
                        items = true
                    }
                });

                if ( items === true ) {
                    if ( !didAction('buba_blocks_posts_grid_text_after_title') )
                        doAction('buba_blocks_posts_grid_text_after_title', {
                            latestPosts,
                            onChangeTextAfterTitle
                        });
                }
            }

            if ( !slider_element_before_title_link ) {
                if ( !didAction('uba_blocks_posts_slider_element_before_title_link') )
                    doAction('buba_blocks_posts_slider_element_before_title_link', {
                        data: {
                            latestPosts,
                            postType,
                            postLayout
                        },
                        onChangeElemBeforeTitleLink
                    });
            }  
        }
    }, [
        latestPosts, 
        text_after_title_text,
        slider_element_before_title_link
    ] );
    

    const inspectorControls = (
        <InspectorControls>
            <PanelBody title={ __( 'General', 'buba-blocks' ) }  initialOpen={false}>
                <SelectControl
                    label={__('Post type', 'buba-blocks')}
                    value={postType}
                    onChange={(postType) => {
                        setAttributes({
                            postType
                        })
                    }}
                    options={POST_TYPE}
                />
            </PanelBody>
            <MasonryEdit 
                value={{attributes, setAttributes}}
                gap={masonryRef}
            />
            {postLayout === 'slider' && (
                <SliderEdit 
                    value={sliderSetting}
                    onChange={sliderSetting => setAttributes({sliderSetting})}
                />
            )}
            {postLayout !== 'masonry' && (
                <>
                    <PanelBody title={ __( 'Post content settings', 'buba-blocks' ) }  initialOpen={false}>
                        <ToggleControl
                            label={ __( 'Post content', 'buba-blocks' ) }
                            checked={ displayPostContent }
                            onChange={ ( value ) =>
                                setAttributes( { displayPostContent: value } )
                            }
                        />
                        { displayPostContent && (
                            <RadioControl
                                label={ __( 'Show:', 'buba-blocks' ) }
                                selected={ displayPostContentRadio }
                                options={ [
                                    { label: __( 'Excerpt', 'buba-blocks' ), value: 'excerpt' },
                                    {
                                        label: __( 'Full post', 'buba-blocks' ),
                                        value: 'full_post',
                                    },
                                ] }
                                onChange={ ( value ) =>
                                    setAttributes( {
                                        displayPostContentRadio: value,
                                    } )
                                }
                            />
                        ) }
                        { displayPostContent &&
                        displayPostContentRadio === 'excerpt' && (
                            <RangeControl
                                label={ __( 'Max number of words in excerpt', 'buba-blocks' ) }
                                value={ excerptLength }
                                onChange={ ( value ) =>
                                    setAttributes( { excerptLength: value } )
                                }
                                min={ MIN_EXCERPT_LENGTH }
                                max={ MAX_EXCERPT_LENGTH }
                            />
                        ) }
                    </PanelBody>

                    <PanelBody title={ __( 'Post meta settings', 'buba-blocks' ) }  initialOpen={false}>
                        <ToggleControl
                            label={ __( 'Display author name', 'buba-blocks' ) }
                            checked={ displayAuthor }
                            onChange={ ( value ) =>
                                setAttributes( { displayAuthor: value } )
                            }
                        />
                        <ToggleControl
                            label={ __( 'Display post date', 'buba-blocks' ) }
                            checked={ displayPostDate }
                            onChange={ ( value ) =>
                                setAttributes( { displayPostDate: value } )
                            }
                        />
                    </PanelBody>

                    <PanelBody title={ __( 'Featured image settings', 'buba-blocks' ) } initialOpen={false}>
                        <ToggleControl
                            label={ __( 'Display featured image', 'buba-blocks' ) }
                            checked={ displayFeaturedImage }
                            onChange={ ( value ) =>
                                setAttributes( { displayFeaturedImage: value } )
                            }
                        />
                        { displayFeaturedImage && (
                            <>
                                <ImageSizeControl
                                    onChange={ ( value ) => {
                                        const newAttrs = {};
                                        if ( value.hasOwnProperty( 'width' ) ) {
                                            newAttrs.featuredImageSizeWidth =
                                                value.width;
                                        }
                                        if ( value.hasOwnProperty( 'height' ) ) {
                                            newAttrs.featuredImageSizeHeight =
                                                value.height;
                                        }
                                        setAttributes( newAttrs );
                                    } }
                                    slug={ featuredImageSizeSlug }
                                    width={ featuredImageSizeWidth }
                                    height={ featuredImageSizeHeight }
                                    imageWidth={ defaultImageWidth }
                                    imageHeight={ defaultImageHeight }
                                    imageSizeOptions={ imageSizeOptions }
                                    onChangeImage={ ( value ) =>
                                        setAttributes( {
                                            featuredImageSizeSlug: value,
                                            featuredImageSizeWidth: undefined,
                                            featuredImageSizeHeight: undefined,
                                        } )
                                    }
                                />
                                <BaseControl className="block-editor-image-alignment-control__row">
                                    <BaseControl.VisualLabel>
                                        { __( 'Image alignment', 'buba-blocks' ) }
                                    </BaseControl.VisualLabel>
                                    <BlockAlignmentToolbar
                                        value={ featuredImageAlign }
                                        onChange={ ( value ) =>
                                            setAttributes( {
                                                featuredImageAlign: value,
                                            } )
                                        }
                                        controls={ [ 'left', 'center', 'right' ] }
                                        isCollapsed={ false }
                                    />
                                </BaseControl>
                                <ToggleControl
                                    label={ __( 'Add link to featured image', 'buba-blocks' ) }
                                    checked={ addLinkToFeaturedImage }
                                    onChange={ ( value ) =>
                                        setAttributes( {
                                            addLinkToFeaturedImage: value,
                                        } )
                                    }
                                />
                            </>
                        ) }
                    </PanelBody>
                </>
            )}

            <CardEdit 
                value={cardStyle}
                onChange={cardStyle => setAttributes({cardStyle})}
            />

            <PanelBody title={ __( 'Sorting and filtering', 'buba-blocks' ) }  initialOpen={false}>
                <QueryControls
                    { ...{ order, orderBy } }
                    numberOfItems={ postsToShow }
                    onOrderChange={ ( value ) =>
                        setAttributes( { order: value } )
                    }
                    onOrderByChange={ ( value ) =>
                        setAttributes( { orderBy: value } )
                    }
                    onNumberOfItemsChange={ ( value ) =>
                        setAttributes( { postsToShow: value } )
                    }
                    categorySuggestions={ postType ==='post' ? categorySuggestions : false }
                    onCategoryChange={ selectCategories }
                    selectedCategories={ categories }
                    onAuthorChange={ ( value ) =>
                        setAttributes( {
                            selectedAuthor:
                                '' !== value ? Number( value ) : undefined,
                        } )
                    }
                    authorList={ authorList }
                    selectedAuthorId={ selectedAuthor }
                />

                { postLayout === 'grid' && (
                    <RangeControl
                        label={ __( 'Columns', 'buba-blocks' ) }
                        value={ columns }
                        onChange={ ( value ) =>
                            setAttributes( { columns: value } )
                        }
                        min={ 2 }
                        max={
                            ! hasPosts
                                ? MAX_POSTS_COLUMNS
                                : Math.min(
                                MAX_POSTS_COLUMNS,
                                latestPosts.length
                                )
                        }
                        required
                    />
                ) }
            </PanelBody>
        </InspectorControls>
    );

    const blockProps = useBlockProps( {
        className: classnames( {
            'wp-block-buba-blocks-posts__slider': postLayout === 'slider',
            'wp-block-buba-blocks-posts__list': true && postLayout !== 'slider',
            'is-grid': postLayout === 'grid',
            'has-dates': displayPostDate,
            'has-author': displayAuthor,
            [ `columns-${ columns }` ]: postLayout === 'grid',
        } ),
    } );

    const stopClick = (e) => {
        e.preventDefault();
    }

    const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;
    if ( ! hasPosts ) {
        return (
            <div { ...blockProps }>
                { inspectorControls }
                <Placeholder icon={ pin } label={ __( 'Posts Grid', 'buba-blocks' ) }>
                    { ! Array.isArray( latestPosts ) ? (
                        <Spinner />
                    ) : (
                        __( 'No posts found.', 'buba-blocks' )
                    ) }
                </Placeholder>
            </div>
        );
    }

    // Removing posts from display should be instant.
    const displayPosts =
        latestPosts.length > postsToShow
            ? latestPosts.slice( 0, postsToShow )
            : latestPosts;

    const layoutControls = [
        {
            icon: list,
            title: __( 'List view', 'buba-blocks' ),
            onClick: () => setAttributes( { postLayout: 'list', featuredImageSizeSlug: 'thumbnail' } ),
            isActive: postLayout === 'list',
        },
        {
            icon: grid,
            title: __( 'Grid view', 'buba-blocks' ),
            onClick: () => setAttributes( { postLayout: 'grid', featuredImageSizeSlug: 'thumbnail' } ),
            isActive: postLayout === 'grid',
        },
        {
            icon: <Dashicon 
                    icon="text" 
                    style={{
                        marginRight: '3px',
                        transform: 'rotate(90deg)'
                    }}
                  />,
            title: __( 'Masonry view', 'buba-blocks' ),
            onClick: () => setAttributes( { postLayout: 'masonry', featuredImageSizeSlug: 'full' } ),
            isActive: postLayout === 'masonry',
        },
        {
            icon: sliderIcon,
            title: __( 'Slider view', 'buba-blocks' ),
            onClick: () => setAttributes( { postLayout: 'slider', featuredImageSizeSlug: 'thumbnail' } ),
            isActive: postLayout === 'slider',
        },
    ];

    const dateFormat = __experimentalGetSettings().formats.date;

    return (
        <div>
            { inspectorControls }
            <BlockControls>
                <ToolbarGroup controls={ layoutControls } />
            </BlockControls>
            { postLayout === 'masonry' ? 
                <div { ...blockProps }>
                    <div className="wp-block-buba-blocks-posts__masonry-wrapper" ref={masonryRef}>
                        <Masonry
                            breakpointCols={{
                                default: desktopColumns,
                                1100: tableColumns,
                                700: mobileColumns
                            }}
                            className="wp-block-buba-blocks-posts__masonry-grid"
                            columnClassName="wp-block-buba-blocks-posts__masonry-column">
                                { displayPosts.map( post => {
                                    const titleTrimmed = invoke( post, [
                                        'title',
                                        'rendered',
                                        'trim',
                                    ] );
                                    let excerpt = post.excerpt.rendered;

                                    const excerptElement = document.createElement( 'div' );
                                    excerptElement.innerHTML = excerpt;

                                    excerpt =
                                        excerptElement.textContent ||
                                        excerptElement.innerText ||
                                        '';

                                    const {
                                        featuredImageInfo: {
                                            url: imageSourceUrl,
                                            alt: featuredImageAlt,
                                        } = {},
                                    } = post;
                                    const imageClasses = classnames( {
                                        'wp-block-buba-blocks-posts__masonry-image': true,
                                        [ `align${ featuredImageAlign }` ]: !! featuredImageAlign,
                                    } );
                                    const featuredImage = imageSourceUrl && (
                                        <img
                                            src={ imageSourceUrl }
                                            alt={ featuredImageAlt }
                                        />
                                    );

                                    return (
                                        <div className="wp-block-buba-blocks-posts__masonry-item">
                                            <a 
                                            className={ imageClasses }
                                            href={ post.link } 
                                            rel="noreferrer noopener"
                                            onClick={stopClick}>
                                                { featuredImage }
                                            </a>
                                            {isText && (
                                                <>
                                                    <h4 className="wp-block-buba-blocks-posts__masonry-title" style={{...cardStyle.title}}>
                                                        { titleTrimmed ? (
                                                            <RawHTML>{ titleTrimmed }</RawHTML>
                                                        ) : (
                                                            __( '(no title)', 'buba-blocks' )
                                                        ) }
                                                    </h4>
                                                    <span className="wp-block-buba-blocks-posts__masonry-background"></span>
                                                </>
                                            )}
                                        </div>
                                    );
                                } ) }
                        </Masonry>
                    </div>
                </div>
            : postLayout === 'slider' ? 
                <div {...blockProps}>
                    <Slider setting={sliderSetting}>
                        { displayPosts.map( ( post, i ) => {
                            const titleTrimmed = invoke( post, [
                                'title',
                                'rendered',
                                'trim',
                            ] );
                            let excerpt = post.excerpt.rendered;
                            const currentAuthor = authorList.find(
                                ( author ) => author.id === post.author
                            );

                            const excerptElement = document.createElement( 'div' );
                            excerptElement.innerHTML = excerpt;

                            excerpt =
                                excerptElement.textContent ||
                                excerptElement.innerText ||
                                '';

                            const {
                                featuredImageInfo: {
                                    url: imageSourceUrl,
                                    alt: featuredImageAlt,
                                } = {},
                            } = post;
                            const imageClasses = classnames( {
                                'wp-block-buba-blocks-posts__featured-image': true,
                                [ `align${ featuredImageAlign }` ]: !! featuredImageAlign,
                            } );
                            const renderFeaturedImage =
                                displayFeaturedImage && imageSourceUrl;
                            const featuredImage = renderFeaturedImage && (
                                <img
                                    src={ imageSourceUrl }
                                    alt={ featuredImageAlt }
                                    style={ {
                                        maxWidth: featuredImageSizeWidth,
                                        maxHeight: featuredImageSizeHeight,
                                    } }
                                />
                            );

                            const needsReadMore =
                                excerptLength < excerpt.trim().split( ' ' ).length &&
                                post.excerpt.raw === '';

                            const postExcerpt = needsReadMore ? (
                                <>
                                    { excerpt
                                        .trim()
                                        .split( ' ', excerptLength )
                                        .join( ' ' ) }
                                    { /* translators: excerpt truncation character, default …  */ }
                                    { __( ' … ', 'buba-blocks' ) }
                                    <a href={ post.link } rel="noopener noreferrer"
                                        onClick={stopClick}
                                    >
                                        { __( 'Read more', 'buba-blocks' ) }
                                    </a>
                                </>
                            ) : (
                                excerpt
                            );

                            return (
                                <div className="buba-blocks-slider__item">
                                    <div className="wp-block-buba-blocks-posts__item"
                                        key={ i }
                                        style={{...cardStyle.card}}>
                                        { renderFeaturedImage && (
                                            <div className={ imageClasses }>
                                                { addLinkToFeaturedImage ? (
                                                    <a
                                                        href={ post.link }
                                                        rel="noreferrer noopener"
                                                        onClick={stopClick}
                                                    >
                                                        { featuredImage }
                                                    </a>
                                                ) : (
                                                    featuredImage
                                                ) }
                                            </div>
                                        ) }
 
                                        { slider_element_before_title_link?.map( (value,index) => 
                                            index === i ? (
                                                <div className="wp-block-buba-blocks-posts-slider__element-before-title-link">
                                                    { value['text'] }
                                                </div>
                                            ) : ''
                                        )}
                                        

                                        <h3 className="wp-block-buba-blocks-posts__post-title">
                                            <a href={ post.link } rel="noreferrer noopener"
                                                onClick={stopClick}
                                                style={{...cardStyle.title}}
                                            >
                                                { titleTrimmed ? (
                                                    <RawHTML>{ titleTrimmed }</RawHTML>
                                                ) : (
                                                    __( '(no title)', 'buba-blocks' )
                                                ) }
                                            </a>
                                        </h3>
                                        { displayAuthor && currentAuthor && (
                                            <div className="wp-block-buba-blocks-posts__post-author" style={{...cardStyle.another}}>
                                                { sprintf(
                                                    /* translators: byline. %s: current author. */
                                                    __( 'by %s', 'buba-blocks' ),
                                                    currentAuthor.name
                                                ) }
                                            </div>
                                        ) }
                                        { displayPostDate && post.date_gmt && (
                                            <time
                                                dateTime={ format( 'c', post.date_gmt ) }
                                                className="wp-block-buba-blocks-posts__post-date"
                                                style={{...cardStyle.another}}
                                            >
                                                { dateI18n( dateFormat, post.date_gmt ) }
                                            </time>
                                        ) }
                                        { displayPostContent &&
                                        displayPostContentRadio === 'excerpt' && (
                                            <div className="wp-block-buba-blocks-posts__post-excerpt" style={{...cardStyle.text}}>
                                                { postExcerpt }
                                            </div>
                                        ) }
                                        { displayPostContent &&
                                        displayPostContentRadio === 'full_post' && (
                                            <div className="wp-block-buba-blocks-posts__post-full-content" style={{...cardStyle.text}}>
                                                <RawHTML key="html">
                                                    { post.content.raw.trim() }
                                                </RawHTML>
                                            </div>
                                        ) }
                                    </div>
                                </div>
                            );
                        } ) }
                    </Slider>
                </div>
            :
                <ul { ...blockProps }>
                    { displayPosts.map( ( post, i ) => {
                        const titleTrimmed = invoke( post, [
                            'title',
                            'rendered',
                            'trim',
                        ] );
                        let excerpt = post?.excerpt?.rendered;
                        const currentAuthor = authorList.find(
                            ( author ) => author.id === post.author
                        );

                        const excerptElement = document.createElement( 'div' );
                        excerptElement.innerHTML = excerpt;

                        excerpt =
                            excerptElement.textContent ||
                            excerptElement.innerText ||
                            '';

                        const {
                            featuredImageInfo: {
                                url: imageSourceUrl,
                                alt: featuredImageAlt,
                            } = {},
                        } = post;
                        const imageClasses = classnames( {
                            'wp-block-buba-blocks-posts__featured-image': true,
                            [ `align${ featuredImageAlign }` ]: !! featuredImageAlign,
                        } );
                        const renderFeaturedImage =
                            displayFeaturedImage && imageSourceUrl;
                        const featuredImage = renderFeaturedImage && (
                            <img
                                src={ imageSourceUrl }
                                alt={ featuredImageAlt }
                                style={ {
                                    maxWidth: featuredImageSizeWidth,
                                    maxHeight: featuredImageSizeHeight,
                                } }
                            />
                        );

                        const needsReadMore =
                            excerptLength < excerpt.trim().split( ' ' ).length &&
                            post.excerpt.raw === '';

                        const postExcerpt = needsReadMore ? (
                            <>
                                { excerpt
                                    .trim()
                                    .split( ' ', excerptLength )
                                    .join( ' ' ) }
                                { /* translators: excerpt truncation character, default …  */ }
                                { __( ' … ', 'buba-blocks' ) }
                                <a href={ post.link } rel="noopener noreferrer"
                                    onClick={stopClick}
                                >
                                    { __( 'Read more', 'buba-blocks' ) }
                                </a>
                            </>
                        ) : (
                            excerpt
                        );

                        return (
                            <li className="wp-block-buba-blocks-posts__item"
                                key={ i }
                                style={{...cardStyle.card}}>
                                { renderFeaturedImage && (
                                    <div className={ imageClasses }>
                                        { addLinkToFeaturedImage ? (
                                            <a
                                                href={ post.link }
                                                rel="noreferrer noopener"
                                                onClick={stopClick}
                                            >
                                                { featuredImage }
                                            </a>
                                        ) : (
                                            featuredImage
                                        ) }
                                    </div>
                                ) }
                                <h3 className="wp-block-buba-blocks-posts__post-title">
                                    <a href={ post.link } rel="noreferrer noopener"
                                        onClick={stopClick}
                                        style={{...cardStyle.title}}
                                    >
                                        { titleTrimmed ? (
                                            <RawHTML>{ titleTrimmed }</RawHTML>
                                        ) : (
                                            __( '(no title)', 'buba-blocks' )
                                        ) }

                                        <span class="wp-block-buba-blocks-posts__price">
                                            { text_after_title_text?.map( (value,index) => index === i ? value : '' ) }
                                        </span>
                                    </a>
                                </h3>
                                { displayAuthor && currentAuthor && (
                                    <div className="wp-block-buba-blocks-posts__post-author" style={{...cardStyle.another}}>
                                        { sprintf(
                                            /* translators: byline. %s: current author. */
                                            __( 'by %s', 'buba-blocks' ),
                                            currentAuthor.name
                                        ) }
                                    </div>
                                ) }
                                { displayPostDate && post.date_gmt && (
                                    <time
                                        dateTime={ format( 'c', post.date_gmt ) }
                                        className="wp-block-buba-blocks-posts__post-date"
                                        style={{...cardStyle.another}}
                                    >
                                        { dateI18n( dateFormat, post.date_gmt ) }
                                    </time>
                                ) }
                                { displayPostContent &&
                                displayPostContentRadio === 'excerpt' && (
                                    <div className="wp-block-buba-blocks-posts__post-excerpt" style={{...cardStyle.text}}>
                                        { postExcerpt }
                                    </div>
                                ) }
                                { displayPostContent &&
                                displayPostContentRadio === 'full_post' && (
                                    <div className="wp-block-buba-blocks-posts__post-full-content" style={{...cardStyle.text}}>
                                        <RawHTML key="html">
                                            { post.content.raw.trim() }
                                        </RawHTML>
                                    </div>
                                ) }
                            </li>
                        );
                    } ) }
                </ul> 
            }
        </div>
    );
}