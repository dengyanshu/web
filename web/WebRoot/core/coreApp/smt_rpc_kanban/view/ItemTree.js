/***************************************************************************
  								<导航类> 
 ***************************************************************************/
 Ext.define("core.smt_rpc_kanban.view.ItemTree",{
 	//extend:'Ext.Panel',
 	extend:'core.smt_rpc_kanban.base.BaseTree',
 	alias:'widget.smt_rpc_kb_navigation',
 	title:'功能列表',
 	collapsible:true,
 	split:true,
 	margins:'5 2 5 5',
 	width:200,
 	/*
	layout:{
		type:"accordion",	
		animate:true		
	},
	*/
	store:'core.smt_rpc_kanban.store.Tree'
 });