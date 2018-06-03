var menuTreeStore=comm.get("menuTreeStore");
var node=menuTreeStore.getNodeById("8a81830144e276020144e280eabd0003");
Ext.define("core.kanban.view.Navigation",{
 	extend:'core.kanban.base.BaseTree',
 	alias:'widget.kanban_navigation',
 	title:'功能列表',
 	collapsible:true,
 	split:true,
 	margins:'5 2 5 5',
 	width:200,
	store:node
});