<?php
if (!defined("_GNUBOARD_")) exit; // 개별 페이지 접근 불가
include_once(G5_LIB_PATH.'/thumbnail.lib.php');

// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
//add_stylesheet('<link rel="stylesheet" href="'.$board_skin_url.'/style.css">', 0);
add_stylesheet('<link rel="stylesheet" href="'.$board_skin_url.'/autoptimize_bbs.css">', 0);
?>

<?php
// 날짜 계산 함수
function passing_time($datetime) {
	$time_lag = time() - strtotime($datetime);
	
	if($time_lag < 60) {
		$posting_time = "방금";
	} elseif($time_lag >= 60 and $time_lag < 3600) {
		$posting_time = floor($time_lag/60)."분 전";
	} elseif($time_lag >= 3600 and $time_lag < 86400) {
		$posting_time = floor($time_lag/3600)."시간 전";
	} elseif($time_lag >= 86400 and $time_lag < 2419200) {
		$posting_time = floor($time_lag/86400)."일 전";
	} else {
		$posting_time = date("y-m-d", strtotime($datetime));
	} 
	
	return $posting_time;
}
?>

<style>
#bo_v_img img {margin-bottom:20px;max-width:100%;height:auto}
#bo_v_img {text-align:center;}
.kt-inside-inner-col p {line-height:25px; padding:0; margin:0;}
</style>



<script src="<?php echo G5_JS_URL; ?>/viewimageresize.js"></script>

<div id="ajax-a">
	<div class="ajax-b">

		<div class="main-content">

		<!-- 게시판제목(타이틀)을 사용하는 경우 주석 해제
			<div class="page-header">
				<div class="container">
					<h2 class="mb-4 eng"><?php echo get_head_title($g5['title']); ?></h2>
				</div>
			</div>

		-->

<div class="section">
	<div class="container">
		<h3 class="mt-5 mb-2"><?php echo get_text($view['wr_subject']); ?></h3>
		
		<div class="meta mb-4">
		<span><i class="fa fa-clock-o" aria-hidden="true"></i> <?php echo passing_time($view['wr_datetime']) ?></span>
		<span>by <?php echo $view['name'] ?></span>
		<?php if ($category_name) { ?><span><?php echo $view['ca_name']; // 분류 출력 끝 ?></span><?php } ?>
		<!--span><i class="icon ion-md-chatboxes"></i> <?php echo number_format($view['wr_comment']) ?></span-->             
	</div>

    <div class="clearfix">
                        
		<div class="wp-block-kadence-rowlayout alignnone">
			<div id="kt-layout-id_f1fa31-ca" class="kt-row-layout-inner  kt-layout-id_f1fa31-ca">
				<div class="kt-row-column-wrap kt-has-2-columns kt-gutter-default kt-row-valign-top kt-row-layout-left-golden kt-tab-layout-inherit kt-m-colapse-left-to-right kt-mobile-layout-row">


					<div class="wp-block-kadence-column inner-column-1">
						<div class="kt-inside-inner-col txt">
				
							<?php
								// 파일 출력
								$v_img_count = count($view['file']);
								if($v_img_count) {
									echo "<div id=\"bo_v_img\">\n";

									for ($i=0; $i<=count($view['file']); $i++) {
										if ($view['file'][$i]['view']) {
											//echo $view['file'][$i]['view'];
											echo get_view_thumbnail($view['file'][$i]['view']);
										}
									}

									echo "</div>\n";
								}
							?>

							<?php echo get_view_thumbnail($view['content']); ?>
							<br><br>
							<?php if ($is_signature) { ?><p><?php echo $signature ?></p><?php } ?>
						
						</div>
					</div>

				</div>
			</div>
		</div>

	</div>

	
	<?php
    $cnt = 0;
    if ($view['file']['count']) {
        for ($i=0; $i<count($view['file']); $i++) {
            if (isset($view['file'][$i]['source']) && $view['file'][$i]['source'] && !$view['file'][$i]['view'])
                $cnt++;
        }
    }
     ?>
	 <?php if($cnt) { ?>
	<div style="background-color:#f3f3f3; padding:15px; color:#333; font-size:11px;">
	 <?php
        // 가변 파일
        for ($i=0; $i<count($view['file']); $i++) {
            if (isset($view['file'][$i]['source']) && $view['file'][$i]['source'] && !$view['file'][$i]['view']) {
         ?>
				
                <i class="fa fa-download" aria-hidden="true"></i>
                <a href="<?php echo $view['file'][$i]['href'];  ?>" class="view_file_download" download><strong><?php echo $view['file'][$i]['source'] ?></strong></a><?php echo $view['file'][$i]['content'] ?> (<?php echo $view['file'][$i]['size'] ?>)　

        <?php
            }
        }
         ?>
		 </div>
	<?php } ?>

	

<?php if(isset($view['link'][1]) && $view['link'][1]) { ?>
	<div class="mt-4" style="background-color:#f3f3f3; padding:15px; color:#333; font-size:11px;">
	<?php
        // 링크
        $cnt = 0;
        for ($i=1; $i<=count($view['link']); $i++) {
            if ($view['link'][$i]) {
                $cnt++;
                $link = cut_str($view['link'][$i], 35);
            ?>

                <i class="fa fa-link" aria-hidden="true"></i> <a href="<?php echo $view['link_href'][$i] ?>" target="_blank"><?php echo $link ?></a><br>

            <?php
            }
        }
        ?>
		

	</div>
	<?php } ?>



	<?php
        ob_start();
        ?>

	<br>
	<br>
	<p class="template-form">
	<input type="button" value="목록" class="wpcf7-form-control wpcf7-submit txt" style="margin-right:0px;" onClick="location.href='<?php echo $list_href ?>'">
	<?php if ($update_href) { ?><input type="button" value="수정" class="wpcf7-form-control wpcf7-submit txt" style="margin-right:0px;" onClick="location.href='<?php echo $update_href ?>'"><?php } ?>
	<?php if ($write_href) { ?><input type="button" value="글쓰기" style="background-color:#FF6666; margin-right:0px;" class="wpcf7-form-control wpcf7-submit txt" onClick="location.href='<?php echo $write_href ?>'"><?php } ?>
	</p>
	


			

	<?php
        $link_buttons = ob_get_contents();
        ob_end_flush();
         ?>

</div>
</div>





     


    <!--div id="bo_v_share">
        <?php if ($scrap_href) { ?><a href="<?php echo $scrap_href;  ?>" target="_blank" class="btn btn_b03" onclick="win_scrap(this.href); return false;"><i class="fa fa-thumb-tack" aria-hidden="true"></i> 스크랩</a><?php } ?>

        <?php
        include_once(G5_SNS_PATH."/view.sns.skin.php");
        ?>
    </div-->

    

    <?php
    // 코멘트 입출력
    include_once(G5_BBS_PATH.'/view_comment.php');
     ?>


</div>
</div>
</div>

<script>
<?php if ($board['bo_download_point'] < 0) { ?>
$(function() {
    $("a.view_file_download").click(function() {
        if(!g5_is_member) {
            alert("다운로드 권한이 없습니다.\n회원이시라면 로그인 후 이용해 보십시오.");
            return false;
        }

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

    //sns공유
    $(".btn_share").click(function(){
        $("#bo_v_sns").fadeIn();
   
    });

    $(document).mouseup(function (e) {
        var container = $("#bo_v_sns");
        if (!container.is(e.target) && container.has(e.target).length === 0){
        container.css("display","none");
        }	
    });
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

<script type="text/javascript" defer src="<?php echo $board_skin_url ?>/autoptimize_bbs.js"></script>