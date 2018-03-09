function StickyMenu($menu) {
	this.$menu = $menu;
	
	this.init();
}

StickyMenu.prototype.init = function() {
	this.running = true;
	var scrollVel = 0;

    var thresholdPos = this.$menu.offset().top;

    var _this = this;
	var $win = $(window);

    var sc = 0;

    function tick() {
    	sc = $win.scrollTop();
	    if (sc > thresholdPos) {
			_this.$menu.css({top: 0, position: "fixed"});
		} else {
			_this.$menu.css({top: thresholdPos, position: "absolute"});
		}
	}
	tick();

    $win.on("scroll.myfunc", tick);
}

StickyMenu.prototype.refresh = function() {
	this.stop();
	this.init();
}

StickyMenu.prototype.stop = function() {
	if (this.running) {
	    this.running = false;
	    $(window).off("scroll.myfunc");
	    this.$menu.css({top: "initial", position: "absolute"});
	}
}

$(function() {
	function smoothScroll() {
		var href = $(this).attr("href");
		var top = 0;
		if (href != '#')
			top = $(href).offset().top;

	    $('html, body').animate({
	        scrollTop: top
	    }, 500);
	}

	$('a').click(smoothScroll);

	var menu = new StickyMenu($("#left-sidebar"));

	enquire.register("screen and (max-width:1000px)", {
	    match : function() {
	    	menu.stop();
	    	$("#left-sidebar").css({position: "relative"});
	    },      
	    unmatch : function() {
	    	menu = new StickyMenu($("#left-sidebar"), 0);
	    }
	});
});