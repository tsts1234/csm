<?php
if (!defined("_GNUBOARD_")) exit; // 개별 페이지 접근 불가
$wr_7 = implode('&nbsp;', $_POST['check1']);
$wr_8 = implode('&nbsp;', $_POST['check2']);
sql_query(" update $write_table set wr_7 = '$wr_7', wr_8 = '$wr_8' where wr_id = '$wr_id' ");
?>