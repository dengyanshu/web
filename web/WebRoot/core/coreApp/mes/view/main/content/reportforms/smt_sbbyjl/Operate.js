 /***************************************************************************
  								<SMT设备保养记录查询> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.smt_sbbyjl.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.smt_sbbyjl.operate',
	items:[
		{
			xtype:'textfield',
			fieldLabel: '请扫描线体编号',
			name:'smt_sbbyjl_line',
			//value:'A-LINE06',
			allowBlank:false
		},		
		{
			xtype:'datetimefield',
			fieldLabel: '设备保养开始日期',
			//emptyText:'点击选择时间',
			format:'Y-m-d H:i:s',
			name:'smt_sbbyjl_begin',
			allowBlank:false,
	        maxValue: new Date()
		},
		{
			xtype:'datetimefield',
			fieldLabel: '设备保养截止日期',
			//emptyText:'点击选择时间',
			format:'Y-m-d H:i:s',
			allowBlank:false,
			name:'smt_sbbyjl_end'
		}
	]
 });