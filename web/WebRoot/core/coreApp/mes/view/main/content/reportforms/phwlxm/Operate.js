 /***************************************************************************
  								<查询操作界面> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.phwlxm.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.phwlxm.operate',
	items:[
		{
			xtype:'combo',
			name:'phwlxm_pattern',
			fieldLabel: '查询方式',
			allowBlank:false,
			store:Ext.create("Ext.data.Store",{
				fields:['name1','name2'],
				data:[
					{name1:'A',name2:'批号查询上料细明'},
					{name1:'B',name2:'物料查询使用批号'}
				]
			}),
			queryMode: 'local',
			//emptyText:'请选择查询方式',	
			displayField: 'name2',
		    valueField: 'name1'
		},
		{
			xtype:'textfield',
			fieldLabel: '批号条码',
			//emptyText:'请输入序号',
			allowBlank:false,
			//value:'78ABBBC8A259',
			name:'phwlxm_sn'
		}
	]
 });