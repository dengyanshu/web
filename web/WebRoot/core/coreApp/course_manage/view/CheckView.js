var childStore;
Ext.define("core.course_manage.view.CheckView",{
	extend:"Ext.grid.Panel",
	alias:'widget.coursemanage_check',
	loadMask : true, 
	stripeRows : true,
	selType:'checkboxmodel',
	tbar:[
		{
			xtype:'button',
			text:'默认审核',
			action:'defaultCheck'
		},
		{
			xtype:'button',
			text:'自定义审核',
			action:'customCheck'
		},
		{
			xtype:'combo',
			fieldLabel:'审核课程',
			labelAlign:'right',
			editable : false,
			id:'reservation_check',
			store:'core.course_manage.store.CheckReservationCourseStore',
			queryMode:'remote',
			displayField:'CourseTitle',
			valueField:'WorkprocedureReservationCourseId',
			 listeners:{ focus: function(){//focus:是获得焦点事件
			    	childStore = Ext.data.StoreManager.map['core.course_manage.store.CheckReservationCourseStore'];
			    	childStore.removeAll();
					childStore.load();
			    } }
		}
	],
	columns:[
		{xtype:'rownumberer',text:'序号',width:50},
		{header:'工号',dataIndex:'code',width:100},
		{header:'姓名',dataIndex:'name',width:100},
		{header:'课题',dataIndex:'CourseTitle',width:100},
		{header:'预约课题ID',dataIndex:'WorkprocedureReservationCourseId',hidden:true},
		{header:'课题ID',dataIndex:'WorkprocedureCourseId',hidden:true},
		//{header:'职位',dataIndex:'UserDuty',width:100},
		{header:'时间',dataIndex:'ReservationTime',width:100},
		{header:'地址',dataIndex:'ReservationSite',width:100},
		{header:'讲师',dataIndex:'Lecturer',width:100},
		{header:'状态',dataIndex:'isCheck',width:100,
			renderer:function(value){
				if(value==0){
				 return '<span style="color:red">待审核</span>';
				}
				
			}
		}
	],
    initComponent:function(){
	    	//配置可编辑插件 RowEditing  CellEditing
	    	//this.editing=Ext.create('Ext.grid.plugin.CellEditing',{clicksToEdit:2});
    		this.editing=Ext.create('Ext.grid.plugin.RowEditing',{clicksToEdit:2});
	    	this.plugins=this.editing;
	    	this.callParent(arguments);
	 },
	//features:[{ftype:'grouping',frame:true}],
	store:'core.course_manage.store.CheckStore'
	
});