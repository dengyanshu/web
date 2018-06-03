/***************************************************************************
  								<导航类> 
 ***************************************************************************/
 Ext.define("core.plan_kanban.view.Navigation",{
 	extend:'core.app.base..BaseTree',
 	alias:'widget.plan_kb_navigation',
 	title:'功能列表',
 	collapsible:true,
 	split:true,
 	margins:'5 2 5 5',
 	width:200,
	store:'core.plan_kanban.store.Tree'
 });