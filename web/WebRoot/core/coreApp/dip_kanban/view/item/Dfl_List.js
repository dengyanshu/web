Ext.define("core.dip_kanban.view.item.Dfl_List",{
	extend:'Ext.window.Window',	
	frame:true,
	alias : 'widget.dip_dfl_list_kb',
	width:500,
	maximized:true,
    layout: 'fit',
    title:'领料单超出工单需求剩余量',
    items:[
{
xtype:'grid',
store:'core.dip_kanban.store.dfl.ListStore',
columns:[
//	{text:'领料单',dataIndex:'PickingListName',width:'25%'},
	{text:'料号',dataIndex: 'ProductName',width:'25%'},
	{text:'剩余量',dataIndex:'ListPlusQty',width:'25%'}
  
]
}
    ]
});


