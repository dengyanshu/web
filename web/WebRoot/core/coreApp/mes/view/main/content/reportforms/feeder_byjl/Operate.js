 /***************************************************************************
  								<Feeder保养记录查询> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.feeder_byjl.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.feeder_byjl.operate',
	items:[
		{
			xtype:'textfield',
			fieldLabel: '请扫描Feeder编号',
			name:'feeder_byjl_number',
			//value:'FD010001',
			allowBlank:false
		},		
		{
			xtype:'datetimefield',
			fieldLabel: '设备保养开始日期',
			format:'Y-m-d H:i:s',
			name:'feeder_byjl_begin',
			//allowBlank:false,
	        maxValue: new Date()
		},
		{
			xtype:'datetimefield',
			fieldLabel: '设备保养结果日期',
			format:'Y-m-d H:i:s',
			name:'feeder_byjl_end'
		}
	]
 });