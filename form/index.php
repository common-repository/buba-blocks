<?php
defined( 'ABSPATH' ) || exit;

include 'child-blocks/index.php';

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
add_action( 'init', 'buba_blocks_form_register_block' );

function buba_blocks_form_register_block() {

	global $buba_blocks_languages_path;

	// automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

	wp_register_script(
		'buba-blocks-form',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_style(
		'buba-blocks-form-editor',
		plugins_url( 'editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);

	wp_register_style(
		'buba-blocks-form',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( 'buba-blocks/form', array(
		'style' => 'buba-blocks-form',
		'editor_style' => 'buba-blocks-form-editor',
		'editor_script' => 'buba-blocks-form',
	) );

  if ( function_exists( 'wp_set_script_translations' ) ) {
    /**
     * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
     * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
     * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
     */
    // wp_set_script_translations( 'buba-blocks-form', 'buba-blocks', $buba_blocks_languages_path . '/blocks/form' );
  }

}


function buba_blocks_form_send_mail() {
	global $phpmailer;

	if ( !is_object( $phpmailer ) || !is_a( $phpmailer, 'PHPMailer' ) ) {
		require_once ABSPATH . WPINC . '/class-phpmailer.php';
		require_once ABSPATH . WPINC . '/class-smtp.php';
		$phpmailer = new PHPMailer( true );
	}

	$str = str_replace( "\\", "", $_POST['body'] );
	$body = json_decode( $str );
	$from = 'anonymous@'.$_SERVER['SERVER_NAME'];
	$from_name = 'Anonymous from '.$_SERVER['SERVER_NAME'];
	$subject = 'Email subject is not specified';
	$to = get_option('admin_email');
	$mail_body = '';


	if ( isset( $body->email ) && $body->email !== 'undefined' && $_POST->email !== '')
		$from = $body->email;

	if ( isset( $body->name ) && $body->name !== 'undefined' && $_POST->name !== '')
		$from_name = $body->name;

	if ( isset( $_POST['subject'] ) && $_POST['subject'] !== 'undefined' && $_POST['subject'] !== '')
		$subject = $_POST['subject'];

	if ( isset( $_POST->to ) && $_POST->to !== 'undefined' && $_POST->to !== '')
		$to = $_POST->to;

	foreach( $body as $key => $value ) {
		$mail_body .= '<p>';
		$mail_body .= $key.': '.$value;
		$mail_body .= '</p>';
	}

	try {
		$phpmailer->ClearAttachments();
		$phpmailer->ClearCustomHeaders();
		$phpmailer->ClearReplyTos();

		$phpmailer->From = $from;
		$phpmailer->FromName = $from_name;
		$phpmailer->Subject = $subject;
		$phpmailer->SingleTo = true;
		$phpmailer->ContentType = 'text/html';
		$phpmailer->IsHTML( true );
		$phpmailer->CharSet = 'utf-8';
		$phpmailer->ClearAllRecipients();
		$phpmailer->AddAddress( $to );
		$phpmailer->Body = $mail_body;

		// $phpmailer->AddAttachment( $url ); добавляем вложение
		$phpmailer->Send();

		echo json_encode([
			'status' => 200,
			'message' => __( 'Form sent', 'buba-blocks' ),
			'body' => $_POST,
			'theme' => $_POST->theme !== 'undefined' && $_POST->theme !== '' ? $_POST->theme : 'relax'
		]);
	} catch (Exception $e) {
		echo json_encode([
			'status' => 500,
			'message' => $phpmailer->ErrorInfo,
			'body' => $_POST,
			'theme' => $_POST->theme !== 'undefined' && $_POST->theme !== '' ? $_POST->theme : 'relax'
		]);
	}

	die;
}
add_action( 'wp_ajax_buba_blocks_form_send_mail', 'buba_blocks_form_send_mail' );
add_action( 'wp_ajax_buba_blocks_form_send_mail', 'buba_blocks_form_send_mail' );