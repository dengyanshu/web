var Workcenterid=null;
var hw_line_runner=new Ext.util.TaskRunner();

var mo=null;
var WorkCenterName=null;
var  FlowName=null;

var hw_line_list_task=null;
var hw_line_list_p;

Ext.define("core.hw_line_kanban.controller.Controller",{
	extend:"Ext.app.Controller",
	
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		MaskMsgUtil:'core.util.model.MaskMsgUtil',
		MessageUitl:'core.util.MessageUtil'
	},

	init:function(){
		var self=this;
		coreApp=self;
		this.control(
			{
			'panel[xtype=hw_line_kb_lines] dataview':{
				itemclick:function(view, record, item, index, e, eOpts ){
					Workcenterid=record.data.WorkcenterId;
					mo=record.data.MoName;
					FlowName=record.data.FlowName;
					var layout=view.up('hw_line_kb_main').getLayout();	
					var store = Ext.data.StoreManager.map['core.hw_line_kanban.store.sl.Store'];
					store.removeAll();
					store.getProxy().extraParams={mo:mo,limit : 4,page : 1,WorkcenterId:Workcenterid,FlowName:FlowName};
					store.load();
					layout.setActiveItem(1);
				}
			},
			
			'panel[xtype=hw_line_kb_moview]':{
				itemclick:function(view, record, item, index, e, eOpts ){
					var width = comm.get("resolutionWidth") * 1;
					var height = comm.get("resolutionHeight") * 0.85;
					var mo=record.data.MOName;
					var line=record.data.WorkcenterName;
					var productName=record.data.ProductName;
					var FlowName=record.data.FlowName;//FlowName
					//alert(FlowName);
					ff_line_list_p=1;
					var window=Ext.create('Ext.Window',{
						width:1100,
						height:660,
						maximized:true,
						layout:'fit',
						//frame:true,
						border:false,
						plain:true,
						style:"background:black;padding:10 10 10 10",
						//title:'信息[ 工作中心:'+line+' ][ 工单:'+mo+' ][机型：'+productName+']',
						listeners:{
							beforehide:function(e,Opts){
								hw_line_runner.stop(hw_line_list_task);
								hw_line_list_p=1;
							}
						}
					}).show();
				
					hw_line_list_task={
					   run:function(){
								window.removeAll();
								//window.setTitle('信息[ 工作中心:'+line+' ][ 工单:'+mo+' ][机型：'+productName+']');
								window.add({xtype:'hw_line_sl_listnew_kb'});
								var frompanel=window.down('hw_line_sl_listnew_kb');
								var form=frompanel.getForm();
//								frompanel.getForm().load({
//								    url:'/web/kanban/hw_sl_list!getResult.action',
//								    method:'POST',
//								    params:{mo:mo,Workcenterid:Workcenterid,FlowName:FlowName},
//								    failure: function(form, action) {
//								        Ext.Msg.alert("Load failed", action.result.errorMessage);
//								    	alert('1111');
//								    	var res=action.result;
//								    	alert(res);
//								    },
//								    success:function(form,action){
//								        Ext.Msg.alert("Load success", action.result.errorMessage);
//								    }
//								});
								
								Ext.Ajax.request({
				     				 url : '/web/kanban/hw_sl_list!getResult.action', 
				     				 params:{mo:mo,Workcenterid:Workcenterid,FlowName:FlowName},
				     				 success : function(response, opts) {
		                 				//alert(response.responseText);
		                				var obj = Ext.decode(response.responseText);
		               					var data=obj.data;
		               					form.setValues(data);
		               					
		               					var xiaolv2=form.findField('Efficiency2').getValue();
		               					xiaolv2=xiaolv2.substring(0,xiaolv2.length-1);
		               					var xiaolv_num=Ext.Number.from(xiaolv2,0);
		               					if(xiaolv_num<=85){
		               						form.findField('TimeSlice2').setFieldStyle("background:red;");
		               						form.findField('StandardProduct2').setFieldStyle("background:red;");
		               						form.findField('Productivity2').setFieldStyle("background:red;");
		               						form.findField('Efficiency2').setFieldStyle("background:red;");
		               						form.findField('FaultDescription2').setFieldStyle("background:red;");
		               					}
		               					
		               					var xiaolv1=form.findField('Efficiency1').getValue();
		               					xiaolv1=xiaolv1.substring(0,xiaolv1.length-1);
		               					var xiaolv_num1=Ext.Number.from(xiaolv1,0);
		               					if(xiaolv_num1<=85){
		               						form.findField('TimeSlice1').setFieldStyle("background:red;");
		               						form.findField('StandardProduct1').setFieldStyle("background:red;");
		               						form.findField('Productivity1').setFieldStyle("background:red;");
		               						form.findField('Efficiency1').setFieldStyle("background:red;");
		               						form.findField('FaultDescription1').setFieldStyle("background:red;");
		               					}
									 },
								     failure : function(response, opts) {
							            obj = Ext.decode(response.responseText);
							            Ext.Msg.alert("系统提示", obj.returnMsg);
	                  	            }
								})	;
						},
						interval:60000
					};
					hw_line_runner.start(hw_line_list_task);
				}
			}, 
			'panel[xtype=hw_line_kb_moview] button[action=return]':{
				click:function( but, e, eOpts ){
					var layout=but.up('hw_line_kb_main').getLayout();
					var store = Ext.data.StoreManager.map['core.hw_line_kanban.store.Store'];
					//store.getProxy().params={limit : 25,page : 1,WorkcenterId:Workcenterid};
					store.load();
					layout.setActiveItem(0);
				}
			},
			'window[id=8a81a0f0564ef86c01564f01acd90001_win]':{
				beforehide:function(e,Opts){
					hw_line_runner.stopAll();
				}
			},
			
			'window[id=8a81a0f0564ef86c01564f01acd90001_win] button[id=minimize]':{
				
			},
			'window[id=8a81a0f0564ef86c01564f01acd90001_win] button[id=maximize]':{
				
			}
		}
		);
	},
	views:[
		'core.hw_line_kanban.view.Main',
		'core.hw_line_kanban.view.Lines',
		'core.hw_line_kanban.view.MoView',
		'core.hw_line_kanban.view.List',
		'core.hw_line_kanban.view.SlList',
		'core.hw_line_kanban.view.SlListnew'
		
		
	],
	stores:[
		'core.hw_line_kanban.store.Store'
		,'core.hw_line_kanban.store.sl.Store',
		'core.hw_line_kanban.store.sl.ListStore'
	],
	models:[
		 'core.hw_line_kanban.model.Model'
		,'core.hw_line_kanban.model.sl.Model',
		'core.hw_line_kanban.model.sl.ListModel'
	]
	
});