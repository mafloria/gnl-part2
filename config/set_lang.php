<?php
/**
 * Get browser language, given an array of avalaible languages.
 * 
 * @param  [array]   $availableLanguages  Avalaible languages for the site
 * @param  [string]  $default             Default language for the site
 * @return [string]                       Language code/prefix
 */
function get_browser_language( $available, $default = 'es' ) {
    if ( isset( $_SERVER[ 'HTTP_ACCEPT_LANGUAGE' ] ) ) {
        $langs = explode( ',', $_SERVER['HTTP_ACCEPT_LANGUAGE'] );
        
        foreach ( $langs as $lang ){
            $lang = substr( $lang, 0, 2 );
            if( in_array( $lang, $available ) ) {
                return $lang;
            }
        }
    }
    return $default;
}

$available_langs = array('es','en');

if(isset($_GET['lang'])){
    if( in_array( $_GET['lang'], $available_langs ) ){
        $lang = $_GET['lang'];
    }
}else{
    $lang = get_browser_language($available_langs);
}

?>