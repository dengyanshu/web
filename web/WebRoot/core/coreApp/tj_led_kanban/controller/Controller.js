var tj_led_runner = new Ext.util.TaskRunner();
var tj_led_mx_task = null;
var tj_led_zc_task = null;
var tj_led_zc_p = 1;
var tj_led_mx_p = 1; // Variable Page


var tj_led_mxList_task=null;
var tj_led_zcList_task=null;
var mainPageItems=comm.get("mainPageItems");
var pageItems=comm.get("pageItems");
var pageSum=1;		//default pageSum

var tj_led_mx_j;
var tj_led_zc_j;


Ext.define("core.tj_led_kanban.controller.Controller", {
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
			'tj_led_kb_navigation' : {
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

						if (name == "tj_led_mx_kb") {
							tj_led_mx_task = {
								run : function() {
									var total=self.updateClock("tj_led","mx",tj_led_mx_p,mainPageItems);
											if(total!=0){
												if (tj_led_mx_p >= Math.ceil(total/mainPageItems)) {
													tj_led_mx_p = 1;
												}else{
													tj_led_mx_p = tj_led_mx_p + 1;
												}		
											}
								},
								interval : 30000
							};
							tj_led_runner.start(tj_led_mx_task);
						}
						if (name == "tj_led_zc_kb") {
							var string = "core.tj_led_kanban.store.zc.Store";		
							var store = Ext.data.StoreManager.map[string];
							store.load();
/*							tj_led_zc_task = {
								run : function() {
									var total=self.updateClock("tj_led","zc",tj_led_zc_p,pageItems);
											if(total!=0){
												if (tj_led_zc_p >= Math.ceil(total/pageItems)) {
													tj_led_zc_p = 1;
												}else{
													tj_led_zc_p = tj_led_zc_p + 1;
												}		
											}
								},
								interval : 120000
							};
							tj_led_runner.start(tj_led_zc_task);*/
						}
					} else {
						tabpanel.setActiveTab(tab);
					}

				}
			},
			
			'panel[xtype=tj_led_mx_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[14].getValue();
					var store=Ext.data.StoreManager.map['core.tj_led_kanban.store.mx.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=tj_led_mx_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[16];
					var text=e.ownerCt.items.items[14];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						tj_led_runner.stop(tj_led_mx_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						tj_led_runner.start(tj_led_mx_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			
			'panel[xtype="tj_led_mx_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.tj_led_kanban.store.mx.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},						
			
			
			'panel[xtype=tj_led_mx_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					tj_led_mx_p=params+1;
				}
			},
			
			'panel[xtype=tj_led_zc_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					tj_led_zc_p=params+1;
				}
			},
			
			'panel[xtype=tj_led_mx_list_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					tj_led_mx_j=params+1;
				}
			},
			
			
			'panel[xtype=tj_led_mx_kb]' : {
				itemclick : function(e, eOpts) {		
					tj_led_runner.stop(tj_led_mx_task);
					var mo = eOpts.data.MOName;	
					tj_led_mx_j=1;

					var win=Ext.create("core.tj_led_kanban.view.item.MxList",{
						title:'天津LED明细  ===> 物料清单信息[ 工单:'+mo+' ]'
					}).show();
					var mask=self.msg(win);
					var store = Ext.data.StoreManager.map['core.tj_led_kanban.store.mx.ListStore'];
					mask.show();
					var result=self.ajax({url:'/web/kanban/tj_led_mx_list!getResult.action',params:{mo:mo}});
					mask.hide();
					if(result.success){
						pageSum=Math.ceil(result.data.length/pageItems);
						store.proxy.data=result.data;
						store.load();
					}else{
						store.removeAll(true);
						Ext.Msg.alert("系统提示",result.returnMsg);
					}
					
					tj_led_mxList_task={
						run:function(){
							if(tj_led_mx_j<=pageSum){
								store.loadPage(tj_led_mx_j);
								tj_led_mx_j++;
							}else{
								tj_led_mx_j=1;
								var result=self.ajax({url:'/web/kanban/tj_led_mx_list!getResult.action',params:{mo:mo}});
								if(result.success){
									pageSum=Math.ceil(result.data.length/pageItems);
									store.proxy.data=result.data;
									store.loadPage(tj_led_mx_j);
								}else{
									store.removeAll(true);
									Ext.Msg.alert("系统提示",result.returnMsg);
								}
							}
						},
						interval:8000
					};
					tj_led_runner.start(tj_led_mxList_task);							
				},
				beforedestroy : function(e, eOpts) {
					tj_led_runner.stop(tj_led_mx_task);
				}
				
			},
			
			'panel[xtype=tj_led_mx_list_kb]':{
				beforeclose:function(){
					tj_led_runner.start(tj_led_mx_task);
					tj_led_runner.stop(tj_led_mxList_task);
				}	
			},
			
			'panel[xtype=tj_led_mx_list_kb] grid[xtype=grid]':{
				beforechange:function(bbar,params){
					tj_led_mx_j=params+1;
				},
				beforeitemmouseenter:function(){
					tj_led_runner.stop(tj_led_mxList_task);
				},			
				beforeitemmouseleave:function(){
					tj_led_runner.start(tj_led_mxList_task);
				}
			},
				
			
			'panel[xtype=tj_led_zc_kb]' : {
				itemclick : function(e, eOpts) {		
					var WorkcenterId = eOpts.data.WorkcenterId;	
					tj_led_zc_j=1;

					var win=Ext.create("core.tj_led_kanban.view.item.ZcList",{
						title:'天津LED制程  ===> 物料清单信息'
					}).show();
					var mask=self.msg(win);
					var store = Ext.data.StoreManager.map['core.tj_led_kanban.store.zc.ListStore'];
					mask.show();
					var result=self.ajax({timeout:60000,url:'/web/kanban/tj_led_zc_list!getResult.action',params:{WorkcenterId:WorkcenterId,Flag:1}});
					mask.hide();
					if(result.success){
						pageSum=Math.ceil(result.data.length/pageItems);
						store.proxy.data=result.data;
						store.load();
					}else{
						store.removeAll(true);
						Ext.Msg.alert("系统提示",result.returnMsg);
					}
					
					tj_led_zcList_task={
						run:function(){
							if(tj_led_zc_j<=pageSum){
								store.loadPage(tj_led_zc_j);
								tj_led_zc_j++;
							}else{
								tj_led_zc_j=1;
								var result=self.ajax({timeout:60000,url:'/web/kanban/tj_led_zc_list!getResult.action',params:{WorkcenterId:WorkcenterId,Flag:1}});
								if(result.success){
									pageSum=Math.ceil(result.data.length/pageItems);
									store.proxy.data=result.data;
									store.loadPage(tj_led_zc_j);
								}else{
									store.removeAll(true);
									Ext.Msg.alert("系统提示",result.returnMsg);
								}
							}
						},
						interval:120000
					};
					tj_led_runner.start(tj_led_zcList_task);							
				}
				
			},			
			
			//Main Frame Event
			'window[id=8a8183eb44f897980144f8981a090001_win]' : {
				beforehide : function(e, eOpts) {
					tj_led_runner.stopAll();

				}
			}

		});
	},

	views : [
			'core.tj_led_kanban.view.MainLayout',
			'core.tj_led_kanban.view.ItemTree',
			'core.tj_led_kanban.view.DisplayPanel', 
			'core.tj_led_kanban.view.item.Mx',
			'core.tj_led_kanban.view.item.Zc',
			'core.tj_led_kanban.view.item.MxList',
			'core.tj_led_kanban.view.item.ZcList'
			],

	stores : [
			'core.tj_led_kanban.store.Tree', 
			'core.tj_led_kanban.store.mx.Store',
			'core.tj_led_kanban.store.mx.ListStore',
			'core.tj_led_kanban.store.zc.Store',
			'core.tj_led_kanban.store.zc.ListStore'
			],

	models : [
			'core.tj_led_kanban.model.mx.Model',
			'core.tj_led_kanban.model.mx.ListModel',
			'core.tj_led_kanban.model.zc.Model',
			'core.tj_led_kanban.model.zc.ListModel'
			]
});