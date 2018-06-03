var Workcenterid=null;
var smt_line_runner=new Ext.util.TaskRunner();

var mo=null;
var WorkCenterName=null;

var smt_line_list_task=null;
var smt_line_list_p;

Ext.define("core.ff_cn_kanban.controller.Controller",{
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
			'panel[xtype=ff_cn_kb_lines] dataview':{
				itemclick:function(view, record, item, index, e, eOpts ){
					Workcenterid=record.data.Workcenterid;
					mo=record.data.MoName;
					var layout=view.up('ff_cn_kb_main').getLayout();	
					var store = Ext.data.StoreManager.map['core.ff_cn_kanban.store.sl.Store'];
					store.removeAll();
					store.getProxy().extraParams={mo:mo,limit : 4,page : 1,WorkcenterId:Workcenterid};
					store.load();
					layout.setActiveItem(1);
				}
				
			},
			
			'panel[xtype=ff_cn_kb_moview]':{
				itemclick:function(view, record, item, index, e, eOpts ){
					
					var width = comm.get("resolutionWidth") * 1;
					var height = comm.get("resolutionHeight") * 0.85;
					var mo=record.data.MOName;
					var line=record.data.WorkcenterName;
					var qty=record.data.MOQtyRequired;
					var productName=record.data.ProductName;
					var headman=record.data.headman;
					var prodescri=record.data.ProductSpecification;
					
					
					smt_line_list_p=1;
					var window=Ext.create('Ext.Window',{
						width:500,
						maximized:true,
						layout:'fit',
						title:'信息[ 工作中心:'+line+' ][ 工单:'+mo+' ][产品描述：'+prodescri+'][组长：'+headman+']',
						listeners:{
							beforehide:function(e,Opts){
								smt_line_runner.stop(smt_line_list_task);
								smt_line_list_p=1;
							}
						}
					}).show();
					
					//alert('window');
					
				
					smt_line_list_task={
						run:function(){
							//if(smt_line_list_p==1){
								window.removeAll();
								//var win=Ext.getCmp('8a81832046759cbf0146759eab7f0001_win');
								//win.setTitle('SMT上料  ===> 物料清单信息[ 工单:'+mo+' ]');
								window.setTitle('信息[ 工作中心:'+line+' ][ 工单:'+mo+' ][产品描述：'+prodescri+'][组长：'+headman+']');
								window.add({xtype:'ff_cn_sl_list_kb'});
								var store = Ext.data.StoreManager.map['core.ff_cn_kanban.store.sl.ListStore'];					//根据工单查找上料记录
								var result=self.ajax({url:'/web/kanban/ff_sl_list!getResult4.action',params:{mo:mo,Workcenterid:Workcenterid}});	
								if(result.success){
									//if(result.isAlertSum>0){			//判断预警总数,如果有预警就刷新第一页
										smt_line_list_p=1;
									//}else{											//没有预警就刷新第一页
									//	smt_line_list_p++;
									//}
									store.proxy.data=result.data;
									store.loadPage(smt_line_list_p);
									layout.setActiveItem(2);
								}else{
									store.removeAll();
									self.msgbox(result.returnMsg);
									smt_line_runner.stop(smt_line_list_task);
								}
							
						
						},
						interval:60000
					};
					smt_line_runner.start(smt_line_list_task);
					
				}
			}, 
			'panel[xtype=ff_cn_kb_moview] button[action=return]':{
				click:function( but, e, eOpts ){
					var layout=but.up('ff_cn_kb_main').getLayout();
					var store = Ext.data.StoreManager.map['core.ff_cn_kanban.store.Store'];
					//store.getProxy().params={limit : 25,page : 1,WorkcenterId:Workcenterid};
					store.load();
					layout.setActiveItem(0);
				}
			}
			,
			'window[id=8a81a0f055de49960155de5b11000001_win]':{
				beforehide:function(e,Opts){
					smt_line_runner.stopAll();
				}
			},
			
			
			'window[id=8a81a0f055de49960155de5b11000001_win] button[id=minimize]':{
				
			},
			'window[id=8a81a0f055de49960155de5b11000001_win] button[id=maximize]':{
				
			}
		});
	},
	views:[
		'core.ff_cn_kanban.view.Main',
		'core.ff_cn_kanban.view.Lines',
		'core.ff_cn_kanban.view.MoView',
//		'core.ff_line_kanban.view.List',
		'core.ff_cn_kanban.view.SlList'
		
	],
	stores:[
		'core.ff_cn_kanban.store.Store'
		,'core.ff_cn_kanban.store.sl.Store',
		'core.ff_cn_kanban.store.sl.ListStore'
	],
	models:[
		 'core.ff_cn_kanban.model.Model'
		,'core.ff_cn_kanban.model.sl.Model',
		'core.ff_cn_kanban.model.sl.ListModel'
	]
	
});