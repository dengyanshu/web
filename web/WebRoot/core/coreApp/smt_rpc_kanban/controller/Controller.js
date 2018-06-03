var smt_rpc_runner = new Ext.util.TaskRunner();
var smt_cx_task = null;
var smt_cxList_task=null;
var smt_cx_p = 1; // Variable Page
var smt_xb_task = null;
var smt_xbList_task=null;
var smt_xb_p = 1; // Variable Page
var smt_ck_task = null;
var smt_ckList_task=null;
var smt_ck_p = 1; // Variable Page
var mainPageItems=comm.get("mainPageItems");
var pageItems=comm.get("screenHeight");					//default pageItems
var pageSum=1;		//default pageSum
var smt_cx_j;
var smt_xb_j;
var smt_ck_j;

Ext.define("core.smt_rpc_kanban.controller.Controller", {
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
			'smt_rpc_kb_navigation' : {
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
						if (name == "smt_cx_kb") {
						smt_cx_task = {
							run : function() {
							var smt_cx_total=self.updateClock("smt_rpc","cx",smt_cx_p,mainPageItems);
							if(smt_cx_total!=0){
								if (smt_cx_p >= Math.ceil(smt_cx_total/mainPageItems)) {
									smt_cx_p = 1;
								}else{
									smt_cx_p = smt_cx_p + 1;
								}}},
						interval : 60000
							};
						smt_rpc_runner.start(smt_cx_task);
						}else if (name == "smt_xb_kb") {
							smt_xb_task = {
								run : function() {
								var smt_xb_total=self.updateClock("smt_rpc","xb",smt_xb_p,mainPageItems);
								if(smt_xb_total!=0){
									if (smt_xb_p >= Math.ceil(smt_xb_total/mainPageItems)) {
										smt_xb_p = 1;
									}else{
										smt_xb_p = smt_xb_p + 1;
									}}},
							interval : 60000
								};
							smt_rpc_runner.start(smt_xb_task);
							}else if (name == "smt_ck_kb") {
								smt_ck_task = {
										run : function() {
										var smt_ck_total=self.updateClock("smt_rpc","ck",smt_ck_p,mainPageItems);
										if(smt_ck_total!=0){
											if (smt_ck_p >= Math.ceil(smt_ck_total/mainPageItems)) {
												smt_ck_p = 1;
											}else{
												smt_ck_p = smt_ck_p + 1;
											}}},
									interval : 60000
										};
									smt_rpc_runner.start(smt_ck_task);
									}
						
						
						
					}else {
						tabpanel.setActiveTab(tab);
					}
				}
			},
/**************************************************************************************************************************
 * 														pagingtoolbar事件
*************************************************************************************************************************/
			'panel[xtype=smt_cx_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					smt_cx_p=params+1;
				}
			},
			'panel[xtype=smt_xb_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					smt_xb_p=params+1;
				}
			},
			'panel[xtype=smt_ck_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					smt_ck_p=params+1;
				}
			},
			
/**************************************************************************************************************************
 * 														button && textfield事件
 ************************************************************************************************************************/	
				//产线
			'panel[xtype=smt_cx_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[13].getValue();
					var store=Ext.data.StoreManager.map['core.smt_rpc_kanban.store.cx.Store'];
					store.load({params : {ProductName:mo,limit:pageItems,page:1}});	
				}
			},
			'panel[xtype=smt_cx_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[15];
					var text=e.ownerCt.items.items[13];
					if(e.getText()=="停止"){
						e.setText("开始");
						smt_rpc_runner.stop(smt_cx_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						smt_rpc_runner.start(smt_cx_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			'panel[xtype="smt_cx_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.smt_rpc_kanban.store.cx.Store'];
					store.load({params : {ProductName:mo,limit:pageItems,page:1}});	
					}
				}
			},
			//线边
			'panel[xtype=smt_xb_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[13].getValue();
					var store=Ext.data.StoreManager.map['core.smt_rpc_kanban.store.xb.Store'];
					store.load({params : {ProductName:mo,limit:pageItems,page:1}});	
				}
			},
			'panel[xtype=smt_xb_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[15];
					var text=e.ownerCt.items.items[13];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						smt_rpc_runner.stop(smt_xb_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						smt_rpc_runner.start(smt_xb_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			'panel[xtype="smt_xb_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.smt_rpc_kanban.store.xb.Store'];
					store.load({params : {ProductName:mo,limit:pageItems,page:1}});	
					}
				}
			},
			//仓库
			'panel[xtype=smt_ck_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[13].getValue();
					var store=Ext.data.StoreManager.map['core.smt_rpc_kanban.store.ck.Store'];
					store.load({params : {ProductName:mo,limit:pageItems,page:1}});	
				}
			},
			'panel[xtype=smt_ck_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[15];
					var text=e.ownerCt.items.items[13];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						smt_rpc_runner.stop(smt_ck_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						smt_rpc_runner.start(smt_ck_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			'panel[xtype="smt_ck_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.smt_rpc_kanban.store.ck.Store'];
					store.load({params : {ProductName:mo,limit:pageItems,page:1}});	
					}
				}
			},
			
/******************************************************************************************************
 *                                                产线上料事件
 ******************************************************************************************************/
			
			
			
			
			//关闭窗口关闭线程
			'window[id=8a8183b44b4eb360014b4eb6809a0001_win]' : {
				beforehide : function(e, eOpts) {
					smt_rpc_runner.stopAll();
				}
			}
			
			//*
		});
	},
	views : [
				'core.smt_rpc_kanban.base.BaseTree',
				'core.smt_rpc_kanban.view.MainLayout',
				'core.smt_rpc_kanban.view.ItemTree',
				'core.smt_rpc_kanban.view.DisplayPanel',
				'core.smt_rpc_kanban.view.item.Cx',
				//'core.smt_rpc_kanban.view.item.CxList',
				'core.smt_rpc_kanban.view.item.Xb',
				//'core.smt_rpc_kanban.view.item.XbList',
				'core.smt_rpc_kanban.view.item.Ck'
				//'core.smt_rpc_kanban.view.item.CkList'
			],

	stores : [
			'core.smt_rpc_kanban.store.Tree',
			'core.smt_rpc_kanban.store.cx.Store',
			//'core.smt_rpc_kanban.store.cx.ListStore',
			'core.smt_rpc_kanban.store.xb.Store',
			//'core.smt_rpc_kanban.store.xb.ListStore',
			'core.smt_rpc_kanban.store.ck.Store'
			//'core.smt_rpc_kanban.store.ck.ListStore'
			],
			
	models:[
		'core.smt_rpc_kanban.model.cx.Model',
		//'core.smt_rpc_kanban.model.cx.ListModel',
		'core.smt_rpc_kanban.model.xb.Model',
		//'core.smt_rpc_kanban.model.xb.ListModel',
		'core.smt_rpc_kanban.model.ck.Model'
		//'core.smt_rpc_kanban.model.ck.ListModel'
	]
	
	
});