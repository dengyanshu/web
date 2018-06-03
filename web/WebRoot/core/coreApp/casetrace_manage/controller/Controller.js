Ext.define("core.casetrace_manage.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		MessageUtil : 'core.util.MessageUtil'
	},
	init : function() {
		var self = this;
		coreApp = self;
		this.control({
			'casetracemanage button[ref=gridInsert]' : {
				click : function(e, Opts) {
					// 得到表格
					var grid = e.up('grid');
					var store = grid.getStore();
					Ext.Ajax.request({
						url : '/web/case/case_trace_manage!insertRecord.action',
						method : 'POST',
						timeout : 2000,
						success : function(response, opts) {
							store.load();
							var edit = grid.editing;
							edit.cancelEdit();
							edit.startEditByPosition({
										row : 0,
										column : 3
									});
							var obj = Ext.decode(response.responseText);
							self.msgbox(obj.returnMsg);
						},
						failure : function(response, opts) {
							var obj = Ext.decode(response.responseText);
							Ext.Msg.alert("系统提示", obj.returnMsg);
						}
					});
				}

			},
			'casetracemanage button[ref=gridDelete]' : {
				click : function(e, Opts) {
					var grid = e.up("grid");
					var store = grid.getStore();
					// 得到选中的数据
					var rescords = grid.getSelectionModel().getSelection();
					if (rescords.length > 0) {
						// 封装ids数组
						var ids = new Array();
						// 遍历rescords里面的所有数据
						Ext.Array.each(rescords, function(record) {
									ids.push(record.data.caseTraceId);
								});

						Ext.Ajax.request({
							url : '/web/case/case_trace_manage!deleteRecord.action',
							params : {
								ids : ids.join(",")
							},
							method : 'POST',
							timeout : 2000,
							success : function(response, opts) {
								// 如果后台删除成功则前端操作DOM进行删除(EXTJS)
								Ext.Array.each(rescords, function(record) {
											store.remove(record);
										});
								var obj = Ext.decode(response.responseText);
								store.reload();
								self.msgbox(obj.returnMsg);
							},
							failure : function(response, opts) {
								var obj = Ext.decode(response.responseText);
								Ext.Msg.alert("系统提示", obj.returnMsg);
							}
						});

					} else {
						Ext.Msg.alert("系统提示", "请选择数据!");
					}

				}
			},
			'casetracemanage button[ref=gridSave]' : {
				click : function(e, Opts) {
					var grid = e.up('grid');
					var store = grid.getStore();

					// store.sync(); //数据与后台同步
					var records = store.getUpdatedRecords(); // 得到被你修改过的数据
					var data = [];

					Ext.Array.each(records, function(model) {
								// var obj=model.getChanges();
								data.push(Ext.JSON.encode(model.data));
							});

					// 异步操作数据
					if (data.length > 0) {
						Ext.Ajax.request({
							url : '/web/case/case_trace_manage!updateRecord.action',
							params : {
								modification : "[" + data.join(",") + "]"
							},
							method : 'post',
							timeout : 4000,
							success : function(response, opts) {
								Ext.Array.each(records, function(model) {
											model.commit(); // 取消小箭头
											store.load();
										});

								obj = Ext.decode(response.responseText);
								self.msgbox(obj.returnMsg);
							},
							failure : function(response, opts) {
								obj = Ext.decode(response.responseText);
								Ext.Msg.alert("系统提示", obj.returnMsg);
							}
						});
					} else {
						Ext.Msg.alert("系统提示", "至少要选择一条数据");
					}
				}
			},
			'casetracemanage':{
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
	views : ['core.casetrace_manage.view.Main'],
	stores : ['core.casetrace_manage.store.Store'],
	models : ['core.casetrace_manage.model.Model']
});