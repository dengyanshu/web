
Ext.define('core.course_manage.controller.Controller', {
	extend : 'Ext.app.Controller',
	mixins : {
		suppleUtil : 'core.util.SuppleUtil',
		MessageUtil : 'core.util.MessageUtil'
	},
	init : function() {
		var self = this;
		coreApp = self;
		this.control({
			'coursemanage_navigation' : {
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
				 if (name == "coursemanage_reservationcourse") {
						var store = Ext.data.StoreManager.map['core.course_manage.store.ReservationCourseStore2'];
						store.removeAll();
						store.load();
						var store2 = Ext.data.StoreManager.map['core.skill_manage.store.ConferencePosStore'];
						store2.removeAll();
						store2.load();
						
					}else if (name == "coursemanage_check") {
						var store = Ext.data.StoreManager.map['core.course_manage.store.CheckReservationCourseStore'];
						store.removeAll();
						store.load();
					}
					/*else if (name == "coursemanage_courseuserskill") {
						alert('a1');
						var store = Ext.data.StoreManager.map['core.course_manage.store.CourseUserSkill3Store'];+
						store.removeAll();
						store.load();
					}*/
				}
			},
			
			/*******************************************************************
			 * 《用户技能查询》
			 ******************************************************************/
			'coursemanage_searchuserskill panel[xtype=form] button[action=submit]' : {
				click : function(e, eOpts) {
					var basic = e.ownerCt.ownerCt.getForm();
					var workNumber = basic.findField("workNumber").getValue();
					var store = Ext.data.StoreManager.map['core.course_manage.store.UserSkillStore'];+
					store.removeAll();
					store.getProxy().extraParams = {
						workNumber : workNumber
					};
					store.load();
				}
			},
			'coursemanage_searchuserskill panel[xtype=form] textfield[name=workNumber]' : {
					specialkey : function(field, e) {
						if (e.getKey() == e.ENTER) {
							var basic = field.ownerCt.getForm();
							var workNumber = basic.findField("workNumber").getValue();
							var store = Ext.data.StoreManager.map['core.course_manage.store.UserSkillStore'];+
							store.removeAll();
							store.getProxy().extraParams = {
								workNumber : workNumber
							};
							store.load();
						}
					}
			},
			'coursemanage_searchuserskill panel[xtype=form] button[action=reset]' : {
				click : function(e, eOpts) {
					e.ownerCt.ownerCt.getForm().reset();
				}
			},
			/*******************************************************************
			 * 《课程人员查询》
			 ******************************************************************/
			
			'coursemanage_courseuserskill panel[xtype=form] button[action=submit]' : {
				click : function(e, eOpts) {
					var basic = e.ownerCt.ownerCt.getForm();
					var CourseTitle = basic.findField("CourseTitle1").getValue();
					var WorkprocedureReservationCourseId = basic.findField("FinishTime").getValue();
					var store = Ext.data.StoreManager.map['core.course_manage.store.CourseUserSkillStore'];+
					store.removeAll();
					store.getProxy().extraParams = {
						kecheng : CourseTitle,
						WorkprocedureReservationCourseId : WorkprocedureReservationCourseId
					};
					store.load();
				}
			},
			
			'coursemanage_courseuserskill panel[xtype=form] button[action=reset]' : {
				click : function(e, eOpts) {
					e.ownerCt.ownerCt.getForm().reset();
				}
			},


			/*******************************************************************
			 * 《审核管理》
			 ******************************************************************/
			'coursemanage_check button[action=defaultCheck]' : {
				click : function(e, eOpts) {
					var grid = e.up("grid");
					// 得到选中的数据
					var rescords = grid.getSelectionModel().getSelection();
					if (rescords.length > 0) {
						// 封装ids数组
						var courseIds = new Array();							//课程ID集
						var workNums = new Array();						//工号集
						var reservationCourseIds = new Array();	//预约课程ID集
						// 遍历rescords里面的所有数据
						Ext.Array.each(rescords, function(record) {
							workNums.push(record.data.code);
							courseIds.push(record.data.WorkprocedureCourseId);
							reservationCourseIds.push(record.data.WorkprocedureReservationCourseId);
						});
						

						// 得到课程技能关联集
						var store = Ext.data.StoreManager.map['core.course_manage.store.CourseSkillStore'];
						// 参数设置（根据ID查询出指定的课程绑定的技能）
						store.getProxy().extraParams = {
							courseId : courseIds[0]
						};
						// 加载完后，在返回函数中得到返回结果data
						store.load({
							callback : function(records, operation, success) {
								if (success) {
									var arr = store.getProxy().getReader().jsonData.data;
									var skillIds = new Array();
									for (var i = 0; i < arr.length; i++) {
										skillIds[i] = arr[i].WorkprocedureSkillId;
									}

									// 判断该课程是否有技能
									if (courseIds.length >= 1) {
										// 给用户添加课程下的默认技能
										Ext.Ajax.request({
											url : '/web/skill/skillmanage_userskill!insertRecord.action',
											params : {
												workNums : workNums.join(","),
												ids : skillIds.join(","),
												reservationCourseIds : reservationCourseIds[0]
											},
											
											method : 'post',
											timeout : 3000,
											success : function(response, opts) {
												obj = Ext.decode(response.responseText);
												// 更新审核状态
												Ext.Ajax.request({
													url : '/web/skill/skillmanage_userReservationCourse!updateRecord.action',
													params : {
														workNums : workNums.join(","),
														reservationCourseIds : reservationCourseIds.join(",")
													},
													method : 'post',
													timeout : 3000,
													success : function(response, opts) {
														Ext.Ajax.request({
															url : '/web/skill/skillmanage_reservationCourse!updateRecordClose.action',
															params : {
																reservationCourseId : reservationCourseIds[0]
															},
															method : 'POST',
															timeout : 3000,
															success : function(response,opts) {
																// 更新完成刷新界面
																var store = Ext.data.StoreManager.map['core.course_manage.store.CheckStore'];
																store.removeAll();
																store.load();
																var combo = Ext.getCmp('reservation_check');
																combo.setValue('');
															},
															failure : function(response,opts) {
																obj = Ext.decode(response.responseText);
																Ext.Msg.alert("系统提示",obj.returnMsg);
															}
														});

													},
													failure : function(response, opts) {
														obj = Ext.decode(response.responseText);
														Ext.Msg.alert("系统提示",obj.returnMsg);
													}
												});

											},
											failure : function(response, opts) {
												obj = Ext.decode(response.responseText);
												Ext.Msg.alert("系统提示",obj.returnMsg);
											}
										});
									} else {
										Ext.Ajax.request({
											url : '/web/skill/skillmanage_userReservationCourse!updateRecord.action',
											params : {
												workNums : workNums.join(","),
												reservationCourseIds : reservationCourseIds.join(",")
											},
											method : 'post',
											timeout : 3000,
											success : function(response, opts) {
												Ext.Ajax.request({
													url : '/web/skill/skillmanage_reservationCourse!updateRecordClose.action',
													params : {
														reservationCourseId : reservationCourseIds[0]
													},
													method : 'POST',
													timeout : 3000,
													success : function(response,opts) {
														// 更新完成刷新界面
														var store = Ext.data.StoreManager.map['core.course_manage.store.CheckStore'];
														store.removeAll();
														store.load();
														var combo = Ext.getCmp('reservation_check');
														combo.setValue('');
													},
													failure : function(response,opts) {
														obj = Ext.decode(response.responseText);
														Ext.Msg.alert("系统提示",obj.returnMsg);
													}
												});

											},
											failure : function(response, opts) {
												obj = Ext.decode(response.responseText);
												Ext.Msg.alert("系统提示",obj.returnMsg);
											}
										});
//										Ext.Msg.alert("系统提示",
//												"该课程下没有设置技能,请先为该课程添加技能！");
									}
								} else {
									Ext.Ajax.request({
										url : '/web/skill/skillmanage_userReservationCourse!updateRecord.action',
										params : {
											workNums : workNums.join(","),
											reservationCourseIds : reservationCourseIds.join(",")
										},
										method : 'post',
										timeout : 3000,
										success : function(response, opts) {
											Ext.Ajax.request({
												url : '/web/skill/skillmanage_reservationCourse!updateRecordClose.action',
												params : {
													reservationCourseId : reservationCourseIds[0]
												},
												method : 'POST',
												timeout : 3000,
												success : function(response,opts) {
													// 更新完成刷新界面
													var store = Ext.data.StoreManager.map['core.course_manage.store.CheckStore'];
													store.removeAll();
													store.load();
													var combo = Ext.getCmp('reservation_check');
													combo.setValue('');
												},
												failure : function(response,opts) {
													obj = Ext.decode(response.responseText);
													Ext.Msg.alert("系统提示",obj.returnMsg);
												}
											});

										},
										failure : function(response, opts) {
											obj = Ext.decode(response.responseText);
											Ext.Msg.alert("系统提示",obj.returnMsg);
										}
									});
//									Ext.Msg.alert("系统提示",
//											"该课程下没有设置技能,请先为该课程添加技能！");
								}
							}
						});

					}else{
						Ext.Msg.alert("系统提示", "请勾选审核对像！");
					}
				}
			},
			/***********
			 * 自定义审核
			 ***********/
			'coursemanage_check button[action=customCheck]' : {
				click : function(e, eOpts) {
					var grid = e.up("grid");
					// 得到选中的数据
					var rescords = grid.getSelectionModel().getSelection();
					if (rescords.length > 0) {
						// 封装ids数组
						var workNums = new Array();
						var courseIds = new Array();
						var reservationCourseIds = new Array();
						// 遍历rescords里面的所有数据
						Ext.Array.each(rescords, function(record) {
							workNums.push(record.data.code);
							courseIds.push(record.data.WorkprocedureCourseId);
							reservationCourseIds
									.push(record.data.WorkprocedureReservationCourseId);
						});

						var store = Ext.data.StoreManager.map['core.course_manage.store.CourseSkillStore'];
						// 参数设置（根据ID查询出指定的课程绑定的技能）
						store.getProxy().extraParams = {
							courseId : courseIds[0]
						};

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

									if (array.length > 0) {
										Ext.ux.ajax.SimManager.init({
													delay : 300,
													defaultSimlet : null
												}).register({
													'Data' : {
														data : array,
														stype : 'json'
													}
												});

										var ds = Ext.create(
												'Ext.data.ArrayStore', {
													fields : [{name : 'WorkprocedurecourseId'
													}, {name : 'courseName'}],
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
											title : '技能授权',
											width : 600,
											height : 400,
											layout : 'fit',
											items : [{
												xtype : 'form',
												layout : 'fit',
												flex : 1,
												buttons : [{
													text : '授权技能',
													action : 'check',
													handler : function(e, eOpts) {
														var ids = e.ownerCt.ownerCt.items.items[0].value;
														if (ids.length > 0) {
															Ext.Ajax.request({
																url : '/web/skill/skillmanage_userskill!insertRecord.action',
																params : {
																	workNums : workNums.join(","),
																	ids : ids.join(","),
																	reservationCourseIds : reservationCourseIds[0]
																},
																method : 'post',
																timeout : 3000,
																success : function(response,opts) {
																	obj = Ext.decode(response.responseText);
																	Ext.Ajax.request({
																						url : '/web/skill/skillmanage_userReservationCourse!updateRecord.action',
																						params : {
																							workNums : workNums.join(","),
																							reservationCourseIds : reservationCourseIds.join(",")
																						},
																						method : 'post',
																						timeout : 3000,
																						success : function(response,opts) {
																							Ext.Ajax.request({
																												url : '/web/skill/skillmanage_reservationCourse!updateRecordClose.action',
																												params : {
																													reservationCourseId : reservationCourseIds[0]
																												},
																												method : 'POST',
																												timeout : 3000,
																												success : function(response,opts) {
																													obj = Ext.decode(response.responseText);
																													win.close();
																													// 更新完成刷新界面
																													var store = Ext.data.StoreManager.map['core.course_manage.store.CheckStore'];
																													store.removeAll();
																													store.load();
																													var combo = Ext.getCmp('reservation_check');
																													combo.setValue('');
																													self.msgbox(obj.returnMsg);
																												},
																												failure : function(response,opts) {
																													obj = Ext.decode(response.responseText);
																													Ext.Msg.alert("系统提示",obj.returnMsg);
																												}
																											});
																						},
																						failure : function(response,opts) {
																							obj = Ext.decode(response.responseText);
																							Ext.Msg.alert("系统提示",obj.returnMsg);
																						}
																					});

																},
																failure : function(response,opts) {
																	obj = Ext.decode(response.responseText);
																	Ext.Msg.alert("系统提示",obj.returnMsg);
																}
															});
														} else {
															Ext.Ajax.request({
																url : '/web/skill/skillmanage_userReservationCourse!updateRecord.action',
																params : {
																	workNums : workNums.join(","),
																	reservationCourseIds : reservationCourseIds.join(",")
																},
																method : 'post',
																timeout : 3000,
																success : function(response,opts) {
																	Ext.Ajax.request({
																						url : '/web/skill/skillmanage_reservationCourse!updateRecordClose.action',
																						params : {
																							reservationCourseId : reservationCourseIds[0]
																						},
																						method : 'POST',
																						timeout : 3000,
																						success : function(response,opts) {
																							obj = Ext.decode(response.responseText);
																							win.close();
																							// 更新完成刷新界面
																							var store = Ext.data.StoreManager.map['core.course_manage.store.CheckStore'];
																							store.removeAll();
																							store.load();
																							var combo = Ext.getCmp('reservation_check');
																							combo.setValue('');
																							self.msgbox(obj.returnMsg);
																						},
																						failure : function(response,opts) {
																							obj = Ext.decode(response.responseText);
																							Ext.Msg.alert("系统提示",obj.returnMsg);
																						}
																					});
																},
																failure : function(response,opts) {
																	obj = Ext.decode(response.responseText);
																	Ext.Msg.alert("系统提示",obj.returnMsg);
																}
															});
														}
													}
												}],
												items : [{
													xtype : 'itemselector',
													Title : 'itemselector',
													id : 'itemselector-check',
													anchor : '90%',
													height : 170,
													// fieldLabel: '技能选择',
													imagePath : '../fa/css/images/',
													store : ds,
													displayField : 'courseName',
													valueField : 'WorkprocedurecourseId',
													allowBlank : false,
													msgTarget : 'under ',
													fromTitle : '系统有效技能',
													toTitle : '准备授权技能'
												}]
											}]
										}).show();
									} else {
										
										Ext.Msg.alert("系统提示",
												"该课程下没有设置技能,请点击默认审核！");
									}
								} else {
									
									Ext.Msg.alert("系统提示",
											"该课程下没有设置技能,请点击默认审核！");
								}
							}
						});
					} else {
						Ext.Msg.alert("系统提示", "请勾选审核对像！");
					}
				}
			},

			'coursemanage_check field[xtype=combo]' : {
				'select' : function(combo, records, eOpts) {
					var store = Ext.data.StoreManager.map['core.course_manage.store.CheckStore'];
					store.removeAll();
					//alert(records[0].data.WorkprocedureReservationCourseId);
					store.getProxy().extraParams = {
						reservationCourseId : records[0].data.WorkprocedureReservationCourseId
					};
					store.load();
				}
			},

			/*******************************************************************
			 * 《预约课程管理》
			 ******************************************************************/
			'coursemanage_reservationcourse  button[ref=gridInsert]' : {
				click : function(e, eOpts) {
					var form = Ext.create("core.course_manage.view.addForm");
					var store = Ext.data.StoreManager.map['core.course_manage.store.CourseStore'];
					store.load();
					
					var win = Ext.create("Ext.Window", {
								title : '测试',
								layout : 'fit',
								width : 300,
								items : [form]
							}).show();
				}
			},

			'coursemanage_reservationcourse  button[ref=gridDelete]' : {
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
							ids
									.push(record.data.WorkprocedureReservationCourseId);
						});
						Ext.Ajax.request({
							url : '/web/skill/skillmanage_reservationCourse!deleteRecord.action',
							params : {
								ids : ids.join(",")
							},
							method : 'POST',
							timeout : 2000,
							success : function(response, opts) {
								//alert(response.responseText);
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

			'coursemanage_reservationcourse [xtype=grid]' : {
				itemclick : function(view, record, item, index, e, eOpts) {
					var store = Ext.data.StoreManager.map['core.course_manage.store.CourseStore'];
					store.load();
					
					view.ownerCt.down('#removeEmployee').setDisabled(false);
					var form = view.ownerCt.ownerCt.down('form').getForm();
					form.findField('reservationCourseId').setValue(record.data.WorkprocedureReservationCourseId);
					form.findField('CourseId').setValue(record.data.WorkprocedureCourseId);
					form.findField('reservationSite').setValue(record.data.ReservationSite);
					
					form.findField('reservationTime').setValue(record.data.ReservationTime.substring(0,19));
					form.findField('lecturer').setValue(record.data.Lecturer);
					form.findField('WhetherExamination').setValue(record.data.WhetherExamination);
					form.findField('NumOfExpected').setValue(record.data.NumOfExpected);
					form.findField('FinishTime').setValue(record.data.FinishTime.substring(0,19));
					form.findField('reservationRemark').setValue(record.data.ReservationRemark);
				}
			},

							
			'coursemanage_reservationcourse   button[ref=submit]' : {
				click : function(e, eOpts) {
					var form = e.ownerCt.ownerCt.getForm();
					if (form.isValid()) {
						form.submit({
							url : '/web/skill/skillmanage_reservationCourse!updateRecord.action',
							method : 'POST',
							timeout : 2000,
							waitMsg : '数据正在处理中请稍后.....',
							success : function(form, action) {
								var text = Ext.decode(action.response.responseText);
								Ext.Msg.msg("系统提示", text.returnMsg);
								var store = Ext.data.StoreManager.map['core.course_manage.store.ReservationCourseStore2'];
								store.load();
							},
							failure : function() {
								var text = Ext.decode(action.response.responseText);
								Ext.Msg.msg("系统提示", text.returnMsg);
							}

						});
					}
				}
			},
			'coursemanage_reservationcourse   button[ref=reset]' : {
				click : function(e, eOpts) {
					e.ownerCt.ownerCt.getForm().reset();
				}
			},

			/*******************************************************************
			 * 《已审核预约课程查询》
			 ******************************************************************/			
			'coursemanage_search_reservationcourse button[ref=search]':{
				click : function(e, eOpts) {
					var form = e.ownerCt.ownerCt.getForm();
					if (form.isValid()) {
						form.submit({
							url : '/web/skill/skillmanage_reservationCourse!getReservationCourseResult.action',
							method : 'POST',
							timeout : 2000,
							waitMsg : '数据正在处理中请稍后.....',
							success : function(form, action) {
								//var text = Ext.decode(action.response.responseText);
								//Ext.Msg.alert("系统提示", text.returnMsg);
								var store = Ext.data.StoreManager.map['core.course_manage.store.SearchReservationCourseStore'];
								store.removeAll();
								store.proxy.data=action.result.data;
								store.load();
							},
							failure : function() {
								var text = Ext.decode(action.response.responseText);
								Ext.Msg.alert("系统提示", text.returnMsg);
							}

						});
					}
				}			
			},
			
			'coursemanage_search_reservationcourse button[ref=reset]':{
				click : function(e, eOpts) {
					e.ownerCt.ownerCt.getForm().reset();
				}
			},
			'coursemanage_search_reservationcourse panel[xtype=grid]':{
				itemcontextmenu:function(view, record, item, index, e, eOpts ){
				e.preventDefault();  //防止浏览器弹出默认的菜单
				if(!menu){
				 menu=Ext.create("Ext.menu.Menu",{
					items:[
						{text:'导出为Excel表',handler:function(){
							var rcid=record.get('WorkprocedureReservationCourseId');
							window.location.href="http://localhost:8080/web/skill/skillmanage_reservationCourse!getReservationCourseInfo.action?reservationCourseId="+rcid;
						}}	
					]
				});
				}
				menu.showAt(e.getXY());
				}
			}
/** ********************************************************************************************************************************************** */
		});
	},
	views : [
			'core.course_manage.view.MainLayout',
			'core.course_manage.view.DisplayPanel',
			'core.course_manage.view.ItemTree',
			'core.course_manage.view.addForm',
			'core.course_manage.view.CheckView',
			'core.course_manage.view.SearchUserSkill',
			'core.course_manage.view.CourseUserSkill',
			'core.course_manage.view.ReservationCourse',
			'core.course_manage.view.SearchReservationCourse'],
	models : [
			'core.course_manage.model.CheckModel',
			'core.course_manage.model.UserSkillModel',
			'core.course_manage.model.CourseModel',
			'core.course_manage.model.CourseUserSkillModel',
			'core.course_manage.model.CourseUserSkill2Model',
			'core.course_manage.model.CourseUserSkill3Model',
			'core.course_manage.model.ReservationCourseModel',
			'core.course_manage.model.SearchReservationCourseModel'
			],
	stores : [
	        'core.skill_manage.store.ConferencePosStore',
			'core.course_manage.store.Tree',
			'core.course_manage.store.CourseSkillStore',
			'core.course_manage.store.CourseStore',
			'core.course_manage.store.CourseUserSkillStore',
			'core.course_manage.store.CourseUserSkill2Store',
			'core.course_manage.store.CourseUserSkill3Store',
			'core.course_manage.store.CheckStore',
			'core.course_manage.store.UserSkillStore',
			'core.course_manage.store.CheckReservationCourseStore',
			'core.course_manage.store.ReservationCourseStore',
			'core.course_manage.store.ReservationCourseStore2',
			'core.course_manage.store.SearchReservationCourseStore']
});