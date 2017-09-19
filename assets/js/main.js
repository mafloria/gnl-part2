/*
 * Galileo
 *
 * Copyright (c) 2017 
 * Date: July 12 - 2017
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
	//console.log("mobile:"+isMobile.any());
	//*********** window size to fix content
	var windowHeight = $(window).innerHeight();
	var windowWidth = $(window).innerWidth();	
	var biogas_width = 17000;//valor del css: .gnc-biogas-landscape
	var yacimiento_width = 16730;//valor del css: .gnc-yacimiento-landscape
	var gasoducto_width = 16900;//valor del css: .gnc-gasoducto-landscape	
	var open_section_name = "biogas";
	var open_section_width = biogas_width;
	var plus_width = 0; //for some mobiles is needed because the srceen distribution
	var biogas_icons_width = 700; //1000;
	var yacimiento_icons_width = 900; //1220;
	var gasoducto_icons_width = 700;//1100;
	
	setHeight();
	console.log("Total Width: " + screen.width);
	if(screen.width > 1366) $(".truck-fixed").css("left", "20.5%");
		  
	/*$(window).resize(function() {
		setHeight();
	});*/	
	//adjust sections to the browser height
	function setHeight() {	
		//section 1, 2, 3 fixt to windows size		
		$('.screen-1').css('height', windowHeight);		
		if(isMobile.any()){
			$('.screen-1').css('width', (windowWidth*mobile_multiplier));
			$("#mobilecss").attr("href", "assets/css/mobile.css?v=0.82");
			$(".hand-instruction").show();
			plus_width = 1500;//moviles
		}else{
			$('.screen-1').css('width', windowWidth);
		}
		//total_width = (windowWidth*3)+$(".gnc-biogas-landscape").width()+$(".gnc-yacimiento-landscape").width()+$(".gnc-gasoducto-landscape").width();		
		set_width_scroll();
	}
	
	function set_width_scroll(){
		console.log("SET WITH "+open_section_name+" SCROLL: open_section_width: "+windowWidth+"+"+open_section_width);
		$(".front").css('width', windowWidth+open_section_width+plus_width); //600 for menu at the end
		$('#outer-container').css('height', eval(open_section_name+"_icons_width")+open_section_width+plus_width+'px'); //(700+open_section_width+plus_width)	 //600 for menu at the end
	}
	//********************** end windows size
	
//if(!isMobile.any()){
	//horizontal scroll
	 var elem = $.jInvertScroll(['.scroll'],        // an array containing the selector(s) for the elements you want to animate
            {
            //height: $(window).innerHeight(),  // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
            onScroll: function(percent) {   //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page
                //console.log(percent);
                
                /*tmp = $('#track_moving').attr('data-appear-left-offset');*/
                tmp = Math.floor((777 - $(window).innerWidth()) * percent) * -1; 
                var position = $(".front").position();
                //console.log("position lef: "+(position.left*-1));
                integer_position_left = position.left*-1; 
                if(integer_position_left >= 4290 || integer_position_left > 13700 ){     //biogas 4310           	
					if(((open_section_name=="biogas" && integer_position_left > 8820)||(open_section_name=="yacimiento" && integer_position_left > 8805)||(open_section_name=="gasoducto" && integer_position_left > 8834)) && integer_position_left < 13700){ //no se ve el camion gasoducto 8820
						//$(".camion-section").hide();												
						if((open_section_name=="yacimiento" && integer_position_left > 13666) || integer_position_left > 13000){ //SEGUNDO CAMION PARADO para comenazr
							//console.log("if interno hide");
							$("#truck-"+open_section_name).addClass('secondTruck-'+open_section_name+'-start');
							//$("#truck-"+open_section_name).removeClass('truck-fixed');
							$("#truck-"+open_section_name).show();
							$("#truck-"+open_section_name+"-animated").hide();							
							$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-stop');
							$("#truck-"+open_section_name).removeClass('firstTruck-'+open_section_name+'-stop');
							$("#truck-"+open_section_name).removeClass('firstTruck-'+open_section_name+'-start');
						}else{ //PRIMER CAMION PARADO
							//console.log("ifelse interno hide");						
							$("#truck-"+open_section_name).addClass('firstTruck-'+open_section_name+'-stop');
							//$("#truck-"+open_section_name).removeClass('truck-fixed');
							$("#truck-"+open_section_name).show();
							$("#truck-"+open_section_name+"-animated").hide();					
							$("#truck-"+open_section_name).removeClass('firstTruck-'+open_section_name+'-start');							
							$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-start');
							$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-stop');
						}
					}
					else{ //segundo CAMION PARADO
						if((open_section_name=="yacimiento" && integer_position_left > 15169) || (open_section_name=="gasoducto" && integer_position_left > 15169) || (open_section_name=="biogas" && integer_position_left > 15310)){//biogas=15483  yacimiento=15169 gasoducto=15169
							$("#truck-"+open_section_name).addClass('secondTruck-'+open_section_name+'-stop');
							//$("#truck-"+open_section_name).removeClass('truck-fixed');
							$("#truck-"+open_section_name).show();
							$("#truck-"+open_section_name+"-animated").hide();							
							$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-start');
							$("#truck-"+open_section_name).removeClass('firstTruck-'+open_section_name+'-stop');
							$("#truck-"+open_section_name).removeClass('firstTruck-'+open_section_name+'-start');
						}else{ //CAMION RODANDO		 
							//console.log("else2 interno show");
							//$(".camion-section").show();
							$("#truck-"+open_section_name).hide();//addClass('truck-fixed');
							$("#truck-"+open_section_name+"-animated").show();
							$(".rueda").addClass("rueda_andando");
							$("#truck-"+open_section_name).removeClass('firstTruck-'+open_section_name+'-stop');
							$("#truck-"+open_section_name).removeClass('firstTruck-'+open_section_name+'-start');						
							$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-stop');
							$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-start');
						}
					}
				}
				else{
					//console.log("else externo hide");							
					if(integer_position_left > 13700){  //CAMION RODANDO
							$("#truck-"+open_section_name).hide();//addClass('truck-fixed');
							$("#truck-"+open_section_name+"-animated").show();
							$(".rueda").addClass("rueda_andando");
							$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-start');
							$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-stop');
							$("#truck-"+open_section_name).removeClass('firstTruck-'+open_section_name+'-stop');
							$("#truck-"+open_section_name).removeClass('firstTruck-'+open_section_name+'-start');
					}else{ //PRIMER CAMION PARADO 
						$("#truck-"+open_section_name).addClass('firstTruck-'+open_section_name+'-start');
						//$("#truck-"+open_section_name).removeClass('truck-fixed');
						$("#truck-"+open_section_name).show();
						$("#truck-"+open_section_name+"-animated").hide();						
						$("#truck-"+open_section_name).removeClass('firstTruck-'+open_section_name+'-stop');		
						$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-start');
						$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-stop');
					}									
				}				
            } //end onScroll
            
        }); //end scroll invert
//} //end if mobile                
	$(window).on("scrollstop", function(){
	   $(".rueda").removeClass("rueda_andando");	   
	});

	//click for open one process animation
	$(".view-process").click(function(){
		$(".camion-animated").hide();
		
		open_process($(this));
				
		//console.log("OJO -- open_section_width: "+$("#bgimage-"+open_section_name).width());
		
		/*console.log(".scroll: "+$(".scroll").scrollTop() + " body: "+$("body").scrollTop() + " Wrapper:"+$(".wrapper").scrollTop());			
		console.log($(".front").css('left'));*/ 
	});
	
	//click for open one process animation from actions at the end of each process
	$(".continue-process").click(function(){
		open_process($(this));
		
		$(".scroll").css('left', 0);				
		$("html, body").animate({ scrollTop: 0 }, "fast");		 
		
		//let the first truck in place
		$("#truck-"+open_section_name).addClass('firstTruck-'+open_section_name+'-start');
		$("#truck-"+open_section_name).removeClass('secondTruck-'+open_section_name+'-stop');
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
		//open_section_width = $(".gnc-"+open_section_name+"-landscape").width(); 
		//console.log("BACK open_section_width: "+$(".gnc-"+open_section_name+"-landscape").width());
	});
	
	function open_process(this_object){
		var id = this_object.attr( "id" ).split("-");
		open_section_name = id[1];
		
		$(".camion").hide();
		
		$("#galileocss").attr("href", "assets/css/galileo-"+open_section_name+".css");
		$(".landscape-section").hide();
		$(".screen-3").hide();
		$("#gnc-"+open_section_name+"-firstsection").show();
		$(".gnc-"+open_section_name+"-landscape").show();
				
		$(".screen-1").hide(); //hides main screen		
						
		$(window).disablescroll("undo");
		$('body').css('overflow-y', 'auto');
				
						
		console.log("OJO 1 --  image_width: "+$(".gnc-"+open_section_name+"-landscape").width());
		//open_section_width = $(".gnc-"+open_section_name+"-landscape").width();
		eval("open_section_width="+open_section_name+"_width");		
		
		set_width_scroll();			
	}
		 
});
