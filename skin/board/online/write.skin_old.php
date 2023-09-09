<?php
include_once(G5_THEME_PATH.'/sub_top_05.php');
?>

<div class="container sub_wrap">

	<div class="sub-page">
		
		<div class="boxy-warp">
			<!-- e: top-nav-box -->
			<?php
			if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

			// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
			$wr_1 = "$hp1-$hp2-$hp3";
			?>
			<script type="text/javascript">
			function checkFrm(obj) {
			 if(obj.wr_6.checked == false) {
				alert('개인정보 활동동의에 체크해주세요.');
				obj.wr_6.focus();
				return false;
			 }
			}
			</script>
			<style type="text/css">
				<!--
				.btn_confirm input,a {width:100px; text-align:center; padding:10px 0%;}
				.ed { border: 2px solid #cccccc; background-color: #ededec;}
				.btn_confirm input, a {width:auto;}
				.style1 {
					color: #FF0000;
					font-size: 14px;
					font-weight: bold;
				}
				.style2 {color: #000000}
				.style3 {color: #666666}
				-->
				
			</style>


			<section id="bo_w">
					<!-- <h2 id="container_title"><?php echo $board['bo_subject'] ?></h2> -->
					
					<span class="style1">&nbsp;
					<!-- 게시물 작성/수정 시작 { -->
					</span>
					<form name=fwrite method=post action="<?=G5_BBS_URL?>/write_update.php" onsubmit="return checkFrm(this);">
					<input type=hidden name=w        value="">
					<input type=hidden name=bo_table value="online">
					<input type=hidden name=wr_id    value="">
					<input type=hidden name=sca      value="">
					<input type=hidden name=sfl      value="">
					<input type=hidden name=stx      value="">
					<input type=hidden name=spt      value="">
					<input type=hidden name=sst      value="">
					<input type=hidden name=sod      value="">
					<input type=hidden name=s    value="s">
					<input type=hidden name=wr_subject  value="빠른 상담 신청">
					<input type=hidden name=wr_content  value="빠른 상담 신청">
							<input type=hidden name="wr_1"  value="">
					
					<?php
					$option = '';
					$option_hidden = '';
					if ($is_notice || $is_html || $is_secret || $is_mail) {
							$option = '';
							if ($is_notice) {
									$option .= "\n".'<input type="checkbox" id="notice" name="notice" value="1" '.$notice_checked.'>'."\n".'<label for="notice">공지</label>';
							}

							if ($is_html) {
									if ($is_dhtml_editor) {
											$option_hidden .= '<input type="hidden" value="html1" name="html">';
									} else {
											$option .= "\n".'<input type="checkbox" id="html" name="html" onclick="html_auto_br(this);" value="'.$html_value.'" '.$html_checked.'>'."\n".'<label for="html">html</label>';
									}
							}

							if ($is_secret) {
									if ($is_admin || $is_secret==1) {
											$option .= "\n".'<input type="checkbox" id="secret" name="secret" value="secret" '.$secret_checked.'>'."\n".'<label for="secret">비밀글</label>';
									} else {
											$option_hidden .= '<input type="hidden" name="secret" value="secret">';
									}
							}

							if ($is_mail) {
									$option .= "\n".'<input type="checkbox" id="mail" name="mail" value="mail" '.$recv_email_checked.'>'."\n".'<label for="mail">답변메일받기</label>';
							}
					}

					echo $option_hidden;
					?>

					<div class="tbl_frm01 tbl_wrap">
							<table>
							<tbody>
							
							<?php if ($is_admin) { ?>
								<?php } ?>
						 
							
							<?php for ($i=1; $is_link && $i<=G5_LINK_COUNT; $i++) { ?>
							<?php } ?>
							
							<!--
							<?php if ($option) { ?>
							<tr>
									<th scope="row">옵션</th>
									<td><?php echo $option ?></td>
							</tr>
							<?php } ?>
							-->

							<?php if ($is_category) { ?>
							<?php } ?>
							
							<tr>
								<th scope="row">
									<div align="center">
										<label for="wr_name">이름<strong class="sound_only">필수</strong></label>
									</div>
								</th>
								<td class="wr_name">
									<input type="text" name="wr_subject" value="<?php echo $name ?>" id="wr_name2" required class="frm_input required" size="15" maxlength="15">
								</td>
							</tr>
							<tr>
								<th scope="row">
									<div align="center">
										<label for="wr_name">휴대폰<strong class="sound_only">필수</strong></label>
									</div>
								</th>
								<td class="wr_name">
									<select name="wr_7" itemname="휴대폰" required style="width:20%; padding:0.5% 0%;">
										<option value="010">010</option>
										<option value="011">011</option>
										<option value="016">016</option>
										<option value="017">017</option>
										<option value="018">018</option>
										<option value="019">019</option>
									</select>
									<input name="wr_8" type="text" required class='ed' style="width:20%; padding:0.5% 0%; border:1px solid #ddd;" maxlength="4" itemname="휴대폰"/>
									<input name="wr_9" type="text" required class='ed' style="width:20%; padding:0.5% 0%; border:1px solid #ddd;" maxlength="4" itemname="휴대폰"/>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<div align="center">
										<label for="wr_name">메모<strong class="sound_only">필수</strong></label>
									</div>
								</th>
								<td class="wr_content">
									<?php if($write_min || $write_max) { ?>
									<!-- 최소/최대 글자 수 사용 시 -->
									<p id="char_count_desc">이 게시판은 최소 <strong><?php echo $write_min; ?></strong>글자 이상, 최대 <strong><?php echo $write_max; ?></strong>글자 이하까지 글을 쓰실 수 있습니다.</p>
									<?php } ?>
									<?php echo $editor_html; // 에디터 사용시는 에디터로, 아니면 textarea 로 노출 ?>
									<?php if($write_min || $write_max) { ?>
									<!-- 최소/최대 글자 수 사용 시 -->
									<div id="char_count_wrap"><span id="char_count"></span>글자</div>
									<?php } ?>
								</td>
							</tr>
							<tr align="center">
								<td height="57" colspan="2">
									<br><span class="style2"> *소중한 고객님의 정보는 상담 및 가입을 위해서만 사용됩니다.</span><br><br>
									<input name="wr_6" type="checkbox" value="<?=$write[wr_6]?>" required >
									<span class="style2">개인정보 활용동의</span>
									<a href="../privacy.html" target="_blank"><img src="../img/privacy.gif" width="50" height="16" border="0"></a>
								</td>
							</tr>
							</tbody>
						</table>
					</div>

					<div class="btn_confirm">
							<input type="submit" value="작성완료" id="btn_submit" accesskey="s" class="btn_submit">
							
							<a href="javascript:history.back();" class="btn_cancel">취소</a>
					</div>
					</form>

				 
			</section>
			<!-- } 게시물 작성/수정 끝 -->
		</div>
	</div>

</div>