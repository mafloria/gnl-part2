/*
 * Galileo
 *
 * Copyright (c) 2017 
 * Date: Aug 12 - 2017
 * Author: Margaret Florian (mafloria - UXDevco)
 */

//document ready	
$(document).ready(function(){	
	$(window).disablescroll();
	var mobile_multiplier = 3;
	var isMobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	    	mobile_multiplier = 3;
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	};
	
	//*********** window size to fix content
	var windowHeight = $(window).innerHeight();
	var windowWidth = $(window).innerWidth();	
	var biogas_width = 17600;//valor del css: .gnc-biogas-landscape
	var yacimiento_width = 19230;//valor del css: .gnc-yacimiento-landscape
	var gasoducto_width = 18500;//valor del css: .gnc-gasoducto-landscape	
	var open_section_name = "biogas";
	var open_section_width = biogas_width;
	var plus_width = 0; //for some mobiles is needed because the srceen distribution
	var biogas_icons_width = 550; 
	var yacimiento_icons_width = 1320; 
	var gasoducto_icons_width = 950;
	
	setHeight();
		  
	//adjust sections to the browser height
	function setHeight() {	
		//section 1, 2, 3 fixt to windows size		
		$('.screen-1').css('height', windowHeight);		
		if(isMobile.any()){
			$('.screen-1').css('width', (windowWidth*mobile_multiplier));
			$("#mobilecss").attr("href", "assets/css/mobile.css?v=0.82");
			
			plus_width = -300;//moviles
			
			if(open_section_name=="yacimiento") yacimiento_icons_width = 1000;
			
			//let all animations fixed
			$(".fadeInLeftShort").removeClass("animated");
	    	$(".fadeInLeftShort").removeClass("fadeInLeftShort");
	    	$(".fadeInDownShort").removeClass("fadeInDownShort");
	    	$(".fadeInUpShort").removeClass("fadeInUpShort");
	    	$(".group-animated").removeClass("animatedParent");
	    	$(".group-animated").removeClass("group-animated");			
		}else{
			$('.screen-1').css('width', windowWidth);
			$("body").css("overflow-x", "hidden");
	    	$("body").css("overflow-y", "hidden");
	    	$(".scroll").css("position", "fixed");
	    	
	    	console.log("Total Width: " + screen.width);
			if(screen.width > 1366) $(".truck-fixed").css("left", "20.5%");		    		    		   
		}
		set_width_scroll();
	}
	
	function set_width_scroll(){
		console.log("SET WITH "+open_section_name+" SCROLL: open_section_width: "+windowWidth+"+"+open_section_width+" plus_width:"+plus_width);
		if(isMobile.any()){			
			$(".front").css('width', windowWidth+open_section_width+plus_width); //600 for menu at the end
			$("#wrapper").css('width', windowWidth+open_section_width+plus_width); //600 for menu at the end
		}else{
			$(".front").css('width', windowWidth+open_section_width+plus_width); //600 for menu at the end		
			$('#outer-container').css('height', eval(open_section_name+"_icons_width")+open_section_width+plus_width+'px');			
		}
	}
	//********************** end windows size
    
    if(isMobile.any()){
    	$(".scrollTonav").show();    	
    	window.onscroll = function(e) {
    		console.log("onscroll: "+window.pageXOffset);
			display_camion_accion(window.pageXOffset);
		}	
    }else{
    	$(".scrollTonav").hide();
    	//horizontal scroll
	 	var elem = $.jInvertScroll(['.scroll'],        // an array containing the selector(s) for the elements you want to animate
            {            
            onScroll: function(percent) {   //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page
             	var position = $(".front").position();    	
                console.log("position lef: "+(position.left*-1));
                integer_position_left = position.left*-1;                        
             	display_camion_accion(integer_position_left);
            } //end onScroll
            
        }); //end scroll invert	
    }
    
    function display_camion_accion(integer_position_left){
                if((open_section_name=="biogas" && integer_position_left >= 5100) || (open_section_name=="yacimiento" && integer_position_left > 6034) || (open_section_name=="gasoducto" && integer_position_left > 6034) ){        	
					if( (open_section_name=="biogas" && integer_position_left > 13990) || (open_section_name=="yacimiento" && integer_position_left > 14855) ||(open_section_name=="gasoducto" && integer_position_left > 15565) ){ 
													
							$("#truck-"+open_section_name).addClass('firstTruck-'+open_section_name+'-stop');						
							$("#truck-"+open_section_name).show();
							$("#truck-"+open_section_name+"-animated").hide();					
							$("#truck-"+open_section_name).removeClass('firstTruck-'+open_section_name+'-start');							
							$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-start');
							$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-stop');
					}
					else{ //CAMION RODANDO							 		 
							
							$("#truck-"+open_section_name).hide();//addClass('truck-fixed');
							$("#truck-"+open_section_name+"-animated").show();
							$(".rueda").addClass("rueda_andando");
							$("#truck-"+open_section_name).removeClass('firstTruck-'+open_section_name+'-stop');
							$("#truck-"+open_section_name).removeClass('firstTruck-'+open_section_name+'-start');						
							$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-stop');
							$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-start');
					}
				}
				else{//CAMION COMIENZA quieto
												
						$("#truck-"+open_section_name).addClass('firstTruck-'+open_section_name+'-start');
						$("#truck-"+open_section_name).show();
						$("#truck-"+open_section_name+"-animated").hide();						
						$("#truck-"+open_section_name).removeClass('firstTruck-'+open_section_name+'-stop');		
						$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-start');
						$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-stop');
				}
    }
    
	$(window).on("scrollstop", function(){
	   $(".rueda").removeClass("rueda_andando");	   
	});

	//click for open one process animation
	$(".view-process").click(function(){
		$(".camion-animated").hide();
		
		open_process($(this));
	});
	
	//click for open one process animation from actions at the end of each process
	$(".continue-process").click(function(){
		if(isMobile.any()){
			$("html, body").animate({ scrollLeft: 0 }, "slow");
		}
		else{
			$(".scroll").css('left', 0);				
			$("html, body").animate({ scrollTop: 0 }, "slow");	
		}
		
		open_process($(this));
		
		//let the first truck in place
		$("#truck-"+open_section_name).addClass('firstTruck-'+open_section_name+'-start');
		$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-stop');
		$(".camion").hide();
		$(".camion-animated").hide();
		
	});
	
	
	
	//click for back to main menu
	$(".back-home").click(function(){				
		var id = $(this).attr( "id" ).split("-");
		
		$("#gnc-"+id[0]+"-firstsection").hide();
		$(".gnc-"+id[0]+"-landscape").hide();
		
		$(".screen-1").show();  //shows main screen
		
		$(window).disablescroll();
		$('body').css('overflow-y', 'hidden');
		
		eval("open_section_width="+open_section_name+"_width");		

	});
	
	function open_process(this_object){
		var id = this_object.attr( "id" ).split("-");
		open_section_name = id[1];
		
		$(".camion").hide();
		$(".camion-animated").hide();
		
		$("#galileocss").attr("href", "assets/css/galileo-gnl-"+open_section_name+".css");
		$(".landscape-section").hide();
		$(".screen-3").hide();
		$("#gnc-"+open_section_name+"-firstsection").show();
		$(".gnc-"+open_section_name+"-landscape").show();
				
		$(".screen-1").hide(); //hides main screen		
						
		$(window).disablescroll("undo");
		$('body').css('overflow-y', 'auto');
				
						
		console.log("OJO 1 --  image_width: "+$(".gnc-"+open_section_name+"-landscape").width());

		eval("open_section_width="+open_section_name+"_width");		
		
		set_width_scroll();			
	}
		 
});
