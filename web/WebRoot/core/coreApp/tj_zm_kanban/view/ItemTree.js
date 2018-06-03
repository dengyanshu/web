/***************************************************************************
  								<导航类> 
 ***************************************************************************/
 Ext.define("core.tj_zm_kanban.view.Navigation",{
 	extend:'core.tj_zm_kanban.base.BaseTree',
 	alias:'widget.tj_zm_kb_navigation',
 	title:'功能列表',
 	collapsible:true,
 	split:true,
 	margins:'5 2 5 5',
 	width:200,
	store:'core.tj_zm_kanban.store.Tree'
 });