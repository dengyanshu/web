var ck_runner = new Ext.util.TaskRunner();
var ck_bl_task = null;
var ck_blList_task = null;

var mainPageItems=comm.get("mainPageItems");
var pageItems=comm.get("pageItems");
//var pageItems=27;	//default pageItems
var pageSum=1;		//default pageSum

var ck_bl_p = 1; // Variable Page

Ext.define("core.ck_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		suppleUtil:'core.util.SuppleUtil'
	},
	
	init : function() {
		var self = this;
		coreApp = self;
		this.control({
			'ck_kb_navigation' : {
				itemclick : function(view, record, item, index, e, eOpts) {
					var tabpanel = view.ownerCt.ownerCt.items.items[2];
					var name = record.raw.name;
					var text = record.get("text");
					var id = record.get("id");
					var tab = tabpanel.getComponent(id);
					if (!tab) {
						var t = tabpanel.add({
									title : text,
									id : id,
									closable : true,
									layout : 'border',
									closeAction : 'hide',
									items : [{
												xtype : name,
												region : 'center'
											}]
								});
						tabpanel.setActiveTab(t);

						if (name == "ck_bl_kb") {
							ck_bl_task = {
								run : function() {
									var ck_bl_total=Ext.create("core.util.model.ClockAction").updateClock("ck","bl",ck_bl_p,mainPageItems);
											if(ck_bl_total!=0){
												if (ck_bl_p >= Math.ceil(ck_bl_total/mainPageItems)) {
													ck_bl_p = 1;
												}else{
													ck_bl_p = ck_bl_p + 1;
												}		
											}
								},
								interval : 60000
							};
							ck_runner.start(ck_bl_task);
						}
					} else {
						tabpanel.setActiveTab(tab);
					}

				}
			},
	
			
			'panel[xtype=ck_bl_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					ck_bl_p=params+1;
				}
			},
		
			
			'panel[xtype=ck_bl_kb]' : {
				itemclick : function(e, eOpts) {
					ck_runner.stop(ck_bl_task);
					var mo = eOpts.data.MOName;
					var store = Ext.data.StoreManager.map['core.ck_kanban.store.bl.ListStore'];
					var result=self.ajax({url:'/web/kanban/ck_bl_list.action',params:{mo:mo}});
					if(result.success){
						pageSum=Math.ceil(result.data.length/pageItems);
						store.proxy.data=result.data;
						store.load();
					}
/*
					Ext.Ajax.request({
						url:'/web/kanban/ck_bl_list.action',
						params:{mo:mo},
						success:function(response){
							var obj=Ext.decode(response.responseText);
							pageSum=Math.ceil(obj.data.length/pageItems);
							store.proxy.data=obj.data;
							store.load();
						}
					});
	*/			
					//page=Ext.create("core.util.model.KanBanItemListUtil").load(mo,store,"ck_bl_list",pageItems);
					var j=1;
					var win=Ext.create("Ext.window.Window",{
						title:'物料清单信息[ 工单:'+mo+' ]',
						maximized:true,
						listeners:{
							beforeclose:function(){
								ck_runner.start(ck_bl_task);
								ck_runner.stop(ck_blList_task);
							}
						},
						layout:'fit',
						items:[{
							xtype:'grid',
							columns:[
								{text:'序号',dataIndex:'RowNum',width:50},
								{text:'工作中心',dataIndex:'WorkCenterName',width:120},
								{text:'料号',dataIndex:'ProductName',width:130},
								{text:'产品描述',dataIndex:'ProductDescript',width:280},
								{text:'库位',dataIndex:'StockLocation',width:130},
								{text:'需求数量',dataIndex:'RequireQuantity',width:95},
								{text:'备料数量',dataIndex:'ReadyQuantity',width:95},
								{text:'已用数量',dataIndex:'UsedQuantity',width:95},
								{text:'剩余数量',dataIndex:'SurplusMount',width:95},
								{text:'单位用量',dataIndex:'UnitQty',width:95},
								{text:'可生产板数',dataIndex:'CanUsePCBQty',flex:1}
							],
							store:store,
							dockedItems:[{
								xtype:'pagingtoolbar',
								store : store,
								dock:'bottom',
								displayInfo:true,
								displayMsg:'第{0} 到 {1} 条数据 共{2}条',
								emptyMsg:'没有数据',
								listeners:{
									beforechange:function(bbar,params){
										j=params+1;
									}
								}
							}],
							viewConfig:{
								forceFit:true,
								enableRowBody:true,
								getRowClass:function(record,rowIndex,p,store){
									var cls='';
									if(record.data.isAlert!="0"){ 
										cls="row-red .x-grid-cell";
									}
									return cls;
								}
							},
							listeners:{
								beforeitemmouseenter:function(){
									ck_runner.stop(ck_blList_task);
								},
								
								beforeitemmouseleave:function(){
									ck_runner.start(ck_blList_task);
								
								}
							}
						}]
						
					}).show();
					
					ck_blList_task={
						run:function(){
							if(j<=pageSum){
								store.loadPage(j);
								j++;
							}else{
								j=1;
								var result=self.ajax({url:'/web/kanban/next_mo.action',params:{mo:mo,name:"AbsoluteCompleteRate"}});
								if(result.success){
									mo=result.returnMo;
									var result2=self.ajax({url:'/web/kanban/ck_bl_list.action',params:{mo:mo}});
									if(result2.success){
										pageSum=Math.ceil(result2.data.length/pageItems);
										store.proxy.data=result2.data;
										store.loadPage(1);
										win.setTitle('物料清单信息 [ 工单:'+mo+' ]');
									}
								}

							}
						},
						interval:8000
					};
					ck_runner.start(ck_blList_task);	
				},
				beforedestroy : function(e, eOpts) {
					ck_runner.stop(ck_bl_task);
				},
				beforeitemmouseenter:function(){
					ck_runner.stop(ck_bl_task);
				},			
				beforeitemmouseleave:function(){
					ck_runner.start(ck_bl_task);
				}
				
			},
			//Main Frame Event
			'window[id=8a81830144e276020144e282161e0004]' : {
				beforehide : function(e, eOpts) {
					ck_runner.stopAll();

				}
			}

		});
	},

	views : ['core.ck_kanban.view.MainLayout',
			'core.ck_kanban.view.ItemTree',
			'core.ck_kanban.view.DisplayPanel', 
			'core.ck_kanban.view.item.Bl'],

	stores : [
			'core.ck_kanban.store.Tree', 
			'core.ck_kanban.store.bl.Store',
			'core.ck_kanban.store.bl.ListStore'
			],

	models : [
			'core.ck_kanban.model.bl.Model', 
			'core.ck_kanban.model.bl.ListModel'
			]
});