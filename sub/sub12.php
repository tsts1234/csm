<?php include_once(G5_THEME_PATH.'/sub/sub_top_bg.php'); ?>


<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>


<style>
	.sub_title {float:left; width:100%; font-size:34px; font-weight:500; text-align:center;}
	.sub_title3 {float:left; width:100%; font-size:34px; font-weight:500; text-align:center; padding:5% 0%;}
	.sub_box_wrap {display:table; width:100%; padding:3% 0% 5% 0%;}
	.sub_box_img {display:table-cell; width:50%; background:url('<?php echo G5_THEME_URL?>/img/jin/sub_01_01.jpg') no-repeat left center/cover;}
	.sub_box_text {display:table-cell; width:50%; padding-left:5%; color:#888; font-weight:300; vertical-align:middle; text-align:left; line-height:180%; font-size:16px; }
	.sub_box_text p {float:left; width:100%; text-align:left; padding-top:3%; font-size:20px; font-weight:bold;}
	.sub_box_text span {font-size:34px; color:#000; font-weight:bold; line-height:normal; padding-bottom:5%; padding-top:3%;}
	.sub_title2 {float:left; width:100%; font-size:34px; font-weight:500; text-align:center; padding:5% 0%;}
	.sub_box2_wrap {float:left; width:100%; padding-bottom:5%;}
	.sub_box2 {float:left; width:30.3333%; padding:5% 2%; border:10px solid #ccc; margin:1.5%;}
	.sub_box2_img {float:left; width:100%; text-align:center;}
	.sub_box2_title {float:left; width:100%; font-size:20px; color:#e8892c; text-align:center; padding:6% 0%;}
	.sub_box2_text {float:left; width:100%; font-size:15px; font-weight:300; color:#666666; text-align:center;}
	.sub_img {float:left; width:100%; text-align:center;}
	.sub_img img {max-width:100%; width:auto;}

	@media (max-width: 1200px) {
	}

	@media (max-width: 767px) {
		.sub_title {font-size:20px; padding:5% 0%;}
		.sub_box_img {display:inline-block; width:100%; height:200px; }
		.sub_box_text {display:inline-block; width:100%; padding-left:0px;}
		.sub_box_text span {font-size:20px;}
		.sub_title2 {font-size:20px; padding:5% 0%;}
		.sub_box2 {width:97%; padding:10%;}
		.sub_box2_title {font-size:18px;}
		.sub_box2_text {font-size:14px;}
	}

</style>


<?php include_once(G5_THEME_PATH.'/sub/sub_top_bg.php'); ?>

<div class="sub_wrap">
	<div class="sub_wrap2">
		<div class="sub_img">
			<img src="<?php echo G5_THEME_URL?>/img/jin/sub_02_01.jpg">
		</div>
	</div>
</div>

<!--- <img src="<?php echo G5_THEME_URL?>/img/h/sub_01_01.jpg"> --->

<script>
	AOS.init();
</script>