Ext.define("core.casetrace_manage.view.Main",{
	extend:'Ext.grid.Panel',
	alias:'widget.casetracemanage',
	store: 'core.casetrace_manage.store.Store',
	columns: [
		{xtype:'rownumberer',text:'序号',width:50},
	    { text: '处理人',  dataIndex: 'disposeUser',width:100,editor:{xtype:'textfield',grow:true,allowBlank:false}},
		{ text: '案件编号',  dataIndex: 'caseNumber',width:150,editor:{xtype:'textfield',grow:true,allowBlank:false}},
		{ text: '案件名称',  dataIndex: 'caseName',width:150,editor:{xtype:'textfield',grow:true,allowBlank:false}},
		{ text: '案件任务',  dataIndex: 'caseTask',width:150,editor:{xtype:'textfield',grow:true,allowBlank:false}},
		{ text: '案件类型',  dataIndex: 'caseType',width:100,editor:{
			        	xtype:'combo',displayField:'caseV',
			        	valueField:'caseK',queryMode:'local',
			        	store:Ext.create("Ext.data.Store",{
			        		fields:['caseK','caseV'],
			        		data:[
			        			{"caseK":'生产',"caseV":'生产'},
			        			{"caseK":'工具',"caseV":'工具'}
			        		]
			        	})
			        }},
		 { text: '申请时间',  dataIndex: 'applyTime',width:150,renderer:function(value){
		 	if(value=="1900-01-01 00:00:00.0"){
		 		return "";
		 	}else{
				return value.substring(0, 19);  
		 	}
		},editor:{xtype:'datetimefield',format:'Y-m-d H:i:s' }},
		 { text: '需求时间',  dataIndex: 'demandTime',width:150,renderer:function(value){
		 	if(value=="1900-01-01 00:00:00.0"){
		 		return "";
		 	}else{
				return value.substring(0, 19);  
		 	}
		},editor:{xtype:'datetimefield',format:'Y-m-d H:i:s' }},
		 { text: '预计完成时间',  dataIndex: 'predictAccomplishTime',width:150,renderer:function(value){
		 	if(value=="1900-01-01 00:00:00.0"){
		 		return "";
		 	}else{
				return value.substring(0, 19);  
		 	}
		},editor:{xtype:'datetimefield',format:'Y-m-d H:i:s' }},
		 { text: '实际完成时间',  dataIndex: 'realityAccomplishTime',width:150,renderer:function(value){
		 	if(value=="1900-01-01 00:00:00.0"){
		 		return "";
		 	}else{
				return value.substring(0, 19);  
		 	}
		},editor:{xtype:'datetimefield',format:'Y-m-d H:i:s' }},
		 { text: '状态',  dataIndex: 'status',width:150,editor:{
			        	xtype:'combo',displayField:'statusV',
			        	valueField:'statusK',queryMode:'local',
			        	store:Ext.create("Ext.data.Store",{
			        		fields:['statusK','statusV'],
			        		data:[
			        			{"statusK":'已驳回',"statusV":'已驳回'},
			        			{"statusK":'进行中',"statusV":'进行中'},
			        			{"statusK":'待验证',"statusV":'待验证'},
			        			{"statusK":'验证OK',"statusV":'验证OK'},
			        			{"statusK":'外部异常',"statusV":'外部异常'},
			        			{"statusK":'内部异常',"statusV":'内部异常'},
			        			{"statusK":'完成',"statusV":'完成'}
			        		]
			        	})
			        }},
			{ text: '详细说明',  dataIndex: 'expatiation',width:150,editor:{xtype:'textareafield',grow:true,allowBlank:false},
				renderer:function(value){
					return value.replace(/<br>/g,"##");
				}
			},
		    { text: '更新时间',  dataIndex: 'updateTime',width:150,renderer:function(value){return value.substring(0, 19);     }},
			{ text: '申请人', dataIndex: 'applicant',width:150,editor:{xtype:'textfield',grow:true,allowBlank:false}}
		],
		selType:'checkboxmodel',
		tbar:[
				{
					xtype:'button',
					text:'添加',
					ref:'gridInsert',
					iconCls:'table_add'
				},
				{
					xtype:'button',
					text:'删除',
					ref:'gridDelete',
					iconCls:'table_remove'	
				},
				{
					xtype:'button',
					text:'保存',
					ref:'gridSave',
					iconCls:'table_save'
				}
				],		
		initComponent:function(){
			//配置可编辑插件 RowEditing  CellEditing
			this.editing=Ext.create('Ext.grid.plugin.CellEditing',{clicksToEdit:2});
			this.editing.on("beforeedit",function( editor, e, eOpts ){e.value="";});
			this.plugins=this.editing;
			this.callParent(arguments);
		},
		features: [{ftype:'grouping',frame:true,startCollapsed:false}],
		viewConfig:{
					forceFit:true,
					enableRowBody:true,
					getRowClass:function(record,rowIndex,p,store){
						var cls="";
						if(record.get('status')=="已驳回"){
							 cls="row-red .x-grid-cell";
						}else if(record.get('status')=="进行中"){
							 cls="row-orange .x-grid-cell";
						}else if(record.get('status')=="待验证" || record.get('status')=="验证OK"){
							 cls="row-green .x-grid-cell";
						}else if(record.get('status')=="外部异常" || record.get('status')=="内部异常"){
							 cls="row-qianchen .x-grid-cell";
						}
						return cls;
				}
		}
});