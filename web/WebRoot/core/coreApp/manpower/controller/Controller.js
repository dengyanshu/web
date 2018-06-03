var a1;
var a2;
var a3;
var a4;

Ext.define('core.manpower.controller.Controller', {
     extend: 'Ext.app.Controller',

     init: function() {
         this.control({
 			'm-northpanel-north button[ref=reset]':{
 				click:function(btn){
 					console.log(btn);	
 				}
 			},
 			'm-northpanel-north button[ref=submit]':{
 				click:function(btn){
 					var self = this;
 					coreApp = self;

var nNorth=btn.ownerCt.ownerCt;
var northPanel=nNorth.ownerCt;
var nWest=northPanel.down('m-northpanel-west');
var nCenter=northPanel.down('m-northpanel-center');
//var Store2=northPanel.down('m-northpanel-Store2');
var nEast=northPanel.down('m-northpanel-east');
var mainPanel=northPanel.ownerCt;
var centerPanel=mainPanel.down('manpower-centerpanel');


var value=nNorth.getForm().findField('workprocedureflowname').getValue();
var value2=nNorth.getForm().findField('chanpinbianma').getValue();
//nNorth.down("toolbar").items.items[1].setText(value);
var content=null;

Ext.Ajax.request({
	url : '/web/technology/manpower!getResult2.action', 
	params : 
	{val:value,valpn:value2},
	success : function(response, opts) {

//		alert(response.responseText);
		var obj = Ext.decode(response.responseText);
		var data=obj.data;
		
		nNorth.down("toolbar").items.items[1].setText(data[0].ProductName);
		nNorth.down("toolbar").items.items[5].setText(data[0].ProductSpecification);
		nNorth.down("toolbar").items.items[9].setText(data[0].MaintainDate);
		nNorth.down("toolbar").items.items[13].setText(data[0].Revision);
		
		nEast.update('<div>备注:</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data[0].Remark+'</div>');
		centerPanel.down("toolbar").items.items[1].setText(data[0].StandardTotalOfTime);
		centerPanel.down("toolbar").items.items[5].setText(data[0].StandardNumOfPeople);
		centerPanel.down("toolbar").items.items[9].setText(data[0].StandardProductivity);
		centerPanel.down("toolbar").items.items[13].setText(data[0].BottleneckTime);
		centerPanel.down("toolbar").items.items[17].setText(data[0].UPPH);
		centerPanel.down("toolbar").items.items[21].setText(Math.round(data[0].ProductionRateOfBalance*100)/100+"%");
		centerPanel.down("toolbar").items.items[25].setText(Math.round(data[0].TotalValidTimeRate*100)/100+"%");
		content =' <table height="175"  width="598" class="manpower"  border="2" cellpadding="0" cellspacing="0">' +
		'<tr><th class="manpower-th" colspan="10" >间接人力标准配置：</th>' +
		'<tr><th class="manpower-th" colspan="2">制造直接</th><th class="manpower-th" colspan="4">制造间接</th><th class="manpower-th" colspan="2">工程间接</th><th  class="manpower-th" colspan="2">品质间接</th></tr>' +
		'<tr>' +
		'<td>作业员</td> ' +
		'<td width="30">'+data[0].StandardNumOfPeople+'</td><td>组长</td> ' +
		'<td>'+data[0].ProductionHeader+'</td><td>助拉</td> ' +
		'<td>'+data[0].SupportPull+'</td><td>IE</td> ' +
		'<td>'+data[0].IE+'</td><td>IPQC</td> ' +
		'<td>'+data[0].IQC+'</td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="2"></td>' +
		'<td>物料员</td> <td>'+data[0].MaterialMan+'</td>' + 
		'<td>转板员</td> <td>'+data[0].RotatingPlateMan+'</td>' +
		'<td>TE</td> <td>'+data[0].TE+'</td>' +
		'<td>FQC</td> <td>'+data[0].FQC+'</td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="2"></td>' +
		'<td>上料员</td> <td>'+data[0].OnMaterialMan+'</td>' +
		'<td>维修员</td> <td>'+data[0].MaintainMan+'</td>' +
		'<td>PE</td> <td>'+data[0].PE+'</td>' +
		'<td colspan="2"></td>' +
		'</tr>' +
		'<tr>' +
		'<td>直接人力</td> <td>'+data[0].StandardNumOfPeople+'</td>' +
		'<td>制造间接</td> <td>'+data[0].TotalOfProductionIndirect+'</td>' +
		'<td colspan="2"></td>' +
		'<td>工程间接</td> <td>'+data[0].TotalOfProjectIndirect+'</td>' +
		'<td>品质间接</td> <td>'+data[0].TotalOfQualityIndirect+'</td>' +
		'</tr>' +
		'</table>';

		nWest.update(content);
		
	
		var store3 = Ext.data.StoreManager.map['core.manpower.store.Store'];
		store3.removeAll();
		store3.getProxy().extraParams={val:value,valpn:value2};
		store3.load();
		
		
		
		store3.on("load",function(response){
			console.log(response);

			var obj=response.data.items[0].raw;
			console.log(obj.Material);
		});
		
	},
	
	
	failure : function(response, opts) {
		alert('超时');
		content=' <table height="175"  width="598" class="manpower"  border="2" cellpadding="0" cellspacing="0">' +
		'<tr><th class="manpower-th" colspan="10" >间接人力标准配置：</th>' +
		'<tr><th class="manpower-th" colspan="2">制造直接</th><th class="manpower-th" colspan="4">制造间接</th><th class="manpower-th" colspan="2">工程间接</th><th  class="manpower-th" colspan="2">品质间接</th></tr>' +
		'<tr>' +
		'<td>作业员</td> ' +
		'<td>0.0</td><td>组长</td> ' +
		'<td>0.0</td><td>助拉</td> ' +
		'<td>0.0</td><td>IE</td> ' +
		'<td>0.0</td><td>IPQC</td> ' +
		'<td>0.0</td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="2"></td>' +
		'<td>物料员</td> <td>&nbsp</td>' +
		'<td>转板员</td> <td>&nbsp</td>' +
		'<td>TE</td> <td>&nbsp</td>' +
		'<td>FQC</td> <td>&nbsp</td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="2"></td>' +
		'<td>上料员</td> <td>&nbsp</td>' +
		'<td>维修员</td> <td>&nbsp</td>' +
		'<td>PE</td> <td>0.0</td>' +
		'<td colspan="2"></td>' +
		'</tr>' +
		'<tr>' +
		'<td>制造人力</td> <td>0.0</td>' +
		'<td>制造间接</td> <td>0.0</td>' +
		'<td colspan="2"></td>' +
		'<td>工程间接</td> <td>0.0</td>' +
		'<td>品质间接</td> <td>0.0</td>' +
		'</tr>' +
		'</table>';
	nWest.update(content);
	
	obj = Ext.decode(response.responseText);
	Ext.Msg.alert("系统提示", obj.returnMsg);
	//Ext.Msg.alert("系统提示", '输入有误， 请重新输入');
	}
	,timeout: 50
	});
}
 			}
 			
         });
     },

	
	stores:[
	        'core.manpower.store.Store',
	        'core.manpower.store.Store2',
	        'core.manpower.store.Store3'
	],
	models:[
	        'core.manpower.model.Model3',
	        'core.manpower.model.Model2',
	        'core.manpower.model.Model'
	],
	views:[
	       'core.manpower.view.MainPanel',
	       'core.manpower.view.NorthPanel',
	       'core.manpower.view.CenterPanel',
	       'core.manpower.view.Center',
	       'core.manpower.view.East',
	       'core.manpower.view.North',
	       'core.manpower.view.West'
	]
});