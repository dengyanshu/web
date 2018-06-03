var auto_runner=new Ext.util.TaskRunner();
var auto_task=null;
var FinishTime=null;
Ext.define("core.skill_use.controller.Controller", {
	extend : 'Ext.app.Controller',
	mixins : {
		MessageUtil : 'core.util.MessageUtil'
	},
	init : function() {
		var self = this;
		coreApp = self;
		this.control({
			'skilluse_reservationcourseview' : {
				itemclick : function(view, record, item, index, e, eOpts) {
					//alert(auto_runner);
					auto_runner.stopAll();
					var tabpanel = view.ownerCt.ownerCt.items.items[2];
					var tab = tabpanel.getComponent('skilluse_reservationcourseinfo');
					if (!tab) {
						var t = tabpanel.add({
									title : '预约课程信息',
									id : 'skilluse_reservationcourseinfo',
									closable : true,
									layout : 'border',
									closeAction : 'hide',
									items : [{
												xtype : 'skilluse_reservationcourseinfo',
												region : 'center'
											}]
								});
						FinishTime=record.get('FinishTime');
						var formItems = t.items.items[0].items.items[0].items;
						formItems.items[1].setText(record.get('CourseTitle'));
						formItems.items[3].setText(record.get('ReservationTime').substring(0,19));
						formItems.items[5].setText(record.get('ReservationSite'));
						formItems.items[7].setText(record.get('Lecturer'));
						formItems.items[9].setText(record.get('NumOfExpected'));
						formItems.items[11].setText(record.get('NumOfActual'));
						t.items.items[0].items.items[0].getForm().findField('ReservationCourseId').setValue(record.get('WorkprocedureReservationCourseId'));
						t.items.items[0].items.items[1].getForm().findField('return_msg').setValue("");
						tabpanel.setActiveTab(t);
					} else {
						var formItems = tab.items.items[0].items.items[0].items;
						formItems.items[1].setText(record.get('CourseTitle'));
						formItems.items[3].setText(record.get('ReservationTime').substring(0,19));
						formItems.items[5].setText(record.get('ReservationSite'));
						formItems.items[7].setText(record.get('Lecturer'));
						formItems.items[9].setText(record.get('NumOfExpected'));
						formItems.items[11].setText(record.get('NumOfActual'));
						tab.items.items[0].items.items[0].getForm().findField('ReservationCourseId').setValue(record.get('WorkprocedureReservationCourseId'));
						tab.items.items[0].items.items[1].getForm().findField('return_msg').setValue("");
						tabpanel.setActiveTab(tab);
					}

					var store = Ext.data.StoreManager.map['core.skill_use.store.ReservationCourseStore'];
					store.reload();
				}

			},
			'skilluse_reservationcourseinfo button[action=submit]' : {
				click : function(e, eOpts) {
					Ext.Msg.alert("系统提示", '此按钮暂不使用');
					/*
				}
					var workNumber = e.ownerCt.ownerCt.getForm().findField('workNumber').getValue();
					var ReservationCourseId = e.ownerCt.ownerCt.getForm().findField('ReservationCourseId').getValue();
					var actualNum = new Number(e.ownerCt.ownerCt.items.items[11].text);
					var return_msg = e.ownerCt.ownerCt.ownerCt.items.items[1].getForm().findField('return_msg');
					var oldValue = return_msg.getValue();
					var length;
					length=return_msg.getValue();
					var date = Ext.Date.format(new Date(), 'H:i:s');
					Ext.Ajax.request({
						url : '/web/skill/skillmanage_userReservationCourse!insertRecord.action',
						params : {
							workNumber : workNumber,
							ReservationCourseId : ReservationCourseId
						},
						method : 'post',
						timeout : 3000,
						success : function(response, opts) {
							var text = Ext.decode(response.responseText);
							if (text.Repetition) {
								self.msgbox(text.returnMsg);
								return_msg.setValue(oldValue + date + ": "+ workNumber + text.returnMsg + "!\r\n");
							} else {
								self.msgbox(text.returnMsg);
								var num = actualNum + 1;
								e.ownerCt.ownerCt.items.items[11].setText(num);
								return_msg.setValue(oldValue + date + ": "+ workNumber + "OK!\r\n");
							}

							e.ownerCt.ownerCt.ownerCt.items.items[1].getEl()
									.down('textarea').dom.scrollTop = 999999;
						},
						failure : function(response, opts) {
							var text = Ext.decode(response.responseText);
							return_msg.setValue(oldValue + date + ": "+ workNumber  + "FAIL!\r\n");
							e.ownerCt.ownerCt.ownerCt.items.items[1].getEl().down('textarea').dom.scrollTop = 999999;
						}
					});
*/
				}
			},
			'skilluse_reservationcourseinfo textfield[name=workNumber]' : {
				specialkey : function(field, e) {
					Ext.Msg.alert("系统提示", '此次提交不成功，该功能暂不使用');
					/*
					if (e.getKey() == e.ENTER) {
						var workNumber_cmp=field.ownerCt.getForm().findField('workNumber');
						var workNumber = workNumber_cmp.getValue();
						var ReservationCourseId = field.ownerCt.getForm().findField('ReservationCourseId').getValue();
						var actualNum = new Number(field.ownerCt.items.items[11].text);
						var return_msg = field.ownerCt.ownerCt.items.items[1].getForm().findField('return_msg');
						var oldValue = return_msg.getValue();
						var date = Ext.Date.format(new Date(), 'H:i:s');

						Ext.Ajax.request({
							url : '/web/skill/skillmanage_userReservationCourse!insertRecord.action',
							params : {
								workNumber : workNumber,
								ReservationCourseId : ReservationCourseId
							},
							method : 'post',
							timeout : 3000,
							success : function(response, opts) {
								
								var text = Ext.decode(response.responseText);
								if (text.Repetition) {
									self.msgbox(text.returnMsg);
									return_msg.setValue(oldValue + date + ": "+ workNumber + text.returnMsg + "!\r\n");
								} else {
									self.msgbox(text.returnMsg);
									var num = actualNum + 1;
									field.ownerCt.items.items[11].setText(num);
									return_msg.setValue(oldValue + date + ": "+ workNumber + "OK!\r\n");
								}
								field.ownerCt.ownerCt.items.items[1].getEl().down('textarea').dom.scrollTop = 999999;
								workNumber_cmp.setValue("");
							},
							failure : function(response, opts) {
								var text = Ext.decode(response.responseText);
								self.msgbox(text.returnMsg);

							}
						});
					}*/
				}
			},
			'skilluse_reservationcourseinfo button[action=auto]' : {
				click:function(e ,eOpts){
					//获取到预约课程ID
					//var actualNum = new Number(field.ownerCt.items.items[11].text);
					var ReservationCourseId = e.ownerCt.ownerCt.getForm().findField('ReservationCourseId').getValue();
					var return_msg = e.ownerCt.ownerCt.ownerCt.items.items[1].getForm().findField('return_msg');
					//auto_runner = new Ext.util.TaskRunner();  //建立一个线程
					var num=0;
					var cd="【序号】【工号】      【姓名】   【部门】        【上课时间】                  -  【下课时间】\r\n";
					var tests=Ext.Date.format(new Date(new Date()),'Y-m-d H:i:s');
					//配置线程
					auto_task={
							run:function(){
								Ext.Ajax.request({
									url : '/web/skill/skillmanage_conferencePos!getPos.action',
									params : {
										ReservationCourseId : ReservationCourseId,
										//RefreshTime : Ext.Date.format(new Date(new Date()),'Y-m-d H:i:s')
										RefreshTime : tests
									},
									method : 'post',
									timeout : 4000,
									success : function(response, opts) {
//										alert(response.responseText);
										obj = Ext.decode(response.responseText);		
										 var data=obj.data;
										var pos=obj.POS;
										if(data.length>0){
											for(var i=0;i<data.length;i++){
												num=data[i].Total;
												cd+=
data[i].Num+"            "+data[i].code+" "+data[i].name+data[i].HRD_name+"     "+data[i].shangke+"    -    "+data[i].xiake+"\r\n";
												
											}
											//num = actualNum + num;
											//e.ownerCt.ownerCt.items.items[11].setText(num);
											return_msg.setValue(cd);
											//num=0;
											cd="【序号】【工号】      【姓名】   【部门】        【上课时间】                  -  【下课时间】\r\n";
										}
										Ext.Ajax.request({
											url : '/web/skill/skillmanage_userReservationCourse!updateWRC.action',
											params : {
												sum : num,
												ReservationCourseId : ReservationCourseId
											},method : 'post',
											timeout : 3000,
											success : function(response, opts) {
												//alert(num);
												//alert(response.responseText);
												e.ownerCt.ownerCt.items.items[11].setText(num);
												//self.msgbox("更新成功！");
											}
										});
									},
									failure : function(response, opts) {
										obj = Ext.decode(response.responseText);
										Ext.Msg.alert("系统提示", obj.returnMsg);
									}
								});
							},
							interval:20000,
						};
					//开启线程 
					auto_runner.start(auto_task);
					//关闭线程
					//auto_runner.stop(auto_task);
				}
			},
			'skilluse_reservationcourseinfo button[action=guanbi]' : {
				click:function(e, eOpts){
					auto_runner.stop(auto_task);
					Ext.Msg.alert("系统提示", '下课,停止打卡');
				}
			},
			/***********************************
			 * 关闭窗口
			 ***********************************/
			
			'window[id=402881e6483ac85101483ad386050003_win]' : {
				beforehide : function() {
					auto_runner.stopAll();
				}
			}
		});
	},
	views : ['core.skill_use.view.MainLayout',
			'core.skill_use.view.DisplayPanel',
			'core.skill_use.view.ReservationCourseInfo',
			'core.skill_use.view.ReservationCourseView'],
	stores : ['core.skill_use.store.ReservationCourseStore'],
	models : ['core.skill_use.model.ReservationCourseModel']
});
