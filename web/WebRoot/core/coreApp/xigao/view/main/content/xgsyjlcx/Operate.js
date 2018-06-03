 /***************************************************************************
  								<锡膏使用记录查询> 
 ***************************************************************************/
 
  Ext.define("core.xigao.view.main.content.xgsyjlcx.Operate",{
	extend:"core.xigao.base.XiGaoBaseForm3",
 	alias:'widget.xgsyjlcx.operate',
	items:[
		{
			xtype:'textfield',
			fieldLabel: '锡膏条码SN',
			name:'sn'
		},
		{
			xtype:'textfield',
			fieldLabel: '工单',
			name:'mo'
		},
		{
			xtype:'datetimefield',
			fieldLabel: '起始时间',
			format:'Y-m-d H:i:s',
			name:'begin_date',
	        maxValue: new Date()
		},
		{
			xtype:'datetimefield',
			fieldLabel: '截止时间',
			format:'Y-m-d H:i:s',
			//value: new Date(),
			maxValue: new Date(),
			name:'end_date'
		}		
	]
 });