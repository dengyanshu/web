var Sum=1;
var mo2;
Ext.define("core.util.model.KanBanGetNextPageUtil",{
	circulate:function(mo,store,name,url,pageItems,win){				
		var obj2= Ext.decode(response.responseText);//obj储存响应的数据
		mo2=obj2.returnMo;
		Ext.Ajax.request({
			url:'/web/kanban/'+url+'.action',
			params:{mo:mo2},
			success:function(response){
				var obj3=Ext.decode(response.responseText);
				Sum=Math.ceil(obj3.data.length/pageItems);
				store.proxy.data=obj3.data;
				store.loadPage(1);
				win.setTitle('物料清单信息 [ 工单:'+mo2+' ]');
			}
		});
		return Sum+"/"+mo2;
	}	
});