<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

if (G5_IS_MOBILE) {
    include_once(G5_THEME_MOBILE_PATH.'/tail.php');
    return;
}
?>


<?php if($bo_table) {?>

        </div>
      </div>
    </div>

<?php }?>

    <footer class="footer_wrap">
		<div class="container footer">
			<div class="row">
				<div class="col-md-10">
					<?php echo visit('theme/basic'); // 접속자집계, 테마의 스킨을 사용하려면 스킨을 theme/basic 과 같이 지정 ?>
					<p style="margin:0px;">
						대표 : 김연경 ｜ 업체명 : (주)진석 ｜ 대표번호 : 1533-4304<br>
						사업자등록번호 : 403-88-00304<br>
						주소 : 경남 김해시 주촌면 서부로 1637번길 241<br>
						TEL : 055-338-4556 ｜ FAX : 055-338-4557 ｜ E-mail : vchong@naver.com<br>
						<br>
						Copyright ⓒ 2022 (주)진석. All Rights Reserved.
					</p>
					<div class="homp"><div>홈페이지제작문의 : <a href="tel:010-2522-4817">010-2522-4817</a></div></div>
				</div>
				<div class="col-md-2">
					<img src="<?php echo G5_THEME_URL?>/img/jin/foot_logo.png">
				</div>
			</div>
		</div>
    </footer>

	<!--
	<div class="container-fluid bg-gray">
		<div class="col-md-12 text-white text-center">
				Copyright 2019 &copy; <a href="http://ety.kr" target="_blank">HTTP://ety.kr</a>
		</div>
	</div>
	-->

    <!-- Bootstrap core JavaScript -->
    <!--<script src="vendor/jquery/jquery.min.js"></script>-->
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
	<!--
	<script>
	var jQuery = $.noConflict(true);
	</script>
	-->
    <script src="<?php echo G5_THEME_URL?>/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
	<script src="<?php echo G5_THEME_URL?>/assets/parallax/js/parallax.min.js"></script>
	<script src="<?php echo G5_THEME_URL?>/assets/owlcarousel/js/owl.carousel.min.js"></script>
	<!-- countdown -->
	<script type="text/javascript" src="<?php echo G5_THEME_URL?>/assets/countdown/js/kinetic.js"></script>
	<script type="text/javascript" src="<?php echo G5_THEME_URL?>/assets/countdown/js/jquery.final-countdown.js"></script>
	<script type="text/javascript" src="<?php echo G5_THEME_URL?>/js/bootstrap-dropdownhover.js"></script>
	<script type="text/javascript" src="<?php echo G5_THEME_URL?>/js/custom.js"></script>
	<script>
		jQuery('.parallax-window').parallax({imageSrc: 'http://placehold.it/1920x1280'});
	</script>
	<script>
		$(document).ready(function () {
			//owl
			jQuery(".owl-carousel").owlCarousel({
				loop:true,
				margin:3,
				nav:false,
				responsive:{
					0:{
						items:2
					},
					600:{
						items:3
					},
					1000:{
						items:6
					}
				}
			});

			// countdown
			'use strict';			
			jQuery('.countdown').final_countdown({
				'start': 1362139200,
				'end': 1388461320,
				'now': 1387461319        
			});
		});
	</script>

<!-- 상단 배너 -->
<script>
	$(function () {
		var wid = '#sub_top';
		var sw = new Swiper(wid + ' .swiper-container', {
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 500,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			/*autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			loop: true*/
		});
		var rid = getRandomID();
		$(window).on('resize', function () {
			waitForFinalEvent(function () {
				sw.update();
			}, 500, rid);
		});
	});
</script>


<?php
if(G5_DEVICE_BUTTON_DISPLAY && !G5_IS_MOBILE) { ?>
<?php
}

if ($config['cf_analytics']) {
    echo $config['cf_analytics'];
}
?>

<!-- } 하단 끝 -->

<script>
$(function() {
    // 폰트 리사이즈 쿠키있으면 실행
    font_resize("container", get_cookie("ck_font_resize_rmv_class"), get_cookie("ck_font_resize_add_class"));
});
</script>

<?php
include_once(G5_THEME_PATH."/tail.sub.php");
?>