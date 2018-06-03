Ext.define("core.dc_sh_kanban.view.ResultView",{
	extend:'Ext.grid.Panel',
	layout:'fit',
	alias:'widget.dc_sh_kanban_result',
	store:'core.dc_sh_kanban.store.Store',
	bodyStyle: 'background:#006699;',
	 columnLines:true,
	 title:'<font size="4" color="black">大仓收货作业</font>',
	columns : [
	       {header : '序号',dataIndex : 'RowNum',width : 60},
	       {header : '预约批次',dataIndex : 'AppointLot',width: 120},
			{header : '供应商',dataIndex : 'VendorDescription',width : 160},
			{header : '送货人',dataIndex : 'name',width : 120}, 
			{header : '进厂时间',dataIndex : 'IntoFactoryDate',width : 160},
			{header : '收货状态',dataIndex : 'ReceiveStatus',width : 120}
	],
	dockedItems:[{
		xtype:'pagingtoolbar',
		store : 'core.dc_sh_kanban.store.Store',
		dock:'bottom',
		displayInfo:true,
		pageSize:15,
		displayMsg:'第{0} 到 {1} 条数据 共{2}条',
		emptyMsg:'没有数据'
	}],
	viewConfig:{
		forceFit:true,
		enableRowBody:true,
		getRowClass:function(record,rowIndex,p,store){
			var cls='';
			if(record.data.ReceiveStatus=="正在收货"){ //等同于record.get('isAlert')
				cls="row-yellow .x-grid-cell";
			}else {
				cls="row-orange .x-grid-cell";
			}
			return cls;
		}
	}

});