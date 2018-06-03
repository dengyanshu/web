Ext.define("core.smt_cn_kanban.view.SonthPanel",{
	extend:'Ext.Panel',
	alias:'widget.smt_kb_cn_sonth',
	renderTo: Ext.getBody(),
    layout: {
        type: 'vbox',       // 子元素垂直布局
        align: 'stretch',    // 每个子元素宽度充满子容器
        padding: 5
    },
	items:[
	       {
	    	   title : '夜班',
	    	   	xtype:'grid',
	    	   	store : 'core.smt_cn_kanban.store.Storecn',
	    		columns : [
	    				{header : '生产时间',dataIndex : 'itemName',width : 100},
	    				{header : '20:00-21:00',dataIndex : 'pm2021',width : 90},
	    				{header : '21:00-22:00',dataIndex : 'pm2122',width : 90},
	    				{header : '22:00-23:00',dataIndex : 'pm2223',width : 90},
	    				{header : '23:00-00:00',dataIndex : 'pm2300',width : 90},
	    				{header : '00:00-1:00',dataIndex : 'am001',width : 90},
	    				{header : '1:00-2:00',dataIndex : 'am12',width : 90},
	    				{header : '2:00-3:00',dataIndex : 'am23',width : 90},
	    				{header : '3:00-4:00',dataIndex : 'am34',width : 90},
	    				{header : '4:00-5:00',dataIndex : 'am45',width : 90},
	    				{header : '5:00-6:00',dataIndex : 'am56',width : 90},
	    				{header : '6:00-7:00',dataIndex : 'am67',width : 90},
	    				{header : '7:00-8:00',dataIndex : 'am78',width : 90}
	    		],
		       	flex:6
	       },
	       {xtype :'splitter'},
	       {
	    	   bodyPadding: 5,
	           items: [{
	        	   xtype     : 'textareafield',
	               grow      : true,
	               name      : 'message2',
	               id 		 : 'message2',
	               fieldLabel: '异常',
	               width : 800,
	               height : 25
	           }],
	           flex: 1 
	       }
	 ]
});

