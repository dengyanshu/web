var Workcenterid=null;
var ff_line_runner=new Ext.util.TaskRunner();

var mo=null;
var WorkCenterName=null;

var ff_line_list_task=null;
var ff_line_list_p;

Ext.define("core.ff_line_kanban.controller.Controller",{
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
			'panel[xtype=ff_line_kb_lines] dataview':{
				itemclick:function(view, record, item, index, e, eOpts ){
					Workcenterid=record.data.Workcenterid;
					mo=record.data.MoName;
					var layout=view.up('ff_line_kb_main').getLayout();	
					var store = Ext.data.StoreManager.map['core.ff_line_kanban.store.sl.Store'];
					store.removeAll();
					store.getProxy().extraParams={mo:mo,limit : 4,page : 1,WorkcenterId:Workcenterid};
					store.load();
					layout.setActiveItem(1);
				}
				
			},
			'panel[xtype=ff_line_kb_moview]':{
				itemclick:function(view, record, item, index, e, eOpts ){
					var width = comm.get("resolutionWidth") * 1;
					var height = comm.get("resolutionHeight") * 0.85;
					var mo=record.data.MOName;
					var line=record.data.WorkcenterName;
					var qty=record.data.MOQtyRequired;
					//11111111111
					//var productName=record.data.ProductName;
					//var headman=record.data.headman;
					
					ff_line_list_p=1;
					var window=Ext.create('Ext.Window',{
						width:500,
						maximized:true,
						layout:'fit',
						title:'信息[ 工作中心:'+line+' ][ 工单:'+mo+' ][工单批量：'+qty+']',
						listeners:{
							beforehide:function(e,Opts){
								ff_line_runner.stop(ff_line_list_task);
								ff_line_list_p=1;
							}
						}
					}).show();
				
					ff_line_list_task={
					   run:function(){
								window.removeAll();
								window.setTitle('信息[ 工作中心:'+line+' ][ 工单:'+mo+' ][工单批量：'+qty+']');
								window.add({xtype:'ff_line_sl_list_kb'});
								var store = Ext.data.StoreManager.map['core.ff_line_kanban.store.sl.ListStore'];					//根据工单查找上料记录
								var result=self.ajax({url:'/web/kanban/ff_sl_list!getResult.action',params:{mo:mo,Workcenterid:Workcenterid}});	
								if(result.success){
									ff_line_list_p=1;
									
									store.proxy.data=result.data;
									store.load();
									//store.loadPage(smt_line_list_p);
									layout.setActiveItem(2);
								}else{
									store.removeAll();
									self.msgbox(result.returnMsg);
									ff_line_runner.stop(ff_line_list_task);
								}
						},
						interval:60000
					};
					ff_line_runner.start(ff_line_list_task);
				}
			}, 
			'panel[xtype=ff_line_kb_moview] button[action=return]':{
				click:function( but, e, eOpts ){
					var layout=but.up('ff_line_kb_main').getLayout();
					var store = Ext.data.StoreManager.map['core.ff_line_kanban.store.Store'];
					//store.getProxy().params={limit : 25,page : 1,WorkcenterId:Workcenterid};
					store.load();
					layout.setActiveItem(0);
				}
			},
			'window[id=8a81a0f055d91c610155d9264f720003_win]':{
				beforehide:function(e,Opts){
					ff_line_runner.stopAll();
				}
			},
			
			'window[id=8a81a0f055d91c610155d9264f720003_win] button[id=minimize]':{
				
			},
			'window[id=8a81a0f055d91c610155d9264f720003_win] button[id=maximize]':{
				
			}
		});
	},
	views:[
		'core.ff_line_kanban.view.Main',
		'core.ff_line_kanban.view.Lines',
		'core.ff_line_kanban.view.MoView',
		'core.ff_line_kanban.view.List',
		'core.ff_line_kanban.view.SlList'
		
	],
	stores:[
		'core.ff_line_kanban.store.Store'
		,'core.ff_line_kanban.store.sl.Store',
		'core.ff_line_kanban.store.sl.ListStore'
	],
	models:[
		 'core.ff_line_kanban.model.Model'
		,'core.ff_line_kanban.model.sl.Model',
		'core.ff_line_kanban.model.sl.ListModel'
	]
	
});