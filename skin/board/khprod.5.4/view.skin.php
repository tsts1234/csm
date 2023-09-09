<?php
if (!defined("_GNUBOARD_")) exit; // 개별 페이지 접근 불가
include_once(G5_LIB_PATH.'/thumbnail.lib.php');

// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
add_stylesheet('<link rel="stylesheet" href="'.$board_skin_url.'/style.css">', 0);

$sql_search = "";
// 검색이면
if ($sca || $stx) {
    // where 문을 얻음
    $sql_search = get_sql_search($sca, $sfl, $stx, $sop);
    $search_href = '../bbs/board.php?bo_table='.$bo_table.'&amp;page='.$page.$qstr;
    $list_href = '../bbs/board.php?bo_table='.$bo_table;
} else {
    $search_href = '';
    $list_href = '../bbs/board.php?bo_table='.$bo_table.'&amp;page='.$page;
}

if (!$board['bo_use_list_view']) {
    if ($sql_search)
       $sql_search = " and " . $sql_search;

// 윗글을 얻음
    $sql = " select wr_id, wr_subject from $write_table where wr_is_comment = 0 and wr_num = '$write[wr_num]' and wr_reply < '$write[wr_reply]' $sql_search order by wr_num desc, wr_reply desc limit 1 ";
    $prev = sql_fetch($sql);
    // 위의 쿼리문으로 값을 얻지 못했다면
    if (!$prev['wr_id']) {
        $sql = " select wr_id, wr_subject from $write_table where wr_is_comment = 0 and wr_num < '$write[wr_num]' $sql_search order by wr_num desc, wr_reply desc limit 1 ";
        $prev = sql_fetch($sql);
    }

    // 아래글을 얻음
    $sql = " select wr_id, wr_subject from $write_table where wr_is_comment = 0 and wr_num = '$write[wr_num]' and wr_reply > '$write[wr_reply]' $sql_search order by wr_num, wr_reply limit 1 ";
    $next = sql_fetch($sql);
    // 위의 쿼리문으로 값을 얻지 못했다면
    if (!$next['wr_id']) {
        $sql = " select wr_id, wr_subject from $write_table where wr_is_comment = 0 and wr_num > '$write[wr_num]' $sql_search order by wr_num, wr_reply limit 1 ";
        $next = sql_fetch($sql);
    }
}

// 이전글 링크
$prev_href = '';
if ($prev['wr_id']) {
    $prev_wr_subject = get_text(cut_str($prev['wr_subject'], 255));
    $prev_href = '../bbs/board.php?bo_table='.$bo_table.'&amp;wr_id='.$prev['wr_id'].'&amp;page='.$page.$qstr;
}

// 다음글 링크
$next_href = '';
if ($next['wr_id']) {
    $next_wr_subject = get_text(cut_str($next['wr_subject'], 255));
    $next_href = '../bbs/board.php?bo_table='.$bo_table.'&amp;wr_id='.$next['wr_id'].'&amp;page='.$page.$qstr;
}
?>

<?php include_once(G5_THEME_PATH.'/sub/sub_top_bg.php'); ?>

<div class="container sub_wrap">
	<div class="row">
		<div class="col-lg-12 mb-12">

			<?php if ($admin_href) { ?>
			<div class="ctt_admin">
				<a href="<?php echo $admin_href ?>" class="btn_admin btn"><?php echo _("관리자") ?></a>
			</div>
			<?php } ?>

			<?php if ($is_category) { ?>
			<div class="cate">
				<div class="khwrap">
					<ul>
						<?php echo $category_option ?>
					</ul>
				</div>
			</div>
			<?php } ?>

			<div class="viewskin">
				<div class="khwrap">
					<div class="image">
						<?php if ($view['wr_1']): ?>
							<i class="best"><img src="<?php echo $board_skin_url ?>/ico_best.png" alt="Best Seller"></i>
						<?php endif ?>
						<?php if ($view['wr_2']) { ?>
							<i class="best"><img src="<?php echo $board_skin_url ?>/ico_one.png" alt="Best One"></i>
						<?php } ?>
						<div class="imgbig">
							<?php
								if ($view['file'][0]['file']) {
									$image = urlencode($view['file'][0]['file']);
									if (preg_match("/\.(gif|jpg|png)$/i", $image) && file_exists(G5_PATH.'/data/file/'.$bo_table.'/'.$image)) {
										echo '<img src="'.G5_URL.'/data/file/'.$bo_table.'/'.$image.'" alt="'.$view['file'][$i]['bf_content'].'">';
									} else {
										echo '<img src="'.$board_skin_url.'/img/noimg.gif" alt="">';
									}
								}
							?>
						</div>
						<div class="colorimg">
							<?php echo $view['wr_7']; ?> <?php echo $view['wr_8']; ?>
						</div>
					</div>
					<div class="standard">
						<div class="tit">
							<h3>
								<span class="khskip"><?php if ($category_name) echo ($category_name ? ''.$view['ca_name'] : ''); // 분류 출력 끝 ?></span>
								<?php  echo cut_str(get_text($view['wr_subject']), 70); // 글제목 출력 ?>	
							</h3>
						</div>
						<div class="info">
							<?php if($view['wr_3']): ?>
							<pre><?php echo $view['wr_3']; ?></pre>
							<?php endif ?>
						</div>
						<div class="imgthb">
							<ul>
							<?php
							for ($i=0; $i<=count($view['file']); $i++) {
								echo $size[0];
								//if ($i == 0) echo '<ul>';
								if ($view['file'][0]['file']) {
									$image = urlencode($view['file'][$i]['file']);
									if (preg_match("/\.(gif|jpg|png)$/i", $image) && file_exists(G5_PATH.'/data/file/'.$bo_table.'/'.$image)) {
										echo '<li><a class="inner"><i class=""></i>';
										echo '<div class="img"><img src="'.G5_URL.'/data/file/'.$bo_table.'/'.$image.'" alt="'.$view['file'][$i]['bf_content'].'" class="'.$size[0].' '.$size[1].'"></div>';
										echo '</a><span>'.$view['file'][$i]['bf_content'].'</span></li>';
									}
								}
							}
							//if ($i > 0) echo '</ul>';
							?>
							</ul>
						</div>
						<div class="inq">
							<a href="/bbs/board.php?bo_table=estimate"><span><?php echo _("온라인 문의") ?></span></a>
						</div>
					</div>
					<?php if($view['file']): ?>
					<div class="dow khpscroll">
						<ul>
							<?php for ($i=9; $i<=9; $i++) { if (isset($view['file'][$i]['source']) && $view['file'][$i]['source'] && !$view['file'][$i]['view']) {?>
							<li><a href="<?php echo $view['file'][$i]['href']; ?>" title="<?php echo $view['file'][$i]['source'] ?> <?php echo $view['file'][$i]['size'] ?>"><i class="xi-download"></i> <?php echo $view['file'][$i]['source'] ?></a></li>
							<?php }} ?>
							<?php if(isset($view['link'][1]) && $view['link'][1]) { ?>
							<?php
							$cnt = 0;
							for ($i=1; $i<=count($view['link']); $i++) {
								if ($view['link'][$i]) {
									$cnt++;
									$link = cut_str($view['link'][$i], 70);
							?>
							<li><a href="<?php echo $view['link_href'][$i] ?>" title="<?php echo $link ?>" target="_blank"><i class="xi-external-link"></i> <?php echo $link ?></a></li>
							<?php
								}
							}
							?>
							<?php } ?>
						</ul>
					</div>
					<?php endif ?>
				</div>
				<div class="button">
					<div class="khwrap">
						<!--<i class="xi-caret-up-square-o"></i>--> <a><?php echo _("제품설명") ?></a>
					</div>
				</div>
				<div class=""> <!--- detail --->
					<div class="khwrap">
						<?php echo $view['wr_content'] ?>
					</div>
				</div>
			</div>

			<script>
			$(function (){
				$( "div.button" ).click(function() {
					$("div.detail").toggleClass( "sel" );
					$(this).toggleClass( "sel" );
				});
			});
			</script>

			<?php ob_start(); ?>
			<div class="control">
				<div class="khwrap">
					<div class="button fl">
						<?php if ($update_href) { ?><a href="<?php echo $update_href ?>" class="bt bt_b02"><?php echo _("수정") ?></a><?php } ?>
						<?php if ($delete_href) { ?><a href="<?php echo $delete_href ?>" class="bt bt_adm" onclick="del(this.href); return false;"><?php echo _("삭제") ?></a><?php } ?>
						<?php if ($copy_href) { ?><a href="<?php echo $copy_href ?>" class="bt bt_adm" onclick="board_move(this.href); return false;"><?php echo _("복사") ?></a><?php } ?>
						<?php if ($move_href) { ?><a href="<?php echo $move_href ?>" class="bt bt_adm" onclick="board_move(this.href); return false;"><?php echo _("이동") ?></a><?php } ?>
						<?php if ($search_href) { ?><a href="<?php echo $search_href ?>" class="bt bt_adm">검색</a><?php } ?>
					</div>
					<div class="button fr">
						<a href="<?php echo $list_href ?>" class="bt bt_list"><?php echo _("목록으로") ?></a>
						<?php if ($write_href) { ?><a href="<?php echo $write_href ?>" class="bt bt_b02"><?php echo _("등록하기") ?></a><?php } ?>
					</div>
				</div>
			</div>

			<?php if ($prev_href || $next_href) { ?>
			<div class="beafter khwrap khpscroll">
				<div class="khbnext">
					<?php if ($next_href) { ?> <a href="<?php echo $next_href ?>"><p><?php echo $next_wr_subject;?></p> 이전글</a> <?php } ?>
				</div>        
				<a href="<?php echo $list_href ?>" class="khblist"><span class="sound_only">목록보기</span> <i class="xi-apps"></i></a>
				<div class="khbprev">
					<?php if ($prev_href) { ?> <a href="<?php echo $prev_href ?>"><p><?php echo $prev_wr_subject;?></p> 다음글</a> <?php } ?>
				</div>
			</div>
			<?php } ?>

		</div>
	</div>
</div>

<?php
$link_buttons = ob_get_contents();
ob_end_flush();
?>

<script type="text/javascript">
	//<![CDATA[
	function file_download(link, file) {
		<? if ($board[bo_download_point] < 0) { ?>if (confirm("'"+file+"' 파일을 다운로드 하시면 포인트가 차감(<?php echo number_format($board[bo_download_point])?>점)됩니다.\n\n포인트는 게시물당 한번만 차감되며 다음에 다시 다운로드 하셔도 중복하여 차감하지 않습니다.\n\n그래도 다운로드 하시겠습니까?"))<?}?>
		document.location.href=link;
	}
	$(function() {
		// 이미지 새창보기
		$(".innesr").click(function() {
			window.open(this.href, "large_image", "location=yes,links=no,toolbar=no,top=10,left=10,width=600,height=600,resizable=yes,scrollbars=no,status=no");
			return false;
		});
		// 이미지 미리보기
		$(".imgthb .img").bind("click focus", function(){		
			var img_src = $(this).children('img').attr('src');
			var img_alt = $(this).children('img').attr('alt');
			$('.imgbig img').attr('src', img_src);
			$('.imgbig img').attr('alt', img_alt);
		});
	});
	//]]>
</script>
