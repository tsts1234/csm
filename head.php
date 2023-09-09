<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

if (G5_IS_MOBILE) {
    include_once(G5_THEME_MOBILE_PATH.'/head.php');
    return;
}

include_once(G5_THEME_PATH.'/head.sub.php');
include_once(G5_LIB_PATH.'/latest.lib.php');
include_once(G5_LIB_PATH.'/outlogin.lib.php');
include_once(G5_LIB_PATH.'/poll.lib.php');
include_once(G5_LIB_PATH.'/visit.lib.php');
include_once(G5_LIB_PATH.'/connect.lib.php');
include_once(G5_LIB_PATH.'/popular.lib.php');

if($bo_table) {
	$E_bo = sql_fetch("SELECT * FROM g5_board where bo_table ='$bo_table'");
}
// 오늘 새글
function bo_count($bo){
	$cnt = 0;
	foreach (func_get_args() as $bo) { 
		$table = "g5_write_".$bo;
		$sql = "select count(*) cnt from $table where wr_datetime >= CURRENT_DATE() and wr_is_comment=0";
		$row = sql_fetch($sql);
		$cnt += $row['cnt'];
	}
	return $cnt;;
}
?>

<?php // 회원가입 불가
	$base_filename = basename($_SERVER['PHP_SELF']);
	if($base_filename == 'register.php')
	  alert("현재 회원가입이 불가능합니다.", G5_URL);
?>

<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<div class=""></div>

<!-------------------------- 네비게이션 -------------------------->
<div class="container-fluid top-line fixed-header">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div id="tnb-left">
					<!-- social 
					<div class="sns_icon">
						<a href="https://www.facebook.com/leejongo" target="_blank"><i class="fab fa-facebook-f"></i></a>
					</div>
					<div class="sns_icon">
						<a href="#"><i class="fab fa-twitter"></i></a>
					</div>
					<div class="sns_icon">
						<a href="https://www.instagram.com/site_developer" target="_blank"><i class="fab fa-instagram"></i></a>
					</div>
					-->
				</div>
				<div id="tnb">
					<ul>
						<li><a href="<?php echo G5_URL?>/adm" class="login_a">관리자</a></li>
					<?php if($is_member) { ?>
						<li><a href="<?php echo G5_URL?>/bbs/logout.php" class="login_a">로그아웃</a></li>
						<!--<li><a href="<?php echo G5_BBS_URL ?>/member_confirm.php?url=<?php echo G5_BBS_URL ?>/register_form.php" class="login_a">정보수정</a></li>-->
					<?php }else{ ?>
						<!--<li><a href="<?php echo G5_URL?>/bbs/register.php"><i class="fa fa-user-plus" aria-hidden="true" class="login_a"></i> 회원가입</a></li>-->
						<li><a href="<?php echo G5_URL?>/bbs/login.php"><i class="fas fa-sign-in-alt" class="login_a"></i> 로그인</a></li>
					<?php }?>
						<!--<li><a href="<?php echo G5_URL?>/bbs/faq.php"><i class="fa fa-question" aria-hidden="true"></i> <span>FAQ</span></a></li>
						<li><a href="<?php echo G5_URL?>/bbs/qalist.php"><i class="fa fa-comments" aria-hidden="true"></i> <span>1:1문의</span></a></li>-->
						<!--<li><a href="<?php echo G5_URL?>/bbs/current_connect.php" class="visit"><i class="fa fa-users" aria-hidden="true"></i> <span>접속자</span><strong class="visit-num">
						1</strong></a></li>-->
						<!--li><a href="<?php echo G5_URL?>/bbs/new.php"><i class="fa fa-history" aria-hidden="true"></i> <span>새글</span></a></li>-->
						<?php if($is_admin) { ?>
						<li><a href="<?php echo G5_URL?>">홈</a></li>
						<?php } ?>
					</ul>
				</div>
			</div><!-- /col -->
		</div><!-- /row -->
	</div><!-- /container -->
</div>

<nav id="top_w_l" class="menu_button navbar fixed-top navbar-expand-lg navbar-white ">
	<div class="container">

		<!-- 로고 --->
		<a class="navbar-brand" href="<?php echo G5_URL?>" class="logo"><img src="<?php echo G5_URL?>/theme/ety_theme_company_v1.2/img/jin/logo.jpg"></a>
		<!-- //로고 --->

		<!-------------------------- SNS -------------------------->
		<div class="top_box_wrap">

			<!---
			<div class="top_box top_box_color_1">
				<a href="tel:055-364-1175"><img src="<?php echo G5_THEME_URL?>/img/sns/sns_03.jpg"></a>
			</div>

			<div class="top_box top_box_color_4">
				<a href="sms:010-3526-2497"><img src="<?php echo G5_THEME_URL?>/img/sns/sns_04.jpg"></a>
			</div>
			-->

			<div class="top_box top_box_color_5">
				<a href="/bbs/board.php?bo_table=estimate"><img src="<?php echo G5_THEME_URL?>/img/sns/sns_05.jpg"> 견적문의</a>
			</div>

			<div class="top_box top_box_color_1">
				<a href="tel:1533-4304" target="_blank"><img src="<?php echo G5_THEME_URL?>/img/sns/sns_03.jpg"> 전화상담</a>
			</div>
			<!--
			<div class="top_box top_box_color_4">
				<a href="sms:010-3526-2497"><img src="<?php echo G5_THEME_URL?>/img/sns/sns_04.jpg"> 전화상담</a>
			</div>
			-->

		</div>


		<div class="">
			<a href="tel:1533-4304" class="mobile_tel"><img src="<?php echo G5_URL?>/theme/ety_theme_company_v1.2/img/tel.png"></a>
			<button class="navbar-toggler navbar-dark navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
		</div>

		<div class="collapse navbar-collapse" id="navbarResponsive" data-hover="dropdown" data-animations="fadeIn fadeIn fadeInUp fadeInRight">
		  <ul class="navbar-nav margin-0">
			<?php
			$sql = " select *
						from {$g5['menu_table']}
						where me_use = '1'
						  and length(me_code) = '2'
						order by me_order, me_id ";
			$result = sql_query($sql, false);
			$gnb_zindex = 999; // gnb_1dli z-index 값 설정용
			$menu_datas = array();
			for ($i=0; $row=sql_fetch_array($result); $i++) {
				$menu_datas[$i] = $row;

				$sql2 = " select *
							from {$g5['menu_table']}
							where me_use = '1'
							  and length(me_code) = '4'
							  and substring(me_code, 1, 2) = '{$row['me_code']}'
							order by me_order, me_id ";
				$result2 = sql_query($sql2);
				for ($k=0; $row2=sql_fetch_array($result2); $k++) {
					$menu_datas[$i]['sub'][$k] = $row2;
				}
			}
			$i = 0;
			foreach( $menu_datas as $row ){
				if( empty($row) ) continue; 
			?>			
				<?php if($row['sub']['0']) { ?>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle en2 bold" href="<?php echo $row['me_link']; ?>" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" target="_<?php echo $row['me_target']; ?>">
						<?php echo $row['me_name'] ?>
						</a>
							<!-- 서브 -->
							<ul class="dropdown-menu" aria-labelledby="navbarDropdownPortfolio">
								<?php
								// 하위 분류
								$k = 0;
								foreach( (array) $row['sub'] as $row2 ){

								if( empty($row2) ) continue; 

								?>
								<a class="dropdown-item ko1 fw4" href="<?php echo $row2['me_link']; ?>" target="_<?php echo $row2['me_target']; ?>"><?php echo $row2['me_name'] ?></a>

								<?php
								$k++;
								}   //end foreach $row2

								if($k > 0)
								echo '</ul>'.PHP_EOL;
								?>
				<?php }else{?>
					<li class="nav-item">
						<a class="nav-link en2 bold" href="<?php echo $row['me_link']; ?>" target="_<?php echo $row['me_target']; ?>"><?php echo $row['me_name'] ?></a>
					</li>
				<?php }?>
			</li>

			<?php
			$i++;
			}   //end foreach $row

			if ($i == 0) {  ?>
				<li class="gnb_empty">메뉴 준비 중입니다.<?php if ($is_admin) { ?> <br><a href="<?php echo G5_ADMIN_URL; ?>/menu_list.php">관리자모드 &gt; 환경설정 &gt; 메뉴설정</a>에서 설정하실 수 있습니다.<?php } ?></li>
			<?php } ?>

			<li class="nav-item dropdown login" >
			  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				LOGIN
			  </a>
			  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
				
				<?php if($is_admin) { ?><a class="dropdown-item" style="color:#000 !important;" href="<?php echo G5_URL?>/adm">관리자</a><?php } ?>
					<!--<a class="dropdown-item" href="<?php echo G5_URL?>/bbs/new.php">새글</a>
					<a class="dropdown-item" href="<?php echo G5_URL?>/bbs/qalist.php">1:1문의</a>-->
				<?php if($is_member) { ?>
					<!--<a class="dropdown-item" style="color:#000 !important;" href="<?php echo G5_BBS_URL ?>/member_confirm.php?url=<?php echo G5_BBS_URL ?>/register_form.php">정보수정</a>-->
					<a class="dropdown-item" style="color:#000 !important;" href="<?php echo G5_URL?>/bbs/logout.php">로그아웃</a>
				<?php }else{ ?>
					<a class="dropdown-item" style="color:#000 !important;" href="<?php echo G5_URL?>/bbs/login.php">로그인</a>
					<!--<a class="dropdown-item" style="color:#000 !important;" href="<?php echo G5_URL?>/bbs/register.php">회원가입</a>-->
				<?php } ?>
			  </div>
			</li>
		  </ul>
		</div>

		<a class="navbar-right">&nbsp;</a>

	</div>
</nav>

<!-------------------------- /네비게이션 -------------------------->
<?php if($bo_table) { ?>
  <div class="ety-mt"></div>

  <!------ 서브 페이지 시작 ------>
  <!--<div class="container sub_wrap">
	
      <h1 class="mt-4 mb-3">
        <small><?php echo $E_bo['bo_subject']?></small>
      </h1>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="<?php echo G5_URL?>">Home</a>
        </li>
        <li class="breadcrumb-item active"><?php echo $E_bo['bo_subject']?></li>
      </ol>

      <div class="row">
		
        <div class="col-lg-3 mb-4">
          <div class="list-group">
            <a href="<?php echo G5_URL?>" class="list-group-item">Home</a>
			<a href="<?php echo G5_URL?>/bbs/board.php?bo_table=notice" class="list-group-item<?php if($bo_table == "notice") echo " active";?>">공지사항</a>
			<a href="<?php echo G5_URL?>/bbs/board.php?bo_table=free" class="list-group-item<?php if($bo_table == "free") echo " active";?>">게시판 스킨 1</a>
			<a href="<?php echo G5_URL?>/bbs/board.php?bo_table=free_responsive" class="list-group-item<?php if($bo_table == "free_responsive") echo " active";?>">게시판 스킨 2</a>
			<a href="<?php echo G5_URL?>/bbs/board.php?bo_table=free_scroll" class="list-group-item<?php if($bo_table == "free_scroll") echo " active";?>">게시판 스킨 3</a>
			<a href="<?php echo G5_URL?>/bbs/board.php?bo_table=gallery" class="list-group-item <?php if($bo_table == "gallery") echo " active";?>">포트폴리오</a>
            <a href="<?php echo G5_URL?>/bbs/qalist.php" class="list-group-item">Custom</a>
			<a href="<?php echo G5_URL?>/bbs/faq.php" class="list-group-item">FAQ</a>
          </div>
        </div>
		
        <div class="col-lg-12 mb-12">
		-->
<?php }?>