Ext.define("core.mvc.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.mainview',
	layout:'border',
	items:[
		{xtype:'mvc_treepanel',region:'west'},
		{xtype:'mvc_content',region:'center'}
	]
});
