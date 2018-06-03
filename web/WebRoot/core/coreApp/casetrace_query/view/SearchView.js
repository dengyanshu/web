Ext.define("core.casetrace_query.view.SearchView", {
			extend : 'Ext.form.Panel',
			alias : 'widget.casetrace_search',
			region : 'west',
			width : 200,
			bodyPadding : 5,
			defaults : {
				anchor : '100%'
			},
			defaultType : 'textfield',
			layout : 'anchor',
			fieldDefaults:{labelAlign:'top'},
			collapsible:true,
			items : [{
						xtype : 'combo',
						fieldLabel : '人员选择',
						displayField : 'username',
						valueField : 'userCode',
						name:'userCode',
						store : 'core.casetrace_query.store.DepUserStore'
					}, {
						xtype:'combo',
						displayField:'statusV',
			        	valueField:'statusK',
			        	name:'status',
			        	fieldLabel:'状态选择',
			        	queryMode:'local',
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
			        	},{
						xtype : 'datetimefield',
						format : 'Y-m-d H:i:s',
						fieldLabel : '更新开始时间',
						name : 'updateStartTime',
						anchor : '100%'
					}, {
						xtype : 'datetimefield',
						format : 'Y-m-d H:i:s',
						fieldLabel : '更新结束时间',
						name : 'updateEndTime',
						anchor : '100%'
					}],
			buttons:[
				{text:'精确查找',ref:'submit'},
				{text:'重置',ref:'reset'}
			]
		});