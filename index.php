<?php
	include("config/set_lang.php");
	include("config/config.php");
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $language_url."gasoducto-".$lang.".txt");
    curl_setopt($ch, CURLOPT_HEADER, FALSE);    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $texts_file = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    $texts = json_decode($texts_file);
    //print_r($lang);
?>
<!doctype html>
<html class="no-js" lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Galileo technologies</title>
        <meta name="description" content="">
        

        <link rel="stylesheet" href="assets/css/normalize.css">        
        <link rel="stylesheet" href="assets/css/main.css">
        <link rel="stylesheet" href="assets/css/animations.css" type="text/css">
        <link rel="stylesheet" id="galileocss" href="assets/css/galileo-biogas.css">
        <link rel="stylesheet" id="mobilecss" href="assets/css/empty.css">
        <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed" rel="stylesheet">
                
    </head>
    <body> 
      <div id="outer-container">  
        <div class="portrait-intro">
            <div class="girar">
                <img src="assets/images/girrar-phone.png">
                <p><?php echo $texts->intro->gira_dispositivo; ?></p>
            </div>
        </div>
        
        <div id="wrapper">
            <div class="front scroll">
                
                <section class="section screen-1" id="home">
                    <div class="section-content content-landing center">

                        <img class="logo-intro" src="svg/titulo-gnc.svg">
                        <p class="txt-description"><?php echo $texts->intro->intro_text; ?></p>
                        <p class="pick-btn"><?php echo $texts->intro->continue_button; ?></p>
                        <form method="POST">
                            <?php if($lang=="es") { ?><input class="lng-btn" type="submit" name="gasoducto_lang" value="en"/> <?php } ?>
                            <?php if($lang=="en") { ?><input class="lng-btn" type="submit" name="gasoducto_lang" value="es"/> <?php } ?>
                        </form>
                        <div class="menu-circles-icons">
                            <a id="view-biogas-process" class="view-process" href="javascript:void(0);">
                                <img src="assets/images/gnc-biogas-btn-<?php echo $lang; ?>.png">
                            </a>
                            <a id="view-yacimiento-process" class="view-process" href="javascript:void(0);">
                                <img src="assets/images/gnc-yacimiento-btn-<?php echo $lang; ?>.png">    
                            </a>
                            <a id="view-gasoducto-process" class="view-process" href="javascript:void(0);">
                                <img src="assets/images/gnc-gasoducto-btn-<?php echo $lang; ?>.png">   
                            </a>
                        </div> 

                    </div>
                </section>
                    
                <?php require_once("sections/biogas.php"); ?>                                
                <?php require_once("sections/yacimientogas.php"); ?>
                <?php require_once("sections/gasoducto.php"); ?>
                    
            </div><!-- end front scroll -->
            
        </div><!-- fin wrapper -->
      </div> <!-- end outer-container -->
    </body>
    <script src="assets/js/vendor/modernizr-2.8.3.min.js"></script>           
    <script src="assets/js/vendor/jquery-1.12.0.min.js"></script>        
    <script src="assets/js/vendor/jquery.jInvertScroll.js?v=1.0"></script>
    <script src="assets/js/vendor/jquery.disablescroll.min.js"></script>
    <script src="assets/js/vendor/jquery.scrollstop.min.js"></script>
    
    <script src="assets/js/dist/css3-animate-it.js"></script>
    <script src="assets/js/main.js?v=0.99"></script>
        
    <style>
        /* Ensure elements load hidden before ScrollReveal runs 
        .sr .fooReveal { visibility: hidden; }        */
    </style>
</html>


        
