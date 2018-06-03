 /***************************************************************************
  								<锡膏库存查询>  
 ***************************************************************************/
 
  Ext.define("core.xigao.view.main.content.xgkccx.Operate",{
	extend:"core.xigao.base.XiGaoBaseForm3",
 	alias:'widget.xgkccx.operate',
	items:[
		{
			xtype:'datetimefield',
			fieldLabel: '起始时间',
			format:'Y-m-d H:i:s',
			name:'begin_date',
			allowBlank:false,
	        maxValue: new Date()
		},
		{
			xtype:'datetimefield',
			fieldLabel: '截止时间',
			format:'Y-m-d H:i:s',
			//value: new Date(),
			allowBlank:false,
			maxValue: new Date(),
			name:'end_date'
		}
	]
 });