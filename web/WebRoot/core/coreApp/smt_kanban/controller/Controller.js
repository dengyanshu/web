var smt_runner = new Ext.util.TaskRunner();
var smt_sl_task = null;
var smt_slList_task = null;
var smt_ccList_task=null;
var smt_cn_task = null;
var smt_cc_task=null;
var smt_sl_p = 1; // Variable Page
var smt_cn_p = 1; // Variable Page
var smt_cc_p=1;
var mainPageItems=comm.get("mainPageItems");
var pageItems=comm.get("screenHeight");					//default pageItems
var pageSum=1;		//default pageSum

var smt_sl_j;


Ext.define("core.smt_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		ClockAction:'core.util.model.ClockAction',
		MaskMsgUtil:'core.util.model.MaskMsgUtil'
	},
	init : function() {
		var self = this;
		coreApp = self;
		this.control({
			'smt_kb_navigation' : {
				itemclick : function(view, record, item, index, e, eOpts) {
					var tabpanel = view.ownerCt.ownerCt.items.items[2];
					var name = record.raw.name;
					var text = record.get("text");
					var id = record.get("id");
					var tab = tabpanel.getComponent(id);
					if (!tab) {
						var t = tabpanel.add({
							title : text,id : id,closable : true,
							layout : 'border',closeAction : 'hide',
							items : [{xtype : name,region : 'center'}]
						});
						tabpanel.setActiveTab(t);

						if (name == "smt_sl_kb") {
							smt_sl_task = {
								run : function() {
									var smt_sl_total=self.updateClock("smt","sl",smt_sl_p,mainPageItems);
											if(smt_sl_total!=0){
												if (smt_sl_p >= Math.ceil(smt_sl_total/mainPageItems)) {
													smt_sl_p = 1;
												}else{
													smt_sl_p = smt_sl_p + 1;
												}		
											}
								},
								interval : 60000
							};
							smt_runner.start(smt_sl_task);
						}else if (name == "smt_cn_kb") {
							smt_cn_task = {
								run : function() {
									var smt_cn_total=self.updateClock("smt","cn",smt_cn_p,mainPageItems);
											if(smt_cn_total!=0){
												if (smt_cn_p >= Math.ceil(smt_cn_total/mainPageItems)) {
													smt_cn_p = 1;
												}else{
													smt_cn_p = smt_cn_p + 1;
												}		
											}
								},
								interval : 60000
							};
							smt_runner.start(smt_cn_task);
						}else if(name=="smt_cc_kb"){
							smt_cc_task = {
								run : function() {
									var smt_cc_total=self.updateClock("smt","cc",smt_cc_p,mainPageItems);
											if(smt_cc_total!=0){
												if (smt_cc_p >= Math.ceil(smt_cc_total/mainPageItems)) {
													smt_cc_p = 1;
												}else{
													smt_cc_p = smt_cc_p + 1;
												}		
											}
								},
								interval : 60000
							};
							smt_runner.start(smt_cc_task);
						}
					} else {
						tabpanel.setActiveTab(tab);
					}

				}
			},

/**************************************************************************************************************************
 * 														pagingtoolbar事件
 *************************************************************************************************************************/	
			'panel[xtype=smt_sl_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					smt_sl_p=params+1;
				}
			},
			
			'panel[xtype=smt_cn_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					smt_cn_p=params+1;
				}
			},
			
			'panel[xtype=smt_cc_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					smt_cc_p=params+1;
				}
			},

/**************************************************************************************************************************
 * 														button && textfield事件
 *************************************************************************************************************************/	
	//上料
			'panel[xtype=smt_sl_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[20].getValue();
					var store=Ext.data.StoreManager.map['core.smt_kanban.store.sl.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=smt_sl_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[22];
					var text=e.ownerCt.items.items[20];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						smt_runner.stop(smt_sl_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						smt_runner.start(smt_sl_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			
			'panel[xtype="smt_sl_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.smt_kanban.store.sl.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},
			
	//产能		
		'panel[xtype=smt_cn_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[17].getValue();
					var store=Ext.data.StoreManager.map['core.smt_kanban.store.cn.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
		},	
			
		'panel[xtype=smt_cn_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[19];
					var text=e.ownerCt.items.items[17];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						smt_runner.stop(smt_cn_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						smt_runner.start(smt_cnl_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			
			'panel[xtype="smt_cn_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.smt_kanban.store.cn.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},						
			
/*################################################################################
 * 																上料事件
 ################################################################################*/				
			'panel[xtype=smt_sl_kb]' : {
				itemclick : function(e, eOpts) {
					smt_runner.stop(smt_sl_task);
					var mo = eOpts.data.MOName;
					var Workcenterid=eOpts.data.Workcenterid;
					var width = comm.get("resolutionWidth") * 1;
					var height = comm.get("resolutionHeight") * 0.85;
					smt_sl_j=1;
					
					var win=Ext.create("Ext.window.Window",{
							width:500,
							maximized:true,
							layout:'fit',
							listeners:{
								beforeclose:function(){
									smt_sl_j=1;
									smt_runner.start(smt_sl_task);
									smt_runner.stop(smt_slList_task);
								}
							}
					}).show();
					var mask=self.msg(win);        		
					
				    smt_slList_task={
				    	run:function(){
							if(smt_sl_j==1){
								win.removeAll();
								win.setTitle('SMT上料  ===> 物料清单信息[ 工单:'+mo+' ]');	
								win.add({xtype:'smt_sl_list_kb'});
								var store = Ext.data.StoreManager.map['core.smt_kanban.store.sl.ListStore'];
								mask.show();
								var result=self.ajax({url:'/web/kanban/smt_sl_list!getResult.action',params:{mo:mo,Workcenterid:Workcenterid}});
								mask.hide();
								if(result.success){
									if(result.isAlertSum>0){
										smt_sl_j=1;
									}else{
										smt_sl_j++;
									}
									store.proxy.data=result.data;
									store.load();
								}else{
									store.removeAll();
									self.msgbox(result.returnMsg);	
									smt_runner.stop(smt_slList_task);
								}
							}else if(smt_sl_j==2){
								win.removeAll();
								win.setTitle('SMT产能  ===> 物料清单信息[ 工单:'+mo+' ]');	
								win.add({xtype:'smt_cn_list_kb'});
								var panel=win.items.items[0];
								panel.update("<iframe id='openwin' src='core/data/kanban/smt_cn_list.jsp?mo="+mo+" &width="+width+" &height="+height+" &name='看板信息'" +
				        				" scrolling='auto' style='width:100%;height:100%;margin:0;padding:0'></iframe>");
				        		smt_sl_j=1;		
							}
				    	},
				    	interval:10000
				    };   
					smt_runner.start(smt_slList_task);	
				},
				beforedestroy : function(e, eOpts) {
					smt_runner.stop(smt_sl_task);
				},
				render:function(me,eOpts){
					new Ext.util.KeyMap({
						target:me.getEl(),
						binding:[{
							key:'s',shift:true,ctrl:true,alt:true,
							fn:function(){Ext.Msg.alert('存储过程', 'MainBoard_SMT');},
							scope:this
						}]
					});
				
				}
			},
		
/*################################################################################
 * 																产能事件
 ################################################################################*/			
			'panel[xtype=smt_cn_kb]' : {
				itemclick : function(e, eOpts) {
					smt_runner.stop(smt_cn_task);
					var width = comm.get("resolutionWidth") * 1;
					var height = comm.get("resolutionHeight") * 0.85;
					var mo = eOpts.data.MOName;
					Ext.create('Ext.window.Window', {
						title : 'SMT产能  ===> 物料清单信息 [ 工单:'+mo+' ]',
						maximized:true,
						listeners:{
							beforeclose:function(){
								smt_runner.start(smt_cn_task);
							}
						},
					  	html:"<iframe id='openwin' src='core/data/kanban/smt_cn_list.jsp?mo="+mo+" &width="+width+" &height="+height+" &name='看板信息'" +
				        		" scrolling='auto' style='width:100%;height:100%;margin:0;padding:0'></iframe>"}).show();
				},
				beforedestroy : function(e, eOpts) {
					smt_runner.stop(smt_cn_task);
				}
			},			
/*################################################################################
 * 																产出事件
 ################################################################################*/				
			'panel[xtype=smt_cc_kb]':{
				itemclick:function(e,eOpts){
					smt_runner.stop(smt_cc_task);
					var Workcenterid = eOpts.data.Workcenterid;
					var WorkcenterName = eOpts.data.WorkcenterName;
					var SumYield = eOpts.data.SumYield;
					var SumTime = eOpts.data.SumTime;
					var StanTime = eOpts.data.StanTime;
					var MoName = eOpts.data.MoName;
					var ProductFamilyShortName = eOpts.data.ProductFamilyShortName;
					var ProductName = eOpts.data.ProductName;
					var store=Ext.data.StoreManager.map['core.smt_kanban.store.cc.ListStore'];
					store.removeAll();
					smt_ccList_task={
						run:function(){
							store.getProxy().extraParams={Workcenterid : Workcenterid};
							store.load();
						},
						interval:60000
					};
					smt_runner.start(smt_ccList_task);

					var win=Ext.create("Ext.window.Window",{
							title:'SMT产出清单 线别:[ '+WorkcenterName+' ]工单:[ '+MoName+' ]',
							tbar:[
								{xtype:'tbspacer',width:380},
								'机型:('+ProductFamilyShortName+')',
								'-',
								'料号:('+ProductName+')',
								'-',
								'当前工单:('+MoName+')',
								'-',
								/*'累计产出数:('+SumYield+')',
								'-',
								'累计工时数:('+SumTime+')',
								'-',*/
								'UPH:('+StanTime+')'],
							width:500,
							maximized:true,
							layout:'fit',
							items:[{xtype:'smt_cc_list_kb'}],
							listeners:{
								beforehide:function(e,eOpts){
									smt_runner.stop(smt_ccList_task);
									smt_runner.start(smt_cc_task);
								}
							}
					}).show();
				},
				beforedestroy:function(e,eOpts){
					smt_runner.stop(smt_cc_task);
				}
			},
			
			//Main Frame Event
			'window[id=8a81832046759cbf014675a120090002_win]' : {
				beforehide : function(e, eOpts) {
					smt_runner.stopAll();
				}
			}

		});
	},

	views : ['core.smt_kanban.view.MainLayout',
			'core.smt_kanban.view.ItemTree',
			'core.smt_kanban.view.DisplayPanel', 
			'core.smt_kanban.view.item.Sl',
			'core.smt_kanban.view.item.Cn',
			'core.smt_kanban.view.item.Cc',
			'core.smt_kanban.view.item.SlList',
			'core.smt_kanban.view.item.CnList',
			'core.smt_kanban.view.item.CcList'
			],

	stores : [
			'core.smt_kanban.store.Tree', 
			'core.smt_kanban.store.sl.Store',
			'core.smt_kanban.store.sl.ListStore',
			'core.smt_kanban.store.cn.Store',
			'core.smt_kanban.store.cc.Store',
			'core.smt_kanban.store.cc.ListStore'
			],

	models : [
			'core.smt_kanban.model.sl.Model', 
			'core.smt_kanban.model.sl.ListModel',
			'core.smt_kanban.model.cn.Model',
			'core.smt_kanban.model.cc.Model',
			'core.smt_kanban.model.cc.ListModel'
			]
});