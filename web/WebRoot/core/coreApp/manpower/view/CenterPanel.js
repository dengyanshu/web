Ext.define("core.manpower.view.CenterPanel",{
	extend:'Ext.grid.Panel',
	alias:'widget.manpower-centerpanel',
	store:'core.manpower.store.Store',
	region:'center',
	columns:[
			   { text: 'NO.',  dataIndex: 'Ranknum' },
			   { text: '工序名称',  dataIndex: 'Workprocedurename' },
			   {text:'作业时间/S' ,
				   columns:[
			      { text: '取',  dataIndex: 'gettime',flex : 0.3 },
			      { text: '设备时间',  dataIndex: 'DeviceTime',flex : 0.3 },
			      { text: '操作',  dataIndex: 'OperationTime',flex : 0.3 },
			      { text: '放',  dataIndex: 'PutTime',flex : 0.3 },
			      { text: '合计',  dataIndex: 'TotalTime',flex : 0.3 }
			    ]},
			    //{ text: '人数',  dataIndex: 'NumOfPeople',flex : 2.5 },
			    { text: '人数', dataIndex: 'NumOfPeople',flex : 2.5  },
			    { text: '有效作业时间', dataIndex: 'EffectiveWorkTime',flex : 2.5  },
			    { text: '有效作业占工序时间%', dataIndex: 'EffectiveWorkTimepercent',flex : 2.5,renderer:function(value){
					return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus4(value);}  },
			    { text: '物料及用量', dataIndex: 'Material',flex : 5.5 },
			    { text: '设备&仪器/工装&工具', dataIndex: 'Instrument' },
			    { text: '品质管控点:', dataIndex: 'QualityControlPoint' }
			],
			bbar:[
		  		    {forId: '1',xtype:'label',text: '标准工时(S):',margin: '0 0 0 5'},
		  		    {forId: '2',xtype:'label',text: '0.0',margin: '0 0 0 5' 		},
		  		    { xtype: 'tbspacer', width: 5 }, 
		  		  	'-',
		  		  	{forId: '3',xtype:'label',text: '标准人数:',margin: '0 0 0 5'},
		  		    {forId: '4',xtype:'label',text: '0.0',margin: '0 0 0 5' 		},
		  		    { xtype: 'tbspacer', width:	5 }, 
		  		  	'-',
		  		    {forId: '1',xtype:'label',text: '标准产能(PCS/H):',margin: '0 0 0 5'},
		  		    {forId: '2',xtype:'label',text: '0.0',margin: '0 0 0 5' 		},
		  		    { xtype: 'tbspacer', width: 5 },
		  		  	'-',
		  		  	{forId: '3',xtype:'label',text: '瓶颈工时(S):',margin: '0 0 0 5'},
		  		    {forId: '4',xtype:'label',text: '0.0',margin: '0 0 0 5' 		},
		  		    { xtype: 'tbspacer', width: 5 },
		  		  	'-',
		  		    {forId: '1',xtype:'label',text: '人均产能(PCS):',margin: '0 0 0 5'},
		  		    {forId: '2',xtype:'label',text: '0.0',margin: '0 0 0 5' 		},
		  		    { xtype: 'tbspacer', width: 5 },
		  		  	'-',
		  		  	{forId: '3',xtype:'label',text: '生产线平衡率%:',margin: '0 0 0 5'},
		  		    {forId: '4',xtype:'label',text: '0.0',margin: '0 0 0 5' 		},
		  		    { xtype: 'tbspacer', width: 5 }, 
		  		  	'-',
		  		    {forId: '1',xtype:'label',text: '总有效作业占工序时间%:',margin: '0 0 0 5'},
		  		    {forId: '2',xtype:'label',text: '0.0',margin: '0 0 0 5' 		},
		  		    { xtype: 'tbspacer', width: 5 }
		  	    ]
	
});