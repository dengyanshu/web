
Ext.define('core.skill_manage.controller.Controller', {
	extend : 'Ext.app.Controller',
	mixins : {
		suppleUtil : 'core.util.SuppleUtil',
		MessageUtil : 'core.util.MessageUtil'
	},
	init : function() {
		var self = this;
		coreApp = self;
		this.control({
			'skillmanage_navigation' : {
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
									closeAction : 'hide',
									layout : 'border',
									items : [{
												xtype : name,
												region : 'center'
											}]
								});
						tabpanel.setActiveTab(t);
					} else {
						tabpanel.setActiveTab(tab);
					}
					/**
					 * 数据刷新
					 */
					if (name == "skillmanage_skill") {
						var store = Ext.data.StoreManager.map['core.skill_manage.store.SkillStore'];
						store.removeAll();
						store.load();
					} else if (name == "skillmanage_course") {
						var store = Ext.data.StoreManager.map['core.skill_manage.store.CourseStore'];
						store.removeAll();
						store.load();
					}else if(name="skillmanage_conference_pos"){
						var store = Ext.data.StoreManager.map['core.skill_manage.store.ConferencePosStore'];
						store.removeAll();
						store.load();
					}
				}
			},


			/*******************************************************************
			 * 《课程管理》
			 ******************************************************************/
			'skillmanage_course' : {
				itemclick : function(view, record, item, index, e, eOpts) {
					view.ownerCt.down('#remove_course').setDisabled(false);
					view.ownerCt.down('#binding_skill').setDisabled(false);
				},

				edit : function(editor, context, eOpts) {
					var grid = context.grid;
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
							url : '/web/skill/skillmanage_course!updateRecord.action',
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
						alert("至少要选择一条数据");
					}
				},
				canceledit : function(editor, context, eOpts) {
					// console.log("cancel");
				}
			},
			/**
			 * 绑定技能
			 */
			'skillmanage_course  button[ref=bindingSkill]' : {
				click : function(e, eOpts) {
					var grid = e.up("grid");
					
					var store = grid.getStore();
					// 得到选中的数据
					var rescords = grid.getSelectionModel().getSelection();
					if (rescords.length > 0) {
						// 封装ids数组
						var courseIds = new Array();
						// 遍历rescords里面的所有数据
						Ext.Array.each(rescords, function(record) {
									courseIds.push(record.data.WorkprocedureCourseId);
								});

						// 技能数据集
						var store = Ext.data.StoreManager.map['core.skill_manage.store.SkillStore'];
						store.load({
							callback : function(records, operation, success) {
								if (success) {
									var arr = store.getProxy().getReader().jsonData.data;
									var array = new Array();

									for (var i = 0; i < arr.length; i++) {
										array[i] = new Array();
										var j = 0;
										for (var p in arr[i]) {
											// if(typeof(arr[0][p]=="function")){arr[0][p]();}
											// //如果遍历出来的是方法则执行
											array[i][j] = arr[i][p];
											j++;
										}
									}

									Ext.ux.ajax.SimManager.init({
												delay : 300, // 延时300微秒
												defaultSimlet : null
											}).register({
												'Data' : {
													data : array,
													stype : 'json'
												}
											});

									var ds = Ext.create('Ext.data.ArrayStore',
											{
												model : 'core.skill_manage.model.SkillModel',
												proxy : {
													type : 'ajax',
													url : 'Data',
													reader : 'array'
												},
												pageSize : 60,
												autoLoad : true,
												sortInfo : {
													field : 'value',
													direction : 'ASC'
												}
											});

									var win = Ext.create("Ext.Window", {
										title : '课程技能绑定',
										width : 600,
										height : 400,
										layout : 'fit',
										items : [{
											xtype : 'form',
											layout : 'fit',
											flex : 1,
											buttons : [{
												text : '技能绑定',
												action : 'check',
												handler : function(e, eOpts) {
													var ids = e.ownerCt.ownerCt.items.items[0].value;
													Ext.Ajax.request({
														url : '/web/skill/skillmanage_courseskill!insertRecord.action',
														params : {
															StaffSkillsId : ids
																	.join(","),
															StaffCourseId : courseIds
																	.join(",")
														},
														method : 'post',
														timeout : 3000,
														success : function(
																response, opts) {
															win.close();
															obj = Ext
																	.decode(response.responseText);
															self
																	.msgbox(obj.returnMsg);
														},
														failure : function(
																response, opts) {
															obj = Ext
																	.decode(response.responseText);
															Ext.Msg
																	.alert(
																			"系统提示",
																			obj.returnMsg);
														}
													});
												}
											}],
											items : [{
												xtype : 'itemselector',
												Title : 'itemselector',
												id : 'itemselector-audit',
												anchor : '90%',
												height : 170,
												// fieldLabel: '技能选择',
												imagePath : '../fa/css/images/',
												store : ds,
												displayField : 'SkillName',
												valueField : 'WorkprocedureSkillId',
												allowBlank : false,
												msgTarget : 'under ',
												fromTitle : '系统有效技能',
												toTitle : '准备授权技能'
											}]
										}]
									}).show();
								} else {
									Ext.Msg.alert("系统提示", "找不到技能，请先添加技能！");
								}
							}
						});
					} else {
						Ext.Msg.alert("系统提示", "请勾选审核对像！");
					}
				}
			},

			'skillmanage_course  button[ref=gridDelete]' : {
				click : function(e, eOpts) {
					var grid = e.up("grid");
					var store = grid.getStore();
					// 得到选中的数据
					var rescords = grid.getSelectionModel().getSelection();
					if (rescords.length > 0) {
						// 封装ids数组
						var ids = new Array();
						// 遍历rescords里面的所有数据
						Ext.Array.each(rescords, function(record) {
									ids.push(record.data.WorkprocedureCourseId);
								});
						
						Ext.Ajax.request({
							url : '/web/skill/skillmanage_course!deleteRecord.action',
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

			'skillmanage_course  button[ref=gridInsert]' : {
				click : function(e, eOpts) {
					// 得到表格
					var grid = e.up('grid');
					var store = grid.getStore();
					Ext.Ajax.request({
						url : '/web/skill/skillmanage_course!insertRecord.action',
						method : 'POST',
						timeout : 2000,
						success : function(response, opts) {
							store.load();
							var rowEditing = grid.editing;
							rowEditing.cancelEdit();
							rowEditing.startEdit(0, 0);
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
			'skillmanage_course  button[action=submit]' : {
				click : function(e, eOpts) {
					var basic = e.ownerCt.ownerCt.getForm();
					if (basic.isValid()) {// 所有表单域都通过了验证
						basic.submit({
							url : '/web/skill/skillmanage_userReservationCourse!userCourseBatchInsert.action',
							waitMsg : '正在保存文件...',
							method : 'POST',
							success : function(fp, o) {
								Ext.Msg.alert('提示信息', '文件成功上传');
								var store = Ext.data.StoreManager.map['core.skill_manage.store.CourseStore'];
								store.load();
								// form.findField('fileName').reset();
							},
							failure : function() {
								Ext.Msg.alert('警告', '对不起,文件上传无法成功.');
							}
						});
					}
				}
			},
			'skillmanage_course  button[action=reset]' : {
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},
			/*******************************************************************
			 * 《技能管理》
			 ******************************************************************/
			'skillmanage_skill' : {
				itemclick : function(view, record, item, index, e, eOpts) {
					view.ownerCt.down('#remove_skill').setDisabled(false);
				},

				edit : function(editor, context, eOpts) {
					var grid = context.grid;
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
							url : '/web/skill/skillmanage_skill!updateRecord.action',
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
						alert("至少要选择一条数据");
					}
				}
			},
			'skillmanage_skill  button[ref=gridInsert]' : {
				click : function(e, eOpts) {
					// 得到表格
					var grid = e.up('grid');
					var store = grid.getStore();
					Ext.Ajax.request({
						url : '/web/skill/skillmanage_skill!insertRecord.action',
						method : 'POST',
						timeout : 2000,
						success : function(response, opts) {
							store.load();
							var rowEditing = grid.editing;
							rowEditing.cancelEdit();
							rowEditing.startEdit(0, 0);
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
			'skillmanage_skill  button[ref=gridDelete]' : {
				click : function(e, eOpts) {
					var grid = e.up("grid");
					var store = grid.getStore();
					// 得到选中的数据
					var rescords = grid.getSelectionModel().getSelection();
					if (rescords.length > 0) {
						// 封装ids数组
						var ids = new Array();
						// 遍历rescords里面的所有数据
						Ext.Array.each(rescords, function(record) {
									ids.push(record.data.WorkprocedureSkillId);
								});
						Ext.Ajax.request({
							url : '/web/skill/skillmanage_skill!deleteRecord.action',
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
			'skillmanage_skill  button[action=submit]' : {
				click : function(e, eOpts) {
					var basic = e.ownerCt.ownerCt.getForm();
					if (basic.isValid()) {// 所有表单域都通过了验证
						basic.submit({
							url : '/web/skill/skillmanage_userskill!userSkillBatchInsert.action',
							waitMsg : '正在保存文件...',
							method : 'POST',
							success : function(fp, o) {
								Ext.Msg.alert('提示信息', '文件成功上传');
								var store = Ext.data.StoreManager.map['core.skill_manage.store.SkillStore'];
								store.load();
								// form.findField('fileName').reset();
							},
							failure : function() {
								Ext.Msg.alert('警告', '对不起,文件上传无法成功.');
							}
						});
					}
				}
			},
			'skillmanage_skill  button[action=reset]' : {
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},
			
			
			
			/*******************************************************************
			 * 					《会议室刷卡机》
			 ******************************************************************/
			'skillmanage_conference_pos' : {
				itemclick : function(view, record, item, index, e, eOpts) {
					view.ownerCt.down('#remove_conPos').setDisabled(false);	//使删除按钮可用
				},
				
				//当点击update后触发事件
				edit : function(editor, context, eOpts) {
					var grid = context.grid;		//获取到表格
					var store = grid.getStore();	//获取到表格所使用的数据集

					// store.sync(); //数据与后台同步
					var records = store.getUpdatedRecords(); //得到被你修改过的数据
					var data = [];

					Ext.Array.each(records, function(model) {
								// var obj=model.getChanges();
								data.push(Ext.JSON.encode(model.data));	//获取到被修改过的数据
							});

					// 异步操作数据
					if (data.length > 0) {
						Ext.Ajax.request({
							url : '/web/skill/skillmanage_conferencePos!updateRecord.action',
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
						alert("至少要选择一条数据");
					}
				}
			},
			'skillmanage_conference_pos  button[ref=gridInsert]' : {
				click : function(e, eOpts) {
					// 得到表格
					var grid = e.up('grid');
					var store = grid.getStore();
					Ext.Ajax.request({
						url : '/web/skill/skillmanage_conferencePos!insertRecord.action',
						method : 'POST',
						timeout : 2000,
						success : function(response, opts) {
							store.load();
							var rowEditing = grid.editing;
							rowEditing.cancelEdit();
							rowEditing.startEdit(0, 0);
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
			'skillmanage_conference_pos  button[ref=gridDelete]' : {
				click : function(e, eOpts) {
					var grid = e.up("grid");
					var store = grid.getStore();
					// 得到选中的数据
					var rescords = grid.getSelectionModel().getSelection();
					if (rescords.length > 0) {
						// 封装ids数组
						var ids = new Array();
						// 遍历rescords里面的所有数据
						Ext.Array.each(rescords, function(record) {
									ids.push(record.data.CP_id);
								});
						
						Ext.Ajax.request({
							url : '/web/skill/skillmanage_conferencePos!deleteRecord.action',
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
			/*******************************************************************
			 * 《课程技能查询》
			 ******************************************************************/
			'skillmanage_courseandskill panel[xtype=form] button[action=submit]' : {
				click : function(e, eOpts) {
					var basic = e.ownerCt.ownerCt.getForm();
					var CourseTitle = basic.findField("CourseTitle").getValue();
					var store = Ext.data.StoreManager.map['core.skill_manage.store.CourseAndSkillStore'];+
					store.removeAll();
					store.getProxy().extraParams = {
						kecheng : CourseTitle
					};
					store.load();
				}
			},
			'skillmanage_courseandskill panel[xtype=form] textfield[name=CourseTitle]' : {
					specialkey : function(field, e) {
						if (e.getKey() == e.ENTER) {
							var basic = field.ownerCt.getForm();
							var CourseTitle = basic.findField("CourseTitle").getValue();
							var store = Ext.data.StoreManager.map['core.skill_manage.store.CourseAndSkillStore'];+
							store.removeAll();
							store.getProxy().extraParams = {
								kecheng : CourseTitle
							};
							store.load();
						}
					}
			},
			'skillmanage_courseandskill panel[xtype=form] button[action=reset]' : {
				click : function(e, eOpts) {
					e.ownerCt.ownerCt.getForm().reset();
				}
			}
/** ********************************************************************************************************************************************** */
		});
	},

	views : ['core.skill_manage.view.MainLayout',
			'core.skill_manage.view.DisplayPanel',
			'core.skill_manage.view.ItemTree',
			'core.skill_manage.view.SkillView',
			'core.skill_manage.view.CourseView',
			'core.skill_manage.view.ConferencePos',
			'core.skill_manage.view.CourseAndSkill'
			],
	models : [
			'core.skill_manage.model.SkillModel',
			'core.skill_manage.model.CourseModel',
			'core.skill_manage.model.CourseAndSkillModel',
			'core.skill_manage.model.UserSkillModel'
			],
	stores : [
			'core.skill_manage.store.Tree',
			'core.skill_manage.store.SkillStore',
			'core.skill_manage.store.CourseStore',
			'core.skill_manage.store.CourseSkillStore',
			'core.skill_manage.store.ConferencePosStore',
			'core.skill_manage.store.CourseAndSkillStore'
			]
});