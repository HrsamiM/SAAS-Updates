<?php

/*
Plugin Name: Contact Info Widget Manager
Description: Admin settings and JS for phone/email widgets, icons, titles, and descriptions.
Version: 1.5.2
Author: Herson Samir Martinez
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Avoid direct access

// ----------------------------
// 1. Menu in the admin
// ----------------------------

function ciw_contact_info_menu_page() {

    add_menu_page(
        'Contact Info',
        'Contact Info',
        'manage_options',
        'contact-info',
        'ciw_contact_info_page',
        'dashicons-phone',
        25
    );
}
add_action('admin_menu', 'ciw_contact_info_menu_page');

// ----------------------------
// 2. Register settings with sanitization
// ----------------------------

function ciw_sanitize_contact_phone($input) {
    // Allow only numbers and +
    return preg_replace('/[^0-9+]/', '', $input);
}

function ciw_sanitize_contact_email($input) {
    return sanitize_email($input);
}

function ciw_contact_info_settings_init() {
    register_setting('contact_info_group', 'contact_phone', 'ciw_sanitize_contact_phone');
    register_setting('contact_info_group', 'contact_email', 'ciw_sanitize_contact_email');

    add_settings_section('contact_info_section', 'Contact information', '__return_false', 'contact-info');
    add_settings_field('contact_phone', 'Phone', 'ciw_contact_phone_field_cb', 'contact-info', 'contact_info_section');
    add_settings_field('contact_email', 'Email', 'ciw_contact_email_field_cb', 'contact-info', 'contact_info_section');
}

add_action('admin_init', 'ciw_contact_info_settings_init');

// ----------------------------
// 3. Input fields
// ----------------------------

function ciw_contact_phone_field_cb() {
    $phone = get_option('contact_phone', '');
    echo '<input type="text" name="contact_phone" value="' . esc_attr($phone) . '" class="regular-text">';
}

function ciw_contact_email_field_cb() {
    $email = get_option('contact_email', '');
    echo '<input type="email" name="contact_email" value="' . esc_attr($email) . '" class="regular-text">';
}

// ----------------------------
// 4. Options page
// ----------------------------

function ciw_contact_info_page() { ?>
    <div class="wrap">
        <h1><?php echo esc_html('Contact Info'); ?></h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('contact_info_group');
            do_settings_sections('contact-info');
            submit_button();
            ?>
        </form>
    </div>
<?php }

// ----------------------------
// 5. Paste JS and pass variables
// ----------------------------

function ciw_enqueue_scripts() {
    $plugin_dir = plugin_dir_url(__FILE__);
    $phone = get_option('contact_phone', '');
    $email = get_option('contact_email', '');

    wp_enqueue_script('ciw-script', $plugin_dir . 'assets/js/ciw-script.js', array(), null, true);

    wp_localize_script('ciw-script', 'contactData', array(
        'phone'     => esc_js($phone),
        'phoneHref' => $phone ? 'tel:' . preg_replace('/[^0-9+]/', '', $phone) : '',
        'email'     => esc_js($email),
        'emailHref' => $email ? 'mailto:' . sanitize_email($email) : '',
    ));
}

add_action('wp_enqueue_scripts', 'ciw_enqueue_scripts');

