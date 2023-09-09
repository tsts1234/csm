<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

// 선택옵션으로 인해 셀합치기가 가변적으로 변함
$colspan = 5;

if ($is_checkbox) $colspan++;
if ($is_good) $colspan++;
if ($is_nogood) $colspan++;

// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
add_stylesheet('<link rel="stylesheet" href="'.$board_skin_url.'/style.css">', 0);

include_once(G5_THEME_PATH."/common/board.header.php");
?>
<!-- <h2 id='container_title'><?php echo $board['bo_subject'] ?><span class='sound_only'> 목록</span></h2> -->

<?php

if ($board[bo_table] == '11')
include_once(G5_THEME_PATH."/sub/sub11.php");

if ($board[bo_table] == '12' )
include_once(G5_THEME_PATH."/sub/sub12.php");

if ($board[bo_table] == '13' )
include_once(G5_THEME_PATH."/sub/sub13.php");

if ($board[bo_table] == '14' )
include_once(G5_THEME_PATH."/sub/sub14.php");

if ($board[bo_table] == '21' )
include_once(G5_THEME_PATH."/sub/sub21.php");


// if ($board[bo_table] == '41')
// include_once(G5_PATH.'/sub/sub41.php');
//echo "<img src='theme/template1/assets/images/41.jpg' style='width: 100%; max-width: 1000px;margin: 0 auto;' alt=''>";


?>






<?php include_once(G5_THEME_PATH."/common/board.footer.php");?>