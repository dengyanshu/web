Ext.define('core.course_manage.view.SerarchReservationCourse',{
	extend:'Ext.Panel',
	alias:'widget.coursemanage_search_reservationcourse',
	layout:'border',
		items:[
		{
			xtype:'grid',
			region:'center',
			store:'core.course_manage.store.SearchReservationCourseStore',
			columns:[
				{xtype:'rownumberer',text:'序号',width:100},
				{text:'id',dataIndex:'WorkprocedureReservationCourseId',hidden:true},
				{text:'课程名',dataIndex:'CourseTitle',width:150},
				{text:'课程描述',dataIndex:'CourseDescription',width:150},
				{text:'课程类型',dataIndex:'CourseType',width:150},
				{text:'开始时间',dataIndex:'ReservationTime',width:150},
				{text:'结束时间',dataIndex:'FinishTime',width:150},
				{text:'地点',dataIndex:'ReservationSite',width:150},
				{text:'讲师',dataIndex:'Lecturer',width:150},
				{text:'应到人数',dataIndex:'NumOfExpected',width:150},
				{text:'实到人数',dataIndex:'NumOfActual',width:150},
				{text:'备注',dataIndex:'ReservationRemark',width:150}
			]
		},
		{
			xtype:'form',
			region:'west',
			frame:true,
			bodyPadding:10,
			width:200,
			collapsible:true,
			fieldDefaults:{
				labelAlign:'top'
			},
			items:[
				{
					xtype:'textfield',
					fieldLabel:'课程名',
					name:'courseName',
					anchor:'100%'
				},
				{
					xtype:'datetimefield',
					format:'Y-m-d H:i:s',
					fieldLabel:'开始时间',
					name:'reservationTime',
					anchor:'100%'
				},
				{
					xtype:'datetimefield',
					format:'Y-m-d H:i:s',
					fieldLabel:'结束时间',
					name:'FinishTime',
					anchor:'100%'
				},
				{
					xtype:'combo',
					 mode: 'local',
					 hiddenName:'ConferenceRoot',
					fieldLabel : '会议地点',
					blankText : '地点必须填写',
					name : "reservationSite",
					store :'core.skill_manage.store.ConferencePosStore',
					displayField: 'ConferenceRoot',//itemCode
					valueField: 'ConferenceRoot',
					allowBlank : false,
					editable : false,
					anchor : '100%'
					/*	
					xtype : 'combo',
					queryMode:'local',
					displayField:'value',
					valueField:'key',
					fieldLabel : '会议地点',
					name : 'reservationSite',
					anchor : '100%',
					store:Ext.create("Ext.data.Store",{
						fields:['key','value'],
						data:[
							{key:'会议室1',value:'会议室1'},
							{key:'会议室2',value:'会议室2'}
						]
					})*/
				}				
			],
			buttons:[
				{text:'查找',ref:'search'},
				{text:'重置',ref:'reset'}
			]
		}

	]
	
});