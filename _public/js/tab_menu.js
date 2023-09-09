$(window).load(function(){
	$(".left_menu .pw_tab_con").hide(); 
	$(".left_menu ul.pw_tab_menu li:first").addClass("on").show();
	$(".left_menu .pw_tab_con:first").show(); 
	$(".left_menu ul.pw_tab_menu li a").click(function() {
		$(".left_menu ul.pw_tab_menu li").removeClass("on");
		$(this).parent().addClass("on"); 
		$(".left_menu .pw_tab_con").hide(); 
		var activeTab = $(this).attr("href");
		$(activeTab).show(); 
		return false;
	});
});