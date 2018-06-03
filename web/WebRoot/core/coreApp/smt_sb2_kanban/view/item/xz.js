Ext.define("core.smt_sb2_kanban.view.item.xz", {
			extend : "Ext.grid.Panel",
			alias : 'widget.smtsb2_xz_kb',
			loadMask : true,
			stripeRows : true,
			store : 'core.smt_sb2_kanban.store.xz.Store',
		
			columns : [
					{header : '序号',dataIndex : 'RowNum',flex : 0.4},
					{header : '编号',dataIndex : 'DevicePartsNum',flex : 1.2}, 
					{header : '位置',dataIndex : 'WorkCenterName',flex : 1.2},
					{header : '执行动作',dataIndex : 'MaintainType',flex : 1.2},
					{header : '状态',dataIndex : 'DevicePartsStatus',flex : 0.8,
					 renderer:function(v,m) {
					               	   if(v.indexOf("OK")>=0){
					               	   	    m.tdCls = 'x-grid-record-green';
					               	   }
					               	    else if(v=="警告"){
					               	   	    m.tdCls = 'x-grid-record-yellow';
					               	   }
	                                   else{
	                                         m.tdCls = 'x-grid-record-red';
	                                   }
                                        return '<span style="COLOR:#000000">'+v+'</span>';	
                                   }
					}, 
					
					{header : '数量',dataIndex : 'Qty',flex : 0.8},
					{header : '剩余小时',dataIndex : 'MaintainPeriod',flex : 1.0,
					       renderer:function(v,m, record, rowIndex, columnIndex, store) {
					   				  var v_my=record.data.alertDay;
					               	   if(v_my==1){
					               	   	    m.tdCls = 'x-grid-record-red';
					               	   }
					               	    else if(v_my==2) {
	                                         m.tdCls = 'x-grid-record-yellow';
	                                   }
	                                   else {
	                                         m.tdCls = 'x-grid-record-green';
	                                   }
                                        return '<span style="COLOR:#000000">'+v+'</span>';	
                                   }
					},
					
					{header : '作业员',dataIndex : 'MaintainUser',flex : 1.4},
					{header : '时间',dataIndex : 'MaintainDate',flex : 1.6}
			],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.smt_sb2_kanban.store.xz.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据'
			}]

		});