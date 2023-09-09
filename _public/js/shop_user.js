
function pd_spice_change(step, frm_name, spice, div_name)
{
	frm = eval(frm_name);

	if (spice == "spice")
	{
		switch(step)
		{
			case 1:
				var s_pd_spice1 = frm.s_pd_spice1.options[frm.s_pd_spice1.selectedIndex].value;
				var s_pd_spice2 = "";
				var s_pd_spice3 = "";
				break;
			case 2:
				var s_pd_spice1 = frm.s_pd_spice1.options[frm.s_pd_spice1.selectedIndex].value;
				var s_pd_spice2 = frm.s_pd_spice2.options[frm.s_pd_spice2.selectedIndex].value;
				var s_pd_spice3 = "";
				break;
			case 3:
				var s_pd_spice1 = frm.s_pd_spice1.options[frm.s_pd_spice1.selectedIndex].value;
				var s_pd_spice2 = frm.s_pd_spice2.options[frm.s_pd_spice2.selectedIndex].value;
				var s_pd_spice3 = frm.s_pd_spice3.options[frm.s_pd_spice3.selectedIndex].value;
				break;
		}

		var add_param = "s_pd_spice1="+ s_pd_spice1 +"&s_pd_spice2="+ s_pd_spice2 +"&s_pd_spice3="+ s_pd_spice3 +"&spice="+ spice +"&step="+ step +"&div_name="+ div_name +"&frm="+ frm_name;
	}

	if (spice == "spice2")
	{
		switch(step)
		{
			case 1:
				var s_pd_spice1 = frm.s_pd_spice1_sub.options[frm.s_pd_spice1_sub.selectedIndex].value;
				var s_pd_spice2 = "";
				var s_pd_spice3 = "";
				break;

			case 2:
				var s_pd_spice1 = frm.s_pd_spice1_sub.options[frm.s_pd_spice1_sub.selectedIndex].value;
				var s_pd_spice2 = frm.s_pd_spice2_sub.options[frm.s_pd_spice2_sub.selectedIndex].value;
				var s_pd_spice3 = "";
				break;
			case 3:
				var s_pd_spice1 = frm.s_pd_spice1_sub.options[frm.s_pd_spice1_sub.selectedIndex].value;
				var s_pd_spice2 = frm.s_pd_spice2_sub.options[frm.s_pd_spice2_sub.selectedIndex].value;
				var s_pd_spice3 = frm.s_pd_spice3_sub.options[frm.s_pd_spice3_sub.selectedIndex].value;
				break;
		}

		var add_param = "s_pd_spice1="+ s_pd_spice1 +"&s_pd_spice2="+ s_pd_spice2 +"&s_pd_spice3="+ s_pd_spice3 +"&spice="+ spice +"&step="+ step +"&div_name="+ div_name;
	}
	else if (spice == "region")
	{
		switch(step)
		{
			case 1:
				var s_sido = frm.s_sido.options[frm.s_sido.selectedIndex].value;
				var s_gugun = "";
				//frm.s_region3.options.length = 1;
				break;

			case 2:
				var s_sido = frm.s_sido.options[frm.s_sido.selectedIndex].value;
				var s_gugun = frm.s_gugun.options[frm.s_gugun.selectedIndex].value;
				break;
		}

		var add_param = "s_sido="+ s_sido +"&s_gugun="+ s_gugun +"&spice="+ spice +"&step="+ step +"&div_name="+ div_name;
	}

	$.ajax({
		type: "POST",
		url: "/",
		data: "folder=store&page=proc&mode=get_region_lower&"+ add_param,
		success: function(data) {
			document.getElementById(div_name).innerHTML = data;
		},
		error: function(msg) { alert("error"); }
	});
}
