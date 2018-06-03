var dip_runner = new Ext.util.TaskRunner();
var dip_zc_kb = null;
var dip_gc_kb = null;
var dip_zcList_kb = null;
var dip_zcb_task = null;
var dip_lts_task = null;
var dip_lts_list_task = null;
var dip_zcb_list_task = null;
var dip_gc_task = null;
var dip_gc_list_task = null;
var dip_dfl_task = null;
var dip_cll_task = null;
var dip_cll_list_task = null;
var dip_hr_task = null;
var dip_dfl_list_task = null;
var dip_sl_kb = null;
var dip_slList_kb=null;
var dip_scx_kb = null;
var dip_cll_kb = null;
var dip_hr_kb = null;
var dip_scxList_kb=null;
var dip_xstore_task = null;
var dip_xstore_list_task = null;
var dip_mt_task = null;
var dip_ff_task = null;
var dip_mt_list_task = null;

var dip_zc_p = 1; // Variable Page
var dip_sl_p = 1; // Variable Page
var dip_zcb_p = 1; // Variable Page dip_scx
var dip_gc_p = 1;
var dip_scx_p = 1;
var dip_cll_p = 1;
var dip_dfl_p = 1;
var dip_xstore_p = 1;
var dip_hr_p = 1;
var dip_mt_p = 1;

var time1;
var time2;

var mainPageItems=comm.get("mainPageItems");
var pageItems=comm.get("pageItems");

var pageSum=1;		//default pageSum
var pagehr=1;
var dip_sl_j;
var dip_zc_j;
var dip_zcb_j;
var dip_gc_j;
var total;
//var error=true;


Ext.define("core.dip_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		ClockAction:'core.util.model.ClockAction',
		MaskMsgUtil:'core.util.model.MaskMsgUtil',
		MessageUitl:'core.util.MessageUtil'

	},
	init : function() {
		var self = this;
		coreApp = self;
		this.control({
			'dip_kb_navigation' : {
				itemclick : function(view, record, item, index, e, eOpts) {
					var tabpanel = view.ownerCt.ownerCt.items.items[2];
					var name = record.raw.name;
					var text = record.get("text");
					var id = record.get("id");
					var tab = tabpanel.getComponent(id);
					if (!tab) {
						var t = tabpanel.add({
							title : text,id : id,closable : true,
							closeAction : 'hide',layout : 'border',
							items : [{xtype : name,region : 'center'}]
						});
						tabpanel.setActiveTab(t);
						
						if (name == "dip_zc_kb") {
							dip_zc_kb = {
								run : function() {
									var dip_zc_total=self.updateClock("dip","zc",dip_zc_p,mainPageItems);
											if(dip_zc_total!=0){
												if (dip_zc_p >= Math.ceil(dip_zc_total/mainPageItems)) {
													dip_zc_p = 1;
												}else{
													dip_zc_p = dip_zc_p + 1;
												}		
											}
								},
								interval : 60000
							};
							dip_runner.start(dip_zc_kb);
						}
						else if (name == "dip_gc_kb") {
							dip_gc_task = {
								run : function() {								
									var store = Ext.data.StoreManager.map['core.dip_kanban.store.gc.Store'];
									var result=self.ajax({url:'/web/kanban/dip_gc!getResult.action',
										params:{limit:100,page:1}});
									if(result.success){
										total=result.total;
										var data=result.data;
										if(total==0){
											store.removeAll(true);
											Ext.Msg.alert("系统提示",data[0].ErrorMsg);

											dip_runner.stopAll();
										}else {
											store.proxy.data=result.data;
											store.load();
										}
										
									}else{
										store.removeAll(true);
										Ext.Msg.alert("系统提示",result.returnMsg);
									}
								},
								interval : 60000
							};
							dip_runner.start(dip_gc_task);
						}
						else if (name == "dip_hr_kb") {
							dip_hr_task = {
								run : function() {
								var store = Ext.data.StoreManager.map['core.dip_kanban.store.hr.Store'];
								store.load();

								},
								interval : 60000*60
								
							};
							dip_runner.start(dip_hr_task);
						}
						else if(name == "dip_sl_kb"){
							dip_sl_kb = {
								run : function() {
									var dip_sl_total=self.updateClock("dip","sl",dip_sl_p,mainPageItems);
											if(dip_sl_total!=0){
												if (dip_sl_p >= Math.ceil(dip_sl_total/mainPageItems)) {
													dip_sl_p = 1;
												}else{
													dip_sl_p = dip_sl_p + 1;
												}
											}
								},
								interval : 60000
							};
							dip_runner.start(dip_sl_kb);
						}
						else if(name == "dip_zcb_kb"){
							dip_zcb_task = {
								run : function() {
									var store = Ext.data.StoreManager.map['core.dip_kanban.store.zcb.Store'];
									var result=self.ajax({url:'/web/kanban/dip_zcb!getResult.action',
										params:{limit:100,page:1}});
									if(result.success){
										total=result.total;
										var data=result.data;
										if(total==0){
											store.removeAll(true);
											Ext.Msg.alert("系统提示",data[0].ErrorMsg);//										
											dip_runner.stopAll();
										}else {
											store.proxy.data=result.data;
											store.load();
										}
										
									}else{
										store.removeAll(true);
										Ext.Msg.alert("系统提示",result.returnMsg);
									}
									
//									var dip_zcb_total=self.updateClock("dip","zcb",dip_zcb_p,mainPageItems);
//											if(dip_zcb_total!=0){
//												if (dip_zcb_p >= Math.ceil(dip_zcb_total/mainPageItems)) {
//													dip_zcb_p = 1;
//												}else{
//													dip_zcb_p = dip_zcb_p + 1;
//												}
//											}
								},
								interval : 60000
							};
							dip_runner.start(dip_zcb_task);							
						}
						else if(name == "dip_lts_kb"){
							 dip_lts_task = {
								run : function() {
									var store = Ext.data.StoreManager.map['core.dip_kanban.store.lts.Store'];
									var result=self.ajax({url:'/web/kanban/dip_lts!getResult2.action',
										params:{level:1}});
									if(result.success){
										var total=result.total;
										var data=result.data;
										if(total==0){
											store.removeAll(true);
											dip_runner.stopAll();
										}else {
											store.proxy.data=result.data;
											store.load();
										}
										
									}else{
										store.removeAll(true);										
									}
									

								},
								interval : 60000
							};
							dip_runner.start(dip_lts_task);							
						}

						else if(name == "dip_mt_kb"){
							dip_mt_task = {
								run : function() {													 
									var dip_mt_total=self.updateClock("dip","mt",dip_mt_p,mainPageItems);									
									if(dip_mt_total!=0){
										if (dip_mt_p >= Math.ceil(dip_mt_total/mainPageItems)) {
											dip_mt_p = 1;
										}else{
											dip_mt_p = dip_mt_p + 1;
										}
									}
								},
								interval : 600000
							};
							dip_runner.start(dip_mt_task);							
						}
						
						else if (name == "dip_ff_kb") {
							dip_ff_task = {
								run : function() {								
									var store = Ext.data.StoreManager.map['core.dip_kanban.store.ff.Store'];
									var result=self.ajax({url:'/web/kanban/dip_mt!getResult2.action',
										params:{limit:100,page:1}});
									if(result.success){
										total=result.total;
										var data=result.data;
										if(total==0){
											store.removeAll(true);
											Ext.Msg.alert("系统提示",data[0].ErrorMsg);

											dip_runner.stopAll();
										}else {
											store.proxy.data=result.data;
											store.load();
										}
										
									}else{
										store.removeAll(true);
										Ext.Msg.alert("系统提示",result.returnMsg);
									}
								},
								interval : 60000
							};
							dip_runner.start(dip_ff_task);
						}
						else if(name == "dip_scx_kb"){
							dip_scx_task = {
								run : function() {
//									var dip_scx_total=self.updateClock("dip","scx",dip_scx_p,mainPageItems);
//									
//											if(dip_scx_total!=0){
//												if (dip_scx_p >= Math.ceil(dip_scx_total/mainPageItems)) {
//													dip_scx_p = 1;
//												}else{
//													dip_scx_p = dip_scx_p + 1;
//												}
//											}
									var store = Ext.data.StoreManager.map['core.dip_kanban.store.scx.Store'];
									var result=self.ajax({url:'/web/kanban/dip_scx!getResult.action',
										params:{limit:100,page:1}});
									if(result.success){
										var data=result.data;
										if(data[0].ErrorMsg!=null){
											store.removeAll(true);
											Ext.Msg.alert("系统提示",data[0].ErrorMsg);
											dip_runner.stopAll();
										}else {
											store.proxy.data=result.data;
											store.load();
										}
									}else{
										store.removeAll(true);
										Ext.Msg.alert("系统提示",result.returnMsg);
									}
								},
								interval : 2000000
							};
							dip_runner.start(dip_scx_task);							
						}
						else if(name == "dip_cll_kb"){
							dip_cll_task = {
								run : function() {
									var dip_cll_total=self.updateClock("dip","cll",dip_cll_p,mainPageItems);
									
									if(dip_cll_total!=0){
										if (dip_cll_p >= Math.ceil(dip_cll_total/mainPageItems)) {
											dip_cll_p = 1;
										}else{
											dip_cll_p = dip_cll_p + 1;
										}
									}
								},
								interval : 60000
							};
							dip_runner.start(dip_cll_task);							
						}
						else if(name == "dip_dfl_kb"){
							dip_dfl_task = {
								run : function() {
									var dip_dfl_total=self.updateClock("dip","dfl",dip_dfl_p,mainPageItems);				
									if(dip_dfl_total!=0){
										if (dip_dfl_p >= Math.ceil(dip_dfl_total/mainPageItems)) {
											dip_dfl_p = 1;
										}else{
											dip_dfl_p = dip_dfl_p + 1;
										}
									}
								},
								interval : 60000 
							};
							dip_runner.start(dip_dfl_task);							
						}
						else if(name == "dip_xstore_kb"){
							dip_xstore_task = {
								run : function() {								

									var dip_xstore_total=self.updateClock("dip","xstore",dip_xstore_p,mainPageItems);
									
									if(dip_xstore_total!=0){
										if (dip_xstore_p >= Math.ceil(dip_xstore_total/mainPageItems)) {
											dip_xstore_p = 1;
										}else{
											dip_xstore_p = dip_xstore_p + 1;
										}
									}
								},
								interval : 60000
							};
							dip_runner.start(dip_xstore_task);							
						}
					} else {
						tabpanel.setActiveTab(tab);
					}
				}
			},
			
			'dip_scx_kb button[action=button_scxid]' : {
				click:function(){
					dip_runner.stop(dip_scx_task);
				}
			},
			
			'panel[xtype=dip_zc_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					dip_zc_p=params+1;
				}
			},
			
			'panel[xtype=dip_sl_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					dip_sl_p=params+1;
				}
			},
			
			'panel[xtype=dip_zc_list_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					dip_zc_j=params+1;
				}
			},
			
			'panel[xtype=dip_sl_list_kb] pagingtoolbar':{
				beforechange:function(bbar,params){
					dip_sl_j=params+1;
				}
			},
			'panel[xtype=dip_zc_kb]' : {
				itemclick : function(e, eOpts) {		
					dip_runner.stop(dip_zc_kb);
					var mo = eOpts.data.MOName;	
				    dip_zc_j=1;

					var win=Ext.create("core.dip_kanban.view.item.ZcList",{
						layout:'fit',
						title:'DIP制程  ===> 物料清单信息[ 工单:'+mo+' ]'
					}).show();
					var mask=self.msg(win);
					var store = Ext.data.StoreManager.map['core.dip_kanban.store.zc.ListStore'];
					mask.show();
					var result=self.ajax({url:'/web/kanban/dip_zc_list!getResult.action',params:{mo:mo}});
					mask.hide();
					if(result.success){
						pageSum=Math.ceil(result.data.length/pageItems);
						store.proxy.data=result.data;
						store.load();
					}else{
						store.removeAll(true);
						Ext.Msg.alert("系统提示",result.returnMsg);
					}
					
					dip_zcList_kb={
						run:function(){
							if(dip_zc_j<=pageSum){store.loadPage(dip_zc_j);
								dip_zc_j++;
							}else{
								dip_zc_j=1;
								var result=self.ajax({url:'/web/kanban/dip_zc_list!getResult.action',params:{mo:mo}});
								if(result.success){
									pageSum=Math.ceil(result.data.length/pageItems);
									store.proxy.data=result.data;
									store.loadPage(dip_zc_j);
								}else{
									store.removeAll(true);
									Ext.Msg.alert("系统提示",result.returnMsg);
								}
							}
						},
						interval:10000
					};
					dip_runner.start(dip_zcList_kb);						
				},
				beforedestroy : function(e, eOpts) {
					dip_runner.stop(dip_zc_kb);
				}
			},
	/*******************************************************************************************************************
	 * 
	 *******************************************************************************************************************/
			'panel[xtype=dip_zc_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[17].getValue();
					var store=Ext.data.StoreManager.map['core.dip_kanban.store.zc.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=dip_zc_kb] button[action=stop]':{
				click:function(e,eOpts){
					var search=e.ownerCt.items.items[19];
					var text=e.ownerCt.items.items[17];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						dip_runner.stop(dip_zc_kb);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						dip_runner.start(dip_zc_kb);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			
			'panel[xtype="dip_zc_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.dip_kanban.store.zc.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},			
			
			
			'panel[xtype=dip_zc_list_kb]':{
				beforeclose:function(){
					dip_runner.start(dip_zc_kb);
					dip_runner.stop(dip_zcList_kb);
				}	
			},
			
			'panel[xtype=dip_zc_list_kb] grid[xtype=grid]':{
				beforechange:function(bbar,params){
					dip_zc_j=params+1;
				},
				beforeitemmouseenter:function(){
					dip_runner.stop(dip_zcList_kb);
				},			
				beforeitemmouseleave:function(){
					dip_runner.start(dip_zcList_kb);
				}
			},

			
/*************************************************************************************************************
 * 
 ************************************************************************************************************/
			'panel[xtype=dip_sl_kb] button[action=search]':{
				click:function(e,eOpts){
					var mo=e.ownerCt.items.items[17].getValue();
					var store=Ext.data.StoreManager.map['core.dip_kanban.store.sl.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
				}
			},
			
			'panel[xtype=dip_sl_kb] button[action=stop]':{
				click:function(e,eOpts){
					console.log(e.ownerCt.items);
					var search=e.ownerCt.items.items[19];
					var text=e.ownerCt.items.items[17];
					
					if(e.getText()=="停止"){
						e.setText("开始");
						dip_runner.stop(dip_sl_kb);
						search.setDisabled(false);
						text.setDisabled(false);
					}else{
						e.setText("停止");
						dip_runner.start(dip_sl_kb);	
						search.setDisabled(true);
						text.setDisabled(true);
					}
				}
			},
			
			'panel[xtype="dip_sl_kb] textfield[name=mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
					var mo=field.getValue();
					var store=Ext.data.StoreManager.map['core.dip_kanban.store.sl.Store'];
					store.load({params : {mo:mo,limit:pageItems,page:1}});	
					}
				}
			},		
			
			
			'panel[xtype=dip_sl_kb]' : {
				itemclick : function(e, eOpts) {
					dip_runner.stop(dip_sl_kb);
					var mo = eOpts.data.MOName;	
					dip_sl_j=1;
					var win=Ext.create("core.dip_kanban.view.item.SlList",{
						title:'DIP上料  ===> 物料清单信息[ 工单:'+mo+' ]'
					}).show();
					
					var mask=self.msg(win);
					var store = Ext.data.StoreManager.map['core.dip_kanban.store.sl.ListStore'];
					mask.show();
					var result=self.ajax({url:'/web/kanban/dip_sl_list!getResult.action',params:{mo:mo}});
					mask.hide();
					if(result.success){
						pageSum=Math.ceil(result.data.length/pageItems);
						store.proxy.data=result.data;
						store.load();
					}else{
						store.removeAll(true);
						Ext.Msg.alert("系统提示",result.returnMsg);
					}					
					
					dip_slList_kb={
						run:function(){
							if(dip_sl_j<=pageSum){
								store.loadPage(dip_sl_j);
								dip_sl_j++;
							}else{
								dip_sl_j=1;
								var result=self.ajax({url:'/web/kanban/dip_sl_list!getResult.action',params:{mo:mo}});
								if(result.success){
									pageSum=Math.ceil(result.data.length/pageItems);
									store.proxy.data=result.data;
									store.loadPage(dip_sl_j);
								}else{
									store.removeAll(true);
									Ext.Msg.alert("系统提示",result.returnMsg);
								}
							}
						},
						interval:10000
					};
					dip_runner.start(dip_slList_kb);						 		
				},
				beforedestroy : function(e, eOpts) {
					dip_runner.stop(dip_sl_kb);
				}
			},		
			'panel[xtype=dip_sl_list_kb]':{
				beforeclose:function(){
					dip_runner.start(dip_sl_kb);
					dip_runner.stop(dip_slList_kb);
				}	
			},
			
			'panel[xtype=dip_sl_list_kb] grid[xtype=grid]':{
				beforechange:function(bbar,params){
					dip_sl_j=params+1;
				},
				beforeitemmouseenter:function(){
					dip_runner.stop(dip_slList_kb);
				},			
				beforeitemmouseleave:function(){
					dip_runner.start(dip_slList_kb);
				}
			},
			
			/********************************************
			 * hr点击事件
			 ********************************************/
			'panel[xtype=dip_hr_kb]':{
				itemclick : function(e, eOpts) {
					dip_runner.stop(dip_hr_task);
					var ErrorMsg=eOpts.data.ErrorMsg;
//					var errordate=a.substring(7,11);
					//a.substring(0,2)
					if(ErrorMsg!=''||ErrorMsg!=null){
					Ext.Msg.alert("系统提示",a);
					}
				}},
			/********************************************
			 **新增多发料看板
			 ********************************************/
			'panel[xtype=dip_dfl_kb]':{
				itemclick : function(e, eOpts) {	
					dip_runner.stop(dip_dfl_task);
					var PickingListId= eOpts.data.PickingListId;
					var PickinglistName = eOpts.data.PickinglistName;	
										
					var win=Ext.create("core.dip_kanban.view.item.Dfl_List",{
						tbar:[
							'领料单:('+PickinglistName+') 多发料数量--扣除发料需求以后领料单各料的剩余量'				    	    
				    ]
					}).show();
					
					var mask=self.msg(win);				
					var store=Ext.data.StoreManager.map['core.dip_kanban.store.dfl.ListStore'];
										
					dip_dfl_list_task={
						run:function(){
							mask.show();
							store.removeAll();
							store.load({params:{PickingListId:PickingListId}});
							mask.hide();
						},
						interval: 1*60000
					};
					dip_runner.start(dip_dfl_list_task);
				},
				beforedistory:function(){
					dip_runner.stop(dip_dfl_task);
				}
			},
			'panel[xtype=dip_dfl_list_kb]':{
				beforeclose:function(){
					dip_runner.stop(dip_dfl_list_task);
					dip_runner.start(dip_dfl_task);
				}
			},			
			/********************************************
			 * 新增组测包产能看板
			 ********************************************/
			'panel[xtype=dip_zcb_kb]':{
				itemclick : function(e, eOpts) {
					dip_runner.stop(dip_zcb_task);
					if(eOpts.data.SumYield==0){
						Ext.Msg.alert("系统提示",eOpts.data.ErrorMsg);
					}else{
					var RowNum = eOpts.data.id;
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
					var Outtime=eOpts.data.Outtime;
					var Specificationid=eOpts.data.Specificationid_End;
					var win=Ext.create("core.dip_kanban.view.item.Zcb_List",{
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
					var store=Ext.data.StoreManager.map['core.dip_kanban.store.zcb.ListStore'];
					var store2=Ext.data.StoreManager.map['core.dip_kanban.store.zcb.Store2'];
					dip_zcb_list_task={
						run:function(){
							//tj_sc_runner.start(tj_sc_zm_task);
							store2.removeAll();
							store2.load({
								params:{
									page:RowNum,
									ZcbTime:Outtime,
									Specificationid:Specificationid
									}
							});
							mask.show();
							store.removeAll();
							store.load({
								params:{
										MOId:MOId,WorkcenterId:Workcenterid,
										Outtime:Outtime,
										Specificationid:Specificationid
										}
									});
							mask.hide();
						},
						interval: 1*60000
					};
					dip_runner.start(dip_zcb_list_task);
					}
					},
				beforedistory:function(){
					dip_runner.stop(dip_zcb_task);
				}
			},
			'dip_zcb_kb button[action=button_zcbid]' : {
				click:function(){
					dip_runner.stop(dip_zcb_task);
				}
			},
			'panel[xtype=dip_zcb_list_kb]':{
				beforeclose:function(){
//					error=false;
					dip_runner.stop(dip_zcb_list_task);
//					dip_runner.start(dip_zcb_task);
				}
			},
			/********************************************
			 * 新增超领料明细看板
			 ********************************************/
			'panel[xtype=dip_cll_kb]':{
				itemclick : function(e, eOpts) {		
					dip_runner.stop(dip_cll_task);
					var ProductName = eOpts.data.ProductName;
					var win=Ext.create("core.dip_kanban.view.item.Cll_List",{
						tbar:[
						      '领料单明细'
						]
					}).show();
					
					var mask=self.msg(win);
					var store=Ext.data.StoreManager.map['core.dip_kanban.store.xstore.ListStore'];	
					
					dip_cll_list_task={						
						run:function(){
							mask.show();
							store.removeAll();			
							store.load({params:{ProductName:ProductName,limit:100,page:1}});
							mask.hide();							
						},
						interval: 1*60000
					};
					dip_runner.start(dip_cll_list_task);
				},
				beforedistory:function(){
					dip_runner.stop(dip_cll_task);
				}
			},
			
			'panel[xtype=dip_cll_list_kb]':{
				beforeclose:function(){
					dip_runner.stop(dip_cll_list_task);
					dip_runner.start(dip_cll_task);
				}
			},		
			/********************************************
			 * 新增X仓余料看板
			 ********************************************/
			'panel[xtype=dip_xstore_kb]':{
				itemclick : function(e, eOpts) {		
					dip_runner.stop(dip_xstore_task);
					var ProductName = eOpts.data.ProductName;
					var win=Ext.create("core.dip_kanban.view.item.XStore_List",{
						tbar:[
						      '领料单明细'
						]
					}).show();
					
					var mask=self.msg(win);
					var store=Ext.data.StoreManager.map['core.dip_kanban.store.xstore.ListStore'];	
					
					dip_xstore_list_task={						
						run:function(){
							mask.show();
							store.removeAll();			
							store.load({params:{ProductName:ProductName ,limit:100,page:1}});
 
							mask.hide();							
						},
						interval: 1*60000
					};
					dip_runner.start(dip_xstore_list_task);
				},
				beforedistory:function(){
					dip_runner.stop(dip_xstore_task);
				}
			},
			
			'panel[xtype=dip_xstore_list_kb]':{
				beforeclose:function(){
					dip_runner.stop(dip_xstore_list_task);
					dip_runner.start(dip_xstore_task);
				}
			},
			/********************************************
			 * 新增工时效率看板  
			 ********************************************/
			'panel[xtype=dip_lts_kb]':{
				itemclick : function(e, eOpts) {					
					var OrgName = eOpts.data.OrgName;			
					dip_runner.stop(dip_lts_task);
					var win=Ext.create("core.dip_kanban.view.item.Lts_List",{
					}).show();				
					
					var mask=self.msg(win);
					var store=Ext.data.StoreManager.map['core.dip_kanban.store.lts.ListStore'];
					
					dip_lts_list_task={
						run:function(){
							mask.show();
							store.removeAll();

							store.load({params:{OrgName:OrgName}});							
							mask.hide();

						},
						interval: 1*60000
					};
					dip_runner.start(dip_lts_list_task);					
					},
				beforedistory:function(){
					dip_runner.stop(dip_lts_task);
				}
			},

			'panel[xtype=dip_lts_list_kb]':{
				beforeclose:function(){

					dip_runner.stop(dip_lts_list_task);

				}
			},
			/********************************************
			 * 新增生产状态监控看板
			 ********************************************/
			'panel[xtype=dip_mt_kb]':{
				itemclick : function(e, eOpts) {		
					dip_runner.stop(dip_mt_task);
					var MOName = eOpts.data.MOName;
					var win=Ext.create("core.dip_kanban.view.item.Mt_List",{
						tbar:[
						      '生产监控看板'
						]
					}).show();
					
					var mask=self.msg(win);
					var store=Ext.data.StoreManager.map['core.dip_kanban.store.mt.ListStore'];	
					
					dip_mt_list_task={						
						run:function(){
							mask.show();
							store.removeAll();			
							store.load({params:{MoName:MOName,limit:100,page:1}});
							mask.hide();							
						},
						interval: 1*60000
					};
					dip_runner.start(dip_mt_list_task);
				},
				beforedistory:function(){
					dip_runner.stop(dip_mt_task);
				}
			},
			
			'panel[xtype=dip_mt_list_kb]':{
				beforeclose:function(){
					dip_runner.stop(dip_mt_list_task);
					dip_runner.start(dip_mt_task);
				}
			},	
			/********************************************
			 * 新增规程看板
			 ********************************************/
			'panel[xtype=dip_gc_kb]':{
				itemclick : function(e, eOpts) {
					dip_runner.stop(dip_gc_task);
					var MoName = eOpts.data.MOName;
					var WorkcenterName=eOpts.data.WorkcenterName;
					var win=Ext.create("core.dip_kanban.view.item.Gc_List",{
						tbar:[
							
							'工单号:('+MoName+')',
							'---',
							'线别:('+WorkcenterName+')',

							'->','开始时间',{
								xtype:'datetimefield',
								format:'Y-m-d H:i:s',
								allowBlank : false,
								blankText : '开始时间必须填写',
//								afterLabelTextTpl : required,
								anchor : '100%',
				    	    	id:'chaxunrqgc1',
				    	    	name : 'chaxunrqgc1',
				    	    	maxValue: new Date()
				    	    },
				    	    '截止时间',{
				    	    	xtype:'datetimefield',
								format:'Y-m-d H:i:s',
								allowBlank : false,
								blankText : '截止时间必须填写',
								anchor : '100%',
				    	    	id:'chaxunrqgc2',
				    	    	name : 'chaxunrqgc2',
				    	    	maxValue: new Date()
				    	    },{
				    			xtype:'button',
				    		    text:'查询',
				    		    action: 'button_gcid',
				    		    disabled:false,
				    		    handler:function(){
				    		    	var chaxunrq1= Ext.getCmp("chaxunrqgc1").getValue();
				    		    	var chaxunrq2= Ext.getCmp("chaxunrqgc2").getValue();
				    		    	
				    		    	time1=Ext.Date.format(new Date(chaxunrq1),'Y-m-d H:i:s');
				    		    	time2=Ext.Date.format(new Date(chaxunrq2),'Y-m-d H:i:s');
				    		    	
				    		var stores2=Ext.data.StoreManager.map['core.dip_kanban.store.gc.ListStore'];
					    			stores2.removeAll();
					    			stores2.load({params:{
					    				MoName:MoName,WorkcenterName:WorkcenterName,Time1:time1,Time2:time2
					    				}});
					    				stores2.load();
					    				dip_runner.stop(dip_gc_list_task);
				    		    }
				    	    }]
					}).show();
					
					var mask=self.msg(win);
					var store=Ext.data.StoreManager.map['core.dip_kanban.store.gc.ListStore'];
					
					dip_gc_list_task={
						run:function(){
							mask.show();
							store.removeAll();
							store.load({params:{MoName:MoName,WorkcenterName:WorkcenterName}});
							mask.hide();
						},
						interval: 1*60000
					};
					dip_runner.start(dip_gc_list_task);
				},
				beforedistory:function(){
					dip_runner.stop(dip_gc_task);
				}
			},
			'panel[xtype=dip_gc_list_kb]':{
				beforeclose:function(){
					dip_runner.stop(dip_gc_list_task);
					dip_runner.start(dip_gc_task);
				}
			},

			//***********************************************
			
			//Main Frame Event
			'window[id=8a81830144e276020144e280eabd0003_win]' : {
				beforehide : function(e, eOpts) {
					dip_runner.stopAll();	
				}
			}
		});
	},

	views : ['core.dip_kanban.view.MainLayout',
			'core.dip_kanban.view.ItemTree',
			'core.dip_kanban.view.DisplayPanel',
			'core.dip_kanban.view.item.Zc',
			'core.dip_kanban.view.item.Lts',
			'core.dip_kanban.view.item.Lts_List',
			'core.dip_kanban.view.item.Sl',
			'core.dip_kanban.view.item.SlList',
			'core.dip_kanban.view.item.ZcList',
			'core.dip_kanban.view.item.Zcb',
			'core.dip_kanban.view.item.Zcb_List',
			'core.dip_kanban.view.item.Gc',
			'core.dip_kanban.view.item.Gc_List',
			'core.dip_kanban.view.item.Mt',
			'core.dip_kanban.view.item.Ff',
			'core.dip_kanban.view.item.Mt_List',
			'core.dip_kanban.view.item.Scx',
			'core.dip_kanban.view.item.Cll',
			'core.dip_kanban.view.item.Dfl',
			'core.dip_kanban.view.item.Dfl_List',
			'core.dip_kanban.view.item.XStore',
			'core.dip_kanban.view.item.XStore_List',
			'core.dip_kanban.view.item.Hr'
			],

	stores : [
			'core.dip_kanban.store.Tree', 
			'core.dip_kanban.store.zc.Store',
			'core.dip_kanban.store.zc.ListStore',
			'core.dip_kanban.store.zcb.Store',
			'core.dip_kanban.store.zcb.Store2',
			'core.dip_kanban.store.zcb.ListStore',
			'core.dip_kanban.store.gc.Store',
			'core.dip_kanban.store.gc.ListStore',
			'core.dip_kanban.store.lts.Store',
			'core.dip_kanban.store.lts.ListStore',
			'core.dip_kanban.store.sl.Store',
			'core.dip_kanban.store.sl.ListStore',
			'core.dip_kanban.store.scx.Store',
			'core.dip_kanban.store.cll.Store',
			'core.dip_kanban.store.dfl.Store',
			'core.dip_kanban.store.dfl.ListStore',
			'core.dip_kanban.store.mt.Store',
			'core.dip_kanban.store.ff.Store',
			'core.dip_kanban.store.mt.ListStore',
			'core.dip_kanban.store.xstore.Store',
			'core.dip_kanban.store.xstore.ListStore',
			'core.dip_kanban.store.hr.Store'
			],

	models : [
			'core.dip_kanban.model.zc.Model', 
			'core.dip_kanban.model.zc.ListModel',
			'core.dip_kanban.model.zcb.Model', 
			'core.dip_kanban.model.zcb.Model2', 
			'core.dip_kanban.model.zcb.ListModel',
			'core.dip_kanban.model.gc.Model', 
			'core.dip_kanban.model.gc.ListModel',
			'core.dip_kanban.model.sl.Model',
			'core.dip_kanban.model.sl.ListModel',
			'core.dip_kanban.model.scx.Model',
			'core.dip_kanban.model.cll.Model',
			'core.dip_kanban.model.dfl.Model',
			'core.dip_kanban.model.dfl.ListModel',
			'core.dip_kanban.model.mt.Model',
			'core.dip_kanban.model.ff.Model',
			'core.dip_kanban.model.mt.ListModel',	
			'core.dip_kanban.model.xstore.Model',
			'core.dip_kanban.model.xstore.ListModel',
			'core.dip_kanban.model.lts.Model', 
			'core.dip_kanban.model.lts.ListModel',
			'core.dip_kanban.model.hr.Model'
			]
});