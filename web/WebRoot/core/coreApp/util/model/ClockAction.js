/**
 * 封装翻页事件
 * store.load({params : {}});
 * store.getProxy().extraParams={};
 * store.getProxy().params={};
 */

var p = 1; // Variable Page
var total = 0; // Variable Data Sum Items

Ext.define("core.util.model.ClockAction",{
	updateClock:function(pro,value,p,limit){
		var string = "core."+pro+"_kanban.store." + value + ".Store";		
		var store = Ext.data.StoreManager.map[string];
		store.getProxy().params={limit : limit,page : p};
		store.loadPage(p);
		return store.getTotalCount();
	},
	updateClockList:function(pro,value,p,limit,mo){
		var string = "core."+pro+"_kanban.store." + value ;		
		var store = Ext.data.StoreManager.map[string];
		store.getProxy().extraParams={mo:mo};
		store.getProxy().params={mo:mo,limit : limit,page : p};
		store.loadPage(p);
		if(store.data.items[0].data.isAlert!=0){
			return "1";	
		}else{
			return store.getTotalCount();
		}
	}
});