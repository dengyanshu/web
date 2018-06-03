Ext.define("core.skill_use_test.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.skillusetest',
	layout:'border',
	items:[
	   
		{xtype:'skilluse_reservationcourseview',region:'west'},
		{xtype:'skilluse_content',region:'center'},
	]
	
});
