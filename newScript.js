window.onload = function() {
	webix.ready(function(){
		let grid_data = [
			{id: "leads", name:"Поток клиентов", b:"1000", a:""},
			{id: "converse", name:"Конверсия", b:"200", a:""},
			{id: "average", name:"Средний чек", b:"450", a:""},
			{id: "repeat", name:"Повторные продажи", b:"1", a:""},
			{id: "marge", name:"Маржа", b:"0.3", a:""},
			{id: "percent", name:"Конверсия %", b:"", a:""},
			{id: "volume", name:"Объем продаж", b:"", a:""},
			{id: "profit", name:"Прибыль", b:"", a:""},
		];

		let chart_data = [
			{name:"Поток клиентов", value:"1000", percent:"80%", color: "#ee9e36"},
			{name:"Конверсия", value:"200", percent:"20%", color: "#a9ee36"}
		]

		let form = {
			view:"form", 
			elements:[
				{ view:"text", label:"Email" },
				{ view:"text", type:"password", label:"Password" },
				{cols:[
					{ view:"button", value:"Login", css:"webix_primary" },
					{ view:"button", value:"Cancel" }
				]}
			]
		};

		let data = {
			view:"datatable",
			id:"grid",
			height: 330,
			columns:[
				{id:"name", header:"Исходные данные", fillspace: true},
				{id:"b", header:{text:"До", css:"align-center"}, editor:"text", css:"align-right"},
				{id:"a", header:{text:"После", css:"align-center"}, editor:"text", css:"align-right"},
			],
			scroll: false,
			select: true,
			editable: true,
			css:"webix_data_border webix_header_border",
			data:grid_data
		};

		let sidebar = {
			view:"sidebar",
			collapsed:true,
			data:[
				{ id:"dashboard", icon:"mdi mdi-doctor" },
				{ id:"cube", icon:"mdi mdi-cube" },
				{ id:"code", icon:"mdi mdi-code-not-equal-variant" },
				{ id:"layout", icon:"mdi mdi-view-dashboard" },
				{ id:"charts", icon:"mdi mdi-chart-areaspline" },
				{ id:"typo", icon:"mdi mdi-format-line-style" },
				{ id:"calendar", icon:"mdi mdi-calendar" },
				{ id:"files", icon:"mdi mdi-folder-star" },
			]
		};

		let toolbar = {
			view:"toolbar",
			height:50,
			elements:[
			{ view:"icon", icon:"mdi mdi-menu" },
			{},
			{ view:"icon", icon:"mdi mdi-bell", badge:3 },
			{ view:"icon", icon:"mdi mdi-settings" }
			]
		}

		let buttons = {
			view:"toolbar",
			id:"top_toolbar",
			elements:[
				{ },
				{ view:"button", id:"btn_calc", autowidth:true, value:"Рассчитать", click: calc},
				{ view:"button", id:"btn_copy", autowidth:true, value:"Дублировать", click: copy},
				{ view:"button", id:"btn_clear", autowidth:true, value:"Очистить", click: clear}
			]
		};

		let chart = {
			view: "chart",
	        type:"donut",
	        value:"#value#",
	        color:"#color#",
	        label:"#name#",
	        pieInnerText:"#percent#",
	        shadow:0,
	        data:chart_data
		}

		webix.ui({
			rows: [
				toolbar,

				{
					
					cols: [

						sidebar,

						{
							type:"space",
							cols: [
								{
									type:"wide",
									gravity: 0.5,
									rows: [

										{
											rows: [

												data,

												buttons
											]
										},

										{
											template:"Вывод прибыли"
										}
									]									
								},

								{
									type:"wide",
									rows: [
										{
											template:"графики"
										},

										{
											type:"wide",
											cols: [
												chart,

												{
													template:"круг2"
												}
											]
										},

										{
											template:"графики"
										}
									]											
								}
							]

						}
					]
				}
			]
		});

		var leads, converse, average, repeat, marge, percent, volume, profit;

		function fillVar() {
			leads = $$("grid").getItem("leads");
			converse = $$("grid").getItem("converse");
			average = $$("grid").getItem("average");
			repeat = $$("grid").getItem("repeat");
			marge = $$("grid").getItem("marge");
			percent = $$("grid").getItem("percent");
			volume = $$("grid").getItem("volume");
			profit = $$("grid").getItem("profit");
		}

		function checkNull() {
			let sumB = 0;
			let sumA = 0;
			for (item of grid_data) {
				if (item.b != 0) {
					sumB++;
				}
				if (item.a != 0) {
					sumA++;
				}
			}
			if (sumB >= 5) {
				percent.b = converse.b / leads.b;
				volume.b = converse.b * average.b * repeat.b;
				profit.b = volume.b * marge.b;
			}
			else {
				webix.message({
			    text:"Заполните все поля!",
			    type:"error", 
				});
			}
			if (sumA >= 5) {
				percent.a = converse.a / leads.a;
				volume.a = converse.a * average.a * repeat.a;
				profit.a = volume.a * marge.a;
			}
		}

		function calc() {
			fillVar();
			checkNull();
			$$("grid").updateItem();
		};

		function copy() {
			fillVar();
			for (item of grid_data) {
				item.a = item.b;
			}
			$$("grid").updateItem();
		};

		function clear(){
			webix.message("Поля очищены");
			for (item of grid_data) {
				item.b = "";
				item.a = "";
			}
			$$("grid").updateItem();
		};
	});
}