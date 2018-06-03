
Ext.define("core.course_manage.view.ReservationCourse", {
			extend : 'Ext.Panel',
			alias : 'widget.coursemanage_reservationcourse',
			layout : 'border',
			items : [{
				xtype : 'form',
				region : 'east',
				width : 200,
				layout : 'form',
				title:'预约课程信息',
				collapsible : true,
				split : true,
				bodyPadding : '30 5 0',
				fieldDefaults : {
					labelAlign : 'top',
					msgTarget : 'side',
					labelWidth : 75
				},
				plugins : {
					ptype : 'datatip'
				},
				items : [
						{
							xtype : 'textfield',
							fieldLabel : '预约课程ID',
							name : 'reservationCourseId',
							value : '',
							hidden:true
						},
						{
							xtype : 'combo',
							fieldLabel : '课程主题',
							name : 'CourseId',
							anchor : '100%',
							displayField: 'CourseTitle',
   							valueField: 'WorkprocedureCourseId',
							store:'core.course_manage.store.CourseStore'
						}, {
							xtype : 'datetimefield',
							format : 'Y-m-d H:i:s',
							fieldLabel : '开始时间',
							value:'',
							name : 'reservationTime',
							anchor : '100%'
						},  {
							xtype:'datetimefield',
							format:'Y-m-d H:i:s',
							fieldLabel : '结束时间',
							value:'',
							name : 'FinishTime',
							anchor : '100%'
						},{
							xtype : "combo",
							fieldLabel : '会议地点',
							blankText : '地点必须填写',
							name : "reservationSite",
							allowBlank : false,
							anchor : '100%',
								displayField: 'ConferenceRoot',
								valueField: 'ConferenceRoot',
								store:'core.skill_manage.store.ConferencePosStore'
							/*	
							xtype : 'combo',
							queryMode:'local',
							displayField:'value',
							valueField:'key',
							fieldLabel : '会议地点',
							blankText : '地点必须填写',
							allowBlank : false,
							name : 'reservationSite',
							anchor : '100%',
							store:Ext.create("Ext.data.Store",{
								fields:['key','value'],
								data:[
									{key:'会议室1',value:'会议室1'},
									{key:'会议室2',value:'会议室2'}
								]
							})*/
						}, {
							xtype : 'textfield',
							fieldLabel : '讲师',
							name : 'lecturer',
							anchor : '100%',
							value : ''
						}, {
							xtype : 'numberfield',
							fieldLabel : '应到人数',
							name : 'NumOfExpected',
							anchor : '100%'
						}, 
						{
							xtype:'combo',
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
						},
						{
							xtype : 'textareafield',
							grow : true,
							fieldLabel : '备注',
							name : 'reservationRemark',
							value : ''
						}],
				buttons : [
					{text : '更新',ref : 'submit'}, 
					{text : '取消',ref : 'reset'
				}]
			}, {
				xtype : 'grid',
				region : 'center',
				tbar : [{
							xtype : 'button',
							text : '添加',
							ref : 'gridInsert',
							iconCls : 'table_add'
						}, {
							xtype : 'button',
							text : '删除',
							ref : 'gridDelete',
							iconCls : 'table_remove',
							disabled: true,
							 itemId: 'removeEmployee'
					}],
				columns : [
						{xtype : 'rownumberer',text : '序号',width : 50}, 
						{dataIndex : 'WorkprocedureCourseId',text:'CourseId',hidden : true},
						{dataIndex : 'WorkprocedureReservationCourseId',text:'ReservationCourseId',hidden : true},
						{dataIndex : 'CourseTitle',text : '课程主题',wdith : 200}, 
						{dataIndex : 'ReservationTime',text : '开始时间',width : 100,renderer : function(value) {return value.substring(0, 19); }},
						{dataIndex : 'FinishTime',text : '结束时间',width : 100,renderer : function(value) {return value.substring(0, 19); }},
						{dataIndex : 'ReservationSite',text : '地点',wdith : 100},
						{dataIndex : 'Lecturer',text : '讲师',width : '150'},
						{dataIndex : 'WhetherExamination',text : '是否考试',width : '150'},
						{dataIndex : 'NumOfExpected',text : '应到人数'}, 
						{dataIndex : 'NumOfActual',text : '实到人数'},
						{dataIndex : 'CreateUserId',text : '创建用户',width : 100},
						{dataIndex : 'CreateTime',text : '创建时间',width : 100,
							renderer : function(value) {return value.substring(0,19);}
						}, 
						{dataIndex : 'ModifyUserId',text : '修改用户',wdith : 100}, 
						{dataIndex : 'ModifyTime',text : '修改时间',wdith : 100,
							renderer : function(value) {return value.substring(0,19);}
						},
						{dataIndex : 'ReservationRemark',text : '备注信息',wdith : 100}],
						
				store : 'core.course_manage.store.ReservationCourseStore2'
			}]
		});