/***************************************************************************
  								<主内容显示区域类> 
 ***************************************************************************/
Ext.define("core.xigao.view.main.Content",{
	extend:'Ext.TabPanel',
	alias:'widget.xigao_content',
	ActiveTab:0,
	margins:'5 5 5 0',
	enableTabScroll:true,//挤的时候能够滚动收缩
	items:[
		{
			xtype:'panel',
			title:'主页',
			html:'<img src="/web/core/css/image/logo2.png"/>'
			//listeners:{remove:function(tp,c){c.hide();}}
		}
	]
	
        
});

  