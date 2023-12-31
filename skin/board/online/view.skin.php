
<!-- s: sub-navigation 
<div class="sub-navigation">
	<div class="boxy-warp">
		<?php
		include_once(G5_THEME_PATH.'/lsnb_include/l_snb4.php');
		?>
	</div>
</div>-->

<?php
include_once(G5_THEME_PATH.'/sub_top_05.php');
?>

<style>
	.footer_wrap {padding:2% !important;}
</style>

<div class="container sub_wrap">
<!-- e: sub-navigation -->
	<div class="boxy-warp sub-contents sub-page">
		<div class="r-sub-con">
			<!-- s: top-nav-box -->
			<div class="top-nav-box">
				<!-- s: page-title
				<h2>
					<span title="빠른상담">빠른상담</span>
				</h2>
				<div class="r-con">
					<i class="fas fa-home"></i>
					<i class="fas fa-chevron-right"></i>
					<span class="depth-1">고객센터</span>
					<i class="fas fa-chevron-right"></i>
					<span class="depth-2">빠른상담</span>
				</div>
				 e: page-title -->
			</div>
			<!-- e: top-nav-box -->
			<?php
			if (!defined("_GNUBOARD_")) exit; // 개별 페이지 접근 불가
			include_once(G5_LIB_PATH.'/thumbnail.lib.php');

			if (!$is_admin) {

				$site_msg = "감사합니다^^ 정상 접수되었습니다.  최대한 빠른시간 안에 연락드리겠습니다~";
				
				alert($site_msg, G5_URL);
				
				exit;
			}

			?>

			<!--  CPCGUARD SCRIPT V6.0 -->
			<script type="text/javascript">
				(function(){
				var _script = document.createElement("script"); _script.id= "include_cpc_script"; _script.type = "text/javascript"; _script.charset = "utf-8"; _script.async = true; _script.src = (document.location.protocol || "http:") + "//nsc1.cpcguard.com/new/cpc_script.js";
				 var _node = document.getElementsByTagName("script")[0]; _node.parentNode.insertBefore(_script, _node);
				})();
			</script>
			<!-- CPCGUARD SCRIPT END -->


			<!-- cpcguard v6.0 --> 
			<script type="text/javascript">var _CONVERSION_CPCGUARD = 1</script> 
			<!-- cpcguard conversion END --> 
			<link rel="stylesheet" href="<?php echo $board_skin_url ?>/style.css">

			<script src="<?php echo G5_JS_URL; ?>/viewimageresize.js"></script>


			<!-- 게시물 읽기 시작 { -->
			<!--<h2 id="container_title"><?php echo $board['bo_subject'] ?><span class="sound_only"> 목록</span></h2>-->
			<!--<div id="bo_v_table"><?php echo $board['bo_subject']; ?></div>-->

			<article id="bo_v" style="width:<?php echo $width; ?>">
					<header>
							<h1 id="bo_v_title" style="margin-top:5%;">
									<?php
									if ($category_name) echo $view['ca_name'].' | '; // 분류 출력 끝
									echo cut_str(get_text($view['wr_subject']), 70); // 글제목 출력
									?> 님의 견적문의
							</h1>
					</header>

					<div class="tbl_frm01 tbl_wrap">
						<table>
							<tbody>
								<tr>
									 <th scope="row">이름<strong class="sound_only">필수</strong></th>
									 <td class="wr_content"><?php echo $view['wr_subject'] ?></td>
								</tr>
								<tr>
									<th scope="row"><label for="wr_content" style="margin:0;">연락처<strong class="sound_only">필수</strong></label></th>
									<td class="wr_content">
										<?php echo $view['wr_9'] ?>
										<!-- } 본문 내용 끝 -->
									</td>
								</tr>
								<tr>
									<th scope="row">이사예정지<strong class="sound_only">필수</strong></th>
									<td class="wr_content"><?php echo $view['wr_10'] ?></td>
								</tr>
								<tr>
									<th scope="row">출발 / 도착지<strong class="sound_only">필수</strong></th>
									<td class="wr_content"><?php echo $view['wr_7'] ?> → <?php echo $view['wr_8'] ?></td>
								</tr>
								<tr>
									<th>문의내용</th>
									<td><?php echo get_view_thumbnail($view['content']); ?></td>
								</tr>
							
							
							<?php for ($i=1; $i<=G5_LINK_COUNT; $i++) { ?>
							
							<?php
								// 링크
								$cnt = 0;
								for ($i=1; $i<=count($view['link']); $i++) {
										if ($view['link'][$i]) {
												$cnt++;
												$link = cut_str($view['link'][$i], 70);
								 ?>
								 <tr>
										<th scope="row">참조사이트 <?php echo $i ?></th>
										<td>
											<a href="<?php echo $view['link_href'][$i] ?>" target="_blank">
													<img src="<?php echo $board_skin_url ?>/img/icon_link.gif" alt="참조사이트">
													<strong><?php echo $link ?></strong>
											</a>
											<span class="bo_v_link_cnt"><?php echo $view['link_hit'][$i] ?>회 연결</span>
							<?php
									}
							}
							 ?></td>
							</tr>
							<?php } ?>
							
							</tbody>
						</table>
					</div>


					<!-- 게시물 상단 버튼 시작 { -->
					<div id="bo_v_top">
							<?php
							ob_start();
							 ?>
							<?php if ($prev_href || $next_href) { ?>
							<!-- <ul class="bo_v_nb">
									<?php if ($prev_href) { ?><li><a href="<?php echo $prev_href ?>" class="btn_b01">이전글</a></li><?php } ?>
									<?php if ($next_href) { ?><li><a href="<?php echo $next_href ?>" class="btn_b01">다음글</a></li><?php } ?>
							</ul> -->
							<?php } ?>

							<ul class="bo_v_com">
									<?php if ($update_href) { ?><li><a href="<?php echo $update_href ?>" class="btn_b01">수정</a></li><?php } ?>
									<?php if ($delete_href) { ?><li><a href="<?php echo $delete_href ?>" class="btn_b01" onclick="del(this.href); return false;">삭제</a></li><?php } ?>
									<!-- <?php if ($copy_href) { ?><li><a href="<?php echo $copy_href ?>" class="btn_admin" onclick="board_move(this.href); return false;">복사</a></li><?php } ?>
									<?php if ($move_href) { ?><li><a href="<?php echo $move_href ?>" class="btn_admin" onclick="board_move(this.href); return false;">이동</a></li><?php } ?> -->
									<?php if ($search_href) { ?><li><a href="<?php echo $search_href ?>" class="btn_b01">검색</a></li><?php } ?>
									<li><a href="<?php echo $list_href ?>" class="btn_b01">목록</a></li>
									<!--<?php if ($reply_href) { ?><li><a href="<?php echo $reply_href ?>" class="btn_b01">답변</a></li><?php } ?>-->
									<!--<?php if ($write_href) { ?><li><a href="<?php echo $write_href ?>" class="btn_b02">글쓰기</a></li><?php } ?>-->
							</ul>
							<?php
							$link_buttons = ob_get_contents();
							ob_end_flush();
							 ?>
					</div>
					<!-- } 게시물 상단 버튼 끝 -->

			</article>
			<!-- } 게시판 읽기 끝 -->

			<script>
			<?php if ($board['bo_download_point'] < 0) { ?>
			$(function() {
					$("a.view_file_download").click(function() {
							var msg = "파일을 다운로드 하시면 포인트가 차감(<?php echo number_format($board['bo_download_point']) ?>점)됩니다.\n\n포인트는 게시물당 한번만 차감되며 다음에 다시 다운로드 하셔도 중복하여 차감하지 않습니다.\n\n그래도 다운로드 하시겠습니까?";

							if(confirm(msg)) {
									var href = $(this).attr("href")+"&js=on";
									$(this).attr("href", href);

									return true;
							} else {
									return false;
							}
					});
			});
			<?php } ?>

			function board_move(href)
			{
					window.open(href, "boardmove", "left=50, top=50, width=500, height=550, scrollbars=1");
			}
			</script>

			<script>
			$(function() {
					$("a.view_image").click(function() {
							window.open(this.href, "large_image", "location=yes,links=no,toolbar=no,top=10,left=10,width=10,height=10,resizable=yes,scrollbars=no,status=no");
							return false;
					});

					// 추천, 비추천
					$("#good_button, #nogood_button").click(function() {
							var $tx;
							if(this.id == "good_button")
									$tx = $("#bo_v_act_good");
							else
									$tx = $("#bo_v_act_nogood");

							excute_good(this.href, $(this), $tx);
							return false;
					});

					// 이미지 리사이즈
					$("#bo_v_atc").viewimageresize();
			});

			function excute_good(href, $el, $tx)
			{
					$.post(
							href,
							{ js: "on" },
							function(data) {
									if(data.error) {
											alert(data.error);
											return false;
									}

									if(data.count) {
											$el.find("strong").text(number_format(String(data.count)));
											if($tx.attr("id").search("nogood") > -1) {
													$tx.text("이 글을 비추천하셨습니다.");
													$tx.fadeIn(200).delay(2500).fadeOut(200);
											} else {
													$tx.text("이 글을 추천하셨습니다.");
													$tx.fadeIn(200).delay(2500).fadeOut(200);
											}
									}
							}, "json"
					);
			}
			</script>
			<!-- } 게시글 읽기 끝 -->
		</div>
	</div>
</div>