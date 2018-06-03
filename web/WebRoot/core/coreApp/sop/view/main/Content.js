/***************************************************************************
  								<主内容显示区域类> 
 ***************************************************************************/


Ext.define("core.sop.view.main.Content",{
	extend:'Ext.TabPanel',
	alias:'widget.sopcontent',
	ActiveTab:0,
	margins:'5 5 5 0',
	id:'sop-content',
	enableTabScroll:true,//挤的时候能够滚动收缩
	items:[
		{
			xtype:'panel',
			title:'主页',
			html:'<img src="/web/core/css/image/sop_logo.png"/>'
		}
	]
	
        
});

  