Ext.define("core.skill_manage.view.SkillView",{
	extend:'Ext.grid.Panel',
	alias:'widget.skillmanage_skill',
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
			itemId: 'remove_skill'
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
		{dataIndex:'WorkprocedureSkillId',hidden:true},
		{dataIndex:'SkillCode',text:'技能代码',wdith:100,editor:{xtype:'textfield'}},
		{dataIndex:'SkillName',text:'技能名称',wdith:200,editor:{xtype:'textfield'}},
		{dataIndex:'SkillDescription',text:'技能描述',wdith:200,editor:{xtype:'textfield'}},
		//{dataIndex:'SkillDescription',text:'技能描述',wdith:200,editor:{xtype:'textareafield',grow:true}},
		{dataIndex:'SkillCategory',text:'技能类型',width:100,editor:{xtype:'textfield'}},
		{dataIndex:'CreateUserId',text:'创建用户',wdith:100},
		{dataIndex:'CreateTime',text:'创建时间',wdith:100,renderer:function(value){
			return value.substring(0, 19);     
		}},
		{dataIndex:'ModifyUserId',text:'修改用户',wdith:100},
		{dataIndex:'ModifyTime',text:'修改时间',wdith:100,renderer:function(value){
			return value.substring(0, 19);    
		}},
		//{dataIndex:'SkillRemark',text:'备注',editor:{xtype:'textareafield',grow:true}}
		{dataIndex:'SkillRemark',text:'备注',editor:{xtype:'textfield',grow:true}}
	],
	store:'core.skill_manage.store.SkillStore',
	initComponent:function(){
	    	this.editing=Ext.create('Ext.grid.plugin.RowEditing',{clicksToEdit:2});
	    	this.plugins=this.editing;
	    	this.callParent(arguments);
	 }
});