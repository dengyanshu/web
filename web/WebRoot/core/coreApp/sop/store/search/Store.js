Ext.define("core.sop.store.search.Store",{
	extend:'Ext.data.Store',
	model:'core.sop.model.search.Model',
	remoteSort:true,
	pageSize:15,
	proxy:{
		type:'pagingmemory',
		render:{
			type:'json',
			root:'data'
		}
	}
});