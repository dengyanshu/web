/**
 * 封装普通表单的Button按钮事件
 */

Ext.define("core.util.model.BaseFormButtonAction",{
	/**
	 * 普通表格的查询操作事件
	 * @param {} e	
	 * @param {} Object
	 * @param {} Url
	 */
	click:function(Form,Grid,Url){
		var basic=Form.getForm();					
		var store=Grid.store;
		if(basic.isValid){
			basic.submit({
				clientValidation:true,
				url: Url,
				type:'ajax',
				waitTitle:'系统提示',
				waitMsg:'正在查询中，请耐心等待........',
				success: function(basic, action) {
					store.proxy.data=action.result.data;					//把查询结果赋值给数据集
					//store.load({params:{start:0,limit:15}});					//load重新加载数据集
					store.load();												//load重新加载数据集
					basic.reset();												//清空form表单的值
				},
				failure:function(basic,action){
					Ext.Msg.alert("系统提示",action.result.returnMes);
					basic.reset();
				}
			});
		}		
	}
});