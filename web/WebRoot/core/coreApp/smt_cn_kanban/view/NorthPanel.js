Ext.define("core.smt_cn_kanban.view.NorthPanel",{
	extend:'Ext.form.Panel',
	alias:'widget.smt_kb_cn_north',
	layout:'absolute',
	//region:'center',
	defaults: {
        autoFitErrors: "false",
        labelSeparator: "：",
        labelWidth: 70,
        width: 230,
        allowBlank: false,
        blankText: "必填",
        msgTarget: "qtip"
    },
	items:[
	{
		xtype:'textfield',
	    fieldLabel: '产线',
	    name: 'LineName',
	    id: 'LineName',
	    x:0,y:5,
	    allowBlank: false,
	    readOnly:'true'
	},
	{
		xtype:'textfield',
	    fieldLabel: '生产日期',
	    name: 'PDate',
	    id: 'PDate',
	    x:0,y:30,
	    allowBlank: false,
	    readOnly:'true'
	},
	{
		xtype:'textfield',
	    fieldLabel: '产品类型',
	    name: 'ProductType',
	    id: 'ProductType',
	    x:0,y:55,
	    allowBlank: false,
	    readOnly:'true'
	},
	{
		xtype:'textfield',
	    fieldLabel: '料号',
	    name: 'InvCode',
	    id: 'InvCode',
	    x:0,y:80,
	    allowBlank: false,
	    readOnly:'true'
	},
	{
		xtype:'textfield',
	    fieldLabel: '工单	',
	    name: 'MOName',
	    id: 'MOName',
	    x:0,y:105,
	    allowBlank: false,
	    readOnly:'true'
	},
	{
		xtype:'textfield',
	    fieldLabel: '班次',
	    name: 'WShift',
	    id: 'WShift',
	    x:250,y:5,
	    allowBlank: false,
	    readOnly:'true'
	},
	{
		xtype:'textfield',
	    fieldLabel: '组长',
	    name: 'Captain',
	    id: 'Captain',
	    x:250,y:30,
	    allowBlank: false,
	    readOnly:'true'
	},
	{
		xtype:'textfield',
	    fieldLabel: '工程工艺',
	    name: 'ProjectIE',
	    id: 'ProjectIE',
	    x:250,y:55,
	    allowBlank: false,
	    readOnly:'true',
	    value:''
	},
	{
		xtype:'textfield',
	    fieldLabel: '工程设备',
	    name: 'ProjectEqu',
	    id: 'ProjectEqu',
	    x:250,y:80,
	    allowBlank: false,
	    readOnly:'true'
	},
	{
		xtype:'textfield',
	    fieldLabel: 'QC',
	    name: 'QC',
	    id: 'QC',
	    x:250,y:105,
	    allowBlank: false,
	    readOnly:'true'
	},
	{
		xtype:'textfield',
	    fieldLabel: '锡膏',
	    name: 'xigao',
	    id: 'xigao',
	    x:500,y:5,
	    allowBlank: false,
	    readOnly:'true'
	},
	{
		xtype:'textfield',
	    fieldLabel: '实际人数',
	    name: 'LineEmployee',
	    id: 'LineEmployee',
	    x:500,y:30,
	    allowBlank: false,
	    readOnly:'true'
	},
	{
		xtype:'textfield',
	    fieldLabel: '白班达成率',
	    name: 'morningfulfill',
	    id: 'morningfulfill',
	    labelWidth: 120,
	    x:750,y:5,
	    allowBlank: false,
	    readOnly:'true'
	},
	{
		xtype:'textfield',
	    fieldLabel: '夜班达成率',
	    name: 'nightfulfill',
	    id: 'nightfulfill',
	    labelWidth: 120,
	    x:750,y:30,
	    allowBlank: false,
	    readOnly:'true'
	},
	{
		xtype:'textfield',
	    fieldLabel: '白班本周达成率',
	    name: 'Weekmorningfulfill',
	    id: 'Weekmorningfulfill',
	    labelWidth: 120,
	    x:750,y:55,
	    allowBlank: false,
	    readOnly:'true'
	},
	{
		xtype:'textfield',
	    fieldLabel: '夜班本周达成率',
	    name: 'Weeknightfulfill',
	    id: 'Weeknightfulfill',
	    labelWidth: 120,
	    x:750,y:80,
	    allowBlank: false,
	    readOnly:'true'
	}]
});

Ext.onReady(function () {
		Ext.Ajax.request({
		url : '/web/kanban/smt_cn_kanban!getResultHeader.action', 
		success : function(response, opts) {
		 	//alert(response.responseText);
			var obj = Ext.decode(response.responseText);
			var data=obj.data;
			
			//Ext.MessageBox.alert('系统后台数据提示',data[0].remoteName,function(){});
			if(data[0].LineName!=null&&data[0].LineName!='')
			{
				//[{"WorkCenterName":"SMT-1","MOName":"MO160302163",
				//"ProductType":"魅族","PDate":"2016-04-05","InvCode":"030102012"}]
				
				Ext.getCmp("MOName").setValue(data[0].MOName);
				Ext.getCmp("ProductType").setValue(data[0].ProductType);
				Ext.getCmp("PDate").setValue(data[0].PDate);
				Ext.getCmp("InvCode").setValue(data[0].InvCode);
				Ext.getCmp("LineName").setValue(data[0].LineName);
				Ext.getCmp("WShift").setValue(data[0].WShift);
				Ext.getCmp("Captain").setValue(data[0].Captain);
				Ext.getCmp("ProjectIE").setValue(data[0].ProjectIE);
				Ext.getCmp("ProjectEqu").setValue(data[0].ProjectEqu);
				Ext.getCmp("xigao").setValue(data[0].xigao);
				Ext.getCmp("QC").setValue(data[0].QC);
				Ext.getCmp("LineEmployee").setValue(data[0].LineEmployee);
				Ext.getCmp("morningfulfill").setValue(data[0].morningfulfill);
				Ext.getCmp("nightfulfill").setValue(data[0].nightfulfill);
				Ext.getCmp("Weekmorningfulfill").setValue(data[0].Weekmorningfulfill);
				Ext.getCmp("Weeknightfulfill").setValue(data[0].Weeknightfulfill);
			}else{
				Ext.MessageBox.alert('系统后台处理提示','没有找到线体资料',function(){
					
				});
			}
		},
		failure : function(response, opts) {
			obj = Ext.decode(response.responseText);
			Ext.Msg.alert("系统提示",obj.returnMsg);
		}
	});
});
