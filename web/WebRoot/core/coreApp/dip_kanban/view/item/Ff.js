Ext.define("core.dip_kanban.view.item.Ff", {
			extend : "Ext.grid.Panel",
			alias : 'widget.dip_ff_kb',
			loadMask : true,
			stripeRows : true,
		    layout: 'fit',
//		    id:'images-view-mt',
		    bodyStyle:'background:#666666;padding:1px;',
			store : 'core.dip_kanban.store.ff.Store',
			columns : [
					{header : '工单',dataIndex : 'MOName',width:'12%' ,renderer:rendererFather}, 
					{header : '类型',dataIndex : 'MOSTDType',width:'7.5%' ,renderer:rendererFather}, 
					{header : '线体',dataIndex : 'WorkcenterName', width:'7.5%' ,renderer:rendererFather},
					{header : 'JIT模式',dataIndex : 'IsJITMode', width:'7.5%' ,renderer : rendererSon},
					{header : 'PMC计划',dataIndex : 'MOPlaned',width:'7.5%' ,renderer:rendererSon},			
					{header : '拣料单生成',dataIndex : 'PickingListCreated', width:'7.5%' ,renderer:rendererSon},
					{header : '起止规程',dataIndex : 'WorkprocedureFlow_Spe', width:'7.5%' ,renderer:rendererSon},
					{header : '工序维护',dataIndex : 'WorkprocedureDayFlow',width:'7.5%' ,renderer:rendererSon},
					{header : '排产',dataIndex : 'WorkprocedureDay',width:'7.5%' ,renderer:rendererSon},
					{header : '排产审核',dataIndex : 'WorkprocedureDayStatus',width:'7.5%' ,renderer:rendererSon},
					{header : '看板数据',dataIndex : 'ShowBoardAlready',width:'7.5%' ,renderer:rendererSon},
					{header : '当前责任人',dataIndex : 'NoticeList',width:'20%',renderer:rendererFather}	
    
			],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.dip_kanban.store.ff.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据'
			}]

		});
function rendererFather(v,m) {
	m.tdCls = 'x-grid-record-brown';
	return '<span style="COLOR:#000000">'+v+'</span>';	
}
function rendererSon(v,m) {
	if (v=='NG'){
		m.tdCls = 'x-grid-record-red';
	}else if (v=='OK'){
		m.tdCls = 'x-grid-record-green';				
	}else{
		m.tdCls = 'x-grid-record-orange';							
	}
	return '<span style="text-align:center;COLOR:#ffffff">'+v+'</span>';
	
}