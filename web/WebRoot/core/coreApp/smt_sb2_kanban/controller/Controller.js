var smt_sb2_runner=new Ext.util.TaskRunner();

var smt_sb2_fd_task=null;
var smt_sb2_fd_list_task=null;
var smt_sb2_fd_p=1;

var smt_sb2_gw_task=null;
var smt_sb2_gw_list_task=null;
var smt_sb2_gw_p=1;

var smt_sb2_zj_task=null;
var smt_sb2_zj_list_task=null;
var smt_sb2_zj_p=1;


var smt_sb2_gd_task=null;
var smt_sb2_gd_list_task=null;
var smt_sb2_gd_p=1;


var smt_sb2_xz_task=null;
var smt_sb2_xz_list_task=null;
var smt_sb2_xz_p=1;

var pageItems=comm.get("pageItems");
var pageSum=1;		//default pageSum


Ext.define("core.smt_sb2_kanban.controller.Controller", {
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
			'smtsb2_kb_navigation' : {
				itemclick : function(view, record, item, index, e, eOpts) {
					var tabpanel = view.ownerCt.ownerCt.items.items[2];
					var name = record.raw.name;
					var text = record.get("text");
					var id = record.get("id");
					var tab = tabpanel.getComponent(id);
					
					var store = Ext.data.StoreManager.map['core.smt_sb2_kanban.store.Store'];
					var result=self.ajax({url:'/web/kanban/smt_sb!getResult_title.action',params:{text:text}});
					
					var title=result.data[0].title;
						//alert(title);		
					
					
					if (!tab) {
						var t = tabpanel.add({
							title : text,id : id,closable : true,
							layout : 'border',closeAction : 'hide',
							items : [{xtype : name,title:title,region : 'center'}]
						});
						if (name == "smtsb2_fd_kb") {
							smt_sb2_fd_task = {
								run : function() {								
									var store = Ext.data.StoreManager.map['core.smt_sb2_kanban.store.fd.Store'];
									var result=self.ajax({url:'/web/kanban/smt_sb!getResult_fd_odm.action',
										params:{limit:10,page:1}});
									if(result.success){
										total=result.total;
										var data=result.data;
										if(total==0){
											store.removeAll(true);
											Ext.Msg.alert("系统提示",data[0].ErrorMsg);
											smt_sb2_runner.stop(smt_sb2_fd_task);
										}else {
											store.proxy.data=result.data;
											store.load();
										}
									}else{
										store.removeAll(true);
										Ext.Msg.alert("系统提示",result.returnMsg);
									}
								},
//								run : function() {
//									var smt_sb2_fd_total=self.updateClock("smt_sb2","fd",smt_sb2_fd_p,pageItems);
//											if(smt_sb2_fd_total!=0){
//												if (smt_sb2_fd_p >= Math.ceil(smt_sb2_fd_total/pageItems)) {
//													smt_sb2_fd_p = 1;
//												}else{
//													smt_sb2_fd_p = smt_sb2_fd_p + 1;
//												}
//											}
//								},
								//timeout: 5,
								interval : 60000
							};
							smt_sb2_runner.start(smt_sb2_fd_task);
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
						else	if (name == "smtsb2_gw_kb") {
							smt_sb2_gw_task = {
								run : function() {
									var smt_sb2_gw_total=self.updateClock("smt_sb2","gw",smt_sb2_gw_p,pageItems);
											if(smt_sb2_gw_total!=0){
												if (smt_sb2_gw_p >= Math.ceil(smt_sb2_gw_total/pageItems)) {
													smt_sb2_gw_p = 1;
												}else{
													smt_sb2_gw_p = smt_sb2_gw_p + 1;
												}
											}
								},
								//timeout: 5,
								interval : 60000
							};
							smt_sb2_runner.start(smt_sb2_gw_task);
						}
						else	if (name == "smtsb2_zj_kb") {
							smt_sb2_zj_task = {
								run : function() {
									var smt_sb2_zj_total=self.updateClock("smt_sb2","zj",smt_sb2_zj_p,pageItems);
											if(smt_sb2_zj_total!=0){
												if (smt_sb2_zj_p >= Math.ceil(smt_sb2_zj_total/pageItems)) {
													smt_sb2_zj_p = 1;
												}else{
													smt_sb2_zj_p = smt_sb2_zj_p + 1;
												}
											}
								},
								//timeout: 5,
								interval : 60000
							};
							smt_sb2_runner.start(smt_sb2_zj_task);
						}
						
						else	if (name == "smtsb2_gd_kb") {
							smt_sb2_gd_task = {
								run : function() {
									var smt_sb2_gd_total=self.updateClock("smt_sb2","gd",smt_sb2_gd_p,pageItems);
											if(smt_sb2_gd_total!=0){
												if (smt_sb2_gd_p >= Math.ceil(smt_sb2_gd_total/pageItems)) {
													smt_sb2_gd_p = 1;
												}else{
													smt_sb2_gd_p = smt_sb2_gd_p + 1;
												}
											}
								},
								//timeout: 5,
								interval : 60000
							};
							smt_sb2_runner.start(smt_sb2_gd_task);
						}
						
					   else	if (name == "smtsb2_xz_kb") {
							smt_sb2_xz_task = {
								run : function() {
									var smt_sb2_xz_total=self.updateClock("smt_sb2","xz",smt_sb2_xz_p,pageItems);
											if(smt_sb2_xz_total!=0){
												if (smt_sb2_xz_p >= Math.ceil(smt_sb2_xz_total/pageItems)) {
													smt_sb2_xz_p = 1;
												}else{
													smt_sb2_xz_p = smt_sb2_xz_p + 1;
												}
											}
								},
								//timeout: 5,
								interval : 60000
							};
							smt_sb2_runner.start(smt_sb2_xz_task);
						}
						
						
						tabpanel.setActiveTab(t);
					} else {
						tabpanel.setActiveTab(tab);
					}
				}
			},
			//*******************************
			'panel[xtype=smtsb2_fd_kb]':{
				itemclick : function(e, eOpts) {
					smt_sb2_runner.stop(smt_sb2_fd_task);
					var DevicePartsNum=eOpts.data.DevicePartsNum;
					var win=Ext.create("core.smt_sb2_kanban.view.item.fd_List",{
					}).show();
					var mask=self.msg(win);
					
					var store=Ext.data.StoreManager.map['core.smt_sb2_kanban.store.fd.ListStore'];
					smt_sb2_fd_list_task={
						run:function(){
							mask.show();
							store.removeAll();
							store.load({params:{DevicePartsNum:DevicePartsNum}});
							mask.hide();
						},
						interval:60000
						//,timeout: 10
					};
					smt_sb2_runner.start(smt_sb2_fd_list_task);
				},
				beforedistory:function(){
					smt_sb2_runner.stop(smt_sb2_fd_task);
				}
			},
			
			'panel[xtype=smtsb2_fd_list_kb]':{
				beforeclose:function(){
					smt_sb2_runner.stop(smt_sb2_fd_list_task);
					smt_sb2_runner.start(smt_sb2_fd_task);
				}
			},
			
					
			
			//*********************************************************************************************************
			
			//******************************************************************************************************
			'panel[xtype=smtsb2_gw_kb]':{
				itemclick : function(e, eOpts) {
					smt_sb2_runner.stop(smt_sb2_gw_task);
					var DevicePartsNum=eOpts.data.StoreNo;
					var win=Ext.create("core.smt_sb2_kanban.view.item.gw_List",{
					}).show();
					var mask=self.msg(win);
					
					var store=Ext.data.StoreManager.map['core.smt_sb2_kanban.store.gw.ListStore'];
					smt_sb2_gw_list_task={
						run:function(){
							mask.show();
							store.removeAll();
							store.load({params:{DevicePartsNum:DevicePartsNum}});
							mask.hide();
						},
						interval:60000
						//,timeout: 10
					};
					smt_sb2_runner.start(smt_sb2_gw_list_task);
				},
				beforedistory:function(){
					smt_sb2_runner.stop(smt_sb2_gw_task);
				}
			},
			
			'panel[xtype=smtsb2_gw_list_kb]':{
				beforeclose:function(){
					smt_sb2_runner.stop(smt_sb2_gw_list_task);
					smt_sb2_runner.start(smt_sb2_gw_task);
				}
			},
			//*********************************************************************************************************
			
			
			
				//******************************************************************************************************
			'panel[xtype=smtsb2_zj_kb]':{
				itemclick : function(e, eOpts) {
					smt_sb2_runner.stop(smt_sb2_zj_task);
					var DevicePartsNum=eOpts.data.DevicePartsNum;
					var win=Ext.create("core.smt_sb2_kanban.view.item.zj_List",{
					}).show();
					var mask=self.msg(win);
					
					var store=Ext.data.StoreManager.map['core.smt_sb2_kanban.store.zj.ListStore'];
					smt_sb2_zj_list_task={
						run:function(){
							mask.show();
							store.removeAll();
							store.load({params:{DevicePartsNum:DevicePartsNum}});
							mask.hide();
						},
						interval:60000
						//,timeout: 10
					};
					smt_sb2_runner.start(smt_sb2_zj_list_task);
				},
				beforedistory:function(){
					smt_sb2_runner.stop(smt_sb2_zj_task);
				}
			},
			
			'panel[xtype=smtsb2_zj_list_kb]':{
				beforeclose:function(){
					smt_sb2_runner.stop(smt_sb2_zj_list_task);
					smt_sb2_runner.start(smt_sb2_zj_task);
				}
			},
			//*********************************************************************************************************
			
				//******************************************************************************************************
			'panel[xtype=smtsb2_gd_kb]':{
				itemclick : function(e, eOpts) {
					smt_sb2_runner.stop(smt_sb2_gd_task);
					var DevicePartsNum=eOpts.data.DevicePartsNum;
					var win=Ext.create("core.smt_sb2_kanban.view.item.gd_List",{
					}).show();
					var mask=self.msg(win);
					
					var store=Ext.data.StoreManager.map['core.smt_sb2_kanban.store.gd.ListStore'];
					smt_sb2_gd_list_task={
						run:function(){
							mask.show();
							store.removeAll();
							store.load({params:{DevicePartsNum:DevicePartsNum}});
							mask.hide();
						},
						interval:60000
						//,timeout: 10
					};
					smt_sb2_runner.start(smt_sb2_gd_list_task);
				},
				beforedistory:function(){
					smt_sb2_runner.stop(smt_sb2_gd_task);
				}
			},
			
			'panel[xtype=smtsb2_gd_list_kb]':{
				beforeclose:function(){
					smt_sb2_runner.stop(smt_sb2_gd_list_task);
					smt_sb2_runner.start(smt_sb2_gd_task);
				}
			},
			//*********************************************************************************************************
			
			
				//******************************************************************************************************
			'panel[xtype=smtsb2_xz_kb]':{
				itemclick : function(e, eOpts) {
					smt_sb2_runner.stop(smt_sb2_xz_task);
					var DevicePartsNum=eOpts.data.DevicePartsNum;
					var win=Ext.create("core.smt_sb2_kanban.view.item.xz_List",{
					}).show();
					var mask=self.msg(win);
					
					var store=Ext.data.StoreManager.map['core.smt_sb2_kanban.store.xz.ListStore'];
					smt_sb2_xz_list_task={
						run:function(){
							mask.show();
							store.removeAll();
							store.load({params:{DevicePartsNum:DevicePartsNum}});
							mask.hide();
						},
						interval:60000
						//,timeout: 10
					};
					smt_sb2_runner.start(smt_sb2_xz_list_task);
				},
				beforedistory:function(){
					smt_sb2_runner.stop(smt_sb2_xz_task);
				}
			},
			
			'panel[xtype=smtsb2_xz_list_kb]':{
				beforeclose:function(){
					smt_sb2_runner.stop(smt_sb2_xz_list_task);
					smt_sb2_runner.start(smt_sb2_xz_task);
				}
			},
			//*********************************************************************************************************
			
			
			
				//8a8280915f46880b015f47ed726f0004
			'window[id=8a8280915f46880b015f47ed726f0004_win]' : {
				beforehide : function(e, eOpts) {
					//alert(Ext.Date.format(new Date(new Date()),'Y-m-d H:i:s'));
					smt_sb2_runner.stopAll();
				}
			}	
			
		});
	},

	views : ['core.smt_sb2_kanban.view.MainLayout',
			'core.smt_sb2_kanban.view.ItemTree',
			'core.smt_sb2_kanban.view.DisplayPanel',
			'core.smt_sb2_kanban.view.item.fd',
			'core.smt_sb2_kanban.view.item.fd_List',
			'core.smt_sb2_kanban.view.item.gw',
			'core.smt_sb2_kanban.view.item.gw_List',
			'core.smt_sb2_kanban.view.item.zj',
			'core.smt_sb2_kanban.view.item.zj_List',
			'core.smt_sb2_kanban.view.item.gd',
			'core.smt_sb2_kanban.view.item.gd_List',
			'core.smt_sb2_kanban.view.item.xz',
			'core.smt_sb2_kanban.view.item.xz_List'
			],

	stores : [
			'core.smt_sb2_kanban.store.Tree', 
			'core.smt_sb2_kanban.store.Store',
			'core.smt_sb2_kanban.store.fd.Store',
			'core.smt_sb2_kanban.store.fd.ListStore',
			'core.smt_sb2_kanban.store.gw.Store',
			'core.smt_sb2_kanban.store.gw.ListStore',
			'core.smt_sb2_kanban.store.zj.Store',
			'core.smt_sb2_kanban.store.zj.ListStore',
			'core.smt_sb2_kanban.store.gd.Store',
			'core.smt_sb2_kanban.store.gd.ListStore',
			'core.smt_sb2_kanban.store.xz.Store',
			'core.smt_sb2_kanban.store.xz.ListStore'
			],

	models : [
			'core.smt_sb2_kanban.model.fd.Model', 
			'core.smt_sb2_kanban.model.fd.ListModel',
			'core.smt_sb2_kanban.model.gw.Model', 
			'core.smt_sb2_kanban.model.gw.ListModel',
			'core.smt_sb2_kanban.model.zj.Model', 
			'core.smt_sb2_kanban.model.zj.ListModel',
			'core.smt_sb2_kanban.model.gd.Model', 
			'core.smt_sb2_kanban.model.gd.ListModel',
			'core.smt_sb2_kanban.model.xz.Model', 
			'core.smt_sb2_kanban.model.xz.ListModel'
			]
});