/*
 * var Sum=1;
 * 
 * Ext.define("core.util.model.KanBanItemListUtil",{
 * load:function(mo,store,url,pageItems){ Ext.Ajax.request({
 * url:'/web/kanban/'+url+'.action', params:{mo:mo}, success:function(response){
 * var obj=Ext.decode(response.responseText);
 * Sum=Math.ceil(obj.data.length/pageItems); Sum=111; store.proxy.data=obj.data;
 * store.load(); } }); return Sum; } });
 */

Ext.define("core.util.model.KanBanItemListUtil", {
	mixinis : {
		MaskMsgUtil : 'core.util.model.MaskMsgUtil',
		suppleUtil : 'core.util.SuppleUtil'
	},

	nextPage : function(sphere, isAlertSum, url1, url2, mo, pro, title, pageItems, store) {
		var self = this;
		var mask = self.msg(sphere);
		var pageSum = 1;
		
		if (isAlertSum == "0") {
		// 如果没有红色预警提示则继续查找下一个工单
			var result = self.ajax2({url : url1,params : {mo : mo,name : pro}});
			if (result.success) {
				mask.show();
				var result2 = self.ajax({url : url2,params : {mo : mo}});
				mask.hide();
				if (result2.success) {
					if (result2.isAlertSum == "0") {
						pageSum = Math.ceil(result2.data.length/ pageItems); // 总条数/每页显示的记录数得到记录总页数
					} else {
						var sum = result2.isAlertSum;
						pageSum = Math.ceil(sum / pageItems);
					}
					store.proxy.data = result2.data;
					store.loadPage(1);
					sphere.setTitle(title + '  ===>物料清单信息 [ 工单:' + mo+ ' ]');
				}else{
					store.removeAll(true);
					Ext.Msg.alert("系统提示",result.returnMsg);
				}
			}else{
				Ext.Msg.alert("系统提示",result.returnMsg);
			}
		} else {
			mask.show();
			var result2 = self.ajax({url : url2,params : {mo : mo}});
				mask.hide();
				if (result2.success) {
					if (result2.isAlertSum == "0") {
						pageSum = Math.ceil(result2.data.length / pageItems); // 总条数/每页显示的记录数得到记录总页数
					} else {
						var sum = result2.isAlertSum;
						pageSum = Math.ceil(sum / pageItems);
					}
					store.proxy.data = result2.data;
					store.loadPage(1);
					sphere.setTitle(title + '  ===>物料清单信息 [ 工单:' + mo+ ' ]');
				}
			}
			return pageSum;
		}

});
