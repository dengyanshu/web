//static var store=null;
//var tj_sc_runner=new Ext.util.TaskRunner();
Ext.define("core.tj_sc_kanban.view.item.ShSc", {
			extend : "Ext.grid.Panel",
			alias : 'widget.tj_sc_sh_kb',
			loadMask : true,
			stripeRows : true,
			store : 'core.tj_sc_kanban.store.sh.Store',

			columns : [
					{header : '序号',dataIndex : 'RowNum',flex : 0.4},
					{header : '线别ID',dataIndex : 'Workcenterid',hidden:true}, 
					{header : 'ProductFamilyShortName',dataIndex : 'ProductFamilyShortName',hidden:true}, 
					{header : 'ProductName',dataIndex : 'ProductName',hidden:true}, 
					{header : '线别',dataIndex : 'WorkcenterName',flex : 1.4}, 
					{header : '班别',dataIndex : 'Shift',hidden:true}, 
					{header : '当前工单',dataIndex : 'MoName',flex : 1.2},
					{header : '产出',dataIndex : 'SumYield',flex : 0.8},
					{header : '工时',dataIndex : 'SumTime',flex : 0.8},
					{header : 'UPH',dataIndex : 'UPHStanTime',flex : 0.8},
					{header : 'APC',dataIndex : 'AvgYield',flex : 0.8},
					{header : '工单ID',dataIndex : 'MOId',hidden:true},
					{header : '标准人力',dataIndex : 'StandardHuman',hidden:true},
					{header : '产品描述',dataIndex : 'productDescription',hidden:true},
					{header : '工单数量',dataIndex : 'MOQtyRequired',hidden:true},
					{header : '达成率',dataIndex : 'AchieveRate',flex : 2.6,renderer:function(value){
						return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus3(value);}}
					//return Math.round(value*10000)/100+"%";}
						//var s=value.substring(0,s.indexOf(".")+3);return value*100+"%";}}
			],
			tbar :[
           		        '查询日期:',
        			      {		
        			        	xtype: 'datefield',
        			        	width:150,
        			        	editable:false,	//不可填写
        			        	emptyText:'请选择查询日期',
        			        	applyTo : 'txtDate', 
        			        	format: 'Y-m-d',
        			        	id:'chaxunrqsh',
        			        	name : 'chaxunrqsh',
        			        	maxValue: new Date(),
        			        	value: new Date()
        			        },'班次',
  			        {
  			        	
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
  						    //	store:waaa,     数据对象
  							//typeAhead:false,    是否自动填充
  							queryMode:'local',
  							editable : false,// 是否允许输入
  							displayField:'key',  //哪个字段作为标签
  							valueField:'value', // 值,可选
  							//blankText : '请选择',// 该项如果没有选择，则提示错误信息,
  							forceSelection : true,// 必须选择一个选项
  							forceSelection:true,   //是否通过选择方式选择
  							//fieldLabel:'班次',
  							id : 'bancisjsh',
  							name:'bancisjsh'
  			        }
			,
			{
				xtype:'button',
			    text:'查询',
			    action: 'button_shid',
			    //type:'submit',
			    disabled:false,
			    handler:function(){
			    	
			    	if(null != Ext.getCmp("bancisjsh").getValue())
			    		{
			    	var chaxunrq= Ext.getCmp("chaxunrqsh").getValue();
			    	//alert('查询日期:'+Ext.Date.format(new Date(chaxunrq),'Y-m-d'));
			    	var bancisj=Ext.getCmp("bancisjsh").getValue();
			    	//alert('查询时间:'+bancisj);
			    	 var rq_time=Ext.Date.format(new Date(chaxunrq),'Y-m-d')+' '+bancisj;
			    	//alert('查询:'+rq_time);
			    	var store=Ext.data.StoreManager.map['core.tj_sc_kanban.store.sh.Store'];
			    	Ext.Ajax.request({
			    		url :'/web/kanban/tj_sc_sh!getResult.action' ,
			    		params:{limit:17,page:1,ShTime:rq_time},
			    		success : function(response){

			    			
			    			store.removeAll();
			    			
			    			autoLoad:true,
			    			
			    			store.load({
			    				params:{limit:17,page:1,ShTime:rq_time},
					    scope:store,
					    	//add:true
					    	});
//			    			var tj_sc_zm_task=this.tj_sc_zm_task;
//			    			tj_sc_runner.stop(tj_sc_zm_task);
			    		}
			    		
			    	});
			    	
			    	
			    }
			else{
				alert('请输入查询班次'); 
			}
			    	}
			    }
],

			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.tj_sc_kanban.store.sh.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据',
			}]

		});