Ext.define("core.smt_kanban.view.DisplayPanel",{
	extend:'Ext.TabPanel',
	alias:'widget.smt_kb_content',
	ActiveTab:0,
	margins:'5 5 5 0',
	enableTabScroll:true,
	items:[
		{
			xtype:'panel',
			title:'SMT看板X',
			html:'<img src="/web/core/css/image/title/smt_kanban.png"/>'
		}
	]
	
        
});