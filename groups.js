webix.i18n.setLocale('ru-RU');

var groups_data = [
	{date:new Date(2019,8,14), group:"Developers", lead:"Rick Lopes", id:1},
	{date:new Date(2019,6,25), group:"Designers", lead:"Sophi Elliman", id:2},
	{date:new Date(2019,5,1), group:"dbEngineers", lead:"Marcus Storm", id:3},
];

var imagePath = "https://docs.webix.com/samples/63_kanban/common/imgs/";
var users_set = [
  {id:1, value:"Rick Lopes", position:"Руководитель отдела", image:imagePath + "1.jpg"},
  {id:2, value:"Martin Farrell", position:"Junior programmist", image:imagePath + "2.jpg"},
  {id:3, value:"Douglass Moore", position:"Менеджер", image:imagePath + "3.jpg"},
  {id:4, value:"Eric Doe", position:"Ведущий проекта", image:imagePath + "4.jpg"},
  {id:5, value:"Sophi Elliman", position:"Секретарь", image:imagePath + "5.jpg"},
  {id:6, value:"Anna O'Neal", position:"Аналитик", image:imagePath + "6.jpg"},
  {id:7, value:"Marcus Storm", position:"Тестировщик", image:imagePath + "7.jpg"},
  {id:8, value:"Nick Branson", position:"Дизайнер", image:imagePath + "8.jpg"},
  {id:9, value:"CC", position:"Верстальщик", image:imagePath + "9.jpg"}
];

var table_data = [
	{},
];

var sidebar = {
	view:"sidebar",
	id:"sidebar",
	collapsed:true,
	width: 200,
	on:{
		onItemClick(id){
			console.log(id);
			location.href = id + ".html";
		}
	},
	data:[
		{ id:"tasks", value:"Задачи", icon:"mdi mdi-calendar-check" },
		{ id:"groups", value:"Группы", icon:"mdi mdi-account-group" },
		//{ id:"employees", value:"Сотрудники", icon:"mdi mdi-account-card-details" },
	]
};

var toolbar = {
	view:"toolbar",
	height:50,
	elements:[
		{ view:"icon", icon:"mdi mdi-menu", click: function(){$$("sidebar").toggle()} },
		{ view:"label", label:"Project Manager"},
		{},
		{ view:"icon", icon:"mdi mdi-account-circle"},
		{ view:"icon", icon:"mdi mdi-bell", badge:3 },
		{ view:"icon", icon:"mdi mdi-settings" }
	]
};

var groups = {
	rows:[
	{
		view:"toolbar",
		padding:{left:10},
		elements:[
			{view:"label", label:"Группы"},
			{view:"icon", icon:"mdi mdi-plus-circle-outline", click: () => {$$("project_Form").setValues(originalValues); $$("project_window").show();}},
			{view:"icon", icon:"mdi mdi-sort", popup:"sort_Popup"}
		]
	},
	{
		view:"list",
		id:"listGroup",
  		template:function(obj){ 
			return "<div class='listBlock'><div class='listName'>" + obj.id + ". " + obj.group + "</div> <div class='listDate'>" + webix.i18n.dateFormatStr(obj.date) + "</div></div> <div class='listBlock'> <div class='listGroup'><div class='listGroupIcon mdi mdi-human-greeting'></div>" + obj.lead + "</div> <div class='listIcon webix_kanban_icon kbi-cogs '></div></div>"
		},
  		type: {
  			height:80
  		},
  		select:true,
  		onClick:{ 
        	"listIcon":function(node){
            	$$("project_Popup").show(node); 
        	}
    	},
  		data: groups_data
	}
	]
};

var employees = {
	gravity:0.35,
	rows:[
	{
		view:"toolbar",
		padding:{left:10},
		elements:[
			{view:"label", label:"Сотрудники"},
			{view:"icon", icon:"mdi mdi-plus-circle-outline", click: () => {$$("project_Form").setValues(originalValues); $$("project_window").show();}},
			{view:"icon", icon:"mdi mdi-sort", popup:"sort_Popup"}
		]
	},
	{
		view:"list",
		id:"listEmployees",
  		template:function(obj){ 
			return "<img class='listImg pad' src='" + obj.image + "'></img><div class='listBlock'><div class='listName pad'>" + obj.value + "</div></div> <div class='listBlock'> <div class='listPos pad'>" + obj.position + "</div></div>"
		},
  		type: {
  			height:80
  		},
  		select:true,
  		onClick:{ 
        	"listIcon":function(node){
            	$$("project_Popup").show(node); 
        	}
    	},
  		data: users_set
	}
	]
};

let groups_table = {
			view:"datatable",
			id:"groupsTable",
			columns:[
				{ id:"id",	header:[ {text:"Stock", colspan:4, css:"align-center", borderless: true}, {text:"№", css:"align-right"} ], css:"align-right" },
				{ id:"name", header:[ "", "Товар" ], fillspace:true },
				{ id:"price", header:[ "", {text:"Цена", css:"align-center" } ], css:"align-center" },
				{ id:"amount", header:[ "", {text:"Кол-во", css:"align-center" } ], css:"align-center" },
			],
			on:{
				onItemClick(){ 
					let item = this.getSelectedItem();
					let sign = true;
					calcSum(item, sign);
					addGood(item);
					$$("grid_basket").refresh();
					$$("grid_stock").refresh();
				}
			},

			hover: "hover",
			scroll:false,
			autoheight:true,
			select: true,
			data:table_data
			
		};

window.onload = function() {
	webix.ready(function(){

		if (!webix.env.touch && webix.env.scrollSize)
    	webix.CustomScroll.init();

    	// Разметка
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
									gravity:0.3,
									type:"wide",
									rows: [

										groups
									]
								},
								
								{
									type:"wide",
									cols:[
										{
											template:"group data"
										},
										employees
									]
								},
							]
						}
					]
				}
			]
		});
	});
}