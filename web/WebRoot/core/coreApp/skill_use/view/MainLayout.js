Ext.define("core.skill_use.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.skilluse',
	layout:'border',
	items:[
		{xtype:'skilluse_reservationcourseview',region:'west'},
		{xtype:'skilluse_content',region:'center'}
	]
	
});
