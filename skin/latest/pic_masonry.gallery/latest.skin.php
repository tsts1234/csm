<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가
include_once(G5_LIB_PATH.'/thumbnail.lib.php');

// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
add_stylesheet('<link rel="stylesheet" href="'.$latest_skin_url.'/style.css">', 0);
$thumb_width = 210;
$thumb_height = 150;
$list_count = (is_array($list) && $list) ? count($list) : 0;
?>
<style>
.grid {
 
}

/* clear fix */
.grid:after {
  content: '';
  display: block;
  clear: both;
}

/* ---- .grid-item ---- */

.grid-sizer,
.grid-item {
  width: 33.333%;
}

.grid-item {
  float: left;
}

.grid-item img {
  display: block;
  max-width: 100%;
}

.grid-item--gigante {
  width: 50%;
  height: auto;
}

.grid-item:hover {
  background: #A2C;
  border-color: white;
  cursor: pointer;
}
</style>

<div id="basic" class="grid">
    <?php
		for ($i=0; $i<$list_count; $i++) {
		$thumb = get_list_thumbnail($bo_table, $list[$i]['wr_id'], $thumb_width, $thumb_height, false, true);

		if($thumb['ori']) {
			$img = $thumb['ori'];
		} else {
			$img = G5_IMG_URL.'/no_img.png';
			$thumb['alt'] = '이미지가 없습니다.';
		}
		$img_content = '<img style="width: 100%" src="'.$img.'" alt="'.$thumb['alt'].'" >';
		?>
        
		<div class="grid-item">
			<?=$img_content?>
		</div>
    <?php }?>
</div>

<script src="<?=$latest_skin_url?>/masonry-docs/masonry-master/masonry.pkgd.min.js"></script>

<script>
var $grid = $('.grid').masonry({
	  itemSelector: '.grid-item'
	});
	// change size of item by toggling gigante class
	$grid.on( 'click', '.grid-item', function() {
	  $(this).toggleClass('grid-item--gigante');
	  // trigger layout after item size changes
	  $grid.masonry('layout');
	});
</script>
