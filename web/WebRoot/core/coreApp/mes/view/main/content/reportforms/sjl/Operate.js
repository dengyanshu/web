 /***************************************************************************
  								<数据链查询操作界面> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.sjl.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.sjl.operate',
 	height:120,
	items:[
		{
			xtype:'textfield',
			//emptyText:'请输入主批号',
			fieldLabel: '主批号',
			allowBlank:false,
			//value:'H29BC3746353',
			name:'sjl_sn'
		}
	]
 });