
Ext.define("core.smt_cn_kanban.view.CenterPanel",{
	extend:'Ext.Panel',
	alias:'widget.smt_kb_cn_center',
	renderTo: Ext.getBody(),
    layout: {
        type: 'vbox',       // 子元素垂直布局
        align: 'stretch',    // 每个子元素宽度充满子容器
        padding: 5
    },
	items:[
	       {
	    	    title :'白班',
	    	   	xtype:'grid',
	    		store : 'core.smt_cn_kanban.store.Storecn',
	    		columns : [
	    		        {header : '生产时间',dataIndex : 'itemName',width : 100},
	    				{header : '8:00-9:00',dataIndex : 'am89',width : 90},
	    				{header : '9:00-10:00',dataIndex : 'am910',width : 90},
	    				{header : '10:00-11:00',dataIndex : 'am1011',width : 90},
	    				{header : '11:00-12:00',dataIndex : 'am1112',width : 90},
	    				{header : '12:00-13:00',dataIndex : 'pm1213',width : 90},
	    				{header : '13:00-14:00',dataIndex : 'pm1314',width : 90},
	    				{header : '14:00-15:00',dataIndex : 'pm1415',width : 90},
	    				{header : '15:00-16:00',dataIndex : 'pm1516',width : 90},
	    				{header : '16:00-17:00',dataIndex : 'pm1617',width : 90},
	    				{header : '17:00-18:00',dataIndex : 'pm1718',width : 90},
	    				{header : '18:00-19:00',dataIndex : 'pm1819',width : 90},
	    				{header : '19:00-20:00',dataIndex : 'pm1920',width : 90}
	    		],
	       		flex:6
	       },
	       {xtype :'splitter'},
	       {
	           bodyPadding: 5,
	           items: [{
	        	   xtype     : 'textareafield',
	               grow      : true,
	               name      : 'message',
	               fieldLabel: '异常',
	               width : 800,
	               height : 25
	           }],
	           flex: 1 
	       }
	 ]
});

