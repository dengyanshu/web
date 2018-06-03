Ext.define("core.util.model.MOName_SMT_ViewList",{
 on:function(win,store,type){
	//var store = Ext.data.StoreManager.get('core.mes.store.viewList.MOName_SMT_ViewList_Store');
	store.on("beforeload", function(store, operation, eOpts) {
		var mo = win.items.items[0].getForm().findField('mo').getValue();
		var pn = win.items.items[0].getForm().findField('pn').getValue();
		Ext.apply(store.proxy.extraParams, {
			mo : mo,pn : pn,type:type
		});
	});
	store.load();
 }
});