<?php include_once(G5_THEME_PATH.'/sub/sub_top_bg.php'); ?>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"/>

<style>
	.sub1_wrap {float:left; width:100%; padding:5%; background:#fff;}
	.sub2_wrap {float:left; width:100%; padding:5%; background:#f8f8f8;}
	.sub_box_wrap {max-width:1300px; margin:0 auto;}
	.sub2_title {float:left; width:100%; font-size:34px; color:#000; font-weight:bold; text-align:center; padding-bottom:7%;}
	.sub2_title span {border-bottom:1px solid #000; padding-bottom:1%;}
	.sub2_box {float:left; width:100%;}
	.sub2_box_left {float:left; width:50%; padding-right:2%;}
	.sub2_box_left_title {float:left; width:100%; text-align:left; font-size:28px; font-weight:bold; padding-bottom:5%;}
	.sub2_box_left_title2 {float:left; width:100%; text-align:left; font-size:28px; font-weight:bold; padding:8% 0% 2% 0%;}
	.sub2_box_left_title3 {float:left; width:100%; text-align:left; font-size:34px; font-weight:bold; padding:8% 0% 2% 0%; }
	.sub2_box_left_title3 span { padding:5px 30px; background:#009933; color:#fff;}

	.sub2_box_left_img_wrap {display:table; float:left; width:100%; background:#fff; padding:0%; border-radius:100px;}
	.sub2_box_left_img {display:table-cell; text-align:center;}
	.sub2_box_left_text {float:left; width:100%; font-size:20px; padding:5% 0%; font-weight:300; color:#333;}
	.sub2_box_left_text2 {float:left; width:100%; font-size:20px; padding:0% 0% 5% 0%; font-weight:300; color:#333;}
	.sub2_box_left_text3 {float:left; width:100%; font-size:70px; font-weight:bold; color:#009933;}

	.sub2_box_left_text span {color:#f00; font-weight:bold;}
	.sub2_box_left_box {float:left; width:100%; background:#fff; padding:5%;}
	.sub2_box_left_box_top {float:left; width:100%; text-align:left; font-size:24px; font-weight:bold;}
	.sub2_box_left_box_title {float:left; width:100%; text-align:left; font-size:18px; font-weight:bold; padding:2% 0%;}
	.sub2_box_left_box_li {float:left; width:100%;}
	.sub2_box_left_box_li li {float:left; width:100%; text-align:left; font-size:15px; padding:1% 0%;}
	.sub2_box_right {float:left; width:50%; padding-left:2%;}
	.sub2_box_right .youtube {float:left; width:100%;}
	.sub2_box_right .youtube iframe {float:left; width:100%; height:420px;}
	.sub2_box_right_table {display:table; float:left; width:100%;}
	.sub2_box_right_table table {width:100%;}
	.sub2_box_right_table table tr {width:100%;}
	.sub2_box_right_table table tr td {font-size:15px; padding:2%; border:1px solid #ccc; text-align:center; background:#fff; }
	.sub2_box_right_table_title {font-size:18px; font-weight:bold;}
	.sub2_box2_wrap {float:left; width:100%;}
	.sub2_box2 {float:left; width:30%; margin:1%; padding:5%; background:#0c4da2;}
	.sub2_box2_text {float:left; width:100%; font-size:18px; font-weight:bold; color:#fff; text-align:center;}
	.sub2_box2_img {float:left; width:100%; text-align:center; padding-bottom:8%;}

	.sub2_box_swiper {position:relative; float:left; width:100%; overflow:hidden; padding-top:3%;}
	.swiper-pagination-bullet {margin:5px;}
	.swiper-pagination {left:auto; right:auto; padding:5% 0%;}
	.pd_10 {padding-bottom:10%;}

	 .swiper {
        width: 100%;
        padding-top: 50px;
        padding-bottom: 50px;
      }

      .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 300px;
        height: 300px;
      }

      .swiper-slide img {
        display: block;
        width: 100%;
	}
	.swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {bottom:-15%;}

	@media screen and (max-width: 1200px) {
	}

	@media screen and (max-width: 640px) {
		.sub2_title {font-size:24px;}
		.sub1_wrap {padding:10% 5%;}
		.sub2_wrap {padding:10% 5%;}
		.sub2_box_left_title {font-size:20px;}
		.sub2_box_left_text {font-size:15px;}
		.sub2_box_left_box_top {font-size:20px;}
		.sub2_box_left_box_title {font-size:16px;}
		.sub2_box_left_box_li li {font-size:12px;}

		.sub2_box_left {width:100%; padding-right:0px;}
		.sub2_box_left_title2 {font-size:18px;}
		.sub2_box_left_text2 {font-size:15px;}
		.sub2_box_left_title3 {font-size:20px; text-align:center;}
		.sub2_box_left_text3 {font-size:40px; text-align:center; padding-bottom:10%;}
		.sub2_box_right {width:100%; padding-left:0px; padding-top:5%;}
		.sub2_box2 {width:31.3333%;}
		.sub2_box2_text {font-size:15px;}

		.sub2_box_right .youtube iframe {height:200px;}
	}
</style>


<div class="sub1_wrap">
	<div class="sub_box_wrap">
		<div class="sub2_title"><span>왜 그린리모델링 인가?</span></div>
		<div class="sub2_box">

			<div class="sub2_box_left">
				<div class="sub2_box_left_img_wrap">
					<div class="sub2_box_left_img">
						<img src="<?php echo G5_THEME_URL?>/img/jin/sub2_01_01.jpg">
					</div>
					<div class="sub2_box_left_img">
						<img src="<?php echo G5_THEME_URL?>/img/jin/sub2_01_02.jpg">
					</div>
					<div class="sub2_box_left_img">
						<img src="<?php echo G5_THEME_URL?>/img/jin/sub2_01_03.jpg">
					</div>
				</div>
				
				<div class="sub2_box_left_title2">그린리모델링 사업이란?</div>
				<div class="sub2_box_left_text2">
					그린리모델링은 쾌적하고 건강한 거주환경을 제공하기 위하여 에너지 효율을 높이고, 온실가스 배출을 낮추어 기존 노후 건축물의 가치를 향상시키기 위하여 국토교통부와 LH에서 추진하는 정책사업입니다.
				</div>

				<div class="sub2_box_left_title3"><span>연간 에너지 절감율</span></div>
				<div class="sub2_box_left_text3">40%</div>
			</div>

			<div class="sub2_box_right">
				<img src="<?php echo G5_THEME_URL?>/img/jin/sub2_1.png">
			</div>

		</div>
	</div>
</div>

<div class="sub2_wrap">
	<div class="sub_box_wrap">
		<div class="sub2_title"><span>KCC창호교체 특별혜택</span></div>
		<div class="sub2_box">

			<div class="sub2_box_left">
				<div class="sub2_box_left_title">샷시교체, 정부에서 지원 합니다</div>
				<div class="sub2_box_left_img_wrap">
					<div class="sub2_box_left_img">
						<img src="<?php echo G5_THEME_URL?>/img/jin/sub2_01_01.jpg">
					</div>
					<div class="sub2_box_left_img">
						<img src="<?php echo G5_THEME_URL?>/img/jin/sub2_01_02.jpg">
					</div>
					<div class="sub2_box_left_img">
						<img src="<?php echo G5_THEME_URL?>/img/jin/sub2_01_03.jpg">
					</div>
				</div>
				<div class="sub2_box_left_text">
					국내 창호 1위 브랜드 KCC제품을 일반대리점 대비<br>
					<span>특별할인으로 20% 저렴</span>하게 구매 하실 수 있습니다.
				</div>
				<div class="sub2_box_left_box">
					<div class="sub2_box_left_box_top">
						그린리모델링 이자 지원방식 (아파트 예시)
					</div>
					<div class="sub2_box_left_box_title">
						창호(샷시) 교체 공사 비용 800만원 예시
					</div>
					<div class="sub2_box_left_box_li">
						<li>공사비 800만원에 대해 최장 60개월 분납 지원</li>
						<li>60개월 동안 분납할 수 있도록 지원하며 분납 시 발생하는 이자 중 연간 최대 3% 지원 혜택</li>
					</div>
				</div>
			</div>

			<div class="sub2_box_right">
				<div class="sub2_box_right_table">
					
					<table>
						<tr>
							<td colspan="2" class="sub2_box_right_table_title">그린리모델링 이자 지원 안내</td>
						</tr>
						<tr>
							<td>구분</td>
							<td>은행</td>
						</tr>
						<tr>
							<td>대출금리</td>
							<td>시중금리 (4% 초반)</td>
						</tr>
						<tr>
							<td>적용금리</td>
							<td>1% 초반</td>
						</tr>
						<tr>
							<td>할부기간</td>
							<td>최대 60개월</td>
						</tr>
						<tr>
							<td>적용금액</td>
							<td>최소 300만원 ~ 최대 2,000만원</td>
						</tr>
						<tr>
							<td>운영기관</td>
							<td>우리은행, 국민은행, 농협중앙회</td>
						</tr>
						<tr>
							<td rowspan="3">조건</td>
							<td>실거래가 9억 이하 건물</td>
						</tr>
						<tr>
							<td>에너지 소비효율 3등급 이상</td>
						</tr>
						<tr>
							<td>등기상 명의자만 신청 가능</td>
						</tr>
						<tr>
							<td>장점</td>
							<td>장기간 분납 가능</td>
						</tr>
					</table>
					
				</div>
			</div>

		</div>
	</div>
</div>


<div class="sub1_wrap">
	<div class="sub_box_wrap">
		<div class="sub2_title"><span>KCC직영 공장/시공사</span></div>
		<div class="sub2_box">

			<div class="sub2_box_left">
				
				<div class="sub2_box_left_title2">중간 마진을 최소화한 합리적 가격</div>
				<div class="sub2_box_left_text2">
					가격을 결정 의 중요한 요인은 원자재가격, 제작·시공 인건비,<br>
					기업이윤 등으로 이뤄져 있습니다.<br>
					화산에스디는 유리와 창호 공장을 함께 운영하여 품질은<br>
					높이고, 가격은 낮췄습니다.
				</div>
				<div class="sub2_box2_wrap">
					<div class="sub2_box2">
						<div class="sub2_box2_img"><img src="<?php echo G5_THEME_URL?>/img/jin/sub2_icon_01.png" /></div>
						<div class="sub2_box2_text">20%할인</div>
					</div>

					<div class="sub2_box2">
						<div class="sub2_box2_img"><img src="<?php echo G5_THEME_URL?>/img/jin/sub2_icon_02.png" /></div>
						<div class="sub2_box2_text">공장직영</div>
					</div>

					<div class="sub2_box2">
						<div class="sub2_box2_img"><img src="<?php echo G5_THEME_URL?>/img/jin/sub2_icon_03.png" /></div>
						<div class="sub2_box2_text">정부지원</div>
					</div>
				</div>
			</div>

			<div class="sub2_box_right">
				<div class="youtube">
					<iframe width="100%" height="100%" src="https://www.youtube.com/embed/" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				</div>
			</div>

		</div>
		<div class="sub2_box_swiper">
			<div class="swiper mySwiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
					  <img src="<?php echo G5_THEME_URL?>/img/jin/main2_01.jpg" />
					</div>
					<div class="swiper-slide">
					  <img src="<?php echo G5_THEME_URL?>/img/jin/main2_02.jpg" />
					</div>
					<div class="swiper-slide">
					  <img src="<?php echo G5_THEME_URL?>/img/jin/main2_03.jpg" />
					</div>
					<div class="swiper-slide">
					  <img src="<?php echo G5_THEME_URL?>/img/jin/main2_04.jpg" />
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
	</div>
</div>



<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>

<!-- Initialize Swiper -->
<script>
	var swiper = new Swiper(".mySwiper", {
		effect: "coverflow",
		grabCursor: true,
		centeredSlides: true,
		autoplay: {
		  delay: 1500,
		  disableOnInteraction: false,
		},
		slidesPerView: "auto",
		coverflowEffect: {
		  rotate: 50,
		  stretch: 0,
		  depth: 100,
		  modifier: 1,
		  slideShadows: true,
		},
		pagination: {
		  el: ".swiper-pagination",
		},
	});
</script>