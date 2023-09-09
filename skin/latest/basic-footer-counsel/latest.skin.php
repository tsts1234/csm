<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

global $g5, $config, $member, $is_member;

// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
add_stylesheet('<link rel="stylesheet" href="'.$latest_skin_url.'/style.css">', 0);

$row = sql_fetch("select count(*) as cnt from {$g5['member_table']} ");
$total_count = $row['cnt'];

//간편상담 높이
$options['footer_h'] = (isset($options['footer_h']) && $options['footer_h']) ? $options['footer_h'] : '155';

//배경이미지 & 색상
$options['bgcolor'] = (isset($options['bgcolor']) && $options['bgcolor']) ? $options['bgcolor'] : '#161d2e';
$options['background'] = (isset($options['background']) && $options['background']) ? $options['background'] : '';
//$options['background'] = (isset($options['background']) && $options['background']) ? $options['background'] : $latest_skin_url.'/img/foo_bo_bg.png';

// 타이틀
$is_title = (isset($options['title_chk']) && $options['title_chk']) ? true : false;
$title = (isset($options['title']) && $options['title']) ? $options['title'] : $config['cf_title'].'에 고객님들이 관심을 보여주셨습니다.';
$title_fs = (isset($options['title_fs']) && $options['title_fs']) ? $options['title_fs'] : '30';
$title_fc = (isset($options['title_fc']) && $options['title_fc']) ? $options['title_fc'] : 'black';

//버튼명 & 색상
$options['btn'] = (isset($options['btn']) && $options['btn']) ? $options['btn'] : '간편상담';
$options['btnc'] = (isset($options['btnc']) && $options['btnc']) ? $options['btnc'] : 'black';

//회원,비회원구분
$is_login = (isset($options['is_login']) && $options['is_login']) ? true : false;

//분류
$board  = array();
$board = get_board_db($bo_table, true);
if($board['bo_use_category']){
	$categories = explode("|", $board['bo_category_list']);
	//분류값이 없을경우 첫번째 분류값을 적용
	$ca_name = ($options['category'])?$options['category']:$categories[0];
}

//배경
$options['background'] = ($options['background'])?$options['background']:$latest_skin_url.'/img/foo_bo_bg2.png';

?>

	<div style="height:<?php echo $options['footer_h'];?>px;"></div>
	<style>
	.quotation{
		height:<?php echo $options['footer_h'];?>px;
		<?php if($options['bgcolor']){ ?>background-color:<?php echo $options['bgcolor'];?>;<?php } ?>
		<?php if($options['background']){ ?>background:url('<?php echo $options['background'];?>') center 0;<?php } ?>
	}
	.footer_counsel div, .footer_counsel span, .footer_counsel p, .footer_counsel img, .footer_counsel ul, .footer_counsel li, .footer_counsel form, .footer_counsel label{
		margin:0;
		padding:0;
		border:0;
		font-size:100%;
		vertical-align:baseline;
		background:transparent;
		font-family:'Nanum Gothic'
	}
	.footer_counsel ul, .footer_counsel li{
		list-style:none;
	}
	</style>

	<div id="footer_counsel" class="footer_counsel quotation font-ng">
		<div class="foo_coun">
			<form id="footer_counsel_form" method="post">
				<?php if($is_title){ ?>
				<p class="footer_str_count font-<?php echo $title_fs;?> <?php echo $title_fc;?> fw-100"><?php echo $title;?></p>
				<?php }else{ ?>
				<p class="footer_str_count">
					<span class="footer_month"><?php echo date('m');?></span>월
					<span class="footer_count"><?php echo number_format($total_count) ?></span>명의 고객들이
					<span class="footer_month"><?php echo $config['cf_title'] ?></span>에 관심을 보여주셨습니다.
				</p>
				<?php } ?>
				<div class="f_a1">
					<input type="checkbox" name="counsel_agree" value="yes" class="f_a2" checked="">&nbsp; 개인정보 취급방침 동의
				</div>
				<div class="foo_sonbox">
					<ul>
						<li class="f_a">
							<label for="bsubject" style="float: left;">
								<img src="<?php echo $latest_skin_url;?>/img/la_1.png">
							</label>
							<input type="text" name="counsel_name" class="is1" placeholder="이름">
						</li>
						<li class="f_b">
							<label for="bsubject" style="float: left;">
								<img src="<?php echo $latest_skin_url;?>/img/la_2.png">
							</label>
							<select name="counsel_region" class="is2">
								<option value="">지역</option>
								<option value="서울">서울</option>
								<option value="경기">경기</option>
								<option value="인천">인천</option>
								<option value="강원">강원</option>
								<option value="대전">대전</option>
								<option value="대구">대구</option>
								<option value="세종">세종</option>
								<option value="충남">충남</option>
								<option value="충북">충북</option>
								<option value="대구">대구</option>
								<option value="경북">경북</option>
								<option value="부산">부산</option>
								<option value="경남">경남</option>
								<option value="광주">광주</option>
								<option value="전남">전남</option>
								<option value="전북">전북</option>
								<option value="울산">울산</option>
								<option value="제주도">제주도</option>
								<option value="해외">해외</option>
							</select>
						</li>
					</ul>
					<ul class="pt_1">
						<li class="f_c">
							<label for="bsubject" style="float: left;">
								<img src="<?php echo $latest_skin_url;?>/img/la_3.png">
							</label>
							<input type="tel" id="counsel_tel1" name="counsel_tel1" maxlength="3" class="is3" placeholder="연락처">
						</li>
						<li class="f_d"><input type="tel" id="counsel_tel2" name="counsel_tel2" maxlength="4" class="is3" placeholder=""></li>
						<li class="f_d"><input type="tel" id="counsel_tel3" name="counsel_tel3" maxlength="4" class="is3" placeholder=""></li>
					</ul>
					<div class="f_bu">
						<button type="button" id="footer_cousel_btn" class="f_bus bg-<?php echo $options['btnc'];?>" onclick="return fn_sendCounsel();"><?php echo $options['btn'];?></button>
					</div>
				</div>
			</form>
		</div>
		<script type="text/javascript">

			$(function () {
				//시작옵션

				$('input[name="counsel_tel1"]').keyup(function (e) {
					var thisLen = $(this).val().length;
					if (thisLen >= 3) {
						$('input[name="counsel_tel2"]').focus();
					}
				});

				$('input[name="counsel_tel2"]').keyup(function (e) {
					var thisLen = $(this).val().length;
					if (thisLen >= 4) {
						$('input[name="counsel_tel3"]').focus();
					}
				});

				//시작옵션
			});

			function fn_checkElement(selector, defvalue) {
				var retValue = false;
				$(selector).on('mouseleave',
					function () {
						$(selector).css('background-color', '#ffffff');
					});
				if ($.trim($(selector).val()) == defvalue) {
					if ($('#header_view_box').is(':visible')) {
						$('#header_view_box').slideUp('slow');
					}
					$(selector).css('background-color', '#ffcc66').focus();
					retValue = false;
				}
				else {
					$(selector).css('background-color', '#ffffff');
					retValue = true;
				}
				//alert(retValue);
				return retValue;
			}

			function fn_sendCounsel() {

				<?php if($is_login){ ?>
				if(g5_is_member != "1") {
					alert('회원 로그인 후 이용해 주십시오.');
					return false;
				}
				<?php } ?>

				if (fn_checkElement($('input[name="counsel_name"]'), '') == false) {
					return false;
				}
				if (fn_checkElement($('select[name="counsel_region"]'), '') == false) {
					return false;
				}
				if (fn_checkElement($('input[name="counsel_tel1"]'), '') == false) {
					return false;
				}
				if (fn_checkElement($('input[name="counsel_tel2"]'), '') == false) {
					return false;
				}
				if (fn_checkElement($('input[name="counsel_tel3"]'), '') == false) {
					return false;
				}
				if ($('input[name="counsel_agree"]').is(':checked') == false) {
					alert('상담신청을 하려면 [개인정보수집방침]에 동의해 주시기 바랍니다.');
					$('input[name="counsel_agree"]').focus();
					return false;
				}

				if (confirm('입력하신 정보가 정확하시면 [확인] 버튼을 클릭하세요\n\n이름:  ' + $('input[name="counsel_name"]').val() + '\n지역:  ' + $('select[name="counsel_region"]').val() + '\n연락처: ' + $('input[name="counsel_tel1"]').val() + '-' + $('input[name="counsel_tel2"]').val() + '-' + $('input[name="counsel_tel3"]').val())) {


					$.ajax({
						url: "<?php echo $latest_skin_url;?>/ajax.request_save.php",
						data: {

							"is_login" : "<?php echo $is_login; ?>",
							"bo_table" : "<?php echo $bo_table; ?>",
							"ca_name" : "<?php echo $ca_name; ?>",
							"name" : $('input[name="counsel_name"]').val(),
							"region" : $('select[name="counsel_region"]').val(),
							"tel1" : $('input[name="counsel_tel1"]').val(),
							"tel2" : $('input[name="counsel_tel2"]').val(),
							"tel3" : $('input[name="counsel_tel3"]').val()

						},
						type: "POST",
						dataType: "json",
						success: function(data){

							if(data.error) {
								alert(data.error);
								return false;
							}else{
								alert('정상적으로 접수완료했습니다.');

								$('input[name="counsel_agree"]').attr('checked',false);

								$('input[name="counsel_name"]').val('');
								$('select[name="counsel_region"]').val('');
								$('input[name="counsel_tel1"]').val('');
								$('input[name="counsel_tel2"]').val('');
								$('input[name="counsel_tel3"]').val('');

							}
						}
					});

				}
			}

			$(document).on('scroll', function (e) {
				var yPos = $(window).scrollTop();
				//console.log('yPos=' + yPos + ', height=' + $('#footer_counsel').css('height'));
				if (yPos == 0) {
					if ($('#footer_counsel').css('height') == "<?php echo $options['footer_h'];?>px") {
						$('#footer_counsel').animate({ height: "<?php echo $options['footer_h'];?>px" }, 0).stop().animate({ height: "0px" }, 500);
					}
				}
				else {
					if ($('#footer_counsel').css('height') == "0px") {
						$('#footer_counsel').animate({ height: "0px" }, 0).stop().animate({ height: "<?php echo $options['footer_h'];?>px" }, 500);
					}
				}
			});
		</script>
	</div>
