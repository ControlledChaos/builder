<?php

if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

use VisualComposer\Helpers\Generic\Templates;

Templates::render( 'pages/roles/partials/part', [
	'part' => $part,
	'role' => $role,
	'params_prefix' => 'vc_roles[' . $role . '][' . $part . ']',
	'controller' => app( 'RoleAccess' )->who( $role )->part( $part ),
	'options' => [
		[ true, __( 'All', 'vc5' ) ],
		[ 'add', __( 'Apply presets only', 'vc5' ) ],
		[ true, __( 'Disabled', 'vc5' ) ],
	],
	'main_label' => __( 'Element Presets', 'vc5' ),
	'description' => __( 'Control access rights to element presets in element edit form. Note: "Apply presets only" restricts users from saving new presets, deleting existing and setting defaults.', 'vc5' ),
] );