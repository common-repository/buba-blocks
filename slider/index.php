<?php
defined( 'ABSPATH' ) || exit;

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function buba_blocks_slider_register_block() {
    global $buba_blocks_languages_path;

    // automatically load dependencies and version
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

    wp_register_script(
        'buba-blocks-slider',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    wp_register_style(
        'buba-blocks-slider-editor',
        plugins_url( 'editor.css', __FILE__ ),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    );

    wp_register_style(
        'buba-blocks-slider',
        plugins_url( 'style.css', __FILE__ ),
        array( ),
        filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );

    register_block_type( 'buba-blocks/slider', array(
        'style' => 'buba-blocks-slider',
        'editor_style' => 'buba-blocks-slider-editor',
        'editor_script' => 'buba-blocks-slider',
    ) );

    if ( function_exists( 'wp_set_script_translations' ) ) {
        /**
         * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
         * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
         * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
         */
        wp_set_script_translations( 'buba-blocks-slider', 'buba-blocks', $buba_blocks_languages_path . 'blocks/slider' );
    }

}
add_action( 'init', 'buba_blocks_slider_register_block' );
