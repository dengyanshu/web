 /***************************************************************************
  								<物料收料单回传查询> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.wlsldhc.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.wlsldhc.operate',
	items:[
		{
			xtype:'textfield',
			fieldLabel: '订单号',
			name:'wlsldhc_po'
			//value:'PO01011204280194'
			//allowBlank:false,
		},		
		{
			xtype:'textfield',
			fieldLabel: '收料单号',
			name:'wlsldhc_code'
	        //allowBlank:false,
		},
		{
			xtype:'textfield',
			fieldLabel: '批号',
			name:'wlsldhc_sn'
			//allowBlank:false,
		}
	]
 });