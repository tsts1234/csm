<?
$g5_path = ".."; // 그누보드가 있는 상대경로를 적어줌
?>
<script language="javascript">
	var char_min = parseInt(<?=$write_min?>); 
	var char_max = parseInt(<?=$write_max?>); 
</script>

<style type="text/css">
	.form-box {padding:5%; color:#000; display:table; width:100%; z-index:9999;}
	.form-box .new-l-con {float:left;width:100%; margin-right:2%;}
	.form-box .new-l-con .l-s-txt{text-align:right;float:left;font-size:15px;}
	.form-box .new-l-con h2 {float:left;margin-left:2%;font-size:30px;color:#000;font-weight:300;}
	.form-box .new-l-con .r-number {float:left; width:100%; margin-bottom:3%; font-size:20px; line-height:100%; font-weight:bold; color:#000;}
	.form-box .new-l-con .r-number2 {float:left; width:100%; font-size:18px; line-height:100%; color:#000;}
	.form-box .new-r-con {float:left;width:100%;}
	.form-box .new-r-con .new-t-con{display:table;width:100%;}
	.form-box .new-r-con .l-in {float:left; width:100%;}
	.form-box .new-r-con .l-in input{float:left; width:100%; margin:1.5% 0%; border:0; height:40px; line-height:40px; font-size:15px; font-weight:bold;background:#f7f7f7; color:#000; padding:0% 5%;}
	.form-box .new-r-con .l-in input:last-child{margin-right:0;}
	.form-box .new-r-con .l-in input::placeholder {color:#777; font-weight:normal;}
	.provision-check_wrpa {float:left; width:100%;}
	.provision-check_wrpa label {width:100%; }
	.provision-check_wrpa span {font-size:13px;}
	.provision-check-input {width:15px !important; height:15px !important; margin-right:2% !important;}
	.form-box .new-r-con .r-btn {float:left; width:100%; text-align:center;font-size:16px;background:#003896;color:#fff; font-weight:bold; border:0;line-height:40px;}
	.form-box .new-r-con .new-b-con{margin-top:5px;}
	.form-box .new-r-con .new-b-con a{padding:5px 10px;background:#777;color:#fff;font-size:11px;margin-top:2px;margin-left:20px;display:inline-block;}
	.form-box .new-r-con .l-in ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
	  color: #fff;
	}

	.form-box .new-r-con .l-in ::-moz-placeholder { /* Firefox 19+ */
	  color: #fff;
	}
	.form-box .new-r-con .l-in :-ms-input-placeholder { /* IE 10+ */
	  color: #fff;
	}
	.form-box .new-r-con .l-in :-moz-placeholder { /* Firefox 18- */
	  color: #fff;
	}

	.boxy-warp {width:100%;}
	.form-con {margin:0 auto; max-width:1300px;}

	@media (max-width: 1085px){
		.form-box .new-l-con{float:none;width:100%;display:table;}
		.form-box .new-r-con{float:none;width:100%;margin-top:2%;display:table;}
		.form-box .new-l-con{text-align:center;}
		.form-box .new-l-con .l-s-txt{display:inline-block;float:none;}
		.form-box .new-l-con h2{display:inline-block;float:none;}
		.form-box .new-l-con .r-number{display:inline-block;float:none;}
		.form-box .new-r-con .new-b-con{margin-top:10px;}
	}
	@media (max-width: 760px){
		.form-box {padding:8% 5%;}
		.form-box .new-l-con .l-s-txt{display:inline-block;float:none;font-size:13px;}
		.form-box .new-l-con h2{display:inline-block;float:none;font-size:20px;}
		.form-box .new-l-con .r-number{display:inline-block;float:none;font-size:20px; margin-bottom:5%;}
		.form-box .new-r-con .l-in input {width:100%; margin-right:3%; padding-left:1%;}
		.provision-check_wrpa {width:100%;}
		.provision-check_wrpa span {font-size:13px; line-height:120%;}
		.provision-check_wrpa label {margin-bottom:2%; }
		.form-box .new-r-con .l-in {width:100%;}
		.form-box .new-r-con .r-btn {width:100%; margin-top:3%; font-size:18px; margin-left:0px; line-height:50px;}
	}

</style>

<script type="text/javascript">
	function checkFrm(obj) {
		if(obj.wr_6.checked == false) {
		  alert('개인정보 활동동의에 체크해주세요.');
		  obj.wr_6.focus();
		  return false;
			
		 }
	}
</script>

<div class="form-box" >
  <form name=fwrite method=post action="<?=G5_BBS_URL?>/write_update.php" onsubmit="return checkFrm(this);">
		<input type="hidden" name="token" value=<?php echo get_write_token('order') ?>> 
		<input type=hidden name=bo_table value="order">
		<input type=hidden name="wr_1" value="">
		<input type=hidden name="wr_2" value="">
		<input type=hidden name="wr_3" value="">
		<input type=hidden name="wr_4" value="">
		<input type=hidden name="wr_name" value="관리자">
		<input type=hidden name="wr_subject" >
		<input type=hidden name="wr_content" value="내용">
		<div class="boxy-warp">
			<div class="form-con">
				<div class="new-l-con">
					<div class="r-number">간편상담신청</div>
				</div>
				<div class="new-r-con">
					<div class="new-t-con">
						<div class="l-in">
							<input type="text" name="wr_subject" placeholder="작성자" required itemname="작성자"/>
							<input type="text" name="wr_1" placeholder="연락처" required maxlength="14" itemname="연락처"/>
							<input type="text" name="wr_2" placeholder="현장명 (ㅇㅇ동 ㅇㅇ아파트)" required itemname="현장명"/>
							<input type="text" name="wr_3" placeholder="평수 및 층수" required itemname="평수 및 층수"/>
							<input type="text" name="wr_4" placeholder="간편내용" required itemname="간편내용"/>
							<div class="" style="display:none;">
								<input type="radio" <?php if($write['wr_10']=="견적접수") ;?> name="wr_10" value="견적접수" id="wr_10" checked="checked">&nbsp;&nbsp;<span class="견적접수">견적접수</span>
							</div>
							<!--<a href="#"  data-toggle="modal" data-target="#modal1">자세히보기</a>-->
						</div>
						<div class="provision-check_wrpa">
							<label for="provision-check">
								<input id="provision-check" class="provision-check-input" type="checkbox" name="wr_6" value="6" <?=$write[wr_6]?>/>
								<span>개인정보동의</span>
							</label>
						</div>
						<input name="image" type="submit" value="무료견적신청" alt="무료견적신청" class="r-btn">
					</div>
				</div>
			</div>
		</div>
  </form>
</div>
<!--//-->
