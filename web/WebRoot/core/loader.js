/**
 * 程序外部组件引用
 */
 //初始化Ext.QuickTips，以使得tip提示可用
 Ext.QuickTips.init();
//初始化提示工具框
Ext.tip.QuickTipManager.init();
//启动动态加载机制  
Ext.Loader.setConfig({
	enabled:true,	//加载配置可用
	paths:{			//目录下的所有JS文件类,映射到对应命名空间
		baseUx:"core/ux/base",
		path:"core/ux",
		factory:"core/coreApp/util/factory"
	}
});
//同步加载
Ext.syncRequire([
        'baseUx.form.datetime.DateTimePicker',
        'baseUx.form.datetime.DateTime',
        'factory.ModelFactory',
        'path.data.PagingMemoryProxy',			//内存代理分页
    	'path.form.GridComboBox',				//combox下拉gridpanel
    	'path.form.GridComboBoxList',			//combox下拉gridpanel
    	'path.form.LiveSearchGridPanelCombo',	//添加GridCombo的搜索功能
    	'path.LiveSearchGridPanel',				//添加GridPanel的搜索功能
    	'path.form.SearchField',
    	'path.form.SearchField2',
        //"baseUx.form.datetime.DateTimePicker",
        //"baseUx.form.datetime.DateTime",
        //"factory.ModelFactory",
    	'path.ajax.Simlet',
    	'path.ajax.DataSimlet',
    	'path.ajax.JsonSimlet',
    	'path.ajax.SimXhr',
    	'path.ajax.XmlSimlet',
    	'path.ajax.SimManager',
		'path.form.MultiSelect',
    	'path.form.ItemSelector',
    	'path.DataTip',
        "factory.DDCache"
]);

//加载所有类，除了“Ext.data.*之外
//Ext.exclude("Ext.data.*").require('*');