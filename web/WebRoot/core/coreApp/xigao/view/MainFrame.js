Ext.define("core.xigao.view.MainFrame",{
	extend:'Ext.Panel',
	alias:'widget.xigao_frame',
	layout:'border',
	items:[
		{xtype:'xigao_navigation',region:'west'},
		{xtype:'xigao_content',region:'center'}
	]
	
});