var tj_sc_runner=new Ext.util.TaskRunner();

var tj_sc_zm_task=null;
var tj_sc_zm_list_task=null;
var tj_sc_led_task=null;
var tj_sc_led_list_task=null;

var tj_sc_led_p=1;
var tj_sc_zm_p=1;

var pageItems=comm.get("pageItems");
var pageSum=1;		//default pageSum

Ext.define("core.test.controller.Controller", {
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
			'tj_sc_kb_navigation' : {
				itemclick : function(view, record, item, index, e, eOpts) {
					alert('a');
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

						
						if (name == "tj_sc_led_kb") {
							tj_sc_led_task = {
								run : function() {
									var tj_sc_led_total=self.updateClock("tj_sc","led",tj_sc_led_p,pageItems);
											if(tj_sc_led_total!=0){
												if (tj_sc_led_p >= Math.ceil(tj_sc_led_total/pageItems)) {
													tj_sc_led_p = 1;
												}else{
													tj_sc_led_p = tj_sc_led_p + 1;
												}		
											}
								},
								interval : 60000
							};
							tj_sc_runner.start(tj_sc_led_task);
						}else if(name == "tj_sc_zm_kb"){
							tj_sc_zm_task = {
								run : function() {
									var tj_sc_zm_total=self.updateClock("tj_sc","zm",tj_sc_zm_p,pageItems);
											if(tj_sc_zm_total!=0){
												if (tj_sc_zm_p >= Math.ceil(tj_sc_zm_total/pageItems)) {
													tj_sc_zm_p = 1;
												}else{
													tj_sc_zm_p = tj_sc_zm_p + 1;
												}		
											}
								},
								interval : 60000
							};
							tj_sc_runner.start(tj_sc_zm_task);						
						}
						tabpanel.setActiveTab(t);
					} else {
						tabpanel.setActiveTab(tab);
					}

				}
			},		
			
			'panel[xtype=tj_sc_zm_kb]':{	
				itemclick : function(e, eOpts) {
					tj_sc_runner.stop(tj_sc_zm_task);
					
					var MoName = eOpts.data.MoName;
					var productDescription=eOpts.data.productDescription;
					var productName=eOpts.data.ProductName;
					var MOQtyRequired=eOpts.data.MOQtyRequired;
					var SumTime=eOpts.data.SumTime;
					var standardHuman=eOpts.data.standardHuman;
					var MOId=eOpts.data.MOId;
					var Workcenterid=eOpts.data.Workcenterid;
					var StanTime=eOpts.data.StanTime;
					var WorkcenterName=eOpts.data.WorkcenterName;
					var win=Ext.create("core.test.view.item.ZmSc_List",{
						tbar:[
							{xtype:'tbspacer',width:320},
							'产品名称:('+productDescription+')',
							'-',
							'成品料号:('+productName+')',
							'-',
							'工单号:('+MoName+')',
							'-',
							'工单数量:('+MOQtyRequired+')',
							'-',
							'标准工时:('+StanTime+')',
							'-',
							'标准人力:('+standardHuman+')',
							'-',
							'线别:('+WorkcenterName+')']
					}).show();
					var mask=self.msg(win);
					var store=Ext.data.StoreManager.map['core.test.store.zm.ListStore'];
					tj_sc_zm_list_task={
						run:function(){
							mask.show();
							store.removeAll();
							store.load({params:{MOId:MOId,WorkcenterId:Workcenterid}});
							mask.hide();
						},
						interval:30000
					};
					tj_sc_runner.start(tj_sc_zm_list_task);
					
				},
				beforedistory:function(){
					tj_sc_runner.stop(tj_sc_zm_task);
				}
			},	
			
			'panel[xtype=tj_sc_zm_list_kb]':{
				beforeclose:function(){
					tj_sc_runner.stop(tj_sc_zm_list_task);
					tj_sc_runner.start(tj_sc_zm_task);
				}
			},		
			
			'panel[xtype=tj_sc_led_kb]':{	
				itemclick : function(e, eOpts) {
					tj_sc_runner.stop(tj_sc_led_task);
					
					var MoName = eOpts.data.MoName;
					var productDescription=eOpts.data.productDescription;
					var productName=eOpts.data.ProductName;
					var MOQtyRequired=eOpts.data.MOQtyRequired;
					var SumTime=eOpts.data.SumTime;
					var standardHuman=eOpts.data.standardHuman;
					var MOId=eOpts.data.MOId;
					var StanTime=eOpts.data.StanTime;
					var WorkcenterName=eOpts.data.WorkcenterName;
					var Workcenterid=eOpts.data.Workcenterid;
					var win=Ext.create("core.test.view.item.LedSc_List",{
						tbar:[
							{xtype:'tbspacer',width:320},
							'产品名称:('+productDescription+')',
							'-',
							'成品料号:('+productName+')',
							'-',
							'工单号:('+MoName+')',
							'-',
							'工单数量:('+MOQtyRequired+')',
							'-',
							'标准工时:('+StanTime+')',
							'-',
							'标准人力:('+standardHuman+')',
							'-',
							'线别:('+WorkcenterName+')']
					}).show();
					var mask=self.msg(win);
					var store=Ext.data.StoreManager.map['core.test.store.led.ListStore'];
					tj_sc_led_list_task={
						run:function(){
							mask.show();
							store.removeAll();
							store.load({params:{MOId:MOId,WorkcenterId:Workcenterid}});
							mask.hide();
						},
						interval:30000
					};
					tj_sc_runner.start(tj_sc_led_list_task);
					
				},
				beforedistory:function(){
					tj_sc_runner.stop(tj_sc_led_task);
				}
			},
			'panel[xtype=tj_sc_led_list_kb]':{
				beforeclose:function(){
					tj_sc_runner.stop(tj_sc_led_list_task);
					tj_sc_runner.start(tj_sc_led_task);
				}
			},			
			


			/*********************************************************************************************************
			 								< Main Frame Hide Event >
			 ********************************************************************************************************/ 			
			'window[id=8a828091483fa7a10148439f61730006_win]' : {
				beforehide : function(e, eOpts) {
					tj_sc_runner.stopAll();

				}
			}			
		});
	},

	views : [
				'core.test.base.BaseTree',
				'core.test.view.MainLayout',
				'core.test.view.ItemTree',
				'core.test.view.DisplayPanel',
				'core.test.view.item.ZmSc',
				'core.test.view.item.ZmSc_List',
				'core.test.view.item.LedSc',
				'core.test.view.item.LedSc_List'
			],

	stores : [
			'core.test.store.Tree',
			'core.test.store.zm.Store',
			'core.test.store.zm.ListStore',
			'core.test.store.led.Store',
			'core.test.store.led.ListStore'
			],
			
	models:[
		'core.test.model.zm.Model',
		'core.test.model.zm.ListModel',
		'core.test.model.led.Model',
		'core.test.model.led.ListModel'
	]

});