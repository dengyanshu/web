/**
 * 封装普通表单的Button按钮事件
 */

//通用的URL地址
var basePath="/web/mes/baobiao/";
var basePath2="/web/mes/xigao/";

Ext.define("core.util.model.MesBaseFormButtonAction",{
	/**
	 * 普通表格的查询操作事件
	 * @param {} e	
	 * @param {} Url
	 */
	click:function(e){
		//获取到项目名称
		var value=e.ownerCt.ownerCt.ownerCt.items.items[1].xtype.split(".")[0];
		//组合URL
		var url=basePath+value+".action";
		//获取到表单
		var Form=e.ownerCt.ownerCt;
		//获取到表格
		var Grid=e.ownerCt.ownerCt.ownerCt.items.items[2];
		var basic=Form.getForm();					
		var store=Grid.store;
		if(basic.isValid){
			basic.submit({
				clientValidation:true,
				url: url,
				type:'ajax',
				waitTitle:'系统提示',
				waitMsg:'正在查询中，请耐心等待........',
				success: function(basic, action) {
					store.proxy.data=action.result.data;					//把查询结果赋值给数据集
					store.load();												//load重新加载数据集
					//basic.reset();												//清空form表单的值
				},
				failure:function(basic,action){
					Ext.Msg.alert("系统提示",action.result.returnMes);
					//basic.reset();
				}
			});
		}		
	},
	click2:function(e){
		//获取到项目名称
		var value=e.ownerCt.ownerCt.ownerCt.items.items[1].xtype.split(".")[0];
		//组合URL
		var url=basePath2+value+".action";
		//获取到表单
		var Form=e.ownerCt.ownerCt;
		//获取到表格
		var Grid=e.ownerCt.ownerCt.ownerCt.items.items[2];
		var basic=Form.getForm();					
		var store=Grid.store;
		if(basic.isValid){
			basic.submit({
				clientValidation:true,
				url: url,
				type:'ajax',
				waitTitle:'系统提示',
				waitMsg:'正在查询中，请耐心等待........',
				success: function(basic, action) {
					store.proxy.data=action.result.data;					//把查询结果赋值给数据集
					store.load();												//load重新加载数据集
					//basic.reset();												//清空form表单的值
				},
				failure:function(basic,action){
					Ext.Msg.alert("系统提示",action.result.returnMes);
					//basic.reset();
				}
			});
		}		
	}
	
});