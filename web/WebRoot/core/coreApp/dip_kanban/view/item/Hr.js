Ext.define("core.dip_kanban.view.item.Hr", {
			extend : "Ext.grid.Panel",
			alias : 'widget.dip_hr_kb',
			loadMask : true,
			stripeRows : true,
			store : 'core.dip_kanban.store.hr.Store',
			columns : [
			           {xtype:'rownumberer',text:'序号',flex : 0.2},
			           {header : '日期',dataIndex : 'Date',flex : 1.2,renderer:function(value){
			     return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus6(value);}},
			           {header : '班次',dataIndex : 'Shift',flex : 0.8 }, 
			           {header : '报表类型',dataIndex : 'PMC_SG',flex : 0.8,hidden:true },
			           {header : '线体',dataIndex : 'WorkcenterName',flex : 1.4 }, 
			           {header : '工单',dataIndex : 'MOName',flex : 1.8 }, 
			           {header : '整机料号',dataIndex : 'ProductName',flex : 0.8 },
			           {header : '机型',dataIndex : 'ProductFamilyName',flex : 0.8 }, 
			           {header : '制程',dataIndex : 'workprocedure',flex : 0.8 }, 
			           {header : '作业员',dataIndex : 'PMC_QTY',flex : 0.8 }, //排产作业员
			           {header : '实际作业员',dataIndex : 'SG_ZYY',flex : 0.8 }, 	
			           {header : '作业员差异',dataIndex : 'Direct_CY',flex : 0.8 },	
			           {header : '生产间接',dataIndex : 'ProductionIndirect',flex : 0.8 }, //生产人力
			           {header : '工程间接',dataIndex : 'ProjectIndirect',flex : 0.8 }, //工程人力
			           {header : '品质间接',dataIndex : 'QualityIndirect',flex : 0.8  },//品质人力			           
			           {header : '间接人员',dataIndex : 'StandardindirectOfPeople',flex : 0.8 },  //排产间接人力			                     
			           {header : '实际生产间接',dataIndex : 'SG_QTY',flex : 0.8 },  	//上岗人力
			           {header : '实际工程间接',dataIndex : 'SG_ZL',flex : 0.8 },  		 //上岗助拉
			           {header : '实际品质间接',dataIndex : 'SG_ZZ',flex : 0.8  },  		 //上岗组长
			           {header : '实际间接人力',dataIndex : 'IndirectQty',flex : 0.8 },//上岗作业员	
			           {header : '间接人力差异',dataIndex : 'Indirect_CY',flex : 0.8 }	,		
			           {header : '总差异',dataIndex : 'HR_CY',flex : 0.8 }	
					],
					dockedItems:[{
						xtype:'pagingtoolbar',
						store : 'core.dip_kanban.store.hr.Store',
						dock:'bottom',
						displayInfo:true,
						displayMsg:'第{0} 到 {1} 条数据 共{2}条',
						emptyMsg:'没有数据'
					}]
		});