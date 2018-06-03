Ext.define("core.mvc.view.DisplayPanel",{
	extend:'Ext.TabPanel',
	alias:'widget.mvc_content',
	xtype:'mvc_content',
	ActiveTab:0,
	margins:'5 5 5 0',
	enableTabScroll:true,
	items:[
		{
			xtype:'panel',
			title:'测试',
			html:' <img src="/web/core/css/image/title/skill1.png"/>'
			
		}
	]
	
        
});