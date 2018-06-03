 function renderCol(value, metaData, record, rowIndex, columnIndex, store, view ){
         metaData.style = "background-color: #05C0C0";
         return value;
 } 

var runner = new Ext.util.TaskRunner();
var task = null;

var p = 1; // Variable Page

Ext.define("core.ck_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
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
							task = {
								run : function() {
									//Ext.create("core.util.model.ClockAction").updateClock("ck","bl");
									var total=Ext.create("core.util.model.ClockAction").updateClock("ck","bl",p,"19");
											if(total!=0){
												if (p >= Math.ceil(total/19)) {
													p = 1;
												}else{
													p = p + 1;
												}		
											}
								},
								interval : 60000
							};
							runner.start(task);
						}
					} else {
						tabpanel.setActiveTab(tab);
					}

				}
			},
			//ck_bl_kb Destroy Event
			'panel[xtype=ck_bl_kb]' : {
				beforedestroy : function(e, eOpts) {
					runner.stop(task);
				}
			},
			'panel[xtype=ck_bl_kb]' : {
				itemclick : function(e, eOpts) {
					var width = comm.get("resolutionWidth") * 1;
					var height = comm.get("resolutionHeight") * 0.85;
					var mo = eOpts.data.moname;
					var store = Ext.data.StoreManager.map['core.ck_kanban.store.bl.ListStore'];
					var win = Ext.create('Ext.window.Window', {
								title : '物料清单信息 [ 工单:'+mo+' ]',
								height : height,
								width : width,
								closable : true,
								maximizable : true,
								stripeRows : true,
								modal : true,
								layout : 'fit',
								items : [{
											xtype : 'gridpanel',
											store : 'core.ck_kanban.store.bl.ListStore',
											columns : [{
												header : '序号',
												dataIndex : 'torder',
												align:'center',
												width : 50
												}, {
												header : '产品名称',
												dataIndex : 'ProductName',
												align:'center',
												width : 150
											}, {
												header : '槽位',
												dataIndex : 'stockLocation',
												align:'center',
												width : 150
											}, {
												header : '产品描述',
												dataIndex : 'ProductDescript',
												align:'center',
												width : 150
											}, {
												header : '需求数量',
												dataIndex : 'RequireMount',
												align:'center',
												width : 150
											}, {
												header : '备料数量',
												dataIndex : 'ReadyMount',
												align:'center',
												width : 150
											}, {
												header : '已使用数量',
												dataIndex : 'UsedMount',
												align:'center',
												width : 150
											}, {
												header : '剩余用量',
												dataIndex : 'LeftMount',
												align:'center',
												width : 150
											}, {
												header : '单位用量',
												dataIndex : 'UnitQty',
												align:'center',
												width : 150
											}, {
												header : '剩余生产板数',
												dataIndex : 'LeftUnitQtyMount',
												align:'center',
												flex : 1
											}]
											/*
											viewConfig:{
												//forceFit:true,
												//enableTextSelection:true,
												getRowClass:function(record,index,p,ds){
													var cls='row-white';
													if(record.get("UnitQty")=="1"){
														cls="row-green2"; //row-green2
													}
													return cls;
												}
											}
											*/
										}]

								//renderTo : Ext.getBody()
							}).show();
					store.load({params : {mo : mo}});
				}
			},
			//Main Frame Event
			'window[id=8a81830144e276020144e282161e0004_win]' : {
				beforehide : function(e, eOpts) {
					var tabpanel = e.down("ck_kb_content");
					var length = tabpanel.items.items.length;
					for (var i = 1; i < length; i++) {
						tabpanel.remove(tabpanel.items.items[i]);
					}
					runner.stopAll();

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