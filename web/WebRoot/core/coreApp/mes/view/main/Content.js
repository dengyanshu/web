/***************************************************************************
  								<主内容显示区域类> 
 ***************************************************************************/


Ext.define("core.mes.view.main.Content",{
	extend:'Ext.TabPanel',
	alias:'widget.mescontent',
	ActiveTab:0,
	margins:'5 5 5 0',
	id:'mes_content',
	enableTabScroll:true,//挤的时候能够滚动收缩
	items:[
		{
			xtype:'panel',
			title:'主页',
			//html:'<h1>欢迎登录mes查询系统!</h1>',
			html:'<img src="/web/core/css/image/logo.jpg"/>'
		}
	]
	
        
});

  