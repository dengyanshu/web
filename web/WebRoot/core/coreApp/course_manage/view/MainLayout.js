Ext.define("core.course_manager.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.coursemanage',
	layout:'border',
	items:[
		{xtype:'coursemanage_navigation',region:'west'},
		{xtype:'coursemanage_content',region:'center'}
	]
	
});
