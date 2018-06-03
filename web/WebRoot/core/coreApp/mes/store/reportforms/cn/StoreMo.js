Ext.define("core.mes.store.reportforms.cn.StoreMo",{
	extend:'Ext.data.Store',
   	model:'core.mes.model.reportforms.cn.ModelMo',
   	autoLoad:false,
	proxy:{
		type:'memory',   
		reader:{
			type:'json',
			root:'data'
		}
	}
	
});	