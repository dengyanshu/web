/***************************************************************************
  								<导航类> 
 ***************************************************************************/
 Ext.define("core.tj_sc_kanban.view.ItemTree",{
 	extend:'core.tj_sc_kanban.base.BaseTree',
 	alias:'widget.tj_sc_kb_navigation',
 	title:'功能列表',
 	collapsible:true,
 	split:true,
 	margins:'5 2 5 5',
 	width:200,
	store:'core.tj_sc_kanban.store.Tree'
 });