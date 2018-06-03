var dc_pmc_runner=new Ext.util.TaskRunner();
var dc_pmc_list_task=null;

Ext.define("core.dc_pmc_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		MaskMsgUtil:'core.util.model.MaskMsgUtil',
		MessageUitl:'core.util.MessageUtil'
	},
	
	init : function() {
		var self=this;
		coreApp=self;
		this.control({
			'panel[xtype=dc_pmc_kanban_result]':{
				afterrender:function(){
				 	dc_pmc_list_task={
					   run:function(){
								var store = Ext.data.StoreManager.map['core.dc_pmc_kanban.store.Store'];
								var result=self.ajax({url:'/web/kanban/ff_sl_list!getResult8.action'});	
								if(result.success){
									store.proxy.data=result.data;
									store.load();
								}else{
									store.removeAll();
									self.msgbox(result.returnMsg);
									//dc_pmc_runner.stop(dc_pmc_list_task);
								}
						},
						interval:60000
					};
					dc_pmc_runner.start(dc_pmc_list_task);
			}
		 },
		 
		 'panel[xtype=dc_pmc_kanban_result] ':{
				itemclick:function(view, record, item, index, e, eOpts ){
					var mo=record.data.MOName;
					var  picklistname=record.data.picklistname;
					var window=Ext.create('Ext.Window',{
						width:500,
						maximized:true,
						layout:'fit',
						//title:'信息[ 工作中心:'+line+' ][ 工单:'+mo+' ][工单批量：'+qty+']',
						/*tbar:[
						{xtype:'button',text:'停止刷新',id:'stopPage3'},
						{xtype:'button',text:'开启刷新',id:'beginPage3'}
					    ],*/
						listeners:{
							/*beforehide:function(e,Opts){
								dc_mo_runner.stop(dc_mo_list_task);
								dc_mo_list_p=1;
							}*/
						}
					}).show();
					window.add({xtype:'dc_pmc_sl_list_kb'});
					var store = Ext.data.StoreManager.map['core.dc_pmc_kanban.store.sl.ListStore'];
					/*store.removeAll();
					store.getProxy().extraParams={mo:mo};
					store.load();*/
					
					var result=self.ajax({url:'/web/kanban/ff_sl_list!getResult12.action',params:{mo:mo}});	
					var data=result.data;
					if(data!=undefined&&data.length>0){
							var  flag=data[0].flag;
							var  IssueTime=data[0].IssueTime;
							var  ExecuteTime=data[0].ExecuteTime;
					}
					if(flag==undefined)
						flag="空信息";
					if(ExecuteTime==undefined)
					   ExecuteTime="空信息";
					if(IssueTime==undefined)
					   IssueTime="空信息";
				    window.setTitle('信息[送料单:'+picklistname+' ][通知备料时间：'+ExecuteTime+'][通知送料时间：'+IssueTime+']');
					if(result.success){
						store.proxy.data=data;
						store.loadData(data);
					}else{
						store.removeAll();
						self.msgbox(result.returnMsg);
					}
				}
			},
			
		 
		 
		 'window button[id=beginPage3]':{
				click:function( but, e, eOpts ){
					var store = Ext.data.StoreManager.map['core.dc_pmc_kanban.store.Store'];
					store.load();
//					smt_xbc_runner.start(smt_xbc_list_task);
//					but.disable();
//					Ext.getCmp('stopPage3').enable();
				}
			},
			'window[id=8a82809158e608020158e667e2be0002_win]':{
				beforehide:function(e,Opts){
					dc_pmc_runner.stopAll();
				}
			}
	  });
	},	
	
	
	views : ['core.dc_pmc_kanban.view.Main'
	,'core.dc_pmc_kanban.view.SlList'
	,'core.dc_pmc_kanban.view.ResultView'],
		
	stores : ['core.dc_pmc_kanban.store.Store',
	'core.dc_pmc_kanban.store.sl.ListStore'
	],
	
	models : ['core.dc_pmc_kanban.model.Model',
	'core.dc_pmc_kanban.model.sl.ListModel'
	]
});