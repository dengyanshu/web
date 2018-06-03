Ext.define("core.dip_kanban.view.item.Zcb", {
			extend : "Ext.grid.Panel",
			alias : 'widget.dip_zcb_kb',
			loadMask : true,
			stripeRows : true,
			store : 'core.dip_kanban.store.zcb.Store',
			columns : [
//					{header : '序号',dataIndex : 'RowNum',flex : 0.4},
					{xtype:'rownumberer',text:'序号',flex : 0.4},
					{header : '线别ID',dataIndex : 'Workcenterid',hidden:true}, 
					{header : 'ProductFamilyShortName',dataIndex : 'ProductFamilyShortName',hidden:true}, 
					{header : 'ProductName',dataIndex : 'ProductName',hidden:true}, 
					{header : '线别',dataIndex : 'WorkcenterName',flex : 1.4}, 
//					{header : '上岗卡机',dataIndex : 'OnGwkName',flex : 1.4},
//					{header : '下岗卡机',dataIndex : 'OffGwkName',flex : 1.4},
					{header : '班别',dataIndex : 'Shift',hidden:true},
					{header : '制程列表',dataIndex : 'WorkprocedureFlowName_List',flex : 1.2},
					{header : '当前工单',dataIndex : 'MoName',flex : 1.2},
					{header : '标准产能',dataIndex : 'UPH',flex : 0.8},
					{header : '产出',dataIndex : 'SumYield',flex : 0.8},
					{header : '平均产能',dataIndex : 'AvgYield',flex : 0.8},
					{header : '工时',dataIndex : 'SumTime',flex : 0.8},						
					{header : '节点ID',dataIndex : 'Specificationid_End',hidden:true},
					{header : '工单ID',dataIndex : 'MOId',hidden:true},
					{header : '标准人力',dataIndex : 'StandardHuman',hidden:true},
					{header : '产品描述',dataIndex : 'productDescription',hidden:true},
					{header : '工单数量',dataIndex : 'MOQtyRequired',hidden:true},
					{header : '达成率',dataIndex : 'AchieveRate',flex : 3.8,renderer:function(value){
						return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus3(value);}}
			],
			tbar :['查询日期:',{
        			        	xtype: 'datefield',
        			        	width:150,
        			        	editable:false,	//不可填写
        			        	emptyText:'请选择查询日期',
        			        	applyTo : 'txtDate', 
        			        	format: 'Y-m-d',
        			        	id:'chaxunrqzcb',
        			        	name : 'chaxunrqzcb',
        			        	maxValue: new Date(),
        			        	value: new Date()
        			        },'班次',{
  							xtype:'combo',
  							width:120,
  							store:Ext.create("Ext.data.Store",{
  								fields:['key','value'],
  								data:[
  									{key:'早班',value:'11:00:00.000'},
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
  							id : 'bancisjzcb',
  							name:'bancisjzcb'
  			        },{
				xtype:'button',
			    text:'查询',
			    action: 'button_zcbid',
			    disabled:false,
			    handler:function(){
			    if(null != Ext.getCmp("bancisjzcb").getValue()){
		var rq_time=Ext.Date.format(new Date(Ext.getCmp("chaxunrqzcb").getValue()),'Y-m-d')+' '+Ext.getCmp("bancisjzcb").getValue();
		var store = Ext.data.StoreManager.map['core.dip_kanban.store.zcb.Store'];
			    	Ext.Ajax.request({
			    		url :'/web/kanban/dip_zcb!getResult.action',
			    		params:{limit:100,page:1,ZcbTime:rq_time},
			    		success : function(response, opts) {
			    			var obj = Ext.decode(response.responseText);
			    			var total=obj.total;
			    			var data=obj.data;
			    			store.removeAll();
			    			if(total==0){
			    				Ext.Msg.alert("系统提示",data[0].ErrorMsg);
			    			}else{
			    			store.proxy.data=data;
			    			store.load();
			    			}
			    		}});
			    }else{
				alert('请输入查询班次'); 
			}}}],

			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.dip_kanban.store.zcb.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据',
			}]

		});