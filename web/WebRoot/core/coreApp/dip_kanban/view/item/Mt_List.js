Ext.define("core.dip_kanban.view.item.Mt_List",{
	extend:'Ext.window.Window',	
	frame:true,
	alias : 'widget.dip_mt_list_kb',
	width:500,
	maximized:true,
    layout: 'fit',
    title:'问题反馈',
    items:[
{
xtype:'grid',
store:'core.dip_kanban.store.mt.ListStore',
columns:[
	{text:'序号',dataIndex:'ID',width:'3%'},
	{text:'项目',dataIndex:'Project',width:'10%'},
	{text:'状态',dataIndex:'FinishStatus',width:'10%'},
	{text:'原因',dataIndex:'CauseDesc',width:'20%'},
	{text:'责任人',dataIndex:'DutyPerson',width:'10%'},
	{text:'联系方式',dataIndex:'TelNumber',width:'10%'}		
]
}
    ]

});