<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

include_once(G5_LIB_PATH.'/icode.sms.lib.php'); 
// 문의글 등록시 관리자에게 전송 
      
  $send_hp_mb = "010-0000-0000"; // 보내는 전화번호 
  $recv_hp_mb = "010-0000-0000"; //  받는 전화번호 

  $send_hp = str_replace("-","",$send_hp_mb); // - 제거 
  $recv_hp = str_replace("-","",$recv_hp_mb); // - 제거 

      $send_number =  "$send_hp"; 
  $recv_number = "$recv_hp"; 

      $sms_content = $wr_name." 님이 ".$wr_subject." 신청을 하셨습니다.";  // 문자 내용      

      $SMS = new SMS; // SMS 연결 
      $SMS->SMS_con($config['cf_icode_server_ip'], $config['cf_icode_id'], $config['cf_icode_pw'], $config['cf_icode_server_port']); 
      $SMS->Add($recv_number, $send_number, $config['cf_icode_id'], iconv("utf-8", "euc-kr", stripslashes($sms_content)), ""); 
      $SMS->Send(); 

          alert("성공적으로 접수되었습니다.", "./board.php?bo_table=$bo_table&wr_id=$wr_id"); 

 // 문자보내기 끝 
?>