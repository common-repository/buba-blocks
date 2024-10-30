<?php
defined( 'ABSPATH' ) || exit;

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function buba_blocks_social_share_child_register_block() {
	global $buba_blocks_languages_path;

	// automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

	wp_register_script(
		'buba-blocks-social-share-child',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

    wp_register_style(
        'buba-blocks-social-share-child-editor',
        plugins_url( 'editor.css', __FILE__ ),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    );

	wp_register_style(
		'buba-blocks-social-share-child',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( 'buba-blocks/social-share-child', array(
		'style' => 'buba-blocks-social-share-child',
        'editor_style' => 'buba-blocks-social-share-child-editor',
		'editor_script' => 'buba-blocks-social-share-child',
	) );

  if ( function_exists( 'wp_set_script_translations' ) ) {
    /**
     * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
     * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
     * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
     */
    wp_set_script_translations( 'buba-blocks-social-share-child', 'buba-blocks', $buba_blocks_languages_path . '/blocks/social-share-child' );
  }

}
add_action( 'init', 'buba_blocks_social_share_child_register_block' );
