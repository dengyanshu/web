Ext.define("core.mes.model.AllDataModel",{
	extend:'Ext.data.Model',
		fields:[
		{name:'MOName'},					//工单号
		{name:'ProductName'},				//产品名称
		{name:'ProductDescription'},		//产品描述
		{name:'ProductFamilyShortName'}		//产品机型
	]
	
});