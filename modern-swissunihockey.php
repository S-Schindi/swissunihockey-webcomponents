<?php
/**
 * Plugin Name: Modern Swiss Unihockey
 * Description: A modern Swiss Unihockey integration with Angular.
 * Version: 1.0 
 * Author: Sandro Schindelholz
 */

function enqueue_angular_scripts() {
    wp_enqueue_script('zone-js', 'https://cdn.jsdelivr.net/npm/zone.js@0.12.0/dist/zone.min.js', [], null, true);
    wp_enqueue_style('angular-styles', plugin_dir_url(__FILE__) . 'build/browser/styles.css', [], null);
    wp_enqueue_script('angular-polyfills', plugin_dir_url(__FILE__) . 'build/browser/polyfills.js', [], null, true);
    wp_enqueue_script('angular-main', plugin_dir_url(__FILE__) . 'build/browser/main.js', ['zone-js', 'angular-polyfills'], null, true);
}

add_action('wp_enqueue_scripts', 'enqueue_angular_scripts');

function render_angular_app($atts) {
    $atts = shortcode_atts(['component' => 'matches'], $atts);

    ob_start(); ?>

    <app-root selectedComponent="<?php echo esc_attr($atts['component']); ?>"></app-root>

    <?php
    return ob_get_clean();
}

add_shortcode('angular_app', 'render_angular_app');
