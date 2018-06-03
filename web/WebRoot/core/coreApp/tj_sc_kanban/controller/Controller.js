var tj_sc_runner=new Ext.util.TaskRunner();

var tj_sc_zm_task=null;
var tj_sc_zm_list_task=null;
var tj_sc_led_task=null;
var tj_sc_led_list_task=null;
var tj_sc_smt_task=null;
var tj_sc_smt_list_task=null;
var tj_sc_sh_task=null;
var tj_sc_sh_list_task=null;

var tj_sc_led_p=1;
var tj_sc_zm_p=1;
var tj_sc_smt_p=1;
var tj_sc_sh_p=1;

var pageItems=comm.get("pageItems");
var pageSum=1;		//default pageSum



Ext.define("core.tj_sc_kanban.controller.Controller", {
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
								//timeout: 5,
								interval : 60000
								
							};
							tj_sc_runner.start(tj_sc_led_task);
						}else if(name == "tj_sc_smt_kb"){
							tj_sc_smt_task = {
								run : function() {
									var tj_sc_smt_total=self.updateClock("tj_sc","smt",tj_sc_smt_p,pageItems);
											if(tj_sc_smt_total!=0){
												if (tj_sc_smt_p >= Math.ceil(tj_sc_smt_total/pageItems)) {
													tj_sc_smt_p = 1;
												}else{
													tj_sc_smt_p = tj_sc_smt_p + 1;
												}		
											}
								},
								interval : 60000
							};
						tj_sc_runner.start(tj_sc_smt_task);	
						}
						else if(name == "tj_sc_zm_kb"){
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
						else if(name == "tj_sc_sh_kb"){
							tj_sc_sh_task = {
									run : function() {
								
										var tj_sc_sh_total=self.updateClock("tj_sc","sh",tj_sc_sh_p,pageItems);
												if(tj_sc_sh_total!=0){
													if (tj_sc_sh_p >= Math.ceil(tj_sc_sh_total/pageItems)) {
														tj_sc_sh_p = 1;
													}else{
														tj_sc_sh_p = tj_sc_sh_p + 1;
													}		
												}
									},
									interval : 60000
								};
								tj_sc_runner.start(tj_sc_sh_task);	
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
					var RowNum = eOpts.data.RowNum;
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
					var win=Ext.create("core.tj_sc_kanban.view.item.ZmSc_List",{
						tbar:[
							{xtype:'tbspacer',width:220},
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
					var store=Ext.data.StoreManager.map['core.tj_sc_kanban.store.zm.ListStore'];
					var store2=Ext.data.StoreManager.map['core.tj_sc_kanban.store.zm.Store2'];
					tj_sc_zm_list_task={
						run:function(){
							//tj_sc_runner.start(tj_sc_zm_task);
							store2.removeAll();
							store2.load({params:{PageIndex:RowNum}});
							mask.show();
							store.removeAll();
							store.load({params:{MOId:MOId,WorkcenterId:Workcenterid}});
							mask.hide();
						},
						interval:30000
						//,timeout : 10
					};
					tj_sc_runner.start(tj_sc_zm_list_task);
				},
				beforedistory:function(){
					tj_sc_runner.stop(tj_sc_zm_task);
				}
			},
			'tj_sc_zm_kb button[action=button_zmid]' : {
				click:function(){
					tj_sc_runner.stop(tj_sc_zm_task);
				}
			},
			'panel[xtype=tj_sc_zm_list_kb]':{
				beforeclose:function(){
					tj_sc_runner.stop(tj_sc_zm_list_task);
					tj_sc_runner.start(tj_sc_zm_task);
				}
			},
			/*********************************************/
			'panel[xtype=tj_sc_sh_kb]':{
				itemclick : function(e, eOpts) {
					tj_sc_runner.stop(tj_sc_sh_task);
					var RowNum = eOpts.data.RowNum;
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
					var win=Ext.create("core.tj_sc_kanban.view.item.ShSc_List",{
						tbar:[
							{xtype:'tbspacer',width:220},
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
					var store=Ext.data.StoreManager.map['core.tj_sc_kanban.store.sh.ListStore'];
					var store2=Ext.data.StoreManager.map['core.tj_sc_kanban.store.sh.Store2'];
					tj_sc_sh_list_task={
						run:function(){
							
							store2.removeAll();
							store2.load({params:{PageIndex:RowNum}});
							mask.show();
							store.removeAll();
							store.load({params:{MOId:MOId,WorkcenterId:Workcenterid}});
							mask.hide();
						},
						interval:30000
						//,timeout : 10
					};
					tj_sc_runner.start(tj_sc_sh_list_task);
				},
				beforedistory:function(){
					tj_sc_runner.stop(tj_sc_sh_task);
				}
			},
			'tj_sc_dh_kb button[action=button_dhid]' : {
				click:function(){
					tj_sc_runner.stop(tj_sc_sh_task);
				}
			},
			'panel[xtype=tj_sc_sh_list_kb]':{
				beforeclose:function(){
					tj_sc_runner.stop(tj_sc_sh_list_task);
					tj_sc_runner.start(tj_sc_sh_task);
				}
			},
			//*******************************
			'panel[xtype=tj_sc_smt_kb]':{
				itemclick : function(e, eOpts) {
					tj_sc_runner.stop(tj_sc_smt_task);
					var RowNum = eOpts.data.RowNum;
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
					var win=Ext.create("core.tj_sc_kanban.view.item.SmtSc_List",{
						tbar:[
							{xtype:'tbspacer',width:220},
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
					
					var store=Ext.data.StoreManager.map['core.tj_sc_kanban.store.smt.ListStore'];
					var store2=Ext.data.StoreManager.map['core.tj_sc_kanban.store.smt.Store2'];
					tj_sc_smt_list_task={
						run:function(){
							//tj_sc_runner.start(tj_sc_zm_task);
							store2.removeAll();
							store2.load({params:{PageIndex:RowNum}});
							mask.show();
							store.removeAll();
							store.load({params:{MOId:MOId,WorkcenterId:Workcenterid}});
							mask.hide();
						},
						interval:30000
						//,timeout: 10
					};
					tj_sc_runner.start(tj_sc_smt_list_task);
				},
				beforedistory:function(){
					tj_sc_runner.stop(tj_sc_smt_task);
				}
			},
			'tj_sc_smt_kb button[action=button_smtid]' : {
				click:function(){
					tj_sc_runner.stop(tj_sc_smt_task);
				}
			},
			'panel[xtype=tj_sc_smt_list_kb]':{
				beforeclose:function(){
					tj_sc_runner.stop(tj_sc_smt_list_task);
					tj_sc_runner.start(tj_sc_smt_task);
				}
			},
			
			//***************************************
			'panel[xtype=tj_sc_led_kb]':{	
				itemclick : function(e, eOpts) {
					tj_sc_runner.stop(tj_sc_led_task);
					var RowNum = eOpts.data.RowNum;
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
					var win=Ext.create("core.tj_sc_kanban.view.item.LedSc_List",{
						
						tbar:[
						     {xtype:'tbspacer',width:220},
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
					var store=Ext.data.StoreManager.map['core.tj_sc_kanban.store.led.ListStore'];
					var store2=Ext.data.StoreManager.map['core.tj_sc_kanban.store.led.Store2'];
					tj_sc_led_list_task={
						run:function(){
							//tj_sc_runner.start(tj_sc_led_task);
							store2.removeAll();
							store2.load({params:{PageIndex:RowNum}});
							mask.show();
							store.removeAll();
							store.load({params:{MOId:MOId,WorkcenterId:Workcenterid}});
							mask.hide();
						},
						interval:30000
						//,timeout: 10
					};
				tj_sc_runner.start(tj_sc_led_list_task);
				},
				beforedistory:function(){
					tj_sc_runner.stop(tj_sc_led_task);
				}
			},
			'tj_sc_led_kb button[action=button_ledid]' : {
				click:function(){
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
			'window[id=8a81831545d549c30145d54d85de0001_win]' : {
				beforehide : function(e, eOpts) {
					//alert(Ext.Date.format(new Date(new Date()),'Y-m-d H:i:s'));
					tj_sc_runner.stopAll();
				}
			}			
		});
	},

	views : [
				'core.tj_sc_kanban.base.BaseTree',
				'core.tj_sc_kanban.view.MainLayout',
				'core.tj_sc_kanban.view.ItemTree',
				'core.tj_sc_kanban.view.DisplayPanel',
				'core.tj_sc_kanban.view.item.ZmSc',
				'core.tj_sc_kanban.view.item.ZmSc_List',
				'core.tj_sc_kanban.view.item.SmtSc',
				'core.tj_sc_kanban.view.item.SmtSc_List',
				'core.tj_sc_kanban.view.item.LedSc',
				'core.tj_sc_kanban.view.item.LedSc_List',
				'core.tj_sc_kanban.view.item.ShSc',
				'core.tj_sc_kanban.view.item.ShSc_List',				
				
			],

	stores : [
			'core.tj_sc_kanban.store.Tree',
			'core.tj_sc_kanban.store.zm.Store',
			'core.tj_sc_kanban.store.zm.Store2',
			'core.tj_sc_kanban.store.zm.ListStore',
			'core.tj_sc_kanban.store.led.Store',
			'core.tj_sc_kanban.store.led.Store2',
			'core.tj_sc_kanban.store.led.ListStore',
			'core.tj_sc_kanban.store.smt.Store',
			'core.tj_sc_kanban.store.smt.Store2',
			'core.tj_sc_kanban.store.smt.ListStore',
			'core.tj_sc_kanban.store.sh.Store',
			'core.tj_sc_kanban.store.sh.Store2',
			'core.tj_sc_kanban.store.sh.ListStore',
			],
			
	models:[
		'core.tj_sc_kanban.model.zm.Model',
		'core.tj_sc_kanban.model.zm.ListModel',
		'core.tj_sc_kanban.model.led.Model',
		'core.tj_sc_kanban.model.led.ListModel',
		'core.tj_sc_kanban.model.smt.Model',
		'core.tj_sc_kanban.model.smt.ListModel',
		'core.tj_sc_kanban.model.sh.Model',
		'core.tj_sc_kanban.model.sh.ListModel',
	]

});