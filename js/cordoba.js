/*
 * Cordoba v1.0
 * Copyright 2014 Limitless LLC
 */

var windowHeight = $(window).height();
var windowWidth = $(window).width();

jQuery(document).ready(function($) {
   'use strict';

	//Navigation Menu
	$(".header .logo").click(function(e){
		if($('section.home').length){
			$('html,body').animate({scrollTop: 0}, 'slow');
		} else {
			window.open("index.html", "_self");
		}
	});

    $(".header .menu").click(function(e){
    	$('nav.navigation').fadeToggle("slow");
		$("nav.navigation .menu").css('margin-top', (windowHeight - $("nav.navigation .menu").height()) / 2);
		if($('.header .menu').hasClass("close")) {
			$(".header .menu").removeClass("close");
		} else {
			$(".header .menu").addClass("close");
		}
    });

	$(".navigation .menu li").hover(function(e){
		$('.navigation .menu li').stop().animate({ opacity: "0.5" }, 'slow');
		$(this).stop().animate({ opacity: "1" }, 'slow');
	}, function(){ 
		$('.navigation .list li').stop().animate({ opacity: "1" }, 'slow');
	});

	$(".navigation .menu li").click(function(e){
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
	$(".home .discover").hover(function(e){
		$(this).removeClass("fadeInDownHalf");
		$(this).removeClass("animated");
	});

	$(".home .discover").click(function(){
		var url = $(this).attr("data-url");
		window.open(url, '_self');
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
	$(".work .navigate li").click(function(){
		var album = $(this).text().toLowerCase();
		$(".work .navigate li").removeClass("active");
		$(this).addClass("active");
		loadPortfolio(album);
	});

	$(".work .image").hover(function(e){
		$('.work .image').stop().animate({ opacity: "0.5" }, 'slow');
		$(this).stop().animate({ opacity: "1" }, 'slow');
	}, function(){ 
		$('.work .image').stop().animate({ opacity: "1" }, 'slow');
	});

	$(".work .album").click(function(){
		var url = $(this).attr("data-url");
		window.open(url, "_self");
	});

	$(".link").click(function(e){
		var url = $(this).attr("data-url");
		window.location = url;
	});
	//Work

	//Blog
	$(".blog .post .cover").each(function() {
		$(this).css("background-image", "url("+$(this).attr("data-image")+")");
	});

	$(".blog .post").hover(function(e){
		$('.blog .post').stop().animate({ opacity: "0.25" }, 'slow');
		$(this).stop().animate({ opacity: "1" }, 'slow');
	}, function(){ 
		$('.blog .post').stop().animate({ opacity: "1" }, 'slow');
	});

	$(".blog .post .image, .blog .post .cover").click(function(){

	    $.magnificPopup.open({
			items: {
				src: $(this).parent().attr("data-url"),
				type:'ajax'
			},
			closeMarkup: "<button class='mfp-close'>close</button>"
		});

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
	loadPortfolio("all");

	$(".work .navigate").append("<select></select>");
	$(".work .navigate li").each(function() {
		$(".work .navigate select").append("<option>"+$(this).text()+"</option>");
	});

	$(".work .navigate select").change(function() {
		var album = $(".work .navigate select option:selected").text().toLowerCase();
		$(".work .navigate li").removeClass("active");
		$(this).addClass("active");
		loadPortfolio(album);
	});

	$(".loader").delay(800).fadeOut('slow');
	animateIt();

});


var lastWidth = $(window).width();
$(window).bind('resize', function(e)
{
    window.resizeEvt;
    $(window).resize(function()
    {
        clearTimeout(window.resizeEvt);
        window.resizeEvt = setTimeout(function()
        {
			fixSizes();
			if($(window).width()!=lastWidth){
			  lastWidth = $(window).width();
			  loadPortfolio("all");
			}
        }, 150);
    });
});


function fixSizes() {

	windowHeight = $(window).height();
	windowWidth = $(window).width();

	//FULLSCREEN
	$(".fullscreen").css('height', windowHeight);

	//WORK STREAM
	$(".work .stream").css('width', $(window).width() - 15);
	if (windowWidth > 767) $(".work .stream").css('width', $(window).width() - 325);
	
	
	//PAGE FIX
	if(windowWidth>959) {

		$(".page .content").css('height', $(".page .cover").height() - 100);
		var pg = $(".page .text").height() + $(".page .info").height() + 50;
		if($(".page .content").height() < pg) {

			$(".page .content").mCustomScrollbar({
	    		axis:"y",
	    		theme:"dark"
			});

			$(".page .content").css('padding-right', 0);

		} else {
			var gt = $(".page .content").height() - pg;
			$(".page .info").css('margin-top', gt + 50);
			$(".page .content").css('overflow-y', "hidden");
		}

	}


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


function loadPortfolio(album) {

	$(".stream .image").removeClass("active");

	if($(".stream .row").length > 0) {
		$(".stream").append($(".stream .image"));
		$(".stream .image").css("opacity", 0);
		$(".stream .row").remove();		
	}

	if(album=="all") {
		$(".stream .image").addClass("active");
		$(".work .navigate li").eq(0).addClass("active");
	} else {
		$(".stream .image").each(function() {
			if ($(this).attr("data-album").toLowerCase() == album) {
				$(this).addClass("active");
			}
		});
	}

	var s = $(".stream").width();
	$(".stream").attr("data-width", s);
	var z = 0;

	$(".stream").append("<div class='row'></div>");
	$(".stream .image").each(function() {

		if($(this).hasClass("active")) {

		    var image = $(this);
		    var link = $(this).attr("data-url");
		    var w = $(this).attr("data-width");
		    var h = $(this).attr("data-height");
		    var l = 300 * (w / h);
		    $(this).css("background-image", "url("+link+")");
		    $(this).css("width", l);
		    var t = s/z;
		    if (t > 1.5 && s > 767) {
		    	z += l;
		    	$(".stream .row").last().append($(this));
		    } else {
		    	z = l;
		    	$(".stream .row").last().append($(this));
	    		var m = 25;
				var j = 0;
				$(".stream .row").last().find("div.image").each(function() {
				    j += $(this).width();
				});
				var p = j - s;
				if(j < s) p = s - j;
				$(".stream .row").last().find("div.image").each(function() {
					var i = $(this).width();
					var f = p * (i / j);
					var r = i - f;
					if(j < s) r = i + f;
					$(this).css('width', r - m);
					$(this).attr("z-width", r - m);
					$(this).attr("z-height", 300);
					if(!$(this).is(":last-child")) {
						$(this).css('margin-right', m);
					}
				});

		    	$(".stream").append("<div class='row'></div>");
		    }

	   	}

	});

	$(".stream .image").stop().animate({ opacity: "1" }, 'slow');
	if($(".stream .row").last().children().length == 0) $(".stream .row").last().remove();

	$( document ).on( "click", ".stream div.image", function() {
		openImage($(this));
	});

}


function openImage(image) {

	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	var image = image;
	var img = image.attr("data-url");
	var caption = image.attr("data-caption");
	var album = image.attr("data-album");
	var current = $('.work .stream .active').index(image);
	var total = $('.work .stream .active').length;
	var fHeight = windowHeight - 150;
	var marg = ((windowHeight - 100) / 2) + 40;

	var meta = "<div class='info'><div class='meta'><span class='picture-title'>"+caption+"</span><span class='album-title'>"+album+"</span><span class='current'>"+(current+1)+" / "+total+"</span></div><div class='close'></div></div>";
	var frame = "<div class='frame' style='height:"+fHeight+"px'><img src='"+img+"' alt='"+caption+"'></div>";
	var nav = "<div class='nav'><div class='prev' style='top: "+marg+"px;'>Prev</div><div class='next' style='top: "+marg+"px;'>Next</div></div>";
	
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

			var i = $('.work .stream .active').eq(current);
			img = i.attr("data-url");
			caption = i.attr("data-caption");
			album = i.attr("data-album");

			$('.work-preview .meta .picture-title').text(caption);
			$('.work-preview .meta .album-title').text(album);
			$('.work-preview .frame img').attr('src', img);
			$('.work-preview .meta .current').text((current+1)+' / '+total);

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

			var i = $('.work .stream .active').eq(current);
			img = i.attr("data-url");
			caption = i.attr("data-caption");
			album = i.attr("data-album");

			$('.work-preview .meta .picture-title').text(caption);
			$('.work-preview .meta .album-title').text(album);
			$('.work-preview .frame img').attr('src', img);
			$('.work-preview .meta .current').text((current+1)+' / '+total);

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

}

function animateIt() {
	
	//Animations
/*	setTimeout(function(){$('.header').addClass('animated fadeInDown')},0);  */
    
/*  setTimeout(function(){$('section.home .title').addClass('animated fadeInLeft')},0);   */
/*    setTimeout(function(){$('section.home .slogan').addClass('animated fadeInRight')},800);   */

    setTimeout(function(){$('.page .content').addClass('animated fadeInRight')},0);

    setTimeout(function(){$('section.work .navigate').addClass('animated fadeInLeft')},0);
    setTimeout(function(){$('section.work .stream').addClass('animated fadeInRight')},0);

    setTimeout(function(){$('section.blog .inner').addClass('animated fadeInUp')},0);
    //Animations

}
