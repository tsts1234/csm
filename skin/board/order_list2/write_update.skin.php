<?php

if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가
include_once('./_common.php');
include_once(G5_LIB_PATH.'/mailer.lib.php');
$aaa = $config['cf_admin_email']; //관리자 환경설정 기본환경설정에 등록된 이메일 가져오기
 

mailer('보낸사람이름', $aaa, $aaa, 'KCC진석 견적문의', '<span style="font-size:9pt;">KCC진석 견적 게시판에 게시글이 등록되었습니다.<br><a href="http://jinseok.co.kr/bbs/board.php?bo_table=estimate">사이트로 이동</a></span>', 1);

alert("견적접수완료되었습니다 빠른시간내에 연락드리겠습니다^^");
?>