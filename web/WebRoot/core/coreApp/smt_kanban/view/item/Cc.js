Ext.define("core.smt_kanban.view.item.Cc", {
			extend : "Ext.grid.Panel",
			alias : 'widget.smt_cc_kb',
			loadMask : true,	 
			stripeRows : true,
			store : 'core.smt_kanban.store.cc.Store',
			columns : [
					{header : '序号',dataIndex : 'RowNum',flex : 0.4},
					{header : '线别ID',dataIndex : 'Workcenterid',hidden:true}, 
					{header : 'ProductFamilyShortName',dataIndex : 'ProductFamilyShortName',hidden:true}, 
					{header : 'ProductName',dataIndex : 'ProductName',hidden:true}, 
					{header : '线别',dataIndex : 'WorkcenterName',flex : 1.4}, 
					{header : '班别',dataIndex : 'Shift',flex : 1.2}, 
					{header : '当前工单',dataIndex : 'MoName',flex : 1.2},
					{header : '累计产出数',dataIndex : 'SumYield',flex : 0.8},
					{header : '累计工时数',dataIndex : 'SumTime',flex : 0.8},
					{header : 'UPH',dataIndex : 'StanTime',flex : 0.8},
					{header : '平均产出数',dataIndex : 'AvgYield',flex : 0.8},
					{header : '达成率',dataIndex : 'AchieveRate',flex : 2.6,renderer:function(value){
						return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus3(value);}}
					//return Math.round(value*10000)/100+"%";}
						//var s=value.substring(0,s.indexOf(".")+3);return value*100+"%";}}
			],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.smt_kanban.store.cc.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据'
			}]
		});