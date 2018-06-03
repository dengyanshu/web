/***************************************************************************
  								<导航类> 
 ***************************************************************************/
 Ext.define("core.kanban_test.view.ItemTree",{
 	extend:'core.kanban_test.base.BaseTree',
 	alias:'widget.tj_sc_kb_navigation',
 	title:'功能列表',
 	collapsible:true,
 	split:true,
 	margins:'5 2 5 5',
 	width:200,
	store:'core.kanban_test.store.Tree'
 });