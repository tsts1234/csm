<?php include_once(G5_THEME_PATH.'/sub/sub_top_bg.php'); ?>




<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>


<style>
	.sec1 .title { position:relative; width:100%; text-align:center; font-size:18px; color:#1253b1; padding:5% 0% 1% 0%;}
	.s_text { position:relative; width:100%; text-align:center; font-size:40px; font-weight:500; line-height:130%; padding-bottom:8%;}
	.s_title2 { position:relative; width:100%; text-align:center; font-size:18px; color:#1253b1; padding:5% 0% 1% 0%;}
	.s_text2 { position:relative; width:100%; text-align:center; font-size:32px; font-weight:500; line-height:130%; padding-bottom:2%; padding-top:5%;}
	.s_text3 { position:relative; width:100%; text-align:center; font-size:18px; font-weight:300; line-height:normal; padding-bottom:5%;}
	.s_img {float:left; width:100%; text-align:center; padding:13% 5%; background:url('<?php echo G5_THEME_URL?>/img/si/main_02.jpg'); background-size:cover; background-position-y:bottom;}

	.sub11_banner {position:relative; width:100%; padding:5%;}
	.sub11_banner:before {content:''; position:absolute; left:-30px; top:-30px; width:300px; height:300px; background:#efefef; z-index:1;}
	.sub11_banner:after {content:''; position:absolute; left:calc(100% - 340px); top:220px; width:100%; height:300px; background:#e8f2ff; z-index:1;}
	.sub11_banner2 {position:relative; width:100%; padding:10% 5%; background:url('<?php echo G5_THEME_URL?>/img/si/main_02.jpg'); background-size:cover; z-index:3;}
	.sub11_banner2:after {content:''; position:absolute; left:0; top:0; width:100%; height:100%; background:#21212133; z-index:1;}

	.sub11_banner_text {position:relative; text-align:center; font-size:18px; color:#fff; font-weight:bold; padding-bottom:1%; z-index:3;}
	.sub11_banner_title {position:relative; text-align:center; font-size:30px; font-weight:300; color:#fff; z-index:3;}
	.sub11_banner_title span {font-weight:bold;}

	@media (max-width: 1200px) {
		.sub11_banner:before {top:-30px;}
		.sub11_banner:after {top:140px;}
	}

	@media (max-width: 767px) {
		.s_text {font-size:22px; padding-bottom:20%;}
		.s_text2 {font-size:22px; padding-top:25%;}
		.s_text3 {font-size:15px;}
		.s_title2 {font-size:15px; padding:20% 0% 1% 0%;}
		.sub11_banner_title {font-size:18px;}
		.sub11_banner_text {padding-bottom:2.5%;}
		.sub11_banner:before {top:-30px;}
		.sub11_banner:after {top:210px; height:90px;}
	}

</style>


<div class="sub_wrap">

		<div class="s_title">
			Suyule Law Firm
		</div>

		<div class="s_text">
			법률사무소 수율은<br>
			신뢰와 믿음으로 함께 나아갑니다!
		</div>

		<div class="sub11_banner">
			<div class="sub11_banner2">
				<div class="sub11_banner_text" data-aos="zoom-out-up" data-aos-duration="800">Suyule Law Firm</div>
				<div class="sub11_banner_title" data-aos="zoom-out-up" data-aos-duration="1200">
					<span>다양한 경험, 전문성, 올바른 인성을 갖추고 의뢰인과의 소통을</span><br>
					최우선으로 하는 변호사들이 모인 곳입니다.
				</div>
			</div>
		</div>
		
		<div class="s_text2">
			법률사무소 수율은
		</div>

		<div class="s_text3">
			성실함과 정직함을 기본으로 의뢰인들의 최선의 이익을 위해서 ‘자신의  일’처럼 위임사무를 처리합니다.<br>
			법률사무소 수율은 상담부터 판결문을 받아볼 때까지 변호사가 모든 절차에 직접 관여합니다.<br>
			법률사무소 수율은 의뢰인들이 감동받고 자신있게 주위 지인들에게 소개할 수 있는 로펌입니다.
		</div>

		<div class="s_img" data-aos="zoom-out-up" data-aos-duration="1500">
			
		</div>

</div>


<script>
	AOS.init();
</script>