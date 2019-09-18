<?php
/**
 * Plugin Name: Linked Card
 * Plugin URI: https://github.com/pdrittenhouse/wp-linked-card/
 * Description: Linked Card — a Gutenberg plugin created via create-guten-block.
 * Author: pdritternhouse
 * Author URI: https://pdrittenhouse.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
