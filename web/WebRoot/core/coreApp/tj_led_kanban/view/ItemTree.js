/***************************************************************************
  								<导航类> 
 ***************************************************************************/
 Ext.define("core.tj_led_kanban.view.Navigation",{
 	extend:'core.tj_led_kanban.base.BaseTree',
 	alias:'widget.tj_led_kb_navigation',
 	title:'功能列表',
 	collapsible:true,
 	split:true,
 	margins:'5 2 5 5',
 	width:200,
	store:'core.tj_led_kanban.store.Tree'
 });