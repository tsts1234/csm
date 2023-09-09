<?php
	define('_INDEX_', true);
	if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

	if (G5_IS_MOBILE) {
		include_once(G5_THEME_MOBILE_PATH.'/index.php');
		return;
	}

	include_once(G5_THEME_PATH.'/head.php');
?>


<div class="ety-mt-main"></div>

<!-------------------------- SNS -------------------------->
<div class="top_box_wrap">
	<!--
	<div class="top_box top_box_color_1">
		<a href="tel:055-364-1175"><img src="<?php echo G5_THEME_URL?>/img/sns/sns_03.jpg"></a>
	</div>

	<div class="top_box top_box_color_4">
		<a href="sms:010-3526-2497"><img src="<?php echo G5_THEME_URL?>/img/sns/sns_04.jpg"></a>
	</div>
	-->

	<div class="top_box top_box_color_5">
		<a href="/bbs/write.php?bo_table=order"><img src="<?php echo G5_THEME_URL?>/img/sns/sns_05.jpg"> 견적문의</a>
	</div>

	<div class="top_box top_box_color_2">
		<a href="http://pf.kakao.com/_RXYxkb/chat" target="_blank"><img src="<?php echo G5_THEME_URL?>/img/sns/sns_02.jpg"> 카톡상담</a>
	</div>

	<div class="top_box top_box_color_3">
		<a href="https://blog.naver.com/dain055"><img src="<?php echo G5_THEME_URL?>/img/sns/sns_01.jpg"> 블로그</a>
	</div>

</div>



<!-------------------------- 메인배너 -------------------------->
<div class="main_banners">
	<style>
		.main_banners { position:relative;  }

		#m_slide,
		#m_slide .swiper-container { overflow:hidden; height:700px; background:#000; }
		#m_slide .swiper-slide { overflow:hidden; visibility:hidden; }
		#m_slide .swiper-slide.swiper-slide-active { visibility:visible; }

		#m_slide .swiper-slide .bg-movie-wrap { position:absolute; left: 0; top: 0; width: 100vw; height: 700px; z-index:0; overflow:hidden; display:none; }
		#m_slide .swiper-slide .bg-movie-wrap::after { content: ""; display: block; position:absolute; left:0; top:0; width:100%; height:100%; background: rgba(0, 0, 0, 0.0); }
		#m_slide .swiper-slide-active .bg-movie-wrap { display:block; }
		#m_slide .swiper-slide .bg-movie { display: block; position:absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); /*IE,Edge등 polyfill 적용*/ z-index: 0; }

		#m_slide .swiper-slide .img { position:absolute; left:0; top:0; width:100%; height:100%; background: none center/cover no-repeat; transform: scale(1.2); transition:transform 5s ease-in-out; }
		#m_slide .swiper-slide-active .img { transform: scale(1); }
		#m_slide .swiper-slide .img::after { content: ""; display: block; position:absolute; left:0; top:0; width:100%; height:100%; background: rgba(0, 0, 0, 0.0); }

		#m_slide .ctrl { position:absolute; left: 50%; transform: translateX(-50%); top: 8%; z-index:2; display:flex; align-items:center; }
		#m_slide .ctrl .pg { position:static; color:rgba(255,255,255,.7); }
		#m_slide .ctrl .pg span { background:#fff; width:10px; height:10px; margin: 0 5px; transition:all .2s ease; }
		#m_slide .ctrl .pg span.swiper-pagination-current { }

		#m_slide .ctrl .playstop { position:relative; cursor:pointer; margin-left:10px; width:15px; height:15px; color:white; display:none; }
		#m_slide .ctrl .playstop .fa { position:absolute; }
		#m_slide .ctrl .playstop .fa-play { display:block; }
		#m_slide .ctrl .playstop .fa-pause { display:none; }
		#m_slide .ctrl .playstop.on .fa-play { display:none; }
		#m_slide .ctrl .playstop.on .fa-pause { display:block; }
		#m_slide .ctrl .playstop:hover { color:#333; }
		#m_slide .ctrl .playstop:hover::before { background:white; color:#333; }

		#m_slide .nav { position:absolute; top:50%; transform:translateY(-50%); z-index:2; cursor:pointer; transition-duration: 300ms; }

		#m_slide .prev { left:5%; }
		#m_slide .prev:hover { margin-left:-10px; }

		#m_slide .next { right:5%; }
		#m_slide .next:hover { margin-right:-10px; }

		#m_slide .nav .arrow { position: relative; width: 30px; height:30px; }
		#m_slide .nav .arrow::before,
		#m_slide .nav .arrow::after { content: ''; position: absolute; left: 20%; top: 50%; width: 30px; height: 2px; background:rgba(255,255,255,.7); }

		#m_slide .nav .left-arrow::before { transform: translate(-50%, -10px) rotate(-45deg); }
		#m_slide .nav .left-arrow::after { transform: translate(-50%, 10px) rotate(45deg); }
		#m_slide .nav .right-arrow::before { transform: translate(-50%, -10px) rotate(45deg); left:80%; right:20%; }
		#m_slide .nav .right-arrow::after { transform: translate(-50%, 10px) rotate(-45deg); left:80%; right:20%; }

		#m_slide .swiper-slide .c { height:100%; padding:0; border:1px solid transparent;/*IE Bug:: border 부분을 넣어야함*/ }

		#m_slide .content { position:absolute; left:10px; right:10px; top:80%; transform: translateY(-50%); color:white; text-align: left; display:none; }
		.txt_333{color:#333;}
		#m_slide .swiper-slide-active .content { display:block; }
		#m_slide .content .subhead { width:100%; animation-delay: 400ms; margin-bottom:20px;text-align:center; }
		#m_slide .content .head { width:100%; line-height: 130%; animation-delay: 400ms; display:inline-block; font-size:3.2rem; font-weight:600; text-align:center; color:#000;}
		#m_slide .content .desc { margin-top:1%; font-weight:400; animation-delay: 600ms; font-size:20px; text-align:center; color:#000;}
		
		@media (max-width: 1024px) {
			#m_slide .nav { width: 60px; }
			#m_slide .next { float:right; }
		}

		@media (max-width: 767px) {
			#m_slide,
			#m_slide .swiper-container { height:60vh; }

			#m_slide .swiper-slide .img { background-size: cover; }

			#m_slide .ctrl { bottom: 12%; top:auto; }

			#m_slide .content { top:83%; }
			#m_slide .content .subhead { margin-bottom:15px; }
			#m_slide .content .subhead img {max-width:250px;}
			#m_slide .content .head { font-size:1.6em; padding:0 1rem; }
			#m_slide .content .desc { margin-top:10px; ; font-size:14px; }
		}
	</style>

	<div class="main_bb_wrap">
		<div class="main_bb">
			<a href="/bbs/board.php?bo_table=11">
				<div class="main_bb_box main_bb_box_line">
					<div class="main_bb_box_img"><img src="<?php echo G5_THEME_URL?>/img/si/main_icon_01.png"></div>
					<div class="main_bb_box_text">인사말</div>
				</div>
			</a>
			<a href="/bbs/board.php?bo_table=12">
				<div class="main_bb_box main_bb_box_line">
					<div class="main_bb_box_img"><img src="<?php echo G5_THEME_URL?>/img/si/main_icon_02.png"></div>
					<div class="main_bb_box_text">오시는길</div>
				</div>
			</a>
			<a href="/bbs/board.php?bo_table=21">
				<div class="main_bb_box main_bb_box_line">
					<div class="main_bb_box_img"><img src="<?php echo G5_THEME_URL?>/img/si/main_icon_03.png"></div>
					<div class="main_bb_box_text">제품소개</div>
				</div>
			</a>
			<a href="/bbs/write.php?bo_table=order">
				<div class="main_bb_box">
					<div class="main_bb_box_img"><img src="<?php echo G5_THEME_URL?>/img/si/main_icon_04.png"></div>
					<div class="main_bb_box_text">견적문의</div>
				</div>
			</a>
		</div>
	</div>

	<div id="m_slide">
		<div class="swiper-container">
			<div class="swiper-wrapper">

				<div class="swiper-slide sli1">
					<div class="img" style="background-image:url(<?php echo G5_THEME_URL?>/img/si/main_01.jpg);"></div>

					<div class="c content">
						<div class="subhead h4n" data-ani-name="fadeInUp"><img src="<?php echo G5_THEME_URL?>/img/si/main_01_img.png"></div>
						<div class="head" data-ani-name="fadeInUp">부산/경남 KCC 창호</div>
						<div class="desc" data-ani-name="fadeInUp">고객만족을 최우선으로 생각하는 창호전문기업입니다.</div>
					</div>
				</div>

				<div class="swiper-slide sli2">
					<div class="img" style="background-image:url(<?php echo G5_THEME_URL?>/img/si/main_02.jpg);"></div>

					<div class="c content ">
						<div class="subhead h4n " data-ani-name="fadeInUp"><img src="<?php echo G5_THEME_URL?>/img/si/main_02_img.png"></div>
						<div class="head " data-ani-name="fadeInUp">노메이커윈도우 부산/경남총판</div>
						<div class="desc " data-ani-name="fadeInUp">제작부터 시공까지 원스톱으로!</div>
					</div>
				</div>
                
                
                <div class="swiper-slide sli3">
					<div class="img" style="background-image:url(<?php echo G5_THEME_URL?>/img/si/main_01.jpg);"></div>

					<div class="c content ">
						<div class="subhead h4n " data-ani-name="fadeInUp"><img src="<?php echo G5_THEME_URL?>/img/si/main_03_img.png"></div>
						<div class="head " data-ani-name="fadeInUp">하우스머치 부산지사</div>
						<div class="desc " data-ani-name="fadeInUp">꼼꼼한 시공, 합리적인 가격</div>
					</div>
				</div>
                
                
                

			</div>

			<div class="ctrl">
				<div class="pg"></div>
				<div class="playstop">
					<i class="fa fa-play"></i>
					<i class="fa fa-pause"></i>
				</div>
			</div>
			<div class="nav prev d-ele"><div class="arrow left-arrow"></div></div>
			<div class="nav next d-ele"><div class="arrow right-arrow"></div></div>

		</div>
	</div>

	<script>
		function init_section1() {
			var wid = "#m_slide";
			var $ele = $(wid);
			var $playstop = $ele.find('.playstop');
			var bg_movie1 = $ele.find('.bg-movie1')[0];

			$(document).ready(function() {
				// Full Width Slide (Main Slide Script)

				$ele.find('.content > div').each(function() {
					var $this = $(this);
					$this.show().addClass('animated').addClass( $this.data('ani-name') );
				});

				var m_sw = new Swiper(wid + ' .swiper-container', {
					speed: 500,
					autoplay: {		// 자동 플레이
						delay: 5000,
						disableOnInteraction: false
					},
					effect: 'fade',
					pagination: {
						el: wid + ' .pg',
						clickable: true,
						//type: 'fraction'
					},
					navigation: {
						prevEl: wid + ' .prev',
						nextEl: wid + ' .next'
					},
					loop: true,
				});
				var rid = getRandomID();
				$(window).on('resize', function () {
					waitForFinalEvent(function () {
						m_sw.update();
					}, 500, rid);
				});

				// 비디오 플레이 / 멈춤 관련
				$playstop.addClass('on');
				$playstop.on('click', function() {
					$(this).toggleClass('on');
					if (!bg_movie1.paused) {
						bg_movie1.pause();
					} else {
						bg_movie1.play();
					}
				});

				m_sw.on('slideChange', function () {
					var i = m_sw.realIndex + 1;

					$ele.find('.sli'+ i +' .content > div').each(function() {
						var $this = $(this);
						$this.hide().removeClass('animated').removeClass( $this.data('ani-name') );
					});
				});

				m_sw.on('slideChangeTransitionEnd', function () {
					//console.log( m_sw.realIndex + ', ' + m_sw.activeIndex + ", " + m_sw.previousIndex );
					resize_video();

					var i = m_sw.realIndex + 1;

					$ele.find('.sli'+ i +' .content > div').each(function() {
						var $this = $(this);
						$this.show().addClass('animated').addClass( $this.data('ani-name') );
					});

					$ele.find('video').each(function () {	// 다른 슬라이드의 비디오 멈춤, 초기화
						if (!$(this).hasClass('bg-movie' + i) && !this.paused) {
							this.pause();
							this.currentTime = 1;
						}
					});

					var video1 = $ele.find('.bg-movie' + i)[0];		// 현재 슬라이드의 비디오 재생
					if (video1 !== undefined) {
						video1.play();
					}

				});

				$(window).on('resize', resize_video);
			});

			var resize_video = function() {		// 비디오 리사이징 (IE, Edge - CSS object-fit 속성만 지원했다면 안해도 될 작업
				$ele.find('.bg-movie').each(function() {
					var $this = $(this);
					var $wrap = $this.parent();
					var vr = $this.data('vh') / $this.data('vw');
					var pr = $wrap.height() / $wrap.width();

					if (vr > pr) {
						$this.css({ 'width': '100%', 'height': 'auto' });
					} else {
						$this.css({ 'width': 'auto', 'height': '100%' });
					}
				});
			};

			$('.bg-movie').on('loadedmetadata', function() {
				$(this).data('vw', this.videoWidth);
				$(this).data('vh', this.videoHeight);
				resize_video();
			});

		}
		init_section1();

	</script>
</div>

<!------------------------- 갤러리 -------------------------->
<div class="main5_title">시공사례</div>
<div class="main5_text">시공사례를 자세히 보실 수 있습니다.</div>

<div id="main5_wrap">
	<div class="main5_box_wrap">
		<?php echo latest('theme/pic_basic', 'gallery', 6, 12); ?>
	</div>
</div>



<div id="main_banner2" class="blue">
	<div class="main_center2">
		<div class="main_banner2_01_bg">
			<div class="main_center2_01">고객맞춤 시공을 제공하고 있습니다.</div>
			<div class="main_center2_02">제작/판매/시공까지 원스톱</div>
		</div>
		<div class="main_banner2_02_bg">
			<div class="main_center2_01">고객맞춤 시공을 제공하고 있습니다.</div>
			<div class="main_center2_02">제작/판매/시공까지 원스톱</div>
		</div>
	</div>
</div>

<!------------------------- 고객이용후기 -------------------------->
<div id="main6_wrap">
	<div class="main6_box_wrap">
		<div class="main6_box_bottom">

			<div class="main6_box_bottom_04">
				<div class="main6_box_bottom_04_box">
					<div class="main6_box_bottom_04_img">
						<img src="<?php echo G5_THEME_URL?>/img/si/customer_01.png">
					</div>
					<div class="main6_box_bottom_04_text_01">
						고객센터 (연중무휴)
					</div>
					<div class="main6_box_bottom_04_text_02">
						1899-9438 
					</div>

					<div class="main6_box_bottom_04_text_04">
						평일·토요일
					</div>
					<div class="main6_box_bottom_04_text_05">
						08:00 ~ 19:00 
					</div>

					<div class="main6_box_bottom_04_text_06">
						일요일 · 공휴일
					</div>
					<div class="main6_box_bottom_04_text_07">
						08:00 ~ 19:00 (전화상담가능)
					</div>
					<!--
					<div class="main6_box_bottom_04_text_03">
						<div class="main6_box_bottom_04_text_03_left">
							평일<br>
							주말 · 공휴일
						</div>
						<div class="main6_box_bottom_04_text_03_right">
							00:00 ~ 20:00<br>
							00:00 ~ 00:00
						</div>
					</div>
					-->
				</div>
			</div>

			<div class="main6_box_bottom_01">
				<div class="main6_box_bottom_01_box_title">해운대 전시장</div>
				<div class="main6_box_bottom_01_box">
					<!--<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10950.99467066211!2d129.02492777365387!3d35.31218807082888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356897aa14cf8f75%3A0x7f15554b278ead97!2z6rK97IOB64Ko64-EIOyWkeyCsOyLnCDrj5nrqbQg6riI7IKw66asIOyCsDQwLTM!5e0!3m2!1sko!2skr!4v1656919209026!5m2!1sko!2skr" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>-->
                    
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.520929273624!2d129.17528871608383!3d35.168566765522264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35688d0cf9f305d7%3A0x8f436bf131b8d8f!2z67aA7IKw6rSR7Jet7IucIO2VtOyatOuMgOq1rCDsoozrj5kgMTQ4MC0y!5e0!3m2!1sko!2skr!4v1657859489252!5m2!1sko!2skr" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
				</div>
			</div>

			<div class="main6_box_bottom_02">
				<? include_once("customer2.php"); ?>
			</div>

			<!--
			<div class="main6_box_bottom_03">
				<div class="main6_box_bottom_03_top">
					<div class="main6_box_bottom_03_box">
						<a href="http://pf.kakao.com/_rxluks/chat" target="_blank">
							<div class="main6_box_bottom_03_box_wrap">
								<div class="main6_box_bottom_03_img"><img src="<?php echo G5_THEME_URL?>/img/lux/kakao_01.png"></div>
								<div class="main6_box_bottom_03_text">명품통운<br><span>카카오톡</span></div>
								<div class="main6_box_bottom_03_more">+</div>
							</div>
						</a>
					</div>
				</div>
				<div class="main6_box_bottom_03_bottom">
					<div class="main6_box_bottom_03_box">
						<a href="https://blog.naver.com/jungds0000" target="_blank">
							<div class="main6_box_bottom_03_box_wrap">
								<div class="main6_box_bottom_03_img"><img src="<?php echo G5_THEME_URL?>/img/lux/blog_01.png"></div>
								<div class="main6_box_bottom_03_text_02">명품통운<br><span>블로그</span></div>
								<div class="main6_box_bottom_03_more_02">+</div>
							</div>
						</a>
					</div>
				</div>
			</div>
			--->
			
		</div>
	</div>
<div>


<?php echo $list[$i]['subject'] ?>

<?php
include_once(G5_THEME_PATH.'/tail.php');
?>


<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript" src="<?php echo G5_THEME_URL?>/slick/slick.min.js"></script>


<script type="text/javascript">
	$(document).ready(function(){
		$('.main_center2').slick({
			dots: false,
			arrows: false,
			speed: 400,
			autoplay: true,
			autoplaySpeed: 3000,

			responsive: [
				{
				  breakpoint: 1400,
				  settings: {
					
				  }
				},
				{
				  breakpoint: 480,
				  settings: {
					
				  }
				}
			]

		});
	});
</script>