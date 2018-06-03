function compare(str1, str2) {
	var num1 = parseInt(str1);
	var num2 = parseInt(str2);
	if (num1 < num2) {
		return -1;
	} else if (num1 > num2) {
		return 1;
	} else {
		return 0;
	}
}

var IntervalResourceName = null;
var IntervalStartTime = null;
var IntervalEndTime = null;
var IntervalMinutes = null;
var StartInterval = null;
var EndInterval = null;

Ext.define("core.smt_line_scan_interval_time.controller.Controller", {
	extend : "Ext.app.Controller",

	init : function() {
		var self = this;
		coreApp = self;
		this.control({

			'panel[xtype=smt_line_scan.interval_time.result] panel[xtype=grid]' : {
				itemclick : function(e, eOpts) {
					var operate = e.ownerCt.ownerCt.ownerCt.items.items[1];
					var leftForm = operate.items.items[0];
					var rightForm = operate.items.items[1];
					IntervalResourceName = leftForm.items.items[0].value;
					IntervalStartTime = leftForm.items.items[1].getValue();
					IntervalEndTime = leftForm.items.items[2].getValue();
					var values = rightForm.items.items[0].value;
					var x;
					var arr = new Array();
					for (var i = 0; i < values.length; i++) {
						if (i == 0) {
							arr[i] = values[i] + "m:0~" + values[i] * 60;
							x = values[i] * 60 + 1;
						} else {
							arr[i] = values[i] + "m:" + x + "~" + values[i]
									* 60;
							x = values[i] * 60 + 1;
						}
					}
					arr.sort(compare);
					IntervalMinutes = arr.join(";");
					StartInterval = eOpts.data.StartInterval;
					EndInterval = eOpts.data.EndInterval;
					var store = Ext.data.StoreManager.map['core.smt_line_scan_interval_time.store.ListStore'];
					store.removeAll();

					store.getProxy().extraParams = {
						IntervalResourceName : IntervalResourceName,
						IntervalStartTime : IntervalStartTime,
						IntervalEndTime : IntervalEndTime,
						IntervalMinutes : IntervalMinutes,
						StartInterval : StartInterval,
						EndInterval : EndInterval
					};
					store.loadPage(1);
					Ext.create("Ext.Window", {
						width : 500,
						title : '清单列表',
						maximized : true,
						layout : 'fit',
						items : [{
									xtype : 'smt_line_scan_interval_time_list_result'
								}]
					}).show();

				}

			},

			'panel[xtype=smt_line_scan.interval_time.operate] [action=enter]' : {
				click : function(e, eOpts) {
					var leftForm = e.ownerCt.ownerCt.items.items[0];
					var rightForm = e.ownerCt.ownerCt.items.items[1];
					var IntervalResourceName = leftForm.items.items[0].value;
					var IntervalStartTime = leftForm.items.items[1].getValue();
					var IntervalEndTime = leftForm.items.items[2].getValue();
					var values = rightForm.items.items[0].value;
				    values.sort(compare);
					var x;
					var arr = new Array();
					for (var i = 0; i < values.length; i++) {
						if (i == 0) {
							arr[i] = values[i] + "m:0~" + values[i] * 60;
							x = values[i] * 60 + 1;
						} else {
							arr[i] = values[i] + "m:" + x + "~" + values[i]
									* 60;
							x = values[i] * 60 + 1;
						}
					}
					var IntervalMinutes = arr.join(";");
					console.log(IntervalMinutes);
					if (IntervalStartTime == "" || IntervalResourceName == ""
							|| IntervalEndTime == "" || IntervalMinutes == "") {
						Ext.Msg.alert("系统提示", "输入条件不完整，请重新输入！");
					} else {
						var store = Ext.data.StoreManager.map['core.smt_line_scan_interval_time.store.Store'];
						store.load({
									params : {
										IntervalResourceName : IntervalResourceName,
										IntervalStartTime : IntervalStartTime,
										IntervalEndTime : IntervalEndTime,
										IntervalMinutes : IntervalMinutes
									}
								});
					}

				}
			},
			'panel[xtype=smt_line_scan.interval_time.operate] button[action=reset]' : {
				click : function(e, eOpts) {
					e.ownerCt.ownerCt.getForm().reset();
				}
			},

			'panel[xtype=smt_line_scan.interval_time.operate] datetimefield[name=IntervalEndTime]' : {
				specialkey : function(field, e) {
					if (e.getKey() == e.ENTER) {
						var baseForm = field.ownerCt.getForm();
						var IntervalEndTime = field.getValue();
						var IntervalResourceName = baseForm
								.findField('IntervalResourceName').value;
						var IntervalStartTime = baseForm
								.findField('IntervalStartTime').getValue();

						if (IntervalStartTime == ""
								|| IntervalResourceName == ""
								|| IntervalEndTime == "") {
							Ext.Msg.alert("系统提示", "输入条件不完整，请重新输入！");
						} else {
							var store = Ext.data.StoreManager.map['core.smt_line_scan_interval_time.store.Store'];
							store.load({
								params : {
									IntervalResourceName : IntervalResourceName,
									IntervalStartTime : IntervalStartTime,
									IntervalEndTime : IntervalEndTime
								}
							});
						}

					}
				}
			}
		});
	},
	views : ['core.smt_line_scan_interval_time.view.Main',
			'core.smt_line_scan_interval_time.view.Operate',
			'core.smt_line_scan_interval_time.view.Result',
			'core.smt_line_scan_interval_time.view.ListResult'],
	stores : ['core.smt_line_scan_interval_time.store.Store',
			'core.smt_line_scan_interval_time.store.ListStore'],
	models : ['core.smt_line_scan_interval_time.model.Model',
			'core.smt_line_scan_interval_time.model.ListModel']
});