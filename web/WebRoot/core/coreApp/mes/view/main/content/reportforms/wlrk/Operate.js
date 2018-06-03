 /***************************************************************************
  								<物料入库查询> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.wlrk.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.wlrk.operate',
	items:[
		{
			xtype:'combo',
			fieldLabel: '订单号',
			name:'wlrk_type',
			store:Ext.create("Ext.data.Store",{
				fields:['name1','name2'],
				data:[
					{name1:'LotSN',name2:'订单'},
					{name1:'POName',name2:'料号'},
					{name1:'ProductName',name2:'批号'}
				]
			}),
			queryMode: 'local',
			//emptyText:'请选择查询方式:',
			displayField: 'name2',
			allowBlank:false,
		    valueField: 'name1'
		},	
		{
			xtype:'textfield',
			fieldLabel: '查询号',
			name:'wlrk_value',
	        allowBlank:false
		}
	]
 });