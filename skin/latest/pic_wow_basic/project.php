<?php
include_once($_SERVER['DOCUMENT_ROOT'] ."/common.php");
include_once(G5_LIB_PATH.'/thumbnail.lib.php');

$view = get_view($write, $board, $board_skin_path);
$thumb = get_list_thumbnail($bo_table, $wr_id, 550, 400);

$href = get_pretty_url($bo_table, $wr_id);

?>
<div class="container">

	<!-- HOMEPAGE PORTFOLIO SECTION WILL LOAD CONTENTS FROM HERE -->
	<div class="single-project">
		<div class="row">
			<div class="col-lg-6 col-md-6">
				<img src="<?php echo $thumb['src'];?>" alt="" class="project-image">
			</div>
			<div class="col-lg-6 col-md-6">
				<h3 class="dark-text"><?php echo cut_str(get_text($view['wr_subject']), 40); // 글제목 출력 ?></h3>
				<div class="project-description">
					 <?php echo cut_str(strip_tags($view[wr_content]),160,'...') ?>
				</div>
				<div class="project-information">
					<ul>
						<li><span class="dark-text">작성일: </span> <?php echo date("y-m-d H:i", strtotime($view['wr_datetime'])) ?></li>
						<li><span class="dark-text">작성자: </span> <?php echo $view['name'] ?><?php if ($is_ip_view) { echo "&nbsp;($ip)"; } ?></li>
						<li><span class="dark-text">댓글: </span> <i class="fa fa-commenting-o" aria-hidden="true"></i> <?php echo number_format($view['wr_comment']) ?>건</a></li>
						<li><span class="dark-text">조회: </span> <i class="fa fa-eye" aria-hidden="true"></i> <?php echo number_format($view['wr_hit']) ?>회</li>
						<?php if ($category_name) { ?><li><span class="dark-text">분류 </span> <?php echo $view['ca_name']; // 분류 출력 끝 ?></li><?php } ?>
						<?php
						// 링크
						$cnt = 0;
						for ($i=1; $i<=count($view['link']); $i++) {
							if ($view['link'][$i]) {
								$cnt++;
								$link = cut_str($view['link'][$i], 70);
							?>
							<li><span class="dark-text">Link:</span><a href="<?php echo $view['link_href'][$i] ?>" target="_blank"><?php echo $link ?></a></li>
							<?php
							}
						}
						?>
						<li><span class="dark-text">URL: </span><a href="<?php echo $href;?>"><?php echo $href;?></a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<!-- END OF SINGLE PROJECT -->

</div>