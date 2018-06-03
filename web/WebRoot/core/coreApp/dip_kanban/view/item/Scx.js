Ext.define("core.dip_kanban.view.item.Scx", {
			extend : "Ext.grid.Panel",
			alias : 'widget.dip_scx_kb',
			loadMask : true,
			stripeRows : true,
			store : 'core.dip_kanban.store.scx.Store',
			columns : [
					{xtype:'rownumberer',text:'序号',flex : 0.4},
					{header : '日期',dataIndex : 'Fdate',flex : 1.4,renderer:function(value){
					return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatusDate(value);}},
					{header : '班次',dataIndex : 'Shift',flex : 1.4 }, 
					{header : '线体',dataIndex : 'WorkcenterName',flex : 1.4 }, 
					{header : '工单',dataIndex : 'MoName',flex : 1.8}, 
					{header : '成品编码',dataIndex : 'ProductName',flex : 1.4 }, 
					{header : '产品规格',dataIndex : 'ProductSpecification',flex : 1.4 }, 
					{header : '制程清单',dataIndex : 'WorkprocedureFlowName_List',flex : 1.2 },
					{header : '完成产量',dataIndex : 'SumYield',flex : 0.8},
					{header : '计划产量',dataIndex : 'MOQtyRequired',flex : 0.8},
					{header : '计划工时',dataIndex : 'JihuaTime',flex : 0.8},
					{header : '标准工时',dataIndex : 'StandardTotalOfTime',flex : 0.5},
					{header : '实际工时',dataIndex : 'SumTime',flex : 0.5 },
					{header : '异常工时',dataIndex : 'FailTime',flex : 0.5 },
					{header : '实际工时效率',dataIndex : 'Xiaolv',flex : 1.0,renderer:function(value){
    					return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus4(value);}}
//					{header : '实际工时效率',dataIndex : 'Xiaolv',flex : 1.0}
					
			],
			
			tbar :[
		  '查询日期:',{
     		        	xtype: 'datefield',
  			        	width:150,
  			        	editable:false,	//不可填写
  			        	emptyText:'请选择查询日期',
  			        	applyTo : 'txtDate', 
  			        	format: 'Y-m-d',
  			        	id:'chaxunrqscx',
  			        	name : 'chaxunrqscx',
  			        	maxValue: new Date(new Date()-1*24*60*60*1000),
  			        	value: new Date(new Date()-1*24*60*60*1000)
  			        },
  			  '班次',{
			        	
						xtype:'combo',
						width:120,
						store:Ext.create("Ext.data.Store",{
							fields:['key','value'],
							data:[
								{key:'白班',value:'11:00:00.000'},
								{key:'晚班',value:'23:00:00.000'}
							]
						}),
						emptyText:'请选择班次',
						anchor:'100%',
						queryMode:'local',
						editable : false,// 是否允许输入
						displayField:'key',  //哪个字段作为标签
						valueField:'value', // 值,可选
						forceSelection : true,// 必须选择一个选项
						forceSelection:true,   //是否通过选择方式选择
						id : 'bancisjscx',
						name:'bancisjscx'
  			        },
				    {
					xtype:'button',
				    text:'查询',
				    action: 'button_scxid',
				    disabled:false,
				    handler:function(){
				    	if(null != Ext.getCmp("bancisjscx").getValue())
			    		{
				    	var chaxunrq= Ext.getCmp("chaxunrqscx").getValue();
				    	var bancisj=Ext.getCmp("bancisjscx").getValue();
				    	 var time=Ext.Date.format(new Date(chaxunrq),'Y-m-d'+' '+bancisj);
				    	var store=Ext.data.StoreManager.map['core.dip_kanban.store.scx.Store'];
				    	Ext.Ajax.request({
				    		url :'/web/kanban/dip_scx!getResult.action',
				    		params:{limit:100,page:1,time:time},
				    		success : function(response,opts){
				    			var obj = Ext.decode(response.responseText);
				    			var total=obj.total;
				    			var data=obj.data;
				    			store.removeAll();
				    			if(data[0].ErrorMsg!=null){
				    				Ext.Msg.alert("系统提示",data[0].ErrorMsg);
				    			}else{
				    			store.proxy.data=data;
				    			store.load();
				    			}
				    		}
				    	});
				    }else{
						alert('请输入查询班次'); 
					}
				    	}}
				   ],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.dip_kanban.store.scx.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据',
			}],
			viewConfig:{
				forceFit:true,
				enableRowBody:true,
				getRowClass:function(record,rowIndex,p,store){
					var cls='';
					if(record.data.FailTime!="0.00"){ //等同于record.get('isAlert')
						cls="row-red .x-grid-cell";
					}
					return cls;
				}
			}

		});