<?php
/**
 * Plugin Name: Modern Swiss Unihockey
 * Description: A modern Swiss Unihockey integration with Angular.
 * Version: 1.0 
 * Author: Sandro Schindelholz
 */

function enqueue_angular_scripts() {
    wp_enqueue_script('zone-js', 'https://cdn.jsdelivr.net/npm/zone.js@0.12.0/dist/zone.min.js', [], null, true);
    wp_enqueue_style('angular-styles', plugin_dir_url(__FILE__) . 'build/styles.css', [], null);
    wp_enqueue_script('angular-polyfills', plugin_dir_url(__FILE__) . 'build/polyfills.js', [], null, true);
    // wp_enqueue_script('angular-main', plugin_dir_url(__FILE__) . 'build/main.js', ['zone-js', 'angular-polyfills'], null, true);
}

add_action('wp_enqueue_scripts', 'enqueue_angular_scripts');

// Register the module script
wp_register_script_module(
  'modern-swissunihockey-component',
  plugin_dir_url(__FILE__) . 'build/main.js',
  array(), // Dependencies
  null,    // Version
  true     // Load in footer
);

// Enqueue the module script
wp_enqueue_script_module('modern-swissunihockey-component');
