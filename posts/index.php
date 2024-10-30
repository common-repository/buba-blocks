<?php
defined( 'ABSPATH' ) || exit;

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function buba_blocks_posts_register_block() {
    global $buba_blocks_languages_path;

	// automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

	wp_register_script(
		'buba-blocks-posts',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

    wp_register_style(
        'buba-blocks-posts-editor',
        plugins_url( 'editor.css', __FILE__ ),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    );

	wp_register_style(
		'buba-blocks-posts',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( 'buba-blocks/posts', array(
		'style' => 'buba-blocks-posts',
        'editor_style' => 'buba-blocks-posts-editor',
		'editor_script' => 'buba-blocks-posts',
        'apiVersion' => 2,
        'attributes'      => array(
            'text_after_title_text' => array(
                'type' => 'array'
            ),
            'slider_element_before_title_link' => array(
                'type' => 'array'
            ),
            'align'                   => array(
                'type' => 'string',
                'enum' => array( 'left', 'center', 'right' ),
            ),
            'cardStyle' => array(
                'type' => 'object'
            ),
            'postType' => array(
                'type' => 'string',
                'default' => 'post',
            ),
            'className'               => array(
                'type' => 'string',
            ),
            'categories'              => array(
                'type' => 'string',
            ),
            'postsToShow'             => array(
                'type'    => 'number',
                'default' => 5,
            ),
            'displayPostContent'      => array(
                'type'    => 'boolean',
                'default' => false,
            ),
            'displayPostContentRadio' => array(
                'type'    => 'string',
                'default' => 'excerpt',
            ),
            'excerptLength'           => array(
                'type'    => 'number',
                'default' => 55,
            ),
            'displayPostDate'         => array(
                'type'    => 'boolean',
                'default' => false,
            ),
            'postLayout'              => array(
                'type'    => 'string',
                'default' => 'list',
            ),
            'columns'                 => array(
                'type'    => 'number',
                'default' => 3,
            ),
            'order'                   => array(
                'type'    => 'string',
                'default' => 'desc',
            ),
            'orderBy'                 => array(
                'type'    => 'string',
                'default' => 'date',
            ),
            'displayFeaturedImage'    => array(
                'type'    => 'boolean',
                'default' => false,
            ),
            'featuredImageAlign'      => array(
                'type' => 'string',
                'enum' => array( 'left', 'center', 'right' ),
            ),
            'featuredImageSizeSlug'   => array(
                'type'    => 'string',
                'default' => 'thumbnail',
            ),
            'featuredImageSizeWidth'  => array(
                'type'    => 'number',
                'default' => null,
            ),
            'featuredImageSizeHeight' => array(
                'type'    => 'number',
                'default' => null,
            ),
            'addLinkToFeaturedImage' => array(
                'type' => 'boolean',
                'default' => false,
            ),
            'isText' => array(
                'type' => 'boolean',
                'default' => true,
            ),
            'masonryGap' => array(
                'type' => 'number',
                'default' => 20,
            ),
            'desktopColumns' => array(
                'type' => 'number',
                'default' => 3,
            ),
            'tableColumns' => array(
                'type' => 'number',
                'default' => 3,
            ),
            'mobileColumns' => array(
                'type' => 'number',
                'default' => 3,
            ),
            'sliderSetting' => array(
                'type' => 'object',
                'default' => null,
            ),
        ),
        'render_callback' => 'render_block_core_posts',
	) );

  if ( function_exists( 'wp_set_script_translations' ) ) {
    /**
     * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
     * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
     * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
     */
    wp_set_script_translations( 'buba-blocks-posts', 'buba-blocks', $buba_blocks_languages_path . '/blocks/posts');
  }

}
add_action( 'init', 'buba_blocks_posts_register_block' );

/**
 * Recursive function that generates from a a multidimensional array of CSS rules, a valid CSS string.
 *
 * @param array $rules
 *   An array of CSS rules in the form of:
 *   array('selector'=>array('property' => 'value')). Also supports selector
 *   nesting, e.g.,
 *   array('selector' => array('selector'=>array('property' => 'value'))).
 *
 * @return string A CSS string of rules. This is not wrapped in <style> tags.
 * @source http://matthewgrasmick.com/article/convert-nested-php-array-css-string
 */
function css_array_to_css($rules, $indent = 0) {
    $css = '';
    $prefix = str_repeat('  ', $indent);

    foreach ($rules as $key => $value) {
        $property = $key;
        $css .= $prefix . "$property: $value; ";
    }

    return $css;
}

/**
 * Server-side rendering of the `buba-blocks/posts` block.
 *
 * @package WordPress
 */

/**
 * The excerpt length set by the Posts core block
 * set at render time and used by the block itself.
 *
 * @var int
 */
$block_core_posts_excerpt_length = 0;
$block_core_posts_text = '';

add_action( 'block_core_posts_text_change', function($str) {
    global $block_core_posts_text;
    $block_core_posts_text = $str;
} );

/**
 * Callback for the excerpt_length filter used by
 * the Posts block at render time.
 *
 * @return int Returns the global $block_core_posts_excerpt_length variable
 *             to allow the excerpt_length filter respect the Block setting.
 */
function block_core_posts_get_excerpt_length() {
    global $block_core_posts_excerpt_length;
    return $block_core_posts_excerpt_length;
}

/**
 * Renders the `buba-blocks/posts` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with posts added.
 */
function render_block_core_posts( $attributes ) {
    global $post, $block_core_posts_excerpt_length, $block_core_posts_text;
    $args = array(
        'posts_per_page'   => $attributes['postsToShow'],
        'post_status'      => 'publish',
        'order'            => $attributes['order'],
        'orderby'          => $attributes['orderBy'],
        'suppress_filters' => false,
    );

    $block_core_posts_excerpt_length = $attributes['excerptLength'];
    add_filter( 'excerpt_length', 'block_core_posts_get_excerpt_length', 20 );

    if ( isset( $attributes['categories'] ) ) {
        $args['category__in'] = array_column( $attributes['categories'], 'id' );
    }
    if ( isset( $attributes['selectedAuthor'] ) ) {
        $args['author'] = $attributes['selectedAuthor'];
    }
    if ( isset( $attributes['postType'] ) ) {
        $args['post_type'] = $attributes['postType'];
    }

    $recent_posts = get_posts( $args );

    $list_items_markup = '';

    foreach ( $recent_posts as $key => $post ) {
        $post_link = esc_url( get_permalink( $post ) );

        if ( $attributes['postLayout'] === 'masonry') {
            $list_items_markup .= '<li class="wp-block-buba-blocks-posts__masonry-item is-masonry__item">';

            if ( has_post_thumbnail( $post ) ) {
                $image_style = '';

                $featured_image = get_the_post_thumbnail(
                    $post,
                    $attributes['featuredImageSizeSlug'],
                    array()
                );
                
                $list_items_markup .= sprintf(
                    '<a href="%1$s" class="wp-block-buba-blocks-posts__masonry-image">%2$s</a>',
                    $post_link,
                    $featured_image
                );
            }

            if ( isset( $attributes['isText'] ) && $attributes['isText'] ) {
                $title = get_the_title( $post );
                if ( ! $title ) {
                    $title = __( '(no title)', 'buba-blocks' );
                }
                $list_items_markup .= sprintf(
                    '<h4 class="wp-block-buba-blocks-posts__masonry-title" style="font-size: %2$s; color: %3$s;">%1$s</h4>',
                    $title,
                    $attributes['cardStyle']['title']['fontSize'],
                    $attributes['cardStyle']['title']['color']
                );
                $list_items_markup .= '<span class="wp-block-buba-blocks-posts__masonry-background"></span>';
            }

            $list_items_markup .= "</li>\n";

        } else {
            if ( $attributes['postLayout'] === 'slider' ) {
                $list_items_markup .= sprintf(
                    '<div class="buba-blocks-slider__item">
                        <div class="wp-block-buba-blocks-posts__item" style="background-color: %1$s;">',
                    $attributes['cardStyle']['card']['backgroundColor']
                );
            } else {
                $list_items_markup .= sprintf(
                    '<li class="wp-block-buba-blocks-posts__item" style="background-color: %1$s;">',
                    $attributes['cardStyle']['card']['backgroundColor']
                );
            }

            if ( $attributes['displayFeaturedImage'] && has_post_thumbnail( $post ) ) {
                $image_style = '';
                if ( isset( $attributes['featuredImageSizeWidth'] ) ) {
                    $image_style .= sprintf( 'max-width:%spx;', $attributes['featuredImageSizeWidth'] );
                }
                if ( isset( $attributes['featuredImageSizeHeight'] ) ) {
                    $image_style .= sprintf( 'max-height:%spx;', $attributes['featuredImageSizeHeight'] );
                }

                $image_classes = 'wp-block-buba-blocks-posts__featured-image';
                if ( isset( $attributes['featuredImageAlign'] ) ) {
                    $image_classes .= ' align' . $attributes['featuredImageAlign'];
                }

                $featured_image = get_the_post_thumbnail(
                    $post,
                    $attributes['featuredImageSizeSlug'],
                    array(
                        'style' => $image_style,
                    )
                );
                if ( $attributes['addLinkToFeaturedImage'] ) {
                    $featured_image = sprintf(
                        '<a href="%1$s">%2$s</a>',
                        $post_link,
                        $featured_image
                    );
                }
                $list_items_markup .= sprintf(
                    '<div class="%1$s">%2$s</div>',
                    $image_classes,
                    $featured_image
                );
            }

            if ( isset($attributes['slider_element_before_title_link']) ) {
                $slider_element = $attributes['slider_element_before_title_link'];
            }
            else {
                $slider_element = '';
            }

            if ( $attributes['postLayout'] === 'slider' && $slider_element !== '' ) {
                if ( isset($slider_element[$key]['link']) && $slider_element[$key]['link'] !== '' ) {
                    $list_items_markup .= sprintf(
                        '<a class="wp-block-buba-blocks-posts-slider__element-before-title-link" href="%1$s">%2$s</a>',
                        $slider_element[$key]['link'],
                        $slider_element[$key]['text']
                    );
                }
                else {
                    $list_items_markup .= sprintf(
                        '<div class="wp-block-buba-blocks-posts-slider__element-before-title-link">%1$s</div>',
                        $slider_element[$key],
                    );
                }
            }

            $title = get_the_title( $post );
            if ( ! $title ) {
                $title = __( '(no title)', 'buba-blocks' );
            }

            
            if ( isset( $attributes['text_after_title_text'] ) ) {
                $after_title_text = sprintf(
                    '<span class="wp-block-buba-blocks-posts__price">%1$s</span>',
                    $attributes['text_after_title_text'][$key]
                );
            } 
            else {
                $after_title_text = '';
            }

            $list_items_markup .= sprintf(
                '<h3 class="wp-block-buba-blocks-posts__post-title"><a href="%1$s" style="font-size: %3$s; color: %4$s;">%2$s%5$s%6$s</a></h3>',
                $post_link,
                $title,
                $attributes['cardStyle']['title']['fontSize'],
                $attributes['cardStyle']['title']['color'],
                $attributes['postLayout'] === 'grid' ? $block_core_posts_text : '',
                $after_title_text
            );

            if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) {
                $author_display_name = get_the_author_meta( 'display_name', $post->post_author );

                /* translators: byline. %s: current author. */
                $byline = sprintf( __( 'by %s', 'buba-blocks' ), $author_display_name );

                if ( ! empty( $author_display_name ) ) {
                    $list_items_markup .= sprintf(
                        '<div class="wp-block-buba-blocks-posts__post-author" style="font-size: %2$s; color: %3$s;">%1$s</div>',
                        esc_html( $byline ),
                        $attributes['cardStyle']['another']['fontSize'],
                        $attributes['cardStyle']['another']['color']
                    );
                }
            }

            if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
                $list_items_markup .= sprintf(
                    '<time datetime="%1$s" class="wp-block-buba-blocks-posts__post-date" style="font-size: %3$s; color: %4$s;">%2$s</time>',
                    esc_attr( get_the_date( 'c', $post ) ),
                    esc_html( get_the_date( '', $post ) ),
                    $attributes['cardStyle']['another']['fontSize'],
                    $attributes['cardStyle']['another']['color']
                );
            }

            if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
                && isset( $attributes['displayPostContentRadio'] ) && 'excerpt' === $attributes['displayPostContentRadio'] ) {

                $trimmed_excerpt = get_the_excerpt( $post );

                $list_items_markup .= sprintf(
                    '<div class="wp-block-buba-blocks-posts__post-excerpt" style="font-size: %2$s; color: %3$s;">%1$s</div>',
                    $trimmed_excerpt,
                    $attributes['cardStyle']['text']['fontSize'],
                    $attributes['cardStyle']['text']['color']
                );
            }

            if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
                && isset( $attributes['displayPostContentRadio'] ) && 'full_post' === $attributes['displayPostContentRadio'] ) {
                $list_items_markup .= sprintf(
                    '<div class="wp-block-buba-blocks-posts__post-full-content" style="font-size: %2$s; color: %3$s;">%1$s</div>',
                    wp_kses_post( html_entity_decode( $post->post_content, ENT_QUOTES, get_option( 'blog_charset' ) ) ),
                    $attributes['cardStyle']['text']['fontSize'],
                    $attributes['cardStyle']['text']['color']
                );
            }
            
            if ( $attributes['postLayout'] === 'slider' ) {
                $list_items_markup .= "</div></div>\n";
            } else {
                $list_items_markup .= "</li>\n";
            }
        }
    }

    remove_filter( 'excerpt_length', 'block_core_posts_get_excerpt_length', 20 );

    $class = 'wp-block-buba-blocks-posts__list';

    if ( isset( $attributes['align'] ) ) {
        $class .= ' align' . $attributes['align'];
    }

    if ( isset( $attributes['postLayout'] ) && 'grid' === $attributes['postLayout'] ) {
        $class .= ' is-grid';
    }
    
    if ( isset( $attributes['postLayout'] ) && 'masonry' === $attributes['postLayout'] ) {
        $class .= ' is-masonry';
    }
    
    if ( isset( $attributes['postLayout'] ) && 'slider' === $attributes['postLayout'] ) {
        $class .= ' buba-blocks-slider';
    }

    if ( isset( $attributes['columns'] ) && 'grid' === $attributes['postLayout'] ) {
        $class .= ' columns-' . $attributes['columns'];
    }

    if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] && $attributes['postLayout'] !== 'masonry' ) {
        $class .= ' has-dates';
    }

    if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] && $attributes['postLayout'] !== 'masonry' ) {
        $class .= ' has-author';
    }

    $wrapper_attributes = get_block_wrapper_attributes( array( 
        'class' => $class
    ) );

    if ( 'slider' === $attributes['postLayout'] ) {
        $sliderArray = $attributes['sliderSetting'];

        $sliderArray['prevArrow'] = 
            '<button type="button" class="slick-prev buba-blocks-slider__arrow" style="'.css_array_to_css($sliderArray['arrowsStyle']).'"></button>';
            
        $sliderArray['nextArrow'] = 
            '<button type="button" class="slick-next buba-blocks-slider__arrow" style="'.css_array_to_css($sliderArray['arrowsStyle']).'"></button>';
    
        return sprintf(
            '<div %1$s style="--gap: %3$spx" data-slick=\'%4$s\'>%2$s</div>',
            $wrapper_attributes,
            $list_items_markup,
            $sliderArray['gap'],
            esc_attr( json_encode($sliderArray) ),
        );
    }

    if ( 'masonry' === $attributes['postLayout'] ) {
        $masonry_datas = '{ "itemSelector": ".is-masonry__item", "horizontalOrder": true }';
        $masonry_styles = "
            --masonry-gap: ".$attributes['masonryGap']."px;
            --masonry-columns: ".$attributes['desktopColumns'].";
            --masonry-columns-table: ".$attributes['tableColumns'].";
            --masonry-columns-mobile: ".$attributes['mobileColumns'].";
        ";
        
        return sprintf(
            '<div class="wp-block-buba-blocks-posts__masonry-wrapper" style="%3$s">
                <ul %1$s data-masonry=\'%4$s\'>%2$s</ul>
            </div>',
            $wrapper_attributes,
            $list_items_markup,
            esc_attr($masonry_styles),
            esc_attr($masonry_datas),
        );
    }

    return sprintf(
        '<ul %1$s>%2$s</ul>',
        $wrapper_attributes,
        $list_items_markup,
    );
}


/**
 * Handles outdated versions of the `buba-blocks/posts` block by converting
 * attribute `categories` from a numeric string to an array with key `id`.
 *
 * This is done to accommodate the changes introduced in #20781 that sought to
 * add support for multiple categories to the block. However, given that this
 * block is dynamic, the usual provisions for block migration are insufficient,
 * as they only act when a block is loaded in the editor.
 *
 * TODO: Remove when and if the bottom client-side deprecation for this block
 * is removed.
 *
 * @param array $block A single parsed block object.
 *
 * @return array The migrated block object.
 */
function block_core_posts_migrate_categories( $block ) {
    if (
        'buba-blocks/posts' === $block['blockName'] &&
        ! empty( $block['attrs']['categories'] ) &&
        is_string( $block['attrs']['categories'] )
    ) {
        $block['attrs']['categories'] = array(
            array( 'id' => absint( $block['attrs']['categories'] ) ),
        );
    }

    return $block;
}
add_filter( 'render_block_data', 'block_core_posts_migrate_categories' );