/**
 * 封装普通表单的Button按钮事件
 */

var p = 1; // Variable Page
var total = 0; // Variable Data Sum Items
//var limit = 20; // Every Page display Items

Ext.define("core.util.model.ClockAction2",{
	updateClock:function(pro,value,p,limit){
		var string = "core."+pro+"_kanban.store." + value + ".Store";
		var store = Ext.data.StoreManager.map[string];
		store.load({params : {limit : limit,page : p}});
		return store.getTotalCount();
	}
});