Ext.define("core.casetrace_query.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		MessageUtil : 'core.util.MessageUtil'
	},
	init : function() {
		var self = this;
		coreApp = self;
		this.control({
			'casetrace_search button[ref=submit]':{
				click:function(e,Opts){
					var basic = e.ownerCt.ownerCt.getForm();
					if(basic.isValid()){
						basic.submit({
							url : '/web/case/case_trace_manage!queryResult.action',
							waitMsg : '正在处理中...',
							method : 'POST',
							success : function(form, action) {
								var store = Ext.data.StoreManager.map['core.casetrace_query.store.Store'];
								store.proxy.data=action.result.data;
								store.load();
							},
							failure : function(form,action) {
								Ext.Msg.alert('警告', '对不起,查询失败！.');
							}
						});
					}
				}
			},
			'casetrace_search button[ref=reset]':{
				click:function(e,Opts){
					e.ownerCt.ownerCt.getForm().reset();
					
				}
			},
			'casetrace_result':{
				afterrender:function(e, eOpts ){
					var view=e.getView();
					var tip=Ext.create('Ext.tip.ToolTip',{
						minWidth : 200,
						maxWidth : 800,
						minHeight : 200,
						maxHeight : 800,
						target : view.el,
						delegate : view.itemSelector,
						trackMouse : true,
						renderTo : Ext.getBody(),
						listeners : {
							beforeshow : function updateTipBody(tip) {
								tip.update('处理人:'+view.getRecord(tip.triggerElement).get("disposeUser")+'<br>'+
								'案件编号:'+view.getRecord(tip.triggerElement).get("caseNumber")+'<br>'+
								'案件名称:'+view.getRecord(tip.triggerElement).get("caseName")+'<br>'+
								'案件任务:'+view.getRecord(tip.triggerElement).get("caseTask")+'<br>'+
								'案件类型:'+view.getRecord(tip.triggerElement).get("caseType")+'<br>'+
								'申请时间:'+view.getRecord(tip.triggerElement).get("applyTime")+'<br>'+
								'需求时间:'+view.getRecord(tip.triggerElement).get("demandTime")+'<br>'+
								'预计完成时间:'+view.getRecord(tip.triggerElement).get("predictAccomplishTime")+'<br>'+
								'实际完成时间:'+view.getRecord(tip.triggerElement).get("realityAccomplishTime")+'<br>'+
								'状态:'+view.getRecord(tip.triggerElement).get("status")+'<br>'+
								'申请人:'+view.getRecord(tip.triggerElement).get("applicant")+'<br>'+
								'更新时间:'+view.getRecord(tip.triggerElement).get("updateTime")+'<br>'+
								'详细说明:'+view.getRecord(tip.triggerElement).get("expatiation").replace(/##/g,"<br>"));
							}
						}
					});
				}
			}
		});
	},
	views : ['core.casetrace_query.view.Main',
		'core.casetrace_query.view.SearchView',
		'core.casetrace_query.view.ResultView'
	],
	stores : [
		'core.casetrace_query.store.Store',
		'core.casetrace_query.store.DepUserStore'],
	models : [
		'core.casetrace_query.model.Model',
		'core.casetrace_query.model.DepUserModel']
});