Ext.define("core.smt_sb2_kanban.view.DisplayPanel",{
	extend:'Ext.TabPanel',
	alias:'widget.smtsb2_kb_content',
	ActiveTab:0,
	margins:'5 5 5 0',
	enableTabScroll:true,
	width:1120,
	items:[
		{
			xtype:'panel',
			title:'SMT设备管控看板',
			html:'<img src="/web/core/css/image/title/smt_kanban2.png"/>'
		}
	]
	
        
});