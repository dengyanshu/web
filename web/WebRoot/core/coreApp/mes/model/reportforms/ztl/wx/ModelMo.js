Ext.define("core.mes.model.reportforms.wx.ModelMo",{
	extend:'Ext.data.Model',
	fields:[
		{name:'MOId'},  
		{name:'MOName'},		//工单名
		{name:'MakeUpCount'},		
		{name:'productName'},  //产品名称
		{name:'ProductDescription'}  //产品描述
	]
});