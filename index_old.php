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



<!-------------------------- 슬라이드 -------------------------->
<header>

	<div class="main_bb_wrap">
		<div class="main_bb">
			<div class="main_bb_box main_bb_box_line">
				<div class="main_bb_box_img"><img src="<?php echo G5_THEME_URL?>/img/si/main_icon_01.png"></div>
				<div class="main_bb_box_text">인사말</div>
			</div>
			<div class="main_bb_box main_bb_box_line">
				<div class="main_bb_box_img"><img src="<?php echo G5_THEME_URL?>/img/si/main_icon_02.png"></div>
				<div class="main_bb_box_text">오시는길</div>
			</div>
			<div class="main_bb_box main_bb_box_line">
				<div class="main_bb_box_img"><img src="<?php echo G5_THEME_URL?>/img/si/main_icon_03.png"></div>
				<div class="main_bb_box_text">제품소개</div>
			</div>
			<div class="main_bb_box">
				<div class="main_bb_box_img"><img src="<?php echo G5_THEME_URL?>/img/si/main_icon_04.png"></div>
				<div class="main_bb_box_text">견적문의</div>
			</div>
		</div>
	</div>

	<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">

		<ol class="carousel-indicators">
			<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
			<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
		</ol>

		<div class="carousel-inner" role="listbox">
			<!-- 1 -->
			<div class="carousel-item active main_banner" style="background-image: url('<?php echo G5_THEME_URL?>/img/si/main_01.jpg')">
				<div class="carousel-caption d-md-block">
					<div class="main_banner_title_01"><img src="<?php echo G5_THEME_URL?>/img/si/main_01_img.png"></div>
					<div class="main_banner_title_02">KCC 창호 전문 시공점</div>
					<div class="main_banner_title_03">고객만족을 최우선으로 생각하는 창호전문기업입니다.</div>
				</div>
			</div>

			<!-- 2 -->
			<div class="carousel-item  main_banner" style="background-image: url('<?php echo G5_THEME_URL?>/img/si/main_02.jpg')">
				<div class="carousel-caption d-md-block">
					<div class="main_banner_title_01"><img src="<?php echo G5_THEME_URL?>/img/si/main_02_img.png"></div>
					<div class="main_banner_title_02">노메이커브랜드 취급</div>
					<div class="main_banner_title_03">제작부터 시공까지 원스톱으로!</div>
				</div>
			</div>
		</div>

		<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
		  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
		  <span class="sr-only">Previous</span>
		</a>

		<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
		  <span class="carousel-control-next-icon" aria-hidden="true"></span>
		  <span class="sr-only">Next</span>
		</a>

	</div>

</header>



<!-------------------------- 슬라이드 -------------------------->
<header>
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">

	<ol class="carousel-indicators">
	  <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
	  <!--
	  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
	  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
	  -->
	</ol>

	<div class="carousel-inner" role="listbox">

	  <!-- 배너 01 -->
	  <a href="/gnuboard5/bbs/board.php?bo_table=guns">
		<div class="carousel-item active banner_wrap" style="background-image: url('<?php echo G5_THEME_URL?>/img/main_01.jpg')"></div>
		<div class="carousel-item active m_banner_wrap" style="background-image: url('<?php echo G5_THEME_URL?>/img/m_main_01.jpg')"></div>
	  </a>

	  <!-- 배너 02 
	  <div class="carousel-item" style="background-image: url('<?php echo G5_THEME_URL?>/img/main_01.jpg')">
		<div class="carousel-caption d-none d-md-block">
		  <h3 class="ko1">타이틀2</h3>
		  <p class="ko1 f20">내용2</p>
		</div>
	  </div>

	  
	  <div class="carousel-item" style="background-image: url('<?php echo G5_THEME_URL?>/img/background01.jpg')">
		<div class="carousel-caption d-none d-md-block">
		  <h3 class="ko1">타이틀3</h3>
		  <p class="ko1 f20">내용3</p>
		</div>
	  </div>-->

	</div>

		<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
		  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
		  <span class="sr-only">Previous</span>
		</a>

		<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
		  <span class="carousel-control-next-icon" aria-hidden="true"></span>
		  <span class="sr-only">Next</span>
		</a>

  </div>
</header>


<!------------------------- 이사서비스 -------------------------->
<div id="main2_wrap">
	<div class="container">

		<div class="center-heading">
			<h2><strong>이사서비스</strong></h2>
			<span class="center-line"></span>
			<p class="sub-text margin-bottom-80 ko1 f19">
				장백익스프레스는 포장이사는 물론 의료기계·중량물이전·공장이사 등 특수이사도 완벽하게 작업하는 업체입니다.
			</p>
		</div>

		<div class="row">
			<div class="col-xs-12 col-sm-6 col-lg-3">
				<div class="box">
					<div class="icon">
						<div class="image"><img src="img/main2_icon_1.png"></div>
						<div class="info">
							<h3 class="title">포장이사</h3>
							<p class="ko1 f15">
								이사전용 포장지를 이용한 완벽한 포장서비스, 편안한 이사를 원하시는 고객님을 위한 서비스입니다.
							</p>
							<div class="margin-top-20 margin-bottom-20">
								<button type="button" class="main2_btn_go btn btn-secondary btn-sm" onclick="location.href='/gnuboard5/bbs/board.php?bo_table=21'">바로가기</button>
							</div>
						</div>
					</div>
					<div class="space"></div>
				</div> 
			</div>

			<div class="col-xs-12 col-sm-6 col-lg-3">
				<div class="box">
					<div class="icon">
						<div class="image"><img src="img/main2_icon_2.png"></div>
						<div class="info">
							<h3 class="title">일반이사</h3>
							<p class="ko1 f15">
								포장 및 정리는 고객이 직접 하고 포장 및 정리를 직접하시길 원하시는 고객님께 적합한 서비스입니다.
							</p>
							<div class="margin-top-20 margin-bottom-20">
								<button type="button" class="main2_btn_go btn btn-secondary btn-sm" onclick="location.href='/gnuboard5/bbs/board.php?bo_table=22'">바로가기</button>
							</div>
						</div>
					</div>
					<div class="space"></div>
				</div> 
			</div>

			<div class="col-xs-12 col-sm-6 col-lg-3">
				<div class="box">
					<div class="icon">
						<div class="image"><img src="img/main2_icon_3.png"></div>
						<div class="info">
							<h3 class="title">특수이사</h3>
							<p class="ko1 f15">
								의료기계, 중량물이전, 공장이사, 슈퍼컴퓨터이전, 기계운반 등 특수이사도 부산경남 대표업체입니다.
							</p>
							<div class="margin-top-20 margin-bottom-20">
								<button type="button" class="main2_btn_go btn btn-secondary btn-sm" onclick="location.href='/gnuboard5/bbs/board.php?bo_table=23'">바로가기</button>
							</div>
						</div>
					</div>
					<div class="space"></div>
				</div> 
			</div>

			<div class="col-xs-12 col-sm-6 col-lg-3">
				<div class="box">
					<div class="icon">
						<div class="image"><img src="img/main2_icon_4.png"></div>
						<div class="info">
							<h3 class="title">보관이사</h3>
							<p class="ko1 f15">
								오랫동안 짐을 보관해야 하는경우 자체보유한 컨테이너창고에 손상없이 안전하게 보관해드립니다.
							</p>
							<div class="margin-top-20 margin-bottom-20">
								<button type="button" class="main2_btn_go btn btn-secondary btn-sm" onclick="location.href='/gnuboard5/bbs/board.php?bo_table=24'">바로가기</button>
							</div>
						</div>
					</div>
					<div class="space"></div>
				</div> 
			</div>
		</div><!-- /row -->

	</div><!-- /container -->
</div>

<!-------------------------- 비즈니스안내 ---------------
<div class="py-5 margin-top-80" style="background:#f2f2f2;">
	<div class="container">
		<div class="center-heading margin-top-40">
			<h2>USE A <strong>LIBRARY</strong> </h2>
			<span class="center-line"></span>
		</div>

	  <div class="row margin-top-50 margin-bottom-50">

		<div class="col-lg-5">
		  <h2>JavaScript Library</h2>
		  <p class="ko_17">테마폴더내 라이선스 문서 확인</p>
		  <ul>
		  	<li><strong>GNUboard5</strong></li>
			<li><strong>Bootstrap4</strong></li>
			<li>jQuery</li>
			<li>Font Awesome5</li>
			<li>Working contact form with validation</li>
			<li>Unstyled page elements for easy customization</li>
			<li>Parallax</li>
			<li>Owl</li>
			
		  </ul>
		  <p class="ko_16">
		  현제 제작되는 모든 테마 및 템플릿은 글로벌하게 <strong><a href="http://ety.kr" target="_blank">에티테마</a></strong> 에서 제작되고 있으며 무료 테마 및 템플릿의 경우에는 이미지가 포함 되어 있지 않습니다. 또한 <strong><a href="http://ety.kr" target="_blank">에티테마</a></strong>로 오시면 추가적인 업데이트된 파일을 다운로드 하실 수 있습니다.</p>
		</div>
		<div class="col-lg-7">
			<img class="img-fluid rounded" src="http://placehold.it/635x515" alt="">
			<img class="img-fluid rounded" src="http://placehold.it/570x400" alt="">
		</div>
	  </div>
	 
	</div>
</div>----------->


<!-------------------------- 회사소개 및 안내 -----------------
<div class="container margin-top-80 margin-bottom-80">
	<h3 class="margin-bottom-50 text-left">PRODUCT</h3>
	<!-- LATEST : pic_basic_company 
	<?php echo latest('theme/pic_basic_company', 'notice', 1, 24); ?>
</div>



<!-------------------------- 장백익스프레스 -------------------------->
<div id="main3_wrap" class="" data-parallax="scroll">
	<div class="container">
		<div class="row">
			<div class="col-md-12 text-center p-center para-text">
				<h1 class='text-light'>장백익스프레스</h1>
				<p class="main3_text">
					"합리적인 가격으로 고객만족 100% 실현을 위해 노력합니다"<br>
					모든이사 전화한통이면 OK! 처음부터 끝까지 믿고 맡길수 있는 이사서비스!
				</p>
				<button type="button" class="main3_btn_go btn btn-outline-light" onclick='window.open("about:blank").location.href="http://ety.kr"'>바로가기</button>
			</div>
		</div>
	</div>
</div>


<!-------------------------- 공지사항 갤러리 -------------------------->
<div class="container margin-top-50 margin-bottom-50">
	<!--<h3 class="margin-bottom-50 text-left">GALLERY</h3>-->
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<h3 class="margin-bottom-50 text-left">현장사진</h3>
				<div class="latest_wr">
					
				</div>
			</div>
		</div>
	</div>
</div>

<?php echo latest('theme/pic_wow_basic', 'gallery', 20, 4); ?>

<!--
<div class="col-md-6">
	<h3 class="margin-bottom-50 text-left">공지사항</h3>
	<?php echo latest('theme/basic', 'notice', 5, 20); ?>
</div>
-->

<!-------------------------- 고객센터 -------------------------->
<div id="main4_wrap">

	<div class="main4_left_wrap">
		<div class="main4_left">
			<div class="main4_left_01">고객센터</div>
			<div class="main4_left_02">주소</div>
			<div class="main4_left_03">부산 남구 용호로 197번길 53</div>
			<div class="main4_left_02">문의전화</div>
			<div class="main4_left_03">1899-1291 / 010-2570-1580</div>
			<div class="main4_left_02">문의가능시간</div>
			<div class="main4_left_03">월~일 09:00~18:00</div>
			<div class="main4_left_02"></div>
		</div>
	</div>

	<div class="main4_right_wrap">
		<div class="main4_right">
			<span class="main4_right_01">장백익스프레스만의 품격있는 이사 서비스 입니다.</span>
			<span class="main4_right_02">장백익스프레스</span>
			<span class="main4_right_03">문의가 있으시면 언제든지 연락주세요.<Br>친절하게 견적드리겠습니다!</span>
		</div>
	</div>

</div>


<!-------------------------- CALL ACTION ------------
<div class="callbox">
	<div class="container margin-top-20">
	<h3 class="margin-bottom-50 text-left ko1">ETY DEMO</h3>
	  <div class="row">
		<div class="col-md-8">
		  <p class="ko_17">
			"합리적인 가격으로 고객만족 100% 실현을 위해 노력합니다"<br>
			모든이사 전화한통이면 OK! 처음부터 끝까지 믿고 맡길수 있는 이사서비스!
		  </p>
		</div>
		<div class="col-md-4">
		  <a class="btn btn-lg btn-secondary btn-block" href="http://ety.kr/board/qa" target="_blank">GO!</a>
		</div>
	  </div>
	</div>
</div>
-------------->


<?php
include_once(G5_THEME_PATH.'/tail.php');
?>