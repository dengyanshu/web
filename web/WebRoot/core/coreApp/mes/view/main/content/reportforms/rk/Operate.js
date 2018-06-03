 /***************************************************************************
  								<查询操作界面> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.rk.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.rk.operate',
	items:[
		{
			xtype:'combo',
			name:'rk_pattern',
			fieldLabel: '查询方式',
			allowBlank:false,
			store:Ext.create("Ext.data.Store",{
				fields:['name1','name2'],
				data:[
					{name1:'lotsubmit',name2:'订单号'},
					{name1:'posubmit',name2:'料号'},
					{name1:'prodsubmit',name2:'主批号'}
				]
			}),
			queryMode: 'local',
			//emptyText:'请选择查询方式',	
			displayField: 'name2',
		    valueField: 'name1'
		},
		{
			xtype:'textfield',
			fieldLabel: '查询序号',
			allowBlank:false,
			//emptyText:'请输入序号',
			name:'rk_sn'
		}
	]
 });