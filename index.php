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
		#m_slide .content .head { width:100%; line-height: 130%; animation-delay: 400ms; display:inline-block; font-size:3.2rem; font-weight:600; text-align:center; color:#fff;}
		#m_slide .content .desc { margin-top:1%; margin-bottom:2%; font-weight:400; animation-delay: 600ms; font-size:20px; text-align:center; color:#fff;}
		
		@media (max-width: 1024px) {
			#m_slide .nav { width: 60px; }
			#m_slide .next { float:right; right:0;}
		}

		@media (max-width: 767px) {
			#m_slide,
			#m_slide .swiper-container { height:60vh; }

			#m_slide .swiper-slide .img { background-size: cover; }

			#m_slide .ctrl { bottom: 12%; top:auto; }

			#m_slide .content { top:86%; }
			#m_slide .content .subhead { margin-bottom:15px; }
			#m_slide .content .subhead img {max-width:250px;}
			#m_slide .content .head { font-size:1.6em; padding:0 1rem; }
			#m_slide .content .desc { margin-top:10px; ; font-size:11px; padding:0% 12%;}
		}
	</style>

	<div id="m_slide">
		<div class="swiper-container">
			<div class="swiper-wrapper">

				<div class="swiper-slide sli1">
					<div class="img" style="background-image:url(<?php echo G5_THEME_URL?>/img/jin/main_01.jpg);"></div>

					<div class="c content">
						<div class="head" data-ani-name="fadeInUp">주식회사 진석</div>
						<div class="desc" data-ani-name="fadeInUp">최고의 품질, 합리적인 가격, 빠른 A/S로 고객만족을 최우선으로 생각합니다.</div>
						<div class="head" data-ani-name="fadeInUp">1533-4304</div>
					</div>
				</div>

				<div class="swiper-slide sli2">
					<div class="img" style="background-image:url(<?php echo G5_THEME_URL?>/img/jin/main_02.jpg);"></div>

					<div class="c content ">
						<div class="head" data-ani-name="fadeInUp">주식회사 진석</div>
						<div class="desc" data-ani-name="fadeInUp">최고의 품질, 합리적인 가격, 빠른 A/S로 고객만족을 최우선으로 생각합니다.</div>
						<div class="head" data-ani-name="fadeInUp">1533-4304</div>
					</div>
				</div>
                
                
                <div class="swiper-slide sli3">
					<div class="img" style="background-image:url(<?php echo G5_THEME_URL?>/img/jin/main_03.jpg);"></div>

					<div class="c content ">
						<div class="head" data-ani-name="fadeInUp">주식회사 진석</div>
						<div class="desc" data-ani-name="fadeInUp">최고의 품질, 합리적인 가격, 빠른 A/S로 고객만족을 최우선으로 생각합니다.</div>
						<div class="head" data-ani-name="fadeInUp">1533-4304</div>
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


<div class="main1_wrap">
	<div class="main1_box_wrap">

		<div class="main_title_box">
			<div class="main_title">PRODUCT</div>
			<div class="main_text">최고의품질로 보답하겠습니다. </div>
		</div>

		<div class="main1_box_content">
			
			<style>
				section {
					display: none;
					padding: 50px 0 0;
					border-top: 1px solid #ddd;
					overflow:hidden;
				}

				/*라디오버튼 숨김*/
				  input {
					  display: none;}

				label {
					width:33%;
					display: inline-block;
					margin: 0 0 -1px;
					padding: 15px 25px;
					font-weight: 600;
					text-align: center;
					color: #bbb;
					border: 1px solid #ccc;}

				label:hover {
					color: #8d7e5f;
					cursor: pointer;}

				/*input 클릭시, label 스타일*/
				input:checked + label {
					  color: #fff;
					  border: 0px solid #ddd;
					  background:#8d7e5f;
				}

				#tab1:checked ~ #content1,
				#tab2:checked ~ #content2,
				#tab3:checked ~ #content3,
				#tab4:checked ~ #content4 {display: block;}

				.main1_box_content {float:left; width:90%; margin:0% 5%;}
			</style>

			<style>
				#container2 {float:left; width:600px; }
				#photo{
				  display: block;
				  max-width: 600px;
				  width:100%;
				  margin: 0 auto;
				}
				#gallery{float:left; text-align: center;}
				 
				#gallery > li {
				  display: inline-block;
				  margin: 0 10px 0 0px;
				}
				.gallery_wrap {float:left; width:calc(100% - 600px); padding-left:5%;}
				.gallery_line {float:left; width:100%; padding-top:15%;}
				.gallery_line span {float:left; width:50px; border:2px solid #8d7e5f;}
				.gallery_title {float:left; width:100%; text-align:left; font-size:34px; padding-bottom:2%; padding-top:2%;}
				.gallery_text {float:left; width:100%; text-align:left; font-size:16px; color:#888; padding-bottom:10%;}
				.gallery_a {float:left; width:100%; text-align:left; margin-bottom:8%;}
				.gallery_a a {font-size:15px; width:200px; display:inline-block; text-align:center; line-height:50px; border:1px solid #000;}
				 
				#gallery > li > img{
				  display: block;
				  width: 100px;
				  cursor: pointer;
				}

				#gallerys {float:left; text-align: center;}
				 
				#gallerys > li {
				  display: inline-block;
				  margin: 0 10px 0 0px;
				}
				.gallery_wrap {float:left; width:calc(100% - 600px); padding-left:5%;}
				.gallery_line {float:left; width:100%; padding-top:15%;}
				.gallery_line span {float:left; width:50px; border:2px solid #8d7e5f;}
				.gallery_title {float:left; width:100%; text-align:left; font-size:34px; padding-bottom:2%; padding-top:2%;}
				.gallery_text {float:left; width:100%; text-align:left; font-size:16px; color:#888; padding-bottom:10%;}
				.gallery_a {float:left; width:100%; text-align:left; margin-bottom:8%;}
				.gallery_a a {font-size:15px; width:200px; display:inline-block; text-align:center; line-height:50px; border:1px solid #000;}
				 
				#gallerys > li > img{
				  display: block;
				  width: 100px;
				  cursor: pointer;
				}

				#gallerya {float:left; text-align: center;}
				 
				#gallerya > li {
				  display: inline-block;
				  margin: 0 10px 0 0px;
				}
				.gallery_wrap {float:left; width:calc(100% - 600px); padding-left:5%;}
				.gallery_line {float:left; width:100%; padding-top:15%;}
				.gallery_line span {float:left; width:50px; border:2px solid #8d7e5f;}
				.gallery_title {float:left; width:100%; text-align:left; font-size:34px; padding-bottom:2%; padding-top:2%;}
				.gallery_text {float:left; width:100%; text-align:left; font-size:16px; color:#888; padding-bottom:10%;}
				.gallery_a {float:left; width:100%; text-align:left; margin-bottom:8%;}
				.gallery_a a {font-size:15px; width:200px; display:inline-block; text-align:center; line-height:50px; border:1px solid #000;}
				 
				#gallerya > li > img{
				  display: block;
				  width: 100px;
				  cursor: pointer;
				}

				@media (max-width: 767px) {
				
					#container2 {width:100%;}
					label {width:32%; font-size:11px; padding:10px 0px;}
					section {padding:0px;}
					#photo {height:auto;}
					#photo img {max-width:100%; width:auto;}
					.gallery_wrap {width:100%; padding-left:0%;}
					.gallery_line {padding-top:10%;}
					.gallery_title {font-size:24px;}
					.gallery_text {font-size:13px;}
					.gallery_a a {width:150px; font-size:12px;}
					#gallery > li > img {width:100%;}
					#gallery > li {float:left; width:48%; margin:1%;}
					#gallerys > li > img {width:100%;}
					#gallerys > li {float:left; width:48%; margin:1%;}

				}

			</style>

			<input id="tab1" type="radio" name="tabs" checked> <!--디폴트 메뉴-->
			<label for="tab1">KCC</label>

			<input id="tab2" type="radio" name="tabs">
			<label for="tab2">그린리모델링</label>

			<input id="tab3" type="radio" name="tabs">
			<label for="tab3">윈체</label>

			<section id="content1">
				<p>
					<div id="container2">
						<img src="<?php echo G5_THEME_URL?>/img/jin/main2_01.jpg" alt="photo" id="photo">
					</div>
					
					<div class="gallery_wrap">
						<div class="gallery_line">
							<span></span>
						</div>
						<div class="gallery_title">
							KCC
						</div>
						<div class="gallery_text">
							다양한 색상, 다양한 디자인으로<br>
							인테리어에 어울리는 KCC창호 색상을 선택하실 수 있습니다.
						</div>
						<div class="gallery_a">
							<a href="/bbs/board.php?bo_table=product&sca=KCC">MORE VIEW</a>
						</div>

						<ul id="gallery">
							<li><img src="<?php echo G5_THEME_URL?>/img/jin/main2_01.jpg" alt="thumbnail"></li>
							<li><img src="<?php echo G5_THEME_URL?>/img/jin/main2_02.jpg" alt="thumbnail"></li>
							<li><img src="<?php echo G5_THEME_URL?>/img/jin/main2_03.jpg" alt="thumbnail"></li>
							<li><img src="<?php echo G5_THEME_URL?>/img/jin/main2_01.jpg" alt="thumbnail"></li>
						</ul>
					</div>

					<script>
					 
					  var photo = document.getElementById("photo");
					  var thumbnail = document.querySelectorAll("#gallery > li > img");
					 
					  for ( var i = 0; i < thumbnail.length; i++ )
						thumbnail[i].addEventListener("click", function () {
					 
						  photo.setAttribute("src", this.getAttribute("src"));
					 
						});
					 
					</script>
				</p>
			</section>

			<section id="content2">
				<p>
					<div id="container2">
						<img src="<?php echo G5_THEME_URL?>/img/jin/main2_02.jpg" alt="photos" id="photos">
					</div>
					
					<div class="gallery_wrap">
						<div class="gallery_line">
							<span></span>
						</div>
						<div class="gallery_title">
							그린리모델링
						</div>
						<div class="gallery_text">
							그린리모델링 사업이란?<br>
							쾌적하고 건강한 거주환경을 제공하기 위해 에너지 효율을 높이고, 온실가스 배출을 낮추어 기존 노후 건축물의 가치를 향상시키기 위하여 국토교통부와 LH에서 추진하는 정책사업입니다.
						</div>
						<div class="gallery_a">
							<a href="/bbs/board.php?bo_table=21">MORE VIEW</a>
						</div>

						<ul id="gallerys">
							<li><img src="<?php echo G5_THEME_URL?>/img/jin/main2_05.jpg" alt="thumbnail"></li>
							<li><img src="<?php echo G5_THEME_URL?>/img/jin/main2_06.jpg" alt="thumbnail"></li>
							<li><img src="<?php echo G5_THEME_URL?>/img/jin/main2_07.jpg" alt="thumbnail"></li>
							<li><img src="<?php echo G5_THEME_URL?>/img/jin/main2_08.jpg" alt="thumbnail"></li>
						</ul>
					</div>

					<script>
					 
					  var photos = document.getElementById("photos");
					  var thumbnail = document.querySelectorAll("#gallerys > li > img");
					 
					  for ( var i = 0; i < thumbnail.length; i++ )
						thumbnail[i].addEventListener("click", function () {
					 
						  photos.setAttribute("src", this.getAttribute("src"));
					 
						});
					 
					</script>
				</p>
			</section>

			<section id="content3">
				<p>
					<div id="container2">
						<img src="<?php echo G5_THEME_URL?>/img/jin/main2_03.jpg" alt="photoa" id="photoa">
					</div>
					
					<div class="gallery_wrap">
						<div class="gallery_line">
							<span></span>
						</div>
						<div class="gallery_title">
							윈체
						</div>
						<div class="gallery_text">
							다양한 색상, 다양한 디자인으로<br>
							인테리어에 어울리는 윈체창호를 선택하실 수 있습니다.
						</div>
						<div class="gallery_a">
							<a href="/bbs/board.php?bo_table=product&sca=윈체">MORE VIEW</a>
						</div>

						<ul id="gallerya">
							<li><img src="<?php echo G5_THEME_URL?>/img/jin/main2_09.jpg" alt="thumbnail"></li>
							<li><img src="<?php echo G5_THEME_URL?>/img/jin/main2_10.jpg" alt="thumbnail"></li>
							<li><img src="<?php echo G5_THEME_URL?>/img/jin/main2_11.jpg" alt="thumbnail"></li>
							<li><img src="<?php echo G5_THEME_URL?>/img/jin/main2_12.jpg" alt="thumbnail"></li>
						</ul>
					</div>

					<script>
					 
					  var photoa = document.getElementById("photoa");
					  var thumbnail = document.querySelectorAll("#gallerya > li > img");
					 
					  for ( var i = 0; i < thumbnail.length; i++ )
						thumbnail[i].addEventListener("click", function () {
					 
						  photoa.setAttribute("src", this.getAttribute("src"));
					 
						});
					 
					</script>
				</p>
			</section>

		</div>

	</div>
</div>


<div id="main2_wrap">
	<div class="main2_box">
		<div class="main2_box_left">
			<div class="main2_box_left_01">COMPANY</div>
			<div class="main2_box_left_02">
				(주)진석은 합리적인 가격과 꼼꼼한 시공으로<br>매우만족하는 서비스로 보답하겠습니다.
			</div>
			<div class="main2_box_left_03">
				<a href="/bbs/board.php?bo_table=11">MORE</a>
			</div>
		</div>
	</div>
</div>



<!------------------------- 고객이용후기 -------------------------->
<div id="main6_wrap">
	<div class="main6_box_wrap">

		<div class="main_title_box">
			<div class="main_title">SERVICE CENTER</div>
			<div class="main_text">최고의품질로 보답하겠습니다. </div>
		</div>

		<div class="main6_box_bottom">

			<div class="main6_box_bottom_01">
				<div class="main6_box_bottom_01_box_wrap">
					<div class="main6_box_bottom_01_box">
						<div class="main6_box_bottom_01_box_img">
							<img src="<?php echo G5_THEME_URL?>/img/jin/main6_box_bottom_01_img.png">
						</div>
						<div class="main6_box_bottom_01_box_text">
							국토부와 함께 하는<br>
							그린리모델링 사업
						</div>
						<div class="main6_box_bottom_01_box_btn">
							<a href="/bbs/board.php?bo_table=21">자세히보기</a>
						</div>
					</div>
				</div>
			</div>

			<div class="main6_box_bottom_02">
				<div class="main6_box_bottom_02_box2_title">공지사항 <a href="/bbs/board.php?bo_table=notice">더보기</a></div>
				<div class="main6_box_bottom_02_box2">
					<?php echo latest('theme/basic', 'notice', 7, 15); ?>
				</div>
			</div>

			<div class="main6_box_bottom_04">
				<div class="main6_box_bottom_04_box">

					<div class="main6_box_bottom_04_text_01">
						고객센터
					</div>

					<div class="main6_box_bottom_04_text_02">
						1533-4304 
					</div>

					<div class="main6_box_bottom_04_text_04">
						평일·토요일
					</div>

					<div class="main6_box_bottom_04_text_05">
						08:00 ~ 19:00 
					</div>

					<div class="main6_box_bottom_04_text_06">
						E-mail : vchong@naver.com
					</div>

					<div class="main6_box_bottom_04_text_07">
						업무시간 외에는 게시판으로 문의 바랍니다.
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



<!------------------------- 시공사례 -------------------------->

<div id="main5_top_wrap">
	<div class="main5_top_box_wrap">
		<div class="main_title_box">
			<div class="main_title"><a href="/bbs/board.php?bo_table=gallery2">시공사례</a></div>
			<div class="main_text">최고의품질로 보답하겠습니다. </div>
		</div>
	</div>
</div>

<div id="main5_wrap">
	<div class="main5_box_wrap">
		<?php echo latest('theme/pic_basic', 'gallery2', 6, 12); ?>
	</div>
</div>


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







