webix.i18n.locales["ru-RU"].kanban = {
	"copy" : "Копировать",
	"dnd" : "Бросайте файлы сюда",
	"remove" : "Удалить",
	"save" : "Сохранить",
	"confirm" : "Вы собираетесь навсегда удалить эту карточку. Вы уверены?",
	"editor":{
		"add" : "Добавить задачу",
		"edit" : "Изменить задачу",
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
		
webix.i18n.setLocale('ru-RU');

// Массивы канбана
var projects_data = [
	{name:"Webix", date:new Date(2019,8,14), group:"Developers", id:1},
	{name:"Верстка проекта", date:new Date(2019,6,25), group:"Designers", id:2},
	{name:"Базы данных", date:new Date(2019,5,1), group:"dbEngineers", id:3},
];

var projectPopup_data = [
	{id:1, name:"Редактировать", value:"edit"},
	{id:2, name:"Удалить", value:"delete"}
];

var kanban_data = [
	{ id:1, status:"Новые", text:"Task 1", tags:[1,2] },
	{ id:2, status:"В работе", text:"Task 2", tags:[1], color:3, user_id: 4  },
	{ id:3, status:"В работе", text:"Task 3", tags:[2,4,5], comments:[{ id:1, user_id:4, date:"2018-06-14 23:01", text:"No worry, I am planning..."}, { id:2, user_id:5, date:"2018-06-15 05:01", text:"your plan is dead"}], user_id: 6 },
	{ id:4, status:"В работе", text:"Task 4", tags:[3], user_id: 5  },
	{ id:5, status:"В работе", text:"Task 5", tags:[3,4]  },
	{ id:6, status:"Выполнено", text:"Task 6", tags:[4,5,6,7], user_id: 2 },
	{ id:7, status:"На проверку", text:"Task 7", tags:[1], user_id: 7},
	{ id:8, status:"На проверку", text:"Task 8", tags:[7], user_id: 4  },
	{ id:9, status:"На проверку", text:"Task 9", tags:[6], user_id: 2},
	{ id:10, status:"На проверку", text:"Task 10", tags:[1], user_id:1 },
	{ id:11, status:"В работе", text:"Task 11", tags:[2], user_id: 8 },
	{ id:12, status:"Выполнено", text:"Task 12", user_id: 8},
	{ id:13, status:"Новые", text:"Task 14", user_id: 8}
];

var sort_data = [
	{id:"1", name:"По порядку", value:"id"},
	{id:"2", name:"По имени", value:"name"},
	{id:"3", name:"По дате", value:"date"}
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
  {id:9, value:"CC", position:"Верстальшик", image:imagePath + "9.jpg"}
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
	{id:2, value:"Стандартная", color:"#1CA1C1"},
	{id:3, value:"Важная", color:"orange"},
	{id:4, value:"Срочная", color:"red"},
];

var projectGroup_data = [
	{value:"Designers"},
	{value:"Developers"},
	{value:"dbEngineers"}
];

// Виджеты

// задачи
var kanban = {
	view:"kanban",
	id:"kanban",
	type:"wide",
	cols:[
	{ rows:[
	    { 
	    	view:"toolbar",
			padding:{left:10},
			elements:[
				{view:"label", label:"Новые"},
				{view:"icon", icon:"mdi mdi-plus-circle-outline", click: () => {$$("kanban").showEditor();}}
			] 
		},
	    { id:"new", view:"kanbanlist", status:"Новые" }
    ]},
	{ header:"<span class='webix_icon mdi mdi-briefcase-outline'></span>В работе",
	body:{ view:"kanbanlist", status:"В работе" }},
	{ header:"<span class='webix_icon mdi mdi-alert-rhombus-outline'></span>На проверку",
	body:{ view:"kanbanlist", status:"На проверку" }},
	{ header:"<span class='webix_icon mdi mdi-check'></span>Выполнено",
	body:{ view:"kanbanlist", status:"Выполнено" }}
	],
	// окно задачи
	editor:{
		elements:[
			{ view:"textarea", name:"text", height:90, label:"Текст" },
			{
				view:"multicombo", name:"tags", label:"Метки",
				options:tags_set
			},
			{
				margin:10,
				cols:[
					{
						name:"user_id", view:"combo", options:users_set, label:"Назначить"
					},
					{
						view:"richselect", name:"color", label:"Приоритет",
						options:{
							body:{
								data:colors_set,
								css:"webix_kanban_colorpicker",
								template:"<span class='webix_kanban_color_item' style='background-color: #color#'></span>#value#"
							}
						}
					},
					{
						view:"richselect", name:"$list", label:"Статус",
						options:[
							{id:"0",value:"Новые"},
							{id:"1",value:"В работе"},
							{id:"2",value:"На проверку"},
							{id:"3",value:"Выполнено"}
						]
					}
				]
			}
		],
		rules:{
            text: webix.rules.isNotEmpty,
            user_id: webix.rules.isNotEmpty
        }
	},
    userList:true, // настроить вывод должности?
    cardActions:true,
    //comments:{currentUser:9}, // задать пользователя текущей сессии
    tags: tags_set,
    users: users_set,
    colors: colors_set,
    data: kanban_data
};
// шапка
var toolbar = {
	view:"toolbar",
	height:50,
	elements:[
		{ view:"icon", icon:"mdi mdi-menu", click: function(){$$("sidebar").toggle()} },
		{ view:"template", type:"clean", template:"<img src='./img/list.svg' class='icon'>", width:40},
		{ view:"label", label:"Project Manager"},
		{},
		{ view:"icon", icon:"mdi mdi-account-circle"},
		{ view:"icon", icon:"mdi mdi-bell", badge:3 },
		{ view:"icon", icon:"mdi mdi-settings" }
	]
};
// боковая панель
var sidebar = {
	view:"sidebar",
	id:"sidebar",
	collapsed:true,
	width: 150,
	on:{
		onItemClick(id){
			location.href = id + ".html";
		}
	},
	data:[
		{ id:"tasks", value:"Задачи", icon:"mdi mdi-calendar-check" },
		{ id:"groups", value:"Группы", icon:"mdi mdi-account-group" },
		//{ id:"employees", value:"Сотрудники", icon:"mdi mdi-account-card-details" },
	]
};
// островок проекты
var projects = {
	rows:[
	{
		view:"toolbar",
		padding:{left:10},
		margin:-4,
		elements:[
			{view:"label", label:"Проекты"},
			{view:"icon", icon:"mdi mdi-plus-circle-outline", click: () => {$$("titleP").setValue("Добавить проект"); $$("dltProjectBtn").hide(); $$("project_Form").setValues(originalValues); $$("project_window").show();}},
			{view:"icon", icon:"mdi mdi-sort", popup:"sort_Popup"}
		]
	},
	// список проектов
	{
		view:"list",
		id:"listProject",
  		template:function(obj){ 
			return "<div class='listBlock'><div class='listName'>" + obj.id + ". " + obj.name + "</div> <div class='listDate'>" + webix.i18n.dateFormatStr(obj.date) + "</div></div> <div class='listBlock'> <div class='listGroup'><div class='listGroupIcon mdi mdi-account-group'></div>" + obj.group + "</div> <div class='listIcon webix_kanban_icon kbi-cogs '></div></div>"
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
  		data: projects_data
	}
	]
};
// форма заполнения проекта
var projectForm = {
	view:"form",
	id:"project_Form",
	rules:{
        "name":webix.rules.isNotEmpty
    },
	elements:[
  	{ view:"text", label:"Название", labelPosition:"top", name:"name"},
  	{ margin:10, cols: [
  		{ view:"datepicker", value: new Date(), label: "Дата", labelPosition:"top", name:"date" },
  		{ view:"select", margin:20, label:"Пр. группа", options:projectGroup_data, labelPosition:"top", name:"group"}
  	]},
  	{ margin:10, cols:[
  		{ view:"button", id:"dltProjectBtn", width:111, value:"Удалить", click:deleteProject },
  		{},
    	{ view:"button", value:"Сохранить", width:111, css:"webix_primary", click:addProject },
  	]}
	]
};
// окно проекта
var projectWindow = webix.ui({
	view:"window", 
	id:"project_window",
	width:400,
	move:true,
	position:"center", 
	head:{
		view:"toolbar", padding:{left:17}, margin:-4, cols:[
			{ view:"label", id:"titleP", label: "Изменить проект" },
			{ view:"icon", icon:"mdi mdi-close", click:function(){ 
				$$('project_window').hide();
			}}
		]
	},
	close:true,
	modal:true,  
	body:projectForm
});
// попап проектов
var projectPopup = webix.ui({
	view:"popup",
	id:"project_Popup",
	width:150,
	body:{
		view:"menu", 
		id:"projectPopup_List",
		data:projectPopup_data,
		layout:"y",
		template:"#name#",
		autoheight:true,
		on:{
			onItemClick:function (id) {
				let value = this.getItem(id).value;
				switch(value) {
					case "edit":
						editProject();
						break;
					case "delete":
						deleteProject();
						break;
				}
			}
		}
	}
});
// попап сортировки
var sortPopup = webix.ui({
	view:"popup",
	id:"sort_Popup",
	width:150,
	body:{
		view:"list", 
		data:sort_data,
		template:"#name#",
		autoheight:true,
		select:true,
		on:{
			onSelectChange:function () {
				let value = this.getSelectedItem().value;
				sortProject(value);
			}
		}
	}
});

// Функции

function sortProject(value) {
	$$("listProject").sort("#" + value + "#");
};

function editProject() {
	$$("titleP").setValue("Изменить проект");
	$$("dltProjectBtn").show();
	$$("project_Popup").hide();
	var projectValues = $$("listProject").getSelectedItem();
	// заносим значения элемента в форму для изменения
	$$("project_Form").setValues(projectValues);
	$$("project_window").show();
}

function deleteProject() {
	$$("project_Popup").hide();
	$$("project_window").hide();
	var projectValues = $$("listProject").getSelectedItem();
	// подтверждение удаления
	webix.confirm({
		  ok:"ОК", cancel:"Отмена",
		  text:"Вы собираетесь удалить проект, вы уверены?"
	})
		.then(function(){
			var id = $$("listProject").getSelectedId();
			// удаляем элемент в массиве
			projects_data.splice(id - 1, 1);
			// удаляем элемент на странице
			$$("listProject").remove(id);
			// проходим по оставшимся элементам, после удаленного
			for (var i = id - 1; i < projects_data.length; i++) {
				// изменяем id след. элементов
				projects_data[i].id -= 1;
				// удаляем оставшиеся элементы на странице
				$$("listProject").remove(i + 2);
				// обновляем их с новым id
				$$("listProject").add(projects_data[i]);
			}
	  	})
}

function addProject() {
	// валидация заполнения имени проекта
	if ($$("project_Form").validate()) {
		// берем значения элемента
		var item_data = $$("project_Form").getValues();
		// поиск выбранного элемента в массиве
		let findIt = projects_data.find(itemFind => itemFind.id == item_data.id);
		if(findIt) {
			// изменение существующего
			var id = $$("listProject").getSelectedId();
			projects_data[id - 1] = item_data;
			$$("listProject").remove(id);
			$$("listProject").add(item_data, id-1);
			$$("listProject").updateItem();
		} else {
			// добавление нового элемента
			item_data.id = projects_data.length + 1;
			projects_data[projects_data.length] = Object.assign({}, item_data);
	  		$$("listProject").add(item_data);
		}
		// скрываем окна, возвращаем ст. значения форме
		$$("project_Popup").hide();
	  	$$("project_window").hide();
	  	$$("project_Form").setValues(originalValues);
	} else
		webix.message({ type:"error", text:"Дайте название проекту" });
};
// ст. значения формы
var originalValues = {name:"", date:new Date(), group:"Designers"};

// Webix.ready

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

										projects
									]
								},
								
								kanban
							]
						}
					]
				}
			]
		});
		// подсветка вкладки
		$$("sidebar").select("tasks", true);

		// Обработчики
		
		// одинарный клик по проекту
		$$("listProject").attachEvent("onItemClick", function(){

		});
		// редактирование проекта по 2-му клику
		$$("listProject").attachEvent("onItemDblClick", function(){
			var projectValues = $$("listProject").getSelectedItem();
			$$("titleP").setValue("Изменить проект");
			$$("dltProjectBtn").show();
		  	editProject(projectValues);
		});
		// валидация задачи
		$$("kanban").attachEvent("onBeforeEditorAction", function(action, editor, obj){
			if (action === "save" && !editor.getForm().validate())
				return false;
		});
		$$("kanban").getEditor().attachEvent("onHide", function(){
			this.getForm().clearValidation();
		});
	});
}