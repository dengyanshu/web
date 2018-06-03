 /***************************************************************************
  								<收料查询操作界面> 
 ***************************************************************************/
  Ext.define("core.mes.view.main.content.reportforms.sl.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.sl.operate',
	items:[
		{
			xtype:'textfield',
			fieldLabel: '批号',
			//emptyText:'请输入批号',
			name:'sl_sn',
			allowBlank:false
			//value:'MZ01133A0FMR001P'
		}
	]	
 });