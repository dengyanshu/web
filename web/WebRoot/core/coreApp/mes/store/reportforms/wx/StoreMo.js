Ext.define("core.mes.store.reportforms.wx.StoreMo",{
	extend:'Ext.data.Store',
   	model:'core.mes.model.reportforms.wx.ModelMo',
    autoLoad:false,
    proxy:{
    	type:'memory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
	
});	
