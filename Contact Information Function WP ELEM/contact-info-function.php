<?php
//Remove open key php this is for funtion.php

// 1. Create Contact Info menu in admin
function contact_info_menu_page() {
    add_menu_page(
        'Contact Info',        // Page Title
        'Contact Info',        // Menu text
        'manage_options',      // Required capacity
        'contact-info',        // Menu Slug
        'contact_info_page',   // Function that prints the page
        'dashicons-phone',     // Icon
        25                     // Menu position
    );
}
add_action('admin_menu', 'contact_info_menu_page');

// 2. Register settings
function contact_info_settings_init() {
    register_setting('contact_info_group', 'contact_phone');
    register_setting('contact_info_group', 'contact_email');

    add_settings_section(
        'contact_info_section',
        'Información de contacto',
        '__return_false',
        'contact-info'
    );

    add_settings_field(
        'contact_phone',
        'Teléfono',
        'contact_phone_field_cb',
        'contact-info',
        'contact_info_section'
    );

    add_settings_field(
        'contact_email',
        'Email',
        'contact_email_field_cb',
        'contact-info',
        'contact_info_section'
    );
}
add_action('admin_init', 'contact_info_settings_init');

// 3. Input fields
function contact_phone_field_cb() {
    $phone = get_option('contact_phone', '');
    echo '<input type="text" name="contact_phone" value="' . esc_attr($phone) . '" class="regular-text">';
}

function contact_email_field_cb() {
    $email = get_option('contact_email', '');
    echo '<input type="email" name="contact_email" value="' . esc_attr($email) . '" class="regular-text">';
}

// 4. Options page
function contact_info_page() { ?>
    <div class="wrap">
        <h1>Contact Info</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('contact_info_group');
            do_settings_sections('contact-info');
            submit_button();
            ?>
        </form>
    </div>
<?php }

// 5. Pass values ​​to JS
function myscriptcode() {
    $theme_dir = get_stylesheet_directory_uri();
    $phone = get_option('contact_phone', '');
    $email = get_option('contact_email', '');

    wp_enqueue_script('myscript', $theme_dir . '/assets/js/myscript.js', array(), null, true);
    wp_localize_script('myscript', 'contactData', array(
        'phone'     => $phone,
        'phoneHref' => $phone ? 'tel:' . preg_replace('/[^0-9+]/', '', $phone) : '',
        'email'     => $email,
        'emailHref' => $email ? 'mailto:' . $email : '',
    ));
}
add_action('wp_enqueue_scripts', 'myscriptcode');


?>