var Workcenterid=null;
var smt_xbc_runner=new Ext.util.TaskRunner();
var mo=null;
var WorkCenterName=null;

var smt_xbc_list_task=null;
var smt_xbc_list_p;

var total;

Ext.define("core.smt_xbc_kanban.controller.Controller",{
	extend:"Ext.app.Controller",
	
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		MaskMsgUtil:'core.util.model.MaskMsgUtil',
		MessageUitl:'core.util.MessageUtil'
	},
	init:function(){
		var self=this;
		coreApp=self;
		this.control({
			'panel[xtype=smt_xbc_kb_main]' : {
				itemclick : function(view, record, item, index, e, eOpts) {
					smt_xbc_kb = {
						run : function() {
						var store = Ext.data.StoreManager.map['core.smt_xbc_kanban.store.Store'];
						store.load();
						},
						interval:10000
					};
					smt_xbc_runner.start(smt_xbc_kb);
				}
			},
			'panel[xtype=smt_xbc_kb_lines] dataview ':{
				itemclick:function(view, record, item, index, e, eOpts ){
					Workcenterid=record.data.Workcenterid;
					WorkCenterName=record.data.WorkcenterName;
					mo=record.data.MoName;
//					alert(mo);
					var layouts=view.up('smt_xbc_kb_main').getLayout();
					var store = Ext.data.StoreManager.map['core.smt_xbc_kanban.store.sl.Store'];
					store.removeAll();
					store.getProxy().extraParams={mo : mo,limit : 25,page : 1,WorkcenterId:Workcenterid};
					store.load();
					layouts.setActiveItem(1);
				}
			},
			'panel[xtype=smt_xbc_kb_moview]':{
				itemclick:function(view, record, item, index, e, eOpts ){
					var mo=record.data.MOName;
					var line=record.data.WorkcenterName;
					var qty=record.data.MOQtyRequired;
					smt_xbc_list_p=1;
					var windows=Ext.create('Ext.Window',{
						width:500,
						maximized:true,
						layout:'fit',
						title:'线边仓上料  ===> 物料清单信息[ 工单：'+mo+'][工作中心：'+WorkCenterName+'][工单批量：'+qty+']',
						tbar:[
						{xtype:'checkboxfield',boxLabel:'显示所有物料', name:'display', id: 'checkbox1',inputValue: '1'},
						{xtype:'button',text:'停止刷新',id:'stopPage3'},
						{xtype:'button',text:'开启刷新',id:'beginPage3',disabled:true}
					    ],
						listeners:{
						beforehide:function(e,Opts){
							smt_xbc_runner.stop(smt_xbc_list_task);
							smt_xbc_list_p=1;
						}
						}
					}).show();
					smt_xbc_list_task={
						run:function(){
								windows.removeAll();
//								windows.setTitle('线边仓上料 ===> 物料清单信息[ 工单：'+mo+' ] | [  工作中心：'+WorkCenterName+'  ]');
								windows.add({xtype:'smt_xbc_sl_list_kb'});	
								

								
/****************************************************************** */

								var store = Ext.data.StoreManager.map['core.smt_xbc_kanban.store.sl.ListStore'];
								store.removeAll();
								store.getProxy().extraParams={mo : mo,Workcenterid:Workcenterid};
								store.load();
								
								/*
								var result=self.ajax({url:'/web/kanban/smt_xbc_sl_list!getResult.action',params:{mo:mo,Workcenterid:Workcenterid}});							
								if(result.success){
									smt_xbc_list_p=1;
									store.proxy.data=result.data;
									store.load();
									//store.loadPage(smt_line_list_p);
									//layout.setActiveItem(1);
								}else{
									store.removeAll();
									self.msgbox(result.returnMsg);
									smt_xbc_runner.stop(smt_xbc_list_task);
								}
								*/
								
								/*if(result.success){
									var Warner =result.Warner;
									if (Warner!=""){
										windows.setTitle('线边仓上料 ===> 物料清单信息[ 工单：'+mo+' ][工作中心：'+WorkCenterName+'][工单批量：'+qty+']');

									}
										total=result.total;
									if(total==1){
										store.removeAll();
									Ext.Msg.alert("系统提示", "该工单未拣料!");
									smt_xbc_runner.stopAll();
									}else if (total==2){
										store.removeAll();
										Ext.Msg.alert("系统提示", "该工单未维护料站表！");
										smt_xbc_runner.stopAll();
									}else if (total==0){
										store.proxy.data=result.data;
										store.load();
									}
									
								}else{
									store.removeAll(true);
									Ext.Msg.alert("系统提示",result.returnMsg);
								}
								*/
	
						},
						interval:60000
					};
					smt_xbc_runner.start(smt_xbc_list_task);
				}
			}, 
			'panel[xtype=smt_xbc_kb_moview] button[action=return2]':{
				click:function( but, e, eOpts ){
					var layouts=but.up('smt_xbc_kb_main').getLayout();
					var store = Ext.data.StoreManager.map['core.smt_xbc_kanban.store.Store'];
					store.removeAll();
					store.load();
					layouts.setActiveItem(0);
				}
			},
			'window button[id=stopPage3]':{
				click:function( but, e, eOpts ){
					smt_xbc_runner.stopAll();
					but.disable();
					Ext.getCmp('beginPage3').enable();
				}
			},
			
			'window button[id=beginPage3]':{
				click:function( but, e, eOpts ){
					smt_xbc_runner.start(smt_xbc_list_task);
					but.disable();
					Ext.getCmp('stopPage3').enable();
				}
			},
			'window[id=8a8183b44c2fe578014c30a0bde20001_win]':{
				beforehide:function(e,Opts){
					smt_xbc_runner.stopAll();
				}
			}
		});
	},
	views:[
		'core.smt_xbc_kanban.view.Main',
		'core.smt_xbc_kanban.view.Lines',
		'core.smt_xbc_kanban.view.MoView',
		'core.smt_xbc_kanban.view.List',
		'core.smt_kanban.view.item.CnList',
		'core.smt_xbc_kanban.view.SlList'
	],
	stores:[
		'core.smt_xbc_kanban.store.Store',
		'core.smt_xbc_kanban.store.sl.Store',
		'core.smt_xbc_kanban.store.sl.ListStore'
	],
	models:[
		'core.smt_xbc_kanban.model.Model',
		'core.smt_xbc_kanban.model.sl.Model',
		'core.smt_xbc_kanban.model.sl.ListModel'
	]
	
});