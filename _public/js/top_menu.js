$(function(){
	$(".top_menu ul li, .sub_menu_wrap").click(function() {
			$(".sub_menu_wrap").stop().slideDown(400,'swing');
		}, function(){
		$(".sub_menu_wrap").stop().slideUp(400,'linear');
	});

	$("#sidebar-wrapper .nav .dropdown").on("click", function(){
		$(".dropdown-menu").stop().slideUp(400,'linear');
		$(this).find(".dropdown-menu").stop().slideDown(400,'swing');
	});
});