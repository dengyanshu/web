Ext.define("core.skill_manage.view.ConferencePos",{
	extend:'Ext.grid.Panel',
	alias:'widget.skillmanage_conference_pos',
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
			itemId: 'remove_conPos'
		}
	],
	columns:[
		{xtype:'rownumberer',text:'序号',width:50},
		{text:'',dataIndex:'CP_id',hidden:true},
		{text:'会议室',dataIndex:'ConferenceRoot',width:300,editor:{
				xtype : "basecombobox",
				name : "ConferenceRoot",
				displayField: 'itemName',//itemCode
				valueField: 'itemName',
				editable : true,
				ddCode : "ConferenceRoot"
			
		}},
		{text:'刷卡机',dataIndex:'POS',flex:1,editor:{
				xtype : "basecombobox",
				name : "POS",
				editable : true,
				ddCode : "POS"
		}}
	],
	store:'core.skill_manage.store.ConferencePosStore',
    initComponent:function(){
	    	//配置可编辑插件 RowEditing  CellEditing
	    	//this.editing=Ext.create('Ext.grid.plugin.CellEditing',{clicksToEdit:2});
    		this.editing=Ext.create('Ext.grid.plugin.RowEditing',{clicksToEdit:2});
	    	this.plugins=this.editing;
	    	this.callParent(arguments);
	 }
});