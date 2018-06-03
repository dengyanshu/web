var Workcenterid=null;
var WorkCenterName=null;

var smt_tp_runner=new Ext.util.TaskRunner();


var smt_tp_list_task=null;
var smt_tp_list_p;

Ext.define("core.smt_tp_kanban.controller.Controller",{
	extend:"Ext.app.Controller",
	
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		MaskMsgUtil:'core.util.model.MaskMsgUtil',
		MessageUitl:'core.util.MessageUtil'
	},
	init:function(){
		var self=this;
		coreApp=self;
		this.control({
			'panel[xtype=smt_tp_kb_lines] dataview':{
				itemclick:function(view, record, item, index, e, eOpts ){
					Workcenterid=record.data.Workcenterid;
					WorkCenterName=record.data.WorkcenterName;
					var layout=view.up('smt_tp_kb_main').getLayout();	
					layout.setActiveItem(1);
					
					smt_tp_list_task={
							run:function(){
								var store1 = Ext.data.StoreManager.map['core.smt_tp_kanban.store.sl.Store1'];
								var result1=self.ajax({url:'/web/kanban/ff_sl_list!getResult22_1.action',params:{line:WorkCenterName}});	
								if(result1.success){
									store1.loadData(result1.data);
								}else{
									store1.removeAll();
									self.msgbox(result1.returnMsg);
								}
								
								
								
								var store2 = Ext.data.StoreManager.map['core.smt_tp_kanban.store.sl.Store2'];
								var result2=self.ajax({url:'/web/kanban/ff_sl_list!getResult22_2.action',params:{line:WorkCenterName}});	
								if(result2.success){
									store2.loadData(result2.data);
								}else{
									store2.removeAll();
									self.msgbox(result2.returnMsg);
								}
								
								var store3 = Ext.data.StoreManager.map['core.smt_tp_kanban.store.sl.Store3'];
								var result3=self.ajax({url:'/web/kanban/ff_sl_list!getResult22_3.action',params:{line:WorkCenterName}});	
								if(result3.success){
									store3.loadData(result3.data);
								}else{
									store3.removeAll();
									self.msgbox(result3.returnMsg);
								}
								
								var store4 = Ext.data.StoreManager.map['core.smt_tp_kanban.store.sl.Store4'];
								var result4=self.ajax({url:'/web/kanban/ff_sl_list!getResult22_4.action',params:{line:WorkCenterName}});	
								if(result4.success){
									store4.loadData(result4.data);
								}else{
									store4.removeAll();
									self.msgbox(result4.returnMsg);
								}
								
								
							},
							interval:60000
						};
					smt_tp_runner.start(smt_tp_list_task);
				}
				
			}
			,'panel[xtype=smt_tp_kb_moview] button[action=return]':{
				click:function( but, e, eOpts ){
					var layout=but.up('smt_tp_kb_main').getLayout();
					var store = Ext.data.StoreManager.map['core.smt_tp_kanban.store.Store'];
					//store.getProxy().params={limit : 25,page : 1,WorkcenterId:Workcenterid};
					store.load();
					layout.setActiveItem(0);
				}
			},
			'window[id=8a82809160e43c390160e45fb3190002_win]':{
				beforehide:function(e,Opts){
					smt_tp_runner.stopAll();
				}
			}
			/*
			,'window[id=8a81832046759cbf0146759eab7f0001_win] button[id=minimize]':{
				
			},
			'window[id=8a81832046759cbf0146759eab7f0001_win] button[id=maximize]':{
				
			}*/
		});
	},
	views:[
		'core.smt_tp_kanban.view.Main',
		'core.smt_tp_kanban.view.Lines',
		'core.smt_tp_kanban.view.MoView',
		'core.smt_tp_kanban.view.List'
	],
	stores:[
		'core.smt_tp_kanban.store.Store'
		,'core.smt_tp_kanban.store.sl.Store1'
		,'core.smt_tp_kanban.store.sl.Store2'
		,'core.smt_tp_kanban.store.sl.Store3'
		,'core.smt_tp_kanban.store.sl.Store4'
		],
	models:[
		'core.smt_tp_kanban.model.Model'
		,'core.smt_tp_kanban.model.sl.Model1'
		,'core.smt_tp_kanban.model.sl.Model2'
		,'core.smt_tp_kanban.model.sl.Model3'
		,'core.smt_tp_kanban.model.sl.Model4'
	]
	
});