Ext.define("core.skill_use_test.controller.Controller", {
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

					var store = Ext.data.StoreManager.map['core.skill_use_test.store.ReservationCourseStore'];
					store.reload();
				}

			},
			'skilluse_reservationcourseinfo button[action=submit]' : {
				click : function(e, eOpts) {
					var workNumber = e.ownerCt.ownerCt.getForm().findField('workNumber').getValue();
					var ReservationCourseId = e.ownerCt.ownerCt.getForm().findField('ReservationCourseId').getValue();
					var actualNum = new Number(e.ownerCt.ownerCt.items.items[11].text);
					var return_msg = e.ownerCt.ownerCt.ownerCt.items.items[1].getForm().findField('return_msg');
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

				}
			},
			'skilluse_reservationcourseinfo textfield[name=workNumber]' : {
				specialkey : function(field, e) {
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
					}
				}

			}

		});
	},
	views : ['core.skill_use_test.view.MainLayout',
			'core.skill_use_test.view.DisplayPanel',
			'core.skill_use_test.view.ReservationCourseInfo',
			'core.skill_use_test.view.ReservationCourseView'],
	stores : ['core.skill_use_test.store.ReservationCourseStore'],
	models : ['core.skill_use_test.model.ReservationCourseModel']
});
