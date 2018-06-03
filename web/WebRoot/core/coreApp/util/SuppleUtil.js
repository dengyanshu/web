Ext.define("core.util.SuppleUtil",{
	/**
	 * 同步请求Ajax
	 * @param {} config
	 * @return {}
	 */
	ajax:function(config){
		var data={};
		var request={
			method:"POST",
			timeout:5000,
			async:false,
			success:function(response){
				data = Ext.decode(Ext.value(response.responseText,'{}'));
			},
			failure : function(response){
		    	alert('数据请求出错了！！！！\n错误信息：\n'+response.responseText);
		    }
		};
		var request=Ext.apply(request,config);
		Ext.Ajax.request(request);
		return data;		
	},
	
	ajax2:function(config){
		var data={};
		var request={
			method:"POST",
			async:false,
			success:function(response){
				data = Ext.decode(response.responseText);
			},
			failure : function(response){
		    	alert('数据请求出错了！！！！\n错误信息：\n'+response.responseText);
		    }
		};
		var request=Ext.apply(request,config);
		Ext.Ajax.request(request);
		return data;		
	}
});