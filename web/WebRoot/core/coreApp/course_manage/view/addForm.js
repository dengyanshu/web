var required = '<span style="color:red;font-weight:bold;editable:false" data-qtip="Required" >*</span>';
Ext.define("core.course_manage.view.addForm", {
	extend : 'Ext.form.Panel',
	layout : 'form',
	bodyPadding : '5 5 0',
	fieldDefaults : {
		msgTarget : 'side',
		labelWidth : 75
	},
	plugins : {
		ptype : 'datatip'
	},
	items : [{
				xtype : 'fieldset',
				title : '课题信息',
				collapsible : true,
				defaultType : 'textfield',
				blankText : '课题必须填写',
				layout : 'anchor',
				defaults : {
					anchor : '100%'
				},
				items : [{
							xtype : 'combo',
							fieldLabel : '课程主题',
							afterLabelTextTpl : required,
							blankText : '课题必须不能这空',
							editable : false,// 是否允许输入
							allowBlank : false,
							name : 'CourseId',
							anchor : '100%',
							displayField: 'CourseTitle',
   							valueField: 'WorkprocedureCourseId',
							store:'core.course_manage.store.CourseStore'
							
						}, {
							xtype:'datetimefield',
							format:'Y-m-d H:i:s',
							fieldLabel : '开始时间',
							allowBlank : false,
							blankText : '开始时间必须填写',
							afterLabelTextTpl : required,
							name : 'reservationTime',
							anchor : '100%',
							//editable : true// 是否允许输入
						}, {
							xtype:'datetimefield',
							format:'Y-m-d H:i:s',
							fieldLabel : '结束时间',
							allowBlank : false,
							blankText : '开始时间必须填写',
							afterLabelTextTpl : required,
							name : 'FinishTime',
							anchor : '100%',
							//editable : true// 是否允许输入
						}, {
							
							xtype:'combo',
							// id: 'ConferenceRoot',
							 mode: 'local',
							 hiddenName:'ConferenceRoot',
							 //triggerAction: 'all',
							 store :'core.skill_manage.store.ConferencePosStore',
							fieldLabel : '会议地点',
							blankText : '地点必须填写',
							displayField: 'ConferenceRoot',//itemCode
							valueField: 'ConferenceRoot',
							name : "reservationSite",
							afterLabelTextTpl : required,
							allowBlank : false,
							editable : false,
							anchor : '100%'
							
							/*
							xtype : 'combo',
							//queryMode:'local',
							displayField:'ConferenceRoot',
							valueField:'ConferenceRoot',
							fieldLabel : '会议地点',
							blankText : '地点必须填写',
							afterLabelTextTpl : required,
							allowBlank : false,
							editable : false,// 是否允许输入
							name : 'reservationSite',
							anchor : '100%',
							store :'core.course_manage.store.ConferencePosStore'
							*/
								
						}, {
							xtype : 'textfield',
							fieldLabel : '讲师',
							blankText : '讲师必须填写',
							afterLabelTextTpl : required,
							allowBlank : false,
							name : 'lecturer',
							anchor : '100%'
						}, {
							xtype : 'numberfield',
							fieldLabel : '应到人数',
							name : 'NumOfExpected',
							anchor : '100%'
						},	{
							xtype:'combo',
							allowBlank : false,
							editable : false,// 是否允许输入
							afterLabelTextTpl : required,
							store:Ext.create("Ext.data.Store",{
								fields:['key','value'],
								data:[
									{key:'是',value:'是'},
									{key:'否',value:'否'}
								]
							}),
							anchor:'100%',
							queryMode:'local',
							displayField:'value',
							valueField:'key',
							fieldLabel:'是否考试',
							name:'WhetherExamination'
						}, {
							xtype : 'textareafield',
							grow : true,
							fieldLabel : '备注',
							name : 'reservationRemark',
							value : '',
							tooltip : '备注信息'
						}]
			}],
	buttons : [{
		text : '提交',
		handler : function() {
			var self=this;
			var form = this.up('form').getForm();
			if (form.isValid()) {
				form.submit({
					url : '/web/skill/skillmanage_reservationCourse!insertRecord.action',
					method : 'POST',
					timeout : 2000,
					waitMsg : '数据正在处理中请稍后.....',
					success : function(form, action) {
						var text=Ext.decode(action.response.responseText);
						Ext.example.msg("系统提示",text.returnMsg);
						var store=Ext.data.StoreManager.map['core.course_manage.store.ReservationCourseStore'];
						store.load();
						self.up('window').close();
					},
					failure : function(form, action) {
						var text=Ext.decode(action.response.responseText);
						Ext.example.msg("系统提示",text.returnMsg);
						self.up('window').close();
					}

				});
			}
		}
	}, {
		text : '重置',
		handler:function(){
			this.up('form').getForm().reset();
		}
	}]

});