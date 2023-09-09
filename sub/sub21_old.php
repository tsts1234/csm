<?php include_once(G5_THEME_PATH.'/sub/sub_top_bg.php'); ?>

<style>
	.on-click {background:#1f468b; }
	.on-click a {display:inline-block; color:#fff;}

	.list-group-item {padding:0px; margin:0px 8px;}
	.list-group-item a {display:inline-block; padding:10px 20px;}
	.list-group {flex-direction: row; justify-content: center;}

	.d-flex {flex-direction:column;}
	.d-none {display:flex !important; flex-direction: row; justify-content: center; margin-top:2%;}
	.nav-link {display:block; line-height:40px;}
	.sub_wrap
	.tabs-to-dropdown .dropdown-toggle,
	.tabs-to-dropdown .dropdown-item {
	  font-size: 1.3rem;
	}

	.sub_wrap .tabs-to-dropdown .nav-wrapper {
	  padding: 15px;
	  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
	}

	.sub_wrap .tabs-to-dropdown .nav-wrapper a {
	}

	.sub_wrap .tabs-to-dropdown .nav-pills .nav-link.active {
	  background-color:#1f468b;
	}

	.sub_wrap .tabs-to-dropdown .nav-pills li:not(:last-child) {
	  margin-right: 30px;
	}

	.sub_wrap .tabs-to-dropdown .tab-content .container-fluid {
	  max-width: 1250px;
	  padding-top: 70px;
	  padding-bottom: 70px;
	  text-align:center;
	}

	.sub_wrap .tabs-to-dropdown .dropdown-menu {
	  border: none;
	  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.08);
	}

	.sub_wrap .tabs-to-dropdown .dropdown-item {
	  padding: 14px 28px;
	}

	.sub_wrap .tabs-to-dropdown .dropdown-item:active {
	  color: var(--white);
	}

	@media (min-width: 1280px) {
		.sub_wrap .tabs-to-dropdown .nav-wrapper { padding: 2% 5%;}
	}

	@media screen and (max-width: 1200px) {
		.sub_wrap .tabs-to-dropdown .nav-wrapper a {font-size:11px; display:block; text-align:center;}
		.sub_wrap .tabs-to-dropdown .nav-pills li:not(:last-child) {margin-right:0px;}
		.list-group {float:left; display:block;}
		.list-group-item {float:left; margin:0px; width:50%;}
		.d-none {flex-direction: column; padding-top:5%;}
	}
</style>


<div class="sub_wrap">
		
	<div class="tabs-to-dropdown">

			<div class="nav-wrapper d-flex">
				<ul class="list-group list-group-horizontal">
					<li class="list-group-item on-click">
						<a href="/bbs/board.php?bo_table=21">
							KCC
						</a>
					</li>
					<li class="list-group-item">
						<a href="/bbs/board.php?bo_table=22">
							NOMAKER
						</a>
					</li>
				</ul>

				<ul class="nav nav-pills d-none d-md-flex" id="pills-tab" role="tablist">
					<li class="nav-item" role="presentation">
						<a class="nav-link active" id="a1-tab" data-toggle="pill" href="#a1" role="tab" aria-controls="a1" aria-selected="true">발코니 1</a>
					</li>
					<li class="nav-item" role="presentation">
						<a class="nav-link" id="a1-tab" data-toggle="pill" href="#a2" role="tab" aria-controls="a2" aria-selected="false">발코니 2</a>
					</li>
					<li class="nav-item" role="presentation">
						<a class="nav-link" id="a1-tab" data-toggle="pill" href="#a3" role="tab" aria-controls="a3" aria-selected="false">일반창고 1</a>
					</li>
					<li class="nav-item" role="presentation">
						<a class="nav-link" id="a1-tab" data-toggle="pill" href="#a4" role="tab" aria-controls="a4" aria-selected="false">일반창고 2</a>
					</li>
					<li class="nav-item" role="presentation">
						<a class="nav-link" id="a1-tab" data-toggle="pill" href="#a5" role="tab" aria-controls="a5" aria-selected="false">일반창고 3</a>
					</li>
				</ul>
			</div>

			<div class="tab-content" id="pills-tabContent">
				<div class="tab-pane fade show active" id="a1" role="tabpanel" aria-labelledby="a1-tab">
					<div class="container-fluid">
						<!--<img src="http://magichearingaid.kr/theme/ety_theme_company_v1.2/img/m/star1.jpg">-->
						발코니 1
					</div>
				</div>
				<div class="tab-pane fade" id="a2" role="tabpanel" aria-labelledby="a1-tab">
					<div class="container-fluid">
						발코니 2
					</div>
				</div>
				<div class="tab-pane fade" id="a3" role="tabpanel" aria-labelledby="a1-tab">
					<div class="container-fluid">
						일반창고 1
					</div>
				</div>
				<div class="tab-pane fade" id="a4" role="tabpanel" aria-labelledby="a1-tab">
					<div class="container-fluid">
						일반창고 2
					</div>
				</div>
				<div class="tab-pane fade" id="a5" role="tabpanel" aria-labelledby="a1-tab">
					<div class="container-fluid">
						일반창고 3
					</div>
				</div>
			</div>

	</div>

</div>


</div>