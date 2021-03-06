Ext.define("core.skill_manage.view.CourseView",{
	extend:'Ext.grid.Panel',
	alias:'widget.skillmanage_course',
    selType:'checkboxmodel',
	tbar:[
		{
			xtype:'button',
			text:'添加',
			ref:'gridInsert',
			iconCls:'table_add'
		},
		{
			xtype:'button',
			text:'删除',
			ref:'gridDelete',
			iconCls:'table_remove',
			disabled:true,
			itemId: 'remove_course'
		},
		{
			xtype:'button',
			text:'绑定技能',
			ref:'bindingSkill',
			iconCls:'table_save',
			disabled:true,
			itemId: 'binding_skill'
		}
	],
	bbar:[
		{
			xtype:'form',
			height:80,
			bodyPadding:5,
			flex:1,
			layout:'absolute',
			items:[
				{
					xtype:'filefield',
					name:'path',
					fieldLabel:'文件选择',
					msgTarget:'side',
					labelAlign:'right',
					allowBlank:false,
					buttonText:'选择文件'
				}
			],
			buttons:[
				{text:'提交',action:'submit'},
				{text:'重置',action:'reset'}
			]
		}
	],	
	columns:[
		{xtype:'rownumberer',text:'序号',width:50},
		{dataIndex:'WorkprocedureCourseId',hidden:true},
		{dataIndex:'CourseTitle',text:'课程主题',wdith:200,editor:{xtype:'textfield'}},
		{dataIndex:'CourseCode',text:'课程代码',wdith:100,editor:{xtype:'textfield'}},
		{dataIndex:'CreateUserId',text:'创建用户',width:100},
		{dataIndex:'CreateTime',text:'创建时间',width:100,renderer:function(value){
			return value.substring(0, 19);
		}},
		{dataIndex:'ModifyUserId',text:'修改用户',wdith:100},
		{dataIndex:'ModifyTime',text:'修改时间',wdith:100,renderer:function(value){
			return value.substring(0, 19);
		}}
	],
	store:'core.skill_manage.store.CourseStore',
    initComponent:function(){
	    	//配置可编辑插件 RowEditing  CellEditing
	    	//this.editing=Ext.create('Ext.grid.plugin.CellEditing',{clicksToEdit:2});
    		this.editing=Ext.create('Ext.grid.plugin.RowEditing',{clicksToEdit:2});
	    	this.plugins=this.editing;
	    	this.callParent(arguments);
	 }
});