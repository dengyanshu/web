Ext.define("core.xigao.base.XiGaoBaseForm3",{
	extend:"Ext.form.FormPanel",
 	title:'查询条件',
 	frame:true,			
 	region:'east',							//位置为北,指相对父组建的位置
 	width:290,
	bodyStyle:'padding:5px 5px 0',			//body样式
	//layout:"absolute",						//布局样式为绝对布局
	buttonAlign:"center",					//按钮对齐方式为居中
	labelAlign:"left",						//标签左对齐
	defaults:{
		labelAlign:"left",						//标签左对齐
		msgTarget:'under'						//提示信息的位置底下
	},
	collapsible:true,							//可折叠
	split:true,
	buttons:[{text:'确定',action:'enter'},{text:'清除',action:'reset'}]
});