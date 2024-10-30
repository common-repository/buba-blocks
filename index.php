<?php
/**
 * Plugin Name: Buba Blocks
 * Plugin URI: https://bitbucket.org/ecuras/buba-blocks/src/master/
 * Description: This is a first Gutenberg plugin from Ecuras LLC.
 * Version: 1.10
 * Author: Ecuras LLC
 * Author URI: https://ecuras.com
 * @package buba-blocks
 */

defined('ABSPATH') || exit;

$buba_blocks_languages_path = plugin_dir_path( __FILE__ ) . 'languages';

include 'button/index.php';
include 'buttons/index.php';
include 'card/index.php';
include 'slider/index.php';
include 'section/index.php';
include 'container/index.php';
include 'accordion/index.php';
include 'slider-images/index.php';
include 'table-of-contents/index.php';
include 'map/index.php';
include 'social-share/index.php';
include 'social-share-child/index.php';
include 'posts/index.php';
include 'patterns/index.php';
include 'form/index.php';

if (!function_exists('buba_blocks_categories')) {
    function buba_blocks_categories($categories, $post)
    {
        return array_merge(
            $categories,
            array(
                array(
                    'slug' => 'buba',
                    'title' => __('Buba', 'buba-blocks'),
                    'icon' => 'wordpress'
                )
            )
        );
    }

    add_filter('block_categories_all', 'buba_blocks_categories', 10, 2);
}
function buba_blocks_register_block_pattern_category() {
    if ( class_exists( 'WP_Block_Patterns_Registry' ) ) {

        register_block_pattern_category(
            'sections',
            array( 'label' => _x( 'Sections', 'Block pattern category', 'buba-blocks' ) )
        );

    }
}
add_action( 'init', 'buba_blocks_register_block_pattern_category' );
if (!function_exists('buba_blocks_styles')) {
    function buba_blocks_styles()
    {
        wp_register_style('buba-styles', plugins_url('assets/buba-styles.css', __FILE__), array(), null);
        wp_enqueue_style('buba-styles');
        wp_register_style('special', 'https://use.fontawesome.com/releases/v5.0.9/css/all.css');
        wp_enqueue_style('special');
        wp_register_style('slick-carousel', plugins_url('assets/vendors/slick/slick.css', __FILE__), array(), null);
        wp_enqueue_style('slick-carousel');
        wp_register_style('slick-theme', plugins_url('assets/vendors/slick/slick-theme.css', __FILE__), array(), null);
        wp_enqueue_style('slick-theme');
        wp_register_style('buba-animate', plugins_url('assets/vendors/animate/animate.compat.css', __FILE__), array(), null);
        wp_enqueue_style('buba-animate');
        wp_register_style('font-icon-picker', plugins_url('assets/vendors/font-icon-picker/style.css', __FILE__), array(), null);
        wp_enqueue_style('font-icon-picker');
        wp_register_script('buba-wow', plugins_url('assets/vendors/wow/wow.min.js', __FILE__), array('jquery'), null, true);
        wp_enqueue_script('buba-wow');

        wp_register_style('buba-noty', plugins_url('assets/vendors/noty/noty.css', __FILE__), array(), null);
        wp_enqueue_style('buba-noty');
        // themes
        wp_register_style('buba-noty-theme-mint', plugins_url('assets/vendors/noty/themes/mint.css', __FILE__), array(), null);
        wp_enqueue_style('buba-noty-theme-mint');
        wp_register_style('buba-noty-theme-light', plugins_url('assets/vendors/noty/themes/light.css', __FILE__), array(), null);
        wp_enqueue_style('buba-noty-theme-light');
        wp_register_style('buba-noty-theme-nest', plugins_url('assets/vendors/noty/themes/nest.css', __FILE__), array(), null);
        wp_enqueue_style('buba-noty-theme-nest');
        wp_register_style('buba-noty-theme-metroui', plugins_url('assets/vendors/noty/themes/metroui.css', __FILE__), array(), null);
        wp_enqueue_style('buba-noty-theme-metroui');
        wp_register_style('buba-noty-theme-relax', plugins_url('assets/vendors/noty/themes/relax.css', __FILE__), array(), null);
        wp_enqueue_style('buba-noty-theme-relax');
        wp_register_style('buba-noty-theme-semanticui', plugins_url('assets/vendors/noty/themes/semanticui.css', __FILE__), array(), null);
        wp_enqueue_style('buba-noty-theme-semanticui');
        wp_register_style('buba-noty-theme-sunset', plugins_url('assets/vendors/noty/themes/sunset.css', __FILE__), array(), null);
        wp_enqueue_style('buba-noty-theme-sunset');
        wp_register_style('buba-noty-theme-bootstrap-v3', plugins_url('assets/vendors/noty/themes/bootstrap-v3.css', __FILE__), array(), null);
        wp_enqueue_style('buba-noty-theme-bootstrap-v3');
        wp_register_style('buba-noty-theme-bootstrap-v4', plugins_url('assets/vendors/noty/themes/bootstrap-v4.css', __FILE__), array(), null);
        wp_enqueue_style('buba-noty-theme-bootstrap-v4');
    }
}
if (!function_exists('buba_blocks_frontend_scripts')) {
    function buba_blocks_frontend_scripts()
    {
        wp_register_script('slick', plugins_url('assets/vendors/slick/slick.js', __FILE__), array('jquery'), null, true);
        wp_register_script('masonry', plugins_url('assets/vendors/masonry/masonry.pkgd.min.js', __FILE__), array('jquery'), null, true);
        wp_register_script('noty', plugins_url('assets/vendors/noty/noty.min.js', __FILE__), array('jquery'), null, true);
        wp_register_script('buba-loader', plugins_url('assets/bubaLoader.js', __FILE__), array(), null, true);
        wp_register_script('buba-frontend', plugins_url('assets/buba-frontend.js', __FILE__), array('jquery', 'buba-loader'), null, true);
        wp_enqueue_script('masonry');
        wp_enqueue_script('buba-loader');
        wp_enqueue_script('slick');
        wp_enqueue_script('buba-frontend');
        wp_enqueue_script('noty');
    }
}
if (!function_exists('buba_blocks_backend_scripts')) {
    function buba_blocks_backend_scripts()
    {
        wp_register_script('admin-main', plugins_url('assets/buba-main.js', __FILE__), array('jquery'), null, true);
        wp_enqueue_script('admin-main');

        wp_enqueue_style('buba-blocks-block-editor-normalize-styles', plugins_url( '/assets/buba-editor-styles.css', __FILE__ ));
    }
}
add_action('wp_enqueue_scripts', 'buba_blocks_styles');
add_action('admin_enqueue_scripts', 'buba_blocks_styles');
add_action('admin_enqueue_scripts', 'buba_blocks_backend_scripts');
add_action('wp_enqueue_scripts', 'buba_blocks_frontend_scripts');

add_action( 'plugins_loaded', 'buba_blocks_init' );
function buba_blocks_init() {
	load_plugin_textdomain( 'buba-blcoks', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
}