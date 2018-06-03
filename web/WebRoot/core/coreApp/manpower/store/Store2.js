//var value = formpanel.getForm().findField("a1").getValue(); 
//alert(value);
var data1=1;
var data2=1;
var data3=1;
var data4=1;
Ext.define("core.manpower.store.Store2",{
	extend:'Ext.data.Store',
	model:'core.manpower.model2.Model',
	autoLoad:true,
	
//    data: [
//	    	{name:"制造人力",data:data1},
//	    	{name:"制造间接",data:data2},
//	    	{name:"工程间接",data:data3},
//	    	{name:"品质间接",data:data4}
//	]
//,
	//autoLoad : false,

	proxy : {
		type : 'ajax',
		url:'/web/technology/manpower!getResult2.action',
		reader : {
			type : 'json',
			root : 'data'
		}
	}
/*
	data: [
	    	{name:"制造人力",data:30},
	    	{name:"制造间接",data:30},
	    	{name:"工程间接",data:30},
	    	{name:"品质间接",data:10}
	]
	*/
});