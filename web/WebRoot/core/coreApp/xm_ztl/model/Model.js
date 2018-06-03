Ext.define("core.xm_ztl.model.Model",{
	extend:'Ext.data.Model',
	fields:[
		{name:'ProductFamilyName'},
		{name:'站别'},
		{name:'alertQty'},
		{name:'UPHYieId'},
		
		{name:'投入总数 '},
		{name:'一次通过数'},
		{name:'一次通过率 (%)'},
		{name:'一次不良数'},
		{name:'一次不良率 (%)'}
	]	
});