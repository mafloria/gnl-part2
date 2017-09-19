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
$cookie_name = "gasoducto_lang";

if(isset($_POST['gasoducto_lang'])){
    if( in_array( $_POST['gasoducto_lang'], $available_langs ) ){
        $lang = $_POST['gasoducto_lang'];
        /*$cookie_value = $_POST['gasoducto_lang'];  
        setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
        echo "change cookie on submit: ". $_COOKIE[$cookie_name];*/
    }
}else{
    $lang = get_browser_language($available_langs);
    /*if(!isset($_COOKIE[$cookie_name])) {
        $cookie_value = get_browser_language($available_langs);
        setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day        
    }
    
    echo "cookie browser: ". $_COOKIE[$cookie_name];
    */
}

//$lang = $_COOKIE[$cookie_name];

?>