Ext.define("core.xm_ztl.view.Main",{
	extend:'Ext.Panel',
	alias:'widget.xm_ztl_main',
	layout:'border',
	items:[
		{xtype:'xm_ztl_listview'},
		{xtype:'xm_ztl_search'}
	]			
});