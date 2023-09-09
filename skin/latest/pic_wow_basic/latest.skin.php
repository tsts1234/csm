<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가
include_once(G5_LIB_PATH.'/thumbnail.lib.php');

// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
add_stylesheet('<link rel="stylesheet" href="'.$latest_skin_url.'/css/style.css">', 0);
add_stylesheet('<link rel="stylesheet" href="'.$latest_skin_url.'/css/animate.min.css">', 0);

add_javascript('<script src="'.$latest_skin_url.'/js/wow.min.js"></script>', 0);

$thumb_width = 400;
$thumb_height = 300;
?>

<div class="works">
	<div class="container">

		<!-- SECTION HEADER -->
		<div class="section-header">
			<h2 class="dark-text"><a href="<?php echo get_pretty_url($bo_table); ?>">Portfolio</a></h2>
			<h6>라온건축디자인의 감각적인 디자인들을 감상하세요!</h6>
		</div>
		<!-- / END SECTION HEADER -->

		<div class="row projects">
			<div id="loader">
				<div class="loader-icon"></div>
			</div>
			<div class="col-md-12" id="portfolio-list">
				<!-- PORTFOLIO ITEMS-->
				<ul class="cbp-rfgrid">
					<?php
					for ($i=0; $i<count($list); $i++) {

						$thumb = get_list_thumbnail($bo_table, $list[$i]['wr_id'], $thumb_width, $thumb_height, false, true);

						if($thumb['src']) {
							$img = $thumb['src'];
						} else {
							$img = G5_IMG_URL.'/no_img.png';
						}
					?>
					<!-- PROJECT -->
					<li class="wow fadeInLeft animated" data-wow-offset="30" data-wow-duration="1.5s" data-wow-delay="0.15s">
					<a href="<?php echo $list[$i]['href'] ?>" class="lt_img"><img src="<?php echo $img;?>" alt="project"/>
						<div class="project-info">
							<div class="project-details">
								<h5 class="white-text red-border-bottom"><?php echo cut_str(get_text($list[$i]['wr_subject']),15);?></h5>
								<div class="details white-text">
									<?php echo $list[$i]['wr_name'];?>
								</div>
							</div>
						</div>
						</a>
					</li>
					<!-- / PROJECT -->
					<?php }  ?>
					<?php if (count($list) == 0) { //게시물이 없을 때  ?>
					<li style="width:100%;text-align: center;">게시물이 없습니다.</li>
					<?php }  ?>
				<!-- ... -->
				</ul>
			</div>
			<!-- END OF PORTFOLIO ITEMS-->
		</div>

		<div class="row">
			<div class="col-xs-12 col-sm-12 col-lg-12 text-center">
				<a href="/bbs/board.php?bo_table=gallery" class="detail_view">Detail view</a>
			</div>
		</div>

		<!-- PROJECT DETAILS WILL BE LOADED HERE -->
		<div id="loaded-content"></div>

		<a id="back-button" class="red-btn" href="#"><i class="fa fa-arrow-left" aria-hidden="true"></i> Go Back</a>
		<a id="green-button" class="green-btn" href="<?php echo get_pretty_url($bo_table); ?>"><i class="fa fa-list" aria-hidden="true"></i> more</a>

	</div> <!-- / END CONTAINER -->
</div> <!-- / END WORKS SECTION -->

<script>
/* ================================
===  PROJECT LOADING           ====
================================= */

jQuery(document).ready(function($) {
    $('.more').on('click', function(event) {
        event.preventDefault();

        var href = $(this).attr('href'),
            portfolioList = $('#portfolio-list'),
            content = $('#loaded-content');

        portfolioList.animate({'marginLeft':'-120%'},{duration:400,queue:false});
        portfolioList.fadeOut(400);
        setTimeout(function(){ $('#loader').show(); },400);
        setTimeout(function(){
            content.load(href, function() {
                $('#loaded-content meta').remove();
                $('#loader').hide();
                content.fadeIn(600);
                $('#back-button').fadeIn(600);
				$('#green-button').fadeIn(600);
            });
        },800);

    });

    $('#back-button').on('click', function(event) {
        event.preventDefault();

        var portfolioList = $('#portfolio-list')
            content = $('#loaded-content');

        content.fadeOut(400);
        $('#back-button').fadeOut(400);
		$('#green-button').fadeOut(400);
        setTimeout(function(){
            portfolioList.animate({'marginLeft':'0'},{duration:400,queue:false});
            portfolioList.fadeIn(600);
        },800);
    });
});
</script>