<style>
	#sub_top { position:relative; height: 270px; background-color:#888; }
	#sub_top::after { content:""; position:absolute; left:0; right:0; top:0; bottom:0; z-index:1; background-color:rgba(0, 0, 0, .0); }

	#sub_top .content { position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); text-align:center; color:#fff; z-index:2; }
	#sub_top .desc {font-size: 20px; color:#fff; font-weight: 300; }
	#sub_top .title {font-size: 46px; font-weight:500; color:#fff; animation-delay:0.5s; margin-top:10px; margin-bottom:0; }

	#sub_top .swiper-container {position:absolute; top:0; width:100%; height: 100%; }
	#sub_top .swiper-wrapper { height: 100%; }
	#sub_top .swiper-slide { height: 100%; background-size:200%; }
	#sub_top .swiper-slide .img { height: 100%;  background: none center/cover no-repeat; transform: scale(1.2); transition:transform 5s ease-in-out; }
	#sub_top .swiper-slide.swiper-slide-active .img { transform: scale(1); }
	#sub_top .sli1 .img { background-image:url('<?php echo G5_THEME_URL?>/img/jin/sub_top_bg.jpg'); background-size:cover; }
	
	.sub_top_title {width:100%; text-align:left; font-size:40px; color:#000; font-weight:bold; padding:2% 0%; }
	.sub_top_title_box {max-width:1300px; margin:0 auto; border-bottom:1px solid #000; padding-bottom:1%;}
	.sub_top_title span {font-size:18px; padding-left:15px; color:#666; font-weight:normal;}

	@media (max-width: 767px) {
		#sub_top { height: 200px; }
		#sub_top .title { font-size: 26px; }
		#sub_top .desc {font-size:15px;}
		.sub_top_title {font-size:18px; line-height:40px; padding:5%;}
		.sub_top_title span {font-size:10px; padding-left:10px;}

	}
</style>


<div id="sub_top">
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide sli1"><div class="img"></div></div>
		</div>
	</div>

	<div class="content c">
		<div class="desc animated fadeInUp h6n">창호전문시 ㈜진석입니다.</div>
		<div class="title animated fadeInUp h1"><?php echo $group['gr_subject']?></div>
	</div>
</div>

<div class="sub_top_title">
	<div class="sub_top_title_box"><?php echo $E_bo['bo_subject']?> <span>㈜진석이 최고의품질로 보답하겠습니다.</span></div>
</div>

