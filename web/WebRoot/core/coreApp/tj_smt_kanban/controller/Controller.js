var tj_smt_runner = new Ext.util.TaskRunner();
var tj_smt_sl_task = null;
var tj_smt_slList_task = null;
var tj_smt_cn_task = null;
var tj_smt_sl_p = 1; 				// Variable Page
var tj_smt_cn_p = 1; 				// Variable Page
var mainPageItems=comm.get("mainPageItems");
var pageItems=comm.get("pageItems");
var pageSum=1;						//default pageSum

var tj_smt_sl_j;

Ext.define("core.tj_smt_kanban.controller.Controller", {
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
			'tj_smt_kb_navigation' : {
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

						if (name == "tj_smt_sl_kb") {
							tj_smt_sl_task = {
								run : function() {
									var tj_smt_sl_total=self.updateClock("tj_smt","sl",tj_smt_sl_p,mainPageItems);
											if(tj_smt_sl_total!=0){
												if (tj_smt_sl_p >= Math.ceil(tj_smt_sl_total/mainPageItems)) {
													tj_smt_sl_p = 1;
												}else{
													tj_smt_sl_p = tj_smt_sl_p + 1;
												}		
											}
								},
								interval : 20000
							};
							tj_smt_runner.start(tj_smt_sl_task);
						}else if (name == "tj_smt_cn_kb") {
							tj_smt_cn_task = {
								run : function() {
									var tj_smt_cn_total=self.updateClock("tj_smt","cn",tj_smt_cn_p,mainPageItems);
											if(tj_smt_cn_total!=0){
												if (tj_smt_cn_p >= Math.ceil(tj_smt_cn_total/mainPageItems)) {
													tj_smt_cn_p = 1;
												}else{
													tj_smt_cn_p = tj_smt_cn_p + 1;
												}		
											}
								},
								interval : 20000
							};
							tj_smt_runner.start(tj_smt_cn_task);
						}
					} else {
						tabpanel.setActiveTab(tab);
					}

				}
			},
			
/************************************************************************************************************
 * 
 ************************************************************************************************************/
			'panel[xtype=tj_smt_sl_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[17].getValue();
					var store=Ext.data.StoreManager.map['core.tj_smt_kanban.store.sl.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=tj_smt_sl_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[19];
					var text=e.ownerCt.items.items[17];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						tj_smt_runner.stop(tj_smt_sl_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						tj_smt_runner.start(tj_smt_sl_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			
			'panel[xtype="tj_smt_sl_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.tj_smt_kanban.store.sl.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},						
			
			
			'panel[xtype=tj_smt_sl_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					tj_smt_sl_p=params+1;
				}
			},
			
			'panel[xtype=tj_smt_cn_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					tj_smt_cn_p=params+1;
				}
			},
			
			'panel[xtype=tj_smt_sl_list_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					tj_smt_sl_j=params+1;
				}
			},
			
			'panel[xtype=tj_smt_sl_kb]' : {
				itemclick : function(e, eOpts) {
					tj_smt_runner.stop(tj_smt_sl_task);
					var mo = eOpts.data.MOName;
					tj_smt_sl_j=1;
					
					var win=Ext.create("core.tj_smt_kanban.view.item.SlList",{
						title:'天津SMT上料  ===> 物料清单信息[ 工单:'+mo+' ]'
					}).show();
					var mask=self.msg(win);
					var store = Ext.data.StoreManager.map['core.tj_smt_kanban.store.sl.ListStore'];
					mask.show();
					var result=self.ajax({url:'/web/kanban/tj_smt_sl_list!getResult.action',params:{mo:mo}});
					mask.hide();
					if(result.success){
						pageSum=Math.ceil(result.data.length/pageItems);
						store.proxy.data=result.data;
						store.load();
					}else{
						store.removeAll(true);
						Ext.Msg.alert("系统提示",result.returnMsg);
					}

					
					tj_smt_slList_task={
						run:function(){
							if(tj_smt_sl_j<=pageSum){
								store.loadPage(tj_smt_sl_j);
								tj_smt_sl_j++;
							}else{
								tj_smt_sl_j=1;
								var result=self.ajax({url:'/web/kanban/tj_smt_sl_list!getResult.action',params:{mo:mo}});
								if(result.success){
									pageSum=Math.ceil(result.data.length/pageItems);
									store.proxy.data=result.data;
									store.loadPage(tj_smt_sl_j);
								}else{
									store.removeAll(true);
									Ext.Msg.alert("系统提示",result.returnMsg);
								}
							}
						},
						interval:8000
					};
					tj_smt_runner.start(tj_smt_slList_task);								        		
				},
				beforedestroy : function(e, eOpts) {
					tj_smt_runner.stop(tj_smt_sl_task);
				}
			},
			
			'panel[xtype=smt_bl_list_kb]':{
				beforeclose:function(){
					tj_smt_runner.start(tj_smt_sl_task);
					tj_smt_runner.stop(tj_smt_slList_task);
				}	
			},
			
			'panel[xtype=smt_sl_list_kb] grid[xtype=grid]':{
				beforechange:function(bbar,params){
					tj_smt_sl_j=params+1;
				},
				beforeitemmouseenter:function(){
					tj_smt_runner.stop(tj_smt_slList_task);
				},			
				beforeitemmouseleave:function(){
					tj_smt_runner.start(tj_smt_slList_task);
				}
			},

/************************************************************************************************************
 * 
 ************************************************************************************************************/
			'panel[xtype=tj_smt_cn_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[17].getValue();
					var store=Ext.data.StoreManager.map['core.tj_smt_kanban.store.cn.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=tj_smt_cn_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[19];
					var text=e.ownerCt.items.items[17];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						tj_smt_runner.stop(tj_smt_cn_task);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						tj_smt_runner.start(tj_smt_cn_task);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			
			'panel[xtype="tj_smt_cn_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.tj_smt_kanban.store.cn.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},			
			
			'panel[xtype=tj_smt_cn_kb]' : {
				itemclick : function(e, eOpts) {
					tj_smt_runner.stop(tj_smt_cn_task);
					var width = comm.get("resolutionWidth") * 1;
					var height = comm.get("resolutionHeight") * 0.85;
					var mo = eOpts.data.MOName;
					Ext.create('Ext.window.Window', {
						title : '天津SMT产能  ===> 物料清单信息 [ 工单:'+mo+' ]',
						maximized:true,
						listeners:{
							beforeclose:function(){
								tj_smt_runner.start(tj_smt_cn_task);
							}
						},
					  	html:"<iframe id='openwin' src='core/data/kanban/tj_smt_cn_list.jsp?mo="+mo+" &width="+width+" &height="+height+" &name='看板信息'" +
				        		" scrolling='auto' style='width:100%;height:100%;margin:0;padding:0'></iframe>"}).show();
				},
				beforedestroy : function(e, eOpts) {
					tj_smt_runner.stop(tj_smt_cn_task);
				}
			},			
			
			//Main Frame Event
			'window[id=8a8183eb44f837b50144f838c07d0001_win]' : {
				beforehide : function(e, eOpts) {
					tj_smt_runner.stopAll();
				}
			}

		});
	},

	views : ['core.tj_smt_kanban.view.MainLayout',
			'core.tj_smt_kanban.view.ItemTree',
			'core.tj_smt_kanban.view.DisplayPanel', 
			'core.tj_smt_kanban.view.item.Sl',
			'core.tj_smt_kanban.view.item.Cn',
			'core.tj_smt_kanban.view.item.SlList'
			],

	stores : [
			'core.tj_smt_kanban.store.Tree', 
			'core.tj_smt_kanban.store.sl.Store',
			'core.tj_smt_kanban.store.sl.ListStore',
			'core.tj_smt_kanban.store.cn.Store'
			],

	models : [
			'core.tj_smt_kanban.model.sl.Model', 
			'core.tj_smt_kanban.model.sl.ListModel',
			'core.tj_smt_kanban.model.cn.Model'
			]
});