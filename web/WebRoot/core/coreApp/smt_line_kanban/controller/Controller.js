var Workcenterid=null;
var smt_line_runner=new Ext.util.TaskRunner();

var mo=null;
var WorkCenterName=null;

var smt_line_list_task=null;
var smt_line_list_p;

Ext.define("core.smt_line_kanban.controller.Controller",{
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
			'panel[xtype=smt_line_kb_lines] dataview':{
				itemclick:function(view, record, item, index, e, eOpts ){
					Workcenterid=record.data.Workcenterid;
					mo=record.data.MoName;
					var layout=view.up('smt_line_kb_main').getLayout();	
					var store = Ext.data.StoreManager.map['core.smt_line_kanban.store.sl.Store'];
					store.removeAll();
					store.getProxy().extraParams={mo:mo,limit : 4,page:1,WorkcenterId:Workcenterid};
					store.load();
					layout.setActiveItem(1);
					//layout.getNext();
				}
				
			},
			'panel[xtype=smt_line_kb_moview]':{
				itemclick:function(view, record, item, index, e, eOpts ){
					var width = comm.get("resolutionWidth") * 1;
					var height = comm.get("resolutionHeight") * 0.85;
					var mo=record.data.MOName;
					var line=record.data.WorkcenterName;
					var qty=record.data.MOQtyRequired;
					
					smt_line_list_p=1;
					var window=Ext.create('Ext.Window',{
						width:500,
						maximized:true,
						layout:'fit',
						title:'SMT上料  ===> 站位信息[ 工作中心:'+line+' ][ 工单:'+mo+' ][工单批量：'+qty+']',
						listeners:{
						beforehide:function(e,Opts){
							smt_line_runner.stop(smt_line_list_task);
							smt_line_list_p=1;
						}
						}
					}).show();
					//var layout=view.up('smt_line_kb_main').getLayout();
					//var list=layout.getLayoutItems()[2];
					
					
					smt_line_list_task={
						run:function(){
							//if(smt_line_list_p==1){
								window.removeAll();
								//var win=Ext.getCmp('8a81832046759cbf0146759eab7f0001_win');
								//win.setTitle('SMT上料  ===> 物料清单信息[ 工单:'+mo+' ]');
								window.setTitle('SMT上料  ===> 站位信息[ 工作中心:'+line+' ][ 工单:'+mo+' ][工单批量：'+qty+']');
								window.add({xtype:'smt_sl_list_kb'});
								var store = Ext.data.StoreManager.map['core.smt_kanban.store.sl.ListStore'];					//根据工单查找上料记录
								var result=self.ajax({url:'/web/kanban/smt_sl_list!getResult.action',params:{mo:mo,Workcenterid:Workcenterid}});	
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
							/*}else if(smt_line_list_p==2){
								window.removeAll();
								layout.setActiveItem(2);
								//list.setTitle('SMT产能 ===> 物料清单信息[ 工单:'+mo+' ]');
								var win=Ext.getCmp('8a81832046759cbf0146759eab7f0001_win');
								win.setTitle('SMT上料  ===> 物料清单信息[ 工单:'+mo+' ]');
								window.add({xtype:'smt_cn_list_kb'});
								var panel=window.items.items[0];
								panel.update("<iframe id='openwin' src='core/data/kanban/smt_cn_list.jsp?mo="+mo+" &width="+width+" &height="+height+" &name='看板信息'" +
				        				" scrolling='auto' style='width:100%;height:100%;margin:0;padding:0'></iframe>");
				        		smt_line_list_p=1;
							}*/
						
						},
						interval:60000
					};
					smt_line_runner.start(smt_line_list_task);
					
				}
			}, 
			'panel[xtype=smt_line_kb_moview] button[action=return]':{
				click:function( but, e, eOpts ){
					var layout=but.up('smt_line_kb_main').getLayout();
					var store = Ext.data.StoreManager.map['core.smt_line_kanban.store.Store'];
					//store.getProxy().params={limit : 25,page : 1,WorkcenterId:Workcenterid};
					store.load();
					layout.setActiveItem(0);
				}
			},
			'window[id=8a81832046759cbf0146759eab7f0001_win]':{
				beforehide:function(e,Opts){
					smt_line_runner.stopAll();
				}
			},
			
			'window[id=8a81832046759cbf0146759eab7f0001_win] button[id=minimize]':{
				
			},
			'window[id=8a81832046759cbf0146759eab7f0001_win] button[id=maximize]':{
				
			}
		});
	},
	views:[
		'core.smt_line_kanban.view.Main',
		'core.smt_line_kanban.view.Lines',
		'core.smt_line_kanban.view.MoView',
		'core.smt_line_kanban.view.List',
		'core.smt_kanban.view.item.CnList',
		'core.smt_kanban.view.item.SlList'
	],
	stores:[
		'core.smt_line_kanban.store.Store',
		'core.smt_line_kanban.store.sl.Store',
		//'core.smt_line_kanban.store.sl.ListStore'
		'core.smt_kanban.store.sl.ListStore'
	],
	models:[
		'core.smt_line_kanban.model.Model',
		'core.smt_line_kanban.model.sl.Model',
		//'core.smt_line_kanban.model.sl.ListModel'
		'core.smt_kanban.model.sl.ListModel'
	]
	
});