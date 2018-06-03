Ext.define("core.course_manager.view.DisplayPanel",{
	extend:'Ext.TabPanel',
	alias:'widget.coursemanage_content',
	ActiveTab:0,
	margins:'5 5 5 0',
	enableTabScroll:true,
	items:[
		{
			xtype:'panel',
			title:'员工技能管理系统',
			html:'<img src="/web/core/css/image/title/skill2.png"/>'
		}
	]
	
        
});