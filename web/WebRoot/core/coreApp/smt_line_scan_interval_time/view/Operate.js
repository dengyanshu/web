/*******************************************************************************
 * <查询操作界面>
 ******************************************************************************/
var arr = new Array();
for (var i = 0; i < 60; i++) {
	arr[i] = new Array();
	for (var j = 0; j < 2; j++) {
		if (j == 0) {
			arr[i][j] = i + 1;
		} else {
			arr[i][j] = i + 1 + "分钟";
		}

	}
}

Ext.ux.ajax.SimManager.init({
			delay : 300,
			defaultSimlet : null
		}).register({
			'Data' : {
				data : arr,
				stype : 'json'
			}
		});

var ds = Ext.create('Ext.data.ArrayStore', {
			fields : ['value', 'text'],
			proxy : {
				type : 'ajax',
				url : 'Data',
				reader : 'array'
			},
			pageSize : 60,
			autoLoad : true,
			sortInfo : {
				field : 'value',
				direction : 'ASC'
			}
		});

Ext.define("core.smt_line_scan_interval_time.view.Operate", {
			extend : "Ext.form.FormPanel",
			alias : 'widget.smt_line_scan.interval_time.operate',
			title : '查询条件',
			region : 'north',
			frame : true,
			height : 260,
			bodyStyle : 'padding:5px 5px 0', // body样式
			layout : "hbox", // 布局样式为绝对布局
			buttonAlign : "center", // 按钮对齐方式为居中
			labelAlign : "center", // 标签左对齐
			defaults : {
				labelAlign : "right", // 标签左对齐
				msgTarget : 'under' // 提示信息的位置底下
			},
			collapsible : true, // 可折叠
			split : true,
			// renderTo : Ext.getBody(),
			buttons : [{
						text : '确定',
						action : 'enter'
					}, {
						text : '清除',
						action : 'reset'
					}],
			items : [{
						xtype : 'form',
						flex : 1,
						height : 172,
						items : [{
									xtype : 'textfield',
									fieldLabel : '资源名称',
									allowBlank : false,
									padding : '10,0,0,0',
									// emptyText:'请输入资源名称',
									emptyText : 'TIEPIAN-02',
									// value:'TIEPIAN-02',
									Title : 'IntervalResourceTitle'
								}, {
									xtype : 'datetimefield',
									fieldLabel : '起始时间',
									emptyText : '点击选择时间',
									format : 'Y-m-d H:i:s',
									Title : 'IntervalStartTime',
									maxValue : new Date(),
									allowBlank : false,
									padding : '10,0,0,0'
								}, {
									xtype : 'datetimefield',
									fieldLabel : '截止时间',
									emptyText : '点击选择时间',
									format : 'Y-m-d H:i:s',
									allowBlank : false,
									Title : 'IntervalEndTime',
									padding : '10,0,0,0'
								}]
					}, {
						xtype : 'form',
						layout : 'fit',
						flex : 1,
						items : [{
									xtype : 'itemselector',
									Title : 'itemselector',
									id : 'itemselector-field',
									anchor : '90%',
									height : 170,
									// fieldLabel: '项目选择',
									imagePath : '../fa/css/images/',
									store : ds,
									displayField : 'text',
									valueField : 'value',
									// value : ['1'],
									allowBlank : false,
									msgTarget : 'under ',
									fromTitle : '有效时间',
									toTitle : '查询时间'
								}]

					}]
		});