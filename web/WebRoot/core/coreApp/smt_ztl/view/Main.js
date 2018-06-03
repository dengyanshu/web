
/*
 * 小米smt品质直通率看板
 * **/
Ext.define("core.smt_ztl.view.Main",{
	extend:'Ext.Panel',
	alias:'widget.smt_ztl_main',
	layout:'border',
	items:[
       {xtype:'smt_ztl_search'},
       {xtype:'smt_ztl_chartview'},
       {xtype:'smt_ztl_listview'}
	]			
});