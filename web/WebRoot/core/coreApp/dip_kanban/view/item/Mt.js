Ext.define("core.dip_kanban.view.item.Mt", {
			extend : "Ext.grid.Panel",
			alias : 'widget.dip_mt_kb',
			loadMask : true,
			stripeRows : true,
		    layout: 'fit',
//		    id:'images-view-mt',
		    bodyStyle:'background:#666666;padding:1px;',
			store : 'core.dip_kanban.store.mt.Store',
			columns : [
					{header : '序号',dataIndex : 'B_ID',flex:1,hidden:true},
					{header : '工单',dataIndex : 'MOName',width:'12%' ,renderer:rendererFather}, 
					{header : '人员',dataIndex : 'Staff',width:'7.5%' ,renderer:rendererSon}, 
					{header : '设备',dataIndex : 'Instrument', width:'7.5%' ,renderer:rendererSon},
//					{header : '物料',dataIndex : 'Materials', width:'5%' ,renderer:rendererSon},
//					{header : '方法',dataIndex : 'DoMethod',width:'5%' ,renderer:rendererSon},								
					{header : '拣料单生成',dataIndex : 'PickingListCreated', width:'7.5%' ,renderer : rendererSon},
					{header : '拣料单齐套',dataIndex : 'PickingListAlready', width:'7.5%' ,renderer:rendererSon},
					{header : 'AB面维护',dataIndex : 'FirstSideEntered', width:'7.5%' ,renderer:rendererSon},
					{header : '料站表维护',dataIndex : 'SMTMountAlready',width:'7.5%' ,renderer:rendererSon},
					{header : '料站表同步',dataIndex : 'SynSMTMountDone',width:'7.5%' ,renderer:rendererSon},
					{header : 'PMC计划',dataIndex : 'MOPlaned',width:'7.5%' ,renderer:rendererSon},			
					{header : '看板数据',dataIndex : 'ShowBoardAlready',width:'7.5%' ,renderer:rendererSon},
					{header : '环境',dataIndex : 'Environment', width:'7.5%',renderer:rendererSon},	
					{header : '当前责任人',dataIndex : 'NoticeList',width:'20%',renderer:rendererFather}					
			],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.dip_kanban.store.mt.Store',
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
		m.tdCls = 'x-grid-record-yellow';							
	}
	return '<span style="text-align:center;COLOR:#ffffff">'+v+'</span>';
	
}