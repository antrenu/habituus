/*
 * Tallinn v1.0
 * Copyright 2014 Limitless LLC
 */

jQuery(document).ready(function($) {
   'use strict';

   	//Vars
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	//Navigation Menu
	$(".navigation .logo").click(function(e){
		if($('section.home').length){
			$('html,body').animate({scrollTop: 0}, 'slow');
		} else {
			window.open("index.html", "_self");
		}
	});

    $(".navigation .control").click(function(e){

    	if (windowWidth > 959) {

    		if($('.navigation').hasClass("navigation-left")) {
    		    if ($('.navigation').css("left") == '0px') {
		    		$('.wrapper').stop().animate({ left: "0px" }, 'slow', function() {
   						$("body").removeClass("overflow-x");
 					});
		    		$('.navigation').stop().animate({ left: "-300px" }, 'slow');
				} else {
					$("body").addClass("overflow-x");
		    		$('.wrapper').stop().animate({ left: "300px" }, 'slow');
		    		$('.navigation').stop().animate({ left: "0px" }, 'slow');
				}		
    		} else if($('.navigation').hasClass("navigation-right")) {
				if ($('.navigation').css("right") == '0px') {
		    		$('.wrapper').stop().animate({ left: "0px" }, 'slow');
		    		$('.navigation').stop().animate({ right: "-300px" }, 'slow');
				} else {
		    		$('.wrapper').stop().animate({ left: "-300px" }, 'slow');
		    		$('.navigation').stop().animate({ right: "0px" }, 'slow');
				}
    		}

		} else {

    		if($('.navigation').hasClass("navigation-left")) {

	   	    	if ($('.navigation').css("left") == '0px') {
		    		$('.wrapper').stop().animate({ left: "0px" }, 'slow', function() {
   						$("body").removeClass("overflow-x");
 					});
		    		$('.navigation').stop().animate({ left: ((windowWidth - 30) * -1) }, 'slow');
				} else {
					$("body").addClass("overflow-x");
		    		$('.wrapper').stop().animate({ left: (windowWidth - 30) }, 'slow');
		    		$('.navigation').stop().animate({ left: 0 }, 'slow');
				}

    		} else if($('.navigation').hasClass("navigation-right")) {

	   	    	if ($('.navigation').css("left") == '0px') {
		    		$('.wrapper').stop().animate({ left: ((windowWidth - 30) * -1) }, 'slow');
		    		$('.navigation').stop().animate({ left: ((windowWidth - 30) * -1) }, 'slow');
				} else {
		    		$('.wrapper').stop().animate({ left: 0 }, 'slow');
		    		$('.navigation').stop().animate({ left: 0 }, 'slow');
				}

    		}

		}

    });

	$(".navigation .list li").hover(function(e){
		$('.navigation .list li').stop().animate({ opacity: "0.5" }, 'slow');
		$(this).stop().animate({ opacity: "1" }, 'slow');
	}, function(){ 
		$('.navigation .list li').stop().animate({ opacity: "1" }, 'slow');
	});

	$(".navigation .list li").click(function(e){
		var url = $(this).attr("data-url");
		window.location = url;
	});

	$(".navigation .social li").click(function(){
		var url = $(this).attr("data-url");
		window.open(url, '_blank');
	});
	//Navigation Menu

	//Navigate
	$(".error-page .back").click(function(){
		var url = $(this).attr("data-url");
		window.open(url, "_self");
	});
	//Navigate

	//Home
	$(".home .scroll").hover(function(e){
		$(this).removeClass("fadeInDownHalf");
		$(this).removeClass("animated");
	});

	$(".home .scroll").click(function(){
		$('html,body').animate({scrollTop: $("section.about").position().top - 60}, 'slow');
	});

	$(".home .slide").each(function() {
		$(this).css("background-image", "url("+$(this).attr("data-url")+")");
	});

	$('.home .slider').flexslider({
	    animation: "fade",
	    animationLoop: true,
	    animationSpeed: 1500,
	    easing: "easeOutBack",
	    slideshow: true,
	    pauseOnHover: false,
	    controlNav: true,
	    directionNav: true
 	});
	//Home

	//Work
	$(".work .tab").each(function() {
		$(".work .headers").append("<div class='header'>"+$(this).attr("data-title")+"</div>");
	});

	$(".work .header").click(function(){
		var tab = $(this).text();
		$(".work .header").removeClass("active");
		$(this).addClass("active");
		$(".work .tab").hide();
		$('.work .tabs div[data-title="' + tab + '"]').fadeIn("400");
	});

	$(".work .image, .album .image").each(function() {
		$(this).css("background-image", "url("+$(this).attr("data-url")+")");
	});

	$('.work .image, .album .image').click(function(e){

		var img = $(this).attr("data-url");
		var caption = $(this).attr("data-caption");
		var album = $(this).attr("data-album");
		var current = $('.work .image, .album .image').index($(this));
		var total = $('.work .image, .album .image').length;
		var fHeight = windowHeight - 160;

		var meta = "<div class='info'><div class='meta'><span class='picture-title'>"+caption+"</span><span class='album-title'>"+album+"</span></div><div class='close'>Close</div></div>";
		var frame = "<div class='frame' style='height:"+fHeight+"px'><img src='"+img+"' alt='"+caption+"'></div>";
		var nav = "<div class='nav'><div class='prev'>Prev</div><div class='current'>"+(current+1)+" / "+total+"</div><div class='next'>Next</div></div>";
		
		$.magnificPopup.open({
			items: {
			    src: "<div class='work-preview'>"+meta+frame+nav+"</div>",
			    type: "inline"
			}
		});

		//DISABLE PREV IF FIRST IMAGE
		if(current==0) {
			$('.work-preview .prev').addClass("disabled");
		}

		//FIX VERTICAL CENTER
		$('.work-preview img').css('margin-top', ($('.work-preview .frame').height() - $('.work-preview img').height()) / 2);

		$('.work-preview .close').click(function(e){
			var magnificPopup = $.magnificPopup.instance;
			magnificPopup.close();
		});

		$('.work-preview .next').click(function(e){

			if(current<total-1) {

				current++;

				var i = $('.work .image, .album .image').eq(current);
				img = i.attr("data-url");
				caption = i.attr("data-caption");
				album = i.attr("data-album");

				$('.work-preview .meta .picture-title').text(caption);
				$('.work-preview .meta .album-title').text(album);
				$('.work-preview .frame img').attr('src', img);
				$('.work-preview .nav .current').text((current+1)+' / '+total);

				//FIX VERTICAL CENTER
				$('.work-preview img').css('margin-top', ($('.work-preview .frame').height() - $('.work-preview img').height()) / 2);

				//FIX PREV BUTTON
				if(!current==0) {
					$('.work-preview .prev').removeClass("disabled");
				}

				//DISABLE IF LAST IMAGE
				if(current==total-1) {
					$(this).addClass("disabled");
				}
				
			}

		});

		$('.work-preview .prev').click(function(e){

			if(current>0) {

				current--;

				var i = $('.work .image, .album .image').eq(current);
				img = i.attr("data-url");
				caption = i.attr("data-caption");
				album = i.attr("data-album");

				$('.work-preview .meta .picture-title').text(caption);
				$('.work-preview .meta .album-title').text(album);
				$('.work-preview .frame img').attr('src', img);
				$('.work-preview .nav .current').text((current+1)+' / '+total);

				//FIX VERTICAL CENTER
				$('.work-preview img').css('margin-top', ($('.work-preview .frame').height() - $('.work-preview img').height()) / 2);

				if(current==0) {
					$(this).addClass("disabled");
				}

				if(current<total) {
					$('.work-preview .next').removeClass("disabled");
				}
				
			}

		});

	});

	$(".work .album").hover(function(e){
		$(this).find('.info').stop().animate({ backgroundColor: 'rgba(0,0,0,0.75)' }, 'slow');
	}, function(){
		$(this).find('.info').stop().animate({ backgroundColor: 'rgba(0,0,0,0.5)' }, 'slow');
	});

	$(".work .album").click(function(){
		var url = $(this).attr("data-url");
		window.open(url, "_self");
	});
	//Work


	//Blog
	$(".blog .post").each(function() {
		$(this).css("background-image", "url("+$(this).attr("data-image")+")");
	});

	$(".blog .post").hover(function(e){
		$(this).find('.overlay').stop().animate({ backgroundColor: 'rgba(0,0,0,0.75)' }, 'slow');
	}, function(){
		$(this).find('.overlay').stop().animate({ backgroundColor: 'rgba(0,0,0,0.5)' }, 'slow');
	});

	$(".blog .post").click(function(){
		var url = $(this).attr("data-url");
		window.open(url, "_self");
	});

	$(".article .social .facebook").click(function(){
		var url = $(location).attr('href');
		window.open("https://www.facebook.com/sharer/sharer.php?u="+url, "Share", "resizable=yes,width=640, height=360");
	});

	$(".article .social .twitter").click(function(){
		var url = $(location).attr('href');
		window.open("https://twitter.com/home?status="+url, "Tweet", "resizable=yes,width=640, height=360");
	});
	//Blog

});


$(window).load(function() {

	fixSizes();

	$(".page .inner").mCustomScrollbar({
    	axis:"y",
    	theme:"dark"
	});

	$('.work .header').eq(0).addClass("active");
	$('.work .tab').eq(0).fadeIn("400");

	$(".loader").delay(800).fadeOut('slow');

});


$(window).resize(function() {
	fixSizes();
});

function fixSizes() {

	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	//NAVIGATION
	if ( windowWidth > 959 ) { 
		$("nav .navigation").css('height', windowHeight);
	} else {
		$(".navigation").css('height', windowHeight);
		var w = (windowWidth * 2) - 30;
		$(".navigation").css('width', w);
		if($('.navigation').hasClass("navigation-right")) {
			$(".navigation").css('right', windowWidth * -1);
		} else if($('.navigation').hasClass("navigation-left")) {
			$(".navigation").css('left', ((windowWidth -30) * -1));
		}
		
		$(".navigation .container").css('width', windowWidth - 30);
		$(".navigation .control").css('width', windowWidth);
	}


	//FULLSCREEN
	$(".fullscreen").css('height', windowHeight);

	//FIX WORK PREVIEW
	$(".work-preview .frame").css('height', windowHeight-160);

	//FIX HOME PAGE VIDEO
	var rat = windowWidth / windowHeight;
	if (rat > (16/9)) {

		var v = windowWidth * (16/9);
		$(".home video").css('width', windowWidth);
		$(".home video").css('height', v);

		var vc = ($(".home video").height() - windowHeight) / 2;
		$(".home video").css('margin-top', '-'+vc+'px');
		$(".home video").css('margin-left', '0px');

	} else {

		var v = windowHeight * (16/9);
		$(".home video").css('height', windowHeight);
		$(".home video").css('width', v);

		var vc = ($(".home video").width() - windowWidth) / 2;
		$(".home video").css('margin-top', '0px');
		$(".home video").css('margin-left', '-'+vc+'px');

	}


	// VERTICALLY CENTER
	$(".vertical-center").each(function() {
		$(this).css('margin-top', ($(this).parent().height() - $(this).height()) / 2);
	});


	//FIX HOME PAGE TEXT
	var home = $(".home .title").width() - 25;
	var slog = $(".home .slogan .phrase").width() + 50;
	$(".home .slogan .before, .home .slogan .after").css('width', (home - slog) / 2);


	//FIX HOME PAGE SLIDER
	var z = (windowHeight - $(".home .flex-control-nav").height()) / 2;
	$(".home .flex-control-nav").css('top', z);
	$(".home .flex-prev").css('top', z - 60);
	$(".home .flex-next").css('top', z + $(".home .flex-control-nav").height() + 55);

}