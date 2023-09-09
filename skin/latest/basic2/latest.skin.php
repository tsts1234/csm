<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
add_stylesheet('<link rel="stylesheet" href="'.$latest_skin_url.'/style.css">', 0);
?>

<div class="lat">
    <h2 class="lat_title"><a href="<?php echo G5_BBS_URL ?>/board.php?bo_table=<?php echo $bo_table ?>"><?php echo $bo_subject ?></a></h2>
	<ul class="lt_table_tops">
		<li class="lt_table_top">
			<div class="lt_date">날짜</div>
			<div class="lt_name">고객명</div>
			<div class="lt_zone">출발지/도착지</div>
			<div class="lt_end">진행상황</div>
		</li>
	</ul>
    <ul>
		<?php for ($i=0; $i<count($list); $i++) {  ?>
			<li>
				<div class="lt_date">
					<?php echo $list[$i]['datetime2'] ?>
				</div>
				<div class="lt_name">
					<?php
						if ($list[$i]['icon_secret']) echo "<i class=\"fa fa-lock\" aria-hidden=\"true\"></i><span class=\"sound_only\">비밀글</span> ";

						if ($list[$i]['icon_new']) echo "<span class=\"new_icon\">N<span class=\"sound_only\">새글</span></span>";

						if ($list[$i]['icon_hot']) echo "<span class=\"hot_icon\">H<span class=\"sound_only\">인기글</span></span>";

						echo "<a href=\"".$list[$i]['href']."\"> ";
						if ($list[$i]['is_notice'])
							echo "<strong>".$list[$i]['subject']."</strong>";
						else
							echo $list[$i]['subject'];

						echo "</a>";

						// if ($list[$i]['link']['count']) { echo "[{$list[$i]['link']['count']}]"; }
						// if ($list[$i]['file']['count']) { echo "<{$list[$i]['file']['count']}>"; }

						 //echo $list[$i]['icon_reply']." ";
					   // if ($list[$i]['icon_file']) echo " <i class=\"fa fa-download\" aria-hidden=\"true\"></i>" ;
						//if ($list[$i]['icon_link']) echo " <i class=\"fa fa-link\" aria-hidden=\"true\"></i>" ;

						if ($list[$i]['comment_cnt'])  echo "
						<span class=\"lt_cmt\">+ ".$list[$i]['comment_cnt']."</span>";
					?>
				</div>
				<div class="lt_zone">
					<?php echo $list[$i]['wr_1'] ?>&nbsp;&nbsp;→&nbsp;&nbsp;<?php echo $list[$i]['wr_2'] ?>
				</div>
				<div class="lt_end">
					<?php if ($list[$i]['wr_10']=="견적완료") { ?><div style="padding:0px 0 0 0;width:100px;height:20px;background:#FF3061;color:#fff;font-weight:bold; margin:0 auto;">견적완료</div> 
					<?php }elseif($list[$i]['wr_10']=="견적중"){ ?><div style="padding:0px 0 0 0;width:100px;height:20px;background:#5AD103;color:#fff;font-weight:bold; margin:0 auto;">견적중</div>
					<?php }elseif($list[$i]['wr_10']=="견적접수"){ ?><div style="padding:0px 0px 0 0;width:100px;height:20px;background:#878ED3;color:#fff;font-weight:bold; margin:0 auto;">견적접수</div>
					<?php } ?>
				</div>
				
			</li>
		<?php }  ?>

		<?php if (count($list) == 0) { //게시물이 없을 때  ?>
			<li class="empty_li">게시물이 없습니다.</li>
		<?php }  ?>
    </ul>
    <a href="<?php echo G5_BBS_URL ?>/board.php?bo_table=<?php echo $bo_table ?>" class="lt_more"><span class="sound_only"><?php echo $bo_subject ?></span><i class="fa fa-plus" aria-hidden="true"></i><span class="sound_only"> 더보기</span></a>

</div>
