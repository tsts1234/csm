$(function(){ 
	$(window).scroll(function(){  //스크롤하면 아래 코드 실행 

       var windowWidth = $( window ).width(); // 윈도우 가로값 
       var num = $(this).scrollTop();  // 스크롤값 

       if( num > 20 ) // 스크롤을 20 이상 했을 때 

		{
			if(windowWidth < 640) // 윈도우 가로값 640px 미만

				{
					$('#top_w_l').addClass('bg-white');
				}
			
			else if(windowWidth < 1400) // 윈도우 가로값 1400px 미만

				{
					$('#top_w_l').addClass('bg-white');
					$('.navbar-nav li a').css('color','#000');
					$('#tnb a').css('color','#000');
					$('.fixed-header').css('background','#fff');
				}

			else 

				{
					$('#top_w_l').addClass('bg-white');
					$('.navbar-nav li a').css('color','#000');
					$('#tnb a').css('color','#000');
					$('.fixed-header').css('background','#fff');
					$('.fixed-top').css('position','fixed');
				}
		}

		else // 스크롤을 20 미만 

		{
			if(windowWidth < 640) // 윈도우 가로값 640px 미만

				{
					$('#top_w_l').removeClass('bg-white');
				}
			
			else if(windowWidth < 1400) // 윈도우 가로값 960px 미만

				{
					$('#top_w_l').removeClass('bg-white');
					$('.navbar-nav li a').css('color','#000');
					$('.dropdown-item').css('color','#000');
					$('#tnb a').css('color','#fff');
					$('.fixed-header').css('background','rgb(255 255 255 / 0%)');
				}

			else

				{
					$('#top_w_l').removeClass('bg-white');
					$('.navbar-nav li a').css('color','#000');
					$('.dropdown-item').css('color','#000');
					$('#tnb a').css('color','#fff');
					$('.fixed-header').css('background','rgb(255 255 255 / 0%)');
					$('.fixed-top').css('position','relative');
				}

		}
  }); 
});


$(".menu_button button").click(function () {
	$("#top_w_l").toggleClass("on_mb");
})
