
Ext.define("core.dip_kanban.view.item.Cll_List",{
	extend:'Ext.window.Window',	
	frame:true,
	alias : 'widget.dip_cll_list_kb',
	width:500,
	maximized:true,
    layout: 'fit',
    title:'超领需求料在X仓的剩余量明细',
    items:[
           	{
           		xtype:'grid',
                store:'core.dip_kanban.store.xstore.ListStore',         		
           		columns:[
           		{text:'料号',dataIndex:'ProductName',width:'25%'},
           		{text:'拣料单',dataIndex:'PickingListName',width:'25%'},
           		{text:'数量',dataIndex:'QTY',width:'25%'}       
          ]         	
           	,
           		dockedItems:[{
           		        	 xtype:'pagingtoolbar',
           		        	 store : 'core.dip_kanban.store.xstore.ListStore',
           		        	 dock:'bottom',
           		        	 displayInfo:true,
           		        	 displayMsg:'第{0}到 {1}条数据 共{2}条',
           		        	 emptyMsg:'没有数据'
           		         }]
           	
           	}
         	
           	]

	});


