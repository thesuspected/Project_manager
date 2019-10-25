webix.i18n.locales["ru-RU"].kanban = {
	"copy" : "Копировать",
	"dnd" : "Бросайте файлы сюда",
	"remove" : "Удалить",
	"save" : "Сохранить",
	"confirm" : "Вы собираетесь навсегда удалить эту карточку. Вы уверены?",
	"editor":{
		"add" : "Добавить карточку",
		"assign" : "Назначить",
		"attachments" : "Вложения",
		"color" : "Цвет",
		"head" : "Редактор",
		"status" : "Статус",
		"tags" : "Метки",
		"text" : "Текст",
		"upload" : "Загрузить"
	},
	"menu":{
		"copy": "Копировать",
		"edit": "Редактировать",
		"remove": "Удалить"
	}
};
		
webix.i18n.setLocale("ru-RU");

// Массивы канбана
var projects_data = [
	{id:1, name:"Проект 1", group:"Группа 1", date:"none"},
	{id:2, name:"Проект 1", group:"Группа 1", date:"none"},
	{id:3, name:"Проект 1", group:"Группа 1", date:"none"},
];

var kanban_data = [
	{ id:1, status:"new", text:"Task 1", tags:[1,2], comments:[{text:"Comment 1"}, {text:"Comment 2"}] },
	{ id:2, status:"work", text:"Task 2", tags:[1], color:3, votes:1, personId: 4  },
	{ id:3, status:"work", text:"Task 3", tags:[2,4,5], comments:[{ id:6, user_id:4, date:"2018-06-14 23:01", text:"No worry, I am planning..."}], personId: 6 },
	{ id:4, status:"work", text:"Task 4", tags:[3], votes:1, personId: 5  },
	{ id:5, status:"work", text:"Task 5", tags:[3,4], votes:3  },
	{ id:6, status:"work", text:"Task 6", tags:[4,5,6,7], comments:[{text:"Comment 1"}, {text:"Comment 2"}], personId: 2 },
	{ id:7, status:"work", text:"Task 7", tags:[1], votes:2, personId: 7, image: "image001.png"  },
	{ id:8, status:"work", text:"Task 8", tags:[7], comments:[{text:"Comment 1"}, {text:"Comment 2"}], votes:5, personId: 4  },
	{ id:9, status:"work", text:"Task 9", tags:[6], votes:1, personId: 2},
	{ id:10, status:"work", text:"Task 10", tags:[1], comments:[{text:"Comment 1"}, {text:"Comment 2"}, {text:"Comment 3"}], votes:10, personId:1 },
	{ id:11, status:"work", text:"Task 11", tags:[2], votes:3, personId: 8 },
	{ id:12, status:"done", text:"Task 12", votes:2 , personId: 8, image: "image002.png"},
	{ id:13, status:"new", text:"Task 14",  personId: 8}
];

var imagePath = "https://docs.webix.com/samples/63_kanban/common/imgs/";
var users_set = [
  {id:1, value:"Rick Lopes", position:"Руководитель отдела", image:imagePath + "1.jpg"},
  {id:2, value:"Martin Farrell", position:"Junior programmist", image:imagePath + "2.jpg"},
  {id:3, value:"Douglass Moore", position:"Менеджер", image:imagePath + "3.jpg"},
  {id:4, value:"Eric Doe", position:"Ведущий проекта", image:imagePath + "4.jpg"},
  {id:5, value:"Sophi Elliman", position:"Секретарь", image:imagePath + "5.jpg"},
  {id:6, value:"Anna O'Neal", position:"Аналитик"},
  {id:7, value:"Marcus Storm", position:"Тестировщик", image:imagePath + "7.jpg"},
  {id:8, value:"Nick Branson", position:"Дизайнер", image:imagePath + "8.jpg"},
  {id:9, value:"CC", image:imagePath + "9.jpg"}
];

var tags_set = [
	{id:1, value:"webix"},
	{id:2, value:"docs"},
	{id:3, value:"hard"},
	{id:4, value:"easy"},
	{id:5, value:"go"},
	{id:6, value:"database"},
	{id:7, value:"need help"},
];

var colors_set = [
	{id:1	, value:"Свободная", color:"green"},
	{id:2, value:"На выполнении", color:"#1CA1C1"},
	{id:3, value:"Важная", color:"orange"},
	{id:4, value:"Срочная", color:"red"},
];

// Виджеты
var kanban = {
	view:"kanban",
	type:"wide",
	cols:[
	{ rows:[
	    { view:"kanbanheader", label:"Backlog", link:"new" },
	    { id:"new", view:"kanbanlist", status:"new" }
    ]},
	{ header:"Назначенные",
	body:{ view:"kanbanlist", status:"new" }},
	{ header:"В работе",
	body:{ view:"kanbanlist", status:"work" }},
	{ header:"Завершенные",
	body:{ view:"kanbanlist", status:"done" }}
	],
	editor:true,
    userList:true, // позже настроить вывод должности
    cardActions:true,
    comments:{currentUser:9}, // задать пользователя текущей сессии
    tags: tags_set,
    users: users_set,
    colors: colors_set,
    data: kanban_data
};

var sidebar = {
	view:"sidebar",
	id:"sidebar",
	collapsed:true,
	width: 200,
	data:[
		{ id:"tasks", value:"Задачи", icon:"mdi mdi-calendar-check" },
		{ id:"groups", value:"Группы", icon:"mdi mdi-account-group" },
		{ id:"employees", value:"Сотрудники", icon:"mdi mdi-account-card-details" },
	]
};

var toolbar = {
	view:"toolbar",
	height:50,
	elements:[
		{ view:"icon", icon:"mdi mdi-menu", click: function(){$$("sidebar").toggle()} },
		{},
		{ view:"icon", icon:"mdi mdi-account-circle"},
		{ view:"icon", icon:"mdi mdi-bell", badge:3 },
		{ view:"icon", icon:"mdi mdi-settings" }
	]
}

var projects = {
	header:"Проекты",
	body:{
		view:"list",
  		template:"#name# - #group#",
  		select:true,
  		data: projects_data
	}
}

window.onload = function() {
	webix.ready(function(){

		//if (!webix.env.touch && webix.env.scrollSize)
    	//webix.CustomScroll.init();

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
										
										projects,

										{
											template:"add project"
										}
									]
								},
								
								kanban
							]
						}
					]
				}
			]
		});
	});
}