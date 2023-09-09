<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
add_stylesheet('<link rel="stylesheet" href="'.$board_skin_url.'/style.css">', 0);

?>

<?php include_once(G5_THEME_PATH.'/sub/sub_top_bg.php'); ?>

<div class="container sub_wrap">
	<div class="row">
		<div class="col-lg-12 mb-12">

			<div class="writeskin">
				<form name="fwrite" id="fwrite" action="<?php echo $action_url ?>" onsubmit="return fwrite_submit(this);" method="post" enctype="multipart/form-data" autocomplete="off" style="width:<?php echo $width; ?>">
					<input type="hidden" name="uid" value="<?php echo get_uniqid(); ?>">
					<input type="hidden" name="w" value="<?php echo $w ?>">
					<input type="hidden" name="bo_table" value="<?php echo $bo_table ?>">
					<input type="hidden" name="wr_id" value="<?php echo $wr_id ?>">
					<input type="hidden" name="sca" value="<?php echo $sca ?>">
					<input type="hidden" name="sfl" value="<?php echo $sfl ?>">
					<input type="hidden" name="stx" value="<?php echo $stx ?>">
					<input type="hidden" name="spt" value="<?php echo $spt ?>">
					<input type="hidden" name="sst" value="<?php echo $sst ?>">
					<input type="hidden" name="sod" value="<?php echo $sod ?>">
					<input type="hidden" name="page" value="<?php echo $page ?>">
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
								$option .= "\n".'<input type="checkbox" id="html" name="html" onclick="html_auto_br(this);" value="'.$html_value.'" '.$html_checked.'>'."\n".'<label for="html">HTML</label>';
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
					
					<div class="khwrap">
						<div class="image">
							<div class="tit">
								<strong>상세페이지에 노출되는 이미지</strong>
								<p>이미지를 등록해주십시오.</p>
							</div>
							<div class="inner">
								<?php
								for ($i=0; $is_file && $i<$file_count; $i++) {
								$file_path = $file[$i]['path']."/".$file[$i][file];//이미지의 경로 
								?>
								<div class="item">
									<div class="box">
										<label for="bf_file_<?php echo $i+1 ?>"><div class="kh_icon_01"></div> 이미지첨부</label>
										<input type="file" name="bf_file[]" id="bf_file_<?php echo $i+1 ?>" accept='image/*' title="파일첨부 <?php echo $i+1 ?> : 용량 <?php echo $upload_max_filesize ?> 이하만 업로드 가능">
										<?php if ($is_file_content) { ?>
										<input type="text" name="bf_content[]" value="<?php echo ($w == 'u') ? $file[$i]['bf_content'] : ''; ?>" title="파일 설명을 입력해주세요." class="t_txt" size="50" placeholder="파일 설명을 입력해주세요.">
										<?php } ?>
									</div>
									<?php if($w == 'u' && $file[$i]['file']) { ?>
									<div class="del">
										<input type="checkbox" class="del" id="bf_file_del<?php echo $i ?>" name="bf_file_del[<?php echo $i;  ?>]" value="1">
										<label id="del" for="bf_file_del<?php echo $i ?>"><?php echo $file[$i]['source'].'('.$file[$i]['size'].')';  ?><i class="xi-close-square-o"></i></label>
									</div>
									<?php } ?>
								</div>
								<?php } ?>

								<?php /*?>
								<?php for ($i=1; $is_link && $i<=G5_LINK_COUNT; $i++) { ?>
								<div class="item">
									<div class="box">
										<label for="wr_link<?php echo $i ?>"><i class="xi-link"></i> 링크  #<?php echo $i ?></label>
										<input type="text" name="wr_link<?php echo $i ?>" value="<?php if($w=="u"){echo$write['wr_link'.$i];} ?>" id="wr_link<?php echo $i ?>" class="t_txt">
									</div>
								</div>
								<?php } ?>
								<?php */?>
							</div>
						</div>
						<div class="standard">
							<div class="explain">
								<div class="tit">
									<strong>정보입력</strong>
								</div>
								<div class="inner">
									<div class="info">
										<!--
										<div>
											<input type="checkbox" name="wr_1" id="wr_1" value="1" <?php echo ($write[wr_1]==1)?'checked="checked"':''; ?>> <label for="wr_1">베스트셀러</label>
											<input type="checkbox" name="wr_2" id="wr_2" value="2" <?php echo ($write[wr_2]==2)?'checked="checked"':''; ?>> <label for="wr_2">베스트원</label>
										</div>
										-->
										<?php if ($is_name) { ?>
										<dl>
											<dt><label for="wr_name">이름</label></dt>
											<dd><input type="text" name="wr_name" value="<?=$name?>" id="wr_name" required="required" class="frm_input required" maxlength="20" size="15"></dd>
										</dl>
										<?php } ?>
										<?php if ($is_password) { ?>
										<dl>
											<dt><label for="wr_password">비밀번호</label></dt>
											<dd><input type="password" name="wr_password" id="wr_password" <?=$password_required?> class="frm_input <?=$password_required?>" maxlength="20" size="15"></dd>
										</dl>
										<?php } ?>
										<?php if ($is_email) { ?>
										<dl>
											<dt><label for="wr_email">이메일</label></dt>
											<dd><input type="text" name="wr_email" value="<?=$email?>" id="wr_email" class="frm_input email" maxlength="100" size="50"></dd>
										</dl>
										<?php } ?>
										<?php if ($is_homepage) { ?>
										<dl>
											<dt><label for="wr_homepage">홈페이지</label></dt>
											<dd><input type="text" name="wr_homepage" value="<?=$homepage?>" id="wr_homepage" class="frm_input" size="50"></dd>
										</dl>
										<?php } ?>
										<?php if ($option) { ?>
										<dl class="khskip">
											<dt>옵션</dt>
											<dd><?=$option?></dd>
										</dl>
										<?php } ?>
										<dl>
											<dt><label for="wr_subject">제품명</label></dt>
											<dd><input name="wr_subject" id="wr_subject" value="<?=$subject?>" required="required" placeholder="제품명을 입력해주세요" class="frm_input full_input required"></dd>
										</dl> 
										<?php if ($is_category) { ?>  
										<dl>
											<dt><label for="ca_name">카테고리</label></dt>
											<dd>
												<select name="ca_name" id="ca_name" required="required" class="frm_input full_input required">
													<option value="">카테고리를 선택하세요</option>
													<?php echo $category_option ?>
												</select>
											</dd>
										</dl>
										<?php } ?>
										<dl>
											<dt><label for="wr_3">내용</label></dt>
											<dd>
												<textarea name="wr_3" id="wr_3" value="<?=$wr_3?>" placeholder="서브내용을 입력하세요." class="w100p" rows="19"><?php echo $write['wr_3'] ?></textarea>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="detail" style=" width:100%; border:1px solid #ccc; padding:10px; ">
						<div class="khwrap">
							<?php echo $editor_html; // 에디터 사용시는 에디터로, 아니면 textarea 로 노출 ?>
							<!--<textarea name="wr_content" id="wr_content" required="required" placeholder="내용을 입력하세요." class="frm_input full_input required h400"><?php echo $write['wr_content'] ?></textarea>-->
						</div>
					</div>

					<div class="control">
						<div class="khwrap">
							<div class="button fl">
								<?php if ($is_use_captcha) { //자동등록방지  ?>
								<?php echo $captcha_html ?>
								<?php } ?>
								<a href="<?php echo get_pretty_url($bo_table); ?>" class="bt bt_b01">취소</a>
							</div>
							<div class="button fr">
								<a href="<?php echo get_pretty_url($bo_table); ?>" class="bt bt_b01">목록보기</a>
								<button type="submit" name="btn_submit" accesskey="s" class="bt bt_b02">작성완료</button>
							</div>
						</div>
					</div>
				</form>
			</div>

		</div>
	</div>
</div>

<script type="text/javascript">
	//<![CDATA[
	// 이미지 등비율 리사이징
	$(window).load(function() {
		view_image_resize();
	});
	var now = new Date();
	var timeout = false;
	var millisec = 200;
	var tid;
	$(window).resize(function() {
		now = new Date();
		if (timeout === false) {
			timeout = true;
			if(tid != null)
				clearTimeout(tid);
			tid = setTimeout(resize_check, millisec);
		}
	});
	function resize_check() {
		if (new Date() - now < millisec) {
			if(tid != null)
				clearTimeout(tid);
	
			tid = setTimeout(resize_check, millisec);
		} else {
			timeout = false;
			view_image_resize();
		}
	}
	$(function() {
		$(".view_image").click(function() {
			window.open(this.href, "large_image", "location=yes,links=no,toolbar=no,top=10,left=10,width=10,height=10,resizable=yes,scrollbars=no,status=no");
			return false;
		});
	});

	function view_image_resize()
	{
		var $img = $(".rankiss_oimg img");
		var img_wrap = $(".rankiss_oimg").width();
		var win_width = $(window).width() - 35;
		var res_width = 0;
		if(img_wrap < win_width)
			res_width = img_wrap;
		else
			res_width = win_width;
		$img.each(function() {
			var img_width = $(this).width();
			var img_height = $(this).height();
			var this_width = $(this).data("width");
			var this_height = $(this).data("height");
			if(this_width == undefined) {
				$(this).data("width", img_width); // 원래 이미지 사이즈
				$(this).data("height", img_height);
				this_width = img_width;
				this_height = img_height;
			}
			if(this_width > res_width) {
				$(this).width(res_width);
				var res_height = Math.round(res_width * $(this).data("height") / $(this).data("width"));
				$(this).height(res_height);
			} else {
				$(this).width(this_width);
				$(this).height(this_height);
			}
		});
	}

	<?php
	// 관리자라면 분류 선택에 '공지' 옵션을 추가함
	if ($is_admin)
	{
		echo '
		if (ca_name_select = document.getElementById("ca_name")) {
			ca_name_select.options.length += 1;
			ca_name_select.options[ca_name_select.options.length-1].value = "공지";
			ca_name_select.options[ca_name_select.options.length-1].text = "공지";
		}';
	}
	?>

	function html_auto_br(obj)
	{
		if (obj.checked) {
			result = confirm("자동 줄바꿈을 하시겠습니까?\n\n자동 줄바꿈은 게시물 내용중 줄바뀐 곳을<br>태그로 변환하는 기능입니다.");
			if (result)
				obj.value = "html2";
			else
				obj.value = "html1";
		}
		else
			obj.value = "";
	}

	function fwrite_submit(f)
	{
		<?php echo $editor_js; // 에디터 사용시 자바스크립트에서 내용을 폼필드로 넣어주며 내용이 입력되었는지 검사함  ?>

		var subject = "";
		var content = "";
		$.ajax({
			url: g4_bbs_url+"/filter.ajax.php",
			type: "POST",
			data: {
				"subject": f.wr_subject.value,
				"content": f.wr_content.value
			},
			dataType: "json",
			async: false,
			cache: false,
			success: function(data, textStatus) {
				subject = data.subject;
				content = data.content;
			}
		});

		if (subject) {
			alert("제목에 금지단어('"+subject+"')가 포함되어있습니다");
			f.wr_subject.focus();
			return false;
		}

		if (content) {
			alert("내용에 금지단어('"+content+"')가 포함되어있습니다");
			if (typeof(ed_wr_content) != "undefined")
				ed_wr_content.returnFalse();
			else
				f.wr_content.focus();
			return false;
		}

		<?php echo $captcha_js; // 캡챠 사용시 자바스크립트에서 입력된 캡챠를 검사함 ?>

		return true;
	}
	//]]>
</script>
