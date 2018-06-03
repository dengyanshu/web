Ext.define("core.skill_manager.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.skillmanage',
	layout:'border',
	items:[
		{xtype:'skillmanage_navigation',region:'west'},
		{xtype:'skillmanage_content',region:'center'}
	]
	
});
