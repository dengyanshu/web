Ext.define("core.course_manage.view.CourseUserSkill",{
	extend:'Ext.Panel',
	alias:'widget.coursemanage_courseuserskill',
	layout:'border',
	items:[
		{
			xtype:'form',
			region:'north',
			frame:true,
			height:90,
			bodyPadding:5,
			defaultType:'textfield',
			layout : 'absolute',
			items:[
				{
					//************
					xtype:'combo',
					fieldLabel : '会议课程',
					blankText : '课程必须选择',
					//afterLabelTextTpl : required,
					//mode: 'local',
					name:'CourseTitle1',
					id:'CourseTitle1',
					hiddenName:'CourseTitle',
					triggerAction: 'all',
					displayField: 'CourseTitle',
					valueField: 'CourseTitle',
					allowBlank : false,
					editable : false,
					store :'core.course_manage.store.CourseUserSkill3Store',
					x:35,
					y:10,
					listeners:{ blur : function(f){
						Ext.getCmp("FinishTime").setValue('');
				    	childStore = Ext.data.StoreManager.map['core.course_manage.store.CourseUserSkill2Store'];
				    	childStore.removeAll();
						childStore.getProxy().extraParams={kecheng : this.value};
						childStore.load();
				    } }
				},{
					xtype:'combo',
				    fieldLabel: '预约课程时间',
				    id: 'FinishTime',
				    name :'FinishTime',
				    emptyText:'请选择',
				    mode: 'local',
				    //hiddenName:'FinishTime',
				    displayField: 'FinishTime',
					valueField: 'WorkprocedureReservationCourseId',
					//afterLabelTextTpl : required,
				    triggerAction: 'all',
				    editable : false,
				    store : 'core.course_manage.store.CourseUserSkill2Store',
				    x:320,y:10,
				    allowBlank: true
			    }
			],
			buttons:[
				{text:'提交',action:'submit'},
				{text:'重置',action:'reset'}
			]
		},
		{
			xtype:'gridpanel',
			region:'center',
			columns:[
				{xtype:'rownumberer',text:'序号',width:50},
				{dataIndex:'code',text:'工号',width:85},
				{dataIndex:'CourseTitle',text:'科目',width:100},
				{dataIndex:'name',text:'姓名',width:65},
				{dataIndex:'SkillName',text:'技能',width:130},
				{dataIndex:'FinishTime',text:'预约课程时间',width:120},
				{dataIndex:'shangke',text:'上课时间',width:100},
				{dataIndex:'xiake',text:'下课时间',width:100}
			],
			store:'core.course_manage.store.CourseUserSkillStore'
		}
	]
	
});