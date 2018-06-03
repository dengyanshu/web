var smt_cn_runner=new Ext.util.TaskRunner();
var data=null;
var  my_rep_un=function(num,str){
	if (typeof(data[num][str]) == 'undefined') { 
        return  " ";
    }  
    else
       return data[num][str];
}

Ext.define("core.lineproduce_query.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		MaskMsgUtil:'core.util.model.MaskMsgUtil',
		MessageUitl:'core.util.MessageUtil'
	},
	
	init : function() {
		var self = this;
		coreApp = self;				
		var content=null;		
		this.control({
			'lineproduce_search button[ref=submit]':{
				click:function(e,Opts){
					smt_cn_runner.stopAll();
					var search=e.ownerCt.ownerCt;
					var main=search.ownerCt;
					var result=main.down('lineproduce_result');
					var content=null;
		            var line=search.getForm().findField('status').getValue();	
		            var curDate = new Date();
                    var time=Ext.Date.format(curDate, 'Y-m-d');
		            var reList ={
					  run: function(){
	         			Ext.Ajax.request({
				     	url : '/web/kanban/smt_cn_kanban!getResult2.action', 
				     	params : {line:line},
				     	success : function(response, opts) {
		                 //alert(response.responseText);
		                	var obj = Ext.decode(response.responseText);
		               		data=obj.data;
//		               		var line=my_rep_un(0,'LineName');
//		               		var line2=data[0].LineName; Captain
//		               		alert(line);???
//		               		alert(line2);
		               		

		               		  content='<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  <style type="text/css">  td {white-space: nowrap; width:7%;} .ban{'+
	  ' background-color:green ; float:left;width:50%;}.cheng{background-color:gold;float:right;width:50%; }</style></head><body>'+
		               		  '<img src="/web/core/css/image/table/logo.jpg"style= " float:left;"  />  <div width=100% style="font-size:30px;text-align:center;margin:auto;"> SMT制造中心看板 </div>'+		
		               		  ' <table width=100% border="2" cellpadding="3" style="font-size:14px;table-layout:fixed; " >'+
								'        <tr> '+
								'           <td rowspan="4">产线</td><td rowspan="4" style="background-color:#33CC00;width:14%" colspan="2">'+my_rep_un(0,'LineName')+' </td> <td rowspan="5"> 白班责任人 </td> <td > 组长 </td><td > '+my_rep_un(0,'Captain')+ '</td>'+
								'           <td rowspan="5"> 夜班责任人 </td> <td > 组长 </td><td >'+my_rep_un(0,'Captain_night')+ ' </td><td style="width:9%;"> 白班达成率 </td> <td>'+my_rep_un(0,'morningfulfill')+ ' </td><td > 5S稽核数 </td> <td style="width:12%">'+my_rep_un(0,'smt5s_audit_qty')+ '  </td>'+
								'        </tr>'+
								'        <tr> '+
								'               <td > 操作员 </td><td >'+my_rep_un(0,'LineEmployeeCaozuo')+'</td><td > 操作员 </td><td >'+my_rep_un(0,'LineEmployeeCaozuo_night')+'</td>'+
								'              <td > 夜班达成率 </td><td>'+my_rep_un(0,'nightfulfill')+' </td><td > 5S改善数 </td> <td>'+my_rep_un(0,'smt5s_improve_qty')+'</td>'+
								'        </tr>'+
								'        <tr> '+
								'               <td > 工程工艺</td><td > '+my_rep_un(0,'ProjectIE')+' </td><td > 工程工艺</td><td > '+my_rep_un(0,'ProjectIE_night')+' </td>'+
								'              <td > 白班本周达成率 </td> <td>'+my_rep_un(0,'Weekmorningfulfill')+' </td><td > ESD稽核数 </td> <td>'+my_rep_un(0,'esd_audit_qty')+' </td>'+
								'        </tr>'+
								'        <tr> '+  
								'               <td > 工程设备 </td><td > '+my_rep_un(0,'ProjectEqu')+'  </td><td > 工程设备</td><td >'+my_rep_un(0,'ProjectEqu_night')+'   </td>'+
								'              <td > 夜班本周达成率 </td> <td> '+my_rep_un(0,'Weeknightfulfill')+' </td><td > ESD改善数 </td> <td>'+my_rep_un(0,'esd_improve_qty')+'  </td>'+
								'        </tr>'+
								'        <tr>   <td> 工单</td><td colspan="2" style="background-color:#33CC00" width=14%>'+my_rep_un(0,'moname')+' </td>'+
								'               <td > IPQC </td><td >'+my_rep_un(0,'QC')+' </td><td > IPQC </td><td >'+my_rep_un(0,'QC_night')+' </td>'+
								'              <td > 白班累计产量 </td> <td> '+my_rep_un(0,'baiban_qty')+'</td><td > 白班培训工时 </td> <td>'+my_rep_un(0,'morningEducateHour')+' </td>'+
								'        </tr>'+
								'        <tr> '+
								'           <td >料号</td> <td  style="background-color:#33CC00" colspan="2" width=14%>'+my_rep_un(0,'InvCode')+'</td> <td > 实际人数</td> <td colspan="2"> '+my_rep_un(0,'LineEmployee_shiji')+' </td><td > 标准人数 </td><td colspan="2">'+my_rep_un(0,'planpeople')+' </td>'+
								'            <td > 夜班累计产量 </td> <td>'+my_rep_un(0,'yeban_qty')+' </td><td > 夜班培训工时 </td> <td>'+my_rep_un(0,'nightEducateHour')+'</td>'+
								'        </tr>'+
								'        <tr> '+
								'           <td >产品机型</td> <td  style="word-wrap:break-word;" colspan="2" width=14%>'+my_rep_un(0,'ProductType')+' </td> <td > 生产日期</td> <td colspan="2">'+time+'  </td><td > 目标产量 </td><td colspan="2">'+my_rep_un(0,'moqtyrequired')+' </td>'+
								'            <td > 标准工时  </td> <td>'+my_rep_un(0,'plantime')+' </td><td > 锡膏型号</td> <td style="background-color:#33CC00">'+my_rep_un(0,'xigao')+'</td>'+
								'        </tr>'+
								'        <tr > '+
								'           <td colspan="13" height="20px"></td>'+
								'        </tr>'+
								'        <tr style="background-color:#33CC00">'+
								'            <td>生产日期</td><td>8:00-9:00</td><td>9:00-10:00</td>'+
								'            <td>10:00-11:00</td><td>11:00-12:00</td>'+
								'           <td>12:00-13:00</td><td>13:00-14:00</td>'+
								'            <td>14:00-15:00</td><td>15:00-16:00</td>'+
								'            <td>16:00-17:00</td><td>17:00-18:00</td>'+
								'           <td>18:00-19:00</td> <td>19:00-20:00</td>'+
								'        </tr>'+
								'        <tr>'+
								'            <td>目标产量</td>' +
								'            <td><div class="ban">'+my_rep_un(0,'am89_1')+'</div><div class="cheng">'+my_rep_un(0,'am89_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'am910_1')+'</div><div class="cheng">'+my_rep_un(0,'am910_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'am1011_1')+'</div><div class="cheng">'+my_rep_un(0,'am1011_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'am1112_1')+'</div><div class="cheng">'+my_rep_un(0,'am1112_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'pm1213_1')+'</div><div class="cheng">'+my_rep_un(0,'pm1213_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'pm1314_1')+'</div><div class="cheng">'+my_rep_un(0,'pm1314_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'pm1415_1')+'</div><div class="cheng">'+my_rep_un(0,'pm1415_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'pm1516_1')+'</div><div class="cheng">'+my_rep_un(0,'pm1516_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'pm1617_1')+'</div><div class="cheng">'+my_rep_un(0,'pm1617_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'pm1718_1')+'</div><div class="cheng">'+my_rep_un(0,'pm1718_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'pm1819_1')+'</div><div class="cheng">'+my_rep_un(0,'pm1819_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'pm1920_1')+'</div><div class="cheng">'+my_rep_un(0,'pm1920_2')+'</div></td>' +
								'        </tr>'+
								'        <tr>'+
								'            <td>实际产量</td>' +
								'            <td><div class="ban">'+my_rep_un(1,'am89_1')+'</div><div class="cheng">'+my_rep_un(1,'am89_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'am910_1')+'</div><div class="cheng">'+my_rep_un(1,'am910_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'am1011_1')+'</div><div class="cheng">'+my_rep_un(1,'am1011_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'am1112_1')+'</div><div class="cheng">'+my_rep_un(1,'am1112_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'pm1213_1')+'</div><div class="cheng">'+my_rep_un(1,'pm1213_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'pm1314_1')+'</div><div class="cheng">'+my_rep_un(1,'pm1314_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'pm1415_1')+'</div><div class="cheng">'+my_rep_un(1,'pm1415_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'pm1516_1')+'</div><div class="cheng">'+my_rep_un(1,'pm1516_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'pm1617_1')+'</div><div class="cheng">'+my_rep_un(1,'pm1617_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'pm1718_1')+'</div><div class="cheng">'+my_rep_un(1,'pm1718_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'pm1819_1')+'</div><div class="cheng">'+my_rep_un(1,'pm1819_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'pm1920_1')+'</div><div class="cheng">'+my_rep_un(1,'pm1920_2')+'</div></td>' +
								'        </tr>'+
								'        <tr>'+
								'            <td>差异产量</td>' +
							    '            <td><div class="ban">'+my_rep_un(2,'am89_1')+'</div><div class="cheng">'+my_rep_un(2,'am89_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'am910_1')+'</div><div class="cheng">'+my_rep_un(2,'am910_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'am1011_1')+'</div><div class="cheng">'+my_rep_un(2,'am1011_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'am1112_1')+'</div><div class="cheng">'+my_rep_un(2,'am1112_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'pm1213_1')+'</div><div class="cheng">'+my_rep_un(2,'pm1213_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'pm1314_1')+'</div><div class="cheng">'+my_rep_un(2,'pm1314_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'pm1415_1')+'</div><div class="cheng">'+my_rep_un(2,'pm1415_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'pm1516_1')+'</div><div class="cheng">'+my_rep_un(2,'pm1516_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'pm1617_1')+'</div><div class="cheng">'+my_rep_un(2,'pm1617_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'pm1718_1')+'</div><div class="cheng">'+my_rep_un(2,'pm1718_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'pm1819_1')+'</div><div class="cheng">'+my_rep_un(2,'pm1819_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'pm1920_1')+'</div><div class="cheng">'+my_rep_un(2,'pm1920_2')+'</div></td>' +
								'        </tr>'+
								'         <tr>'+
								'            <td>累计产量</td>' +
							    '            <td><div class="ban">'+my_rep_un(3,'am89_1')+'</div><div class="cheng">'+my_rep_un(3,'am89_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'am910_1')+'</div><div class="cheng">'+my_rep_un(3,'am910_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'am1011_1')+'</div><div class="cheng">'+my_rep_un(3,'am1011_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'am1112_1')+'</div><div class="cheng">'+my_rep_un(3,'am1112_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'pm1213_1')+'</div><div class="cheng">'+my_rep_un(3,'pm1213_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'pm1314_1')+'</div><div class="cheng">'+my_rep_un(3,'pm1314_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'pm1415_1')+'</div><div class="cheng">'+my_rep_un(3,'pm1415_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'pm1516_1')+'</div><div class="cheng">'+my_rep_un(3,'pm1516_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'pm1617_1')+'</div><div class="cheng">'+my_rep_un(3,'pm1617_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'pm1718_1')+'</div><div class="cheng">'+my_rep_un(3,'pm1718_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'pm1819_1')+'</div><div class="cheng">'+my_rep_un(3,'pm1819_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'pm1920_1')+'</div><div class="cheng">'+my_rep_un(3,'pm1920_2')+'</div></td>' +
								'        </tr>'+
								'        <tr>'+
								'            <td>制程不良</td>' +
								 '            <td><div class="ban">'+my_rep_un(4,'am89_1')+'</div><div class="cheng">'+my_rep_un(4,'am89_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'am910_1')+'</div><div class="cheng">'+my_rep_un(4,'am910_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'am1011_1')+'</div><div class="cheng">'+my_rep_un(4,'am1011_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'am1112_1')+'</div><div class="cheng">'+my_rep_un(4,'am1112_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'pm1213_1')+'</div><div class="cheng">'+my_rep_un(4,'pm1213_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'pm1314_1')+'</div><div class="cheng">'+my_rep_un(4,'pm1314_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'pm1415_1')+'</div><div class="cheng">'+my_rep_un(4,'pm1415_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'pm1516_1')+'</div><div class="cheng">'+my_rep_un(4,'pm1516_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'pm1617_1')+'</div><div class="cheng">'+my_rep_un(4,'pm1617_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'pm1718_1')+'</div><div class="cheng">'+my_rep_un(4,'pm1718_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'pm1819_1')+'</div><div class="cheng">'+my_rep_un(4,'pm1819_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'pm1920_1')+'</div><div class="cheng">'+my_rep_un(4,'pm1920_2')+'</div></td>' +
								'        </tr>'+
								'        <tr style="background-color:#ff0000">'+
								'            <td colspan="13" height="50px" valign="top">异常说明：'+my_rep_un(0,'morningException')+'</td>'+
								'        </tr>'+
								'         <tr style="background-color:#0066FF">'+
								'            <td>生产日期</td><td>20:00-21:00</td><td>21:00-22:00</td>'+
								'            <td>22:00-23:00</td><td>23:00-24:00</td>'+
								'           <td>00:00-1:00</td><td>1:00-2:00</td>'+
								'            <td>2:00-3:00</td><td>3:00-4:00</td>'+
								'            <td>4:00-5:00</td><td>5:00-6:00</td>'+
								'           <td>6:00-7:00</td> <td>7:00-8:00</td>'+
								'        <tr>'+
								'            <td>目标产量</td>' +
								'            <td><div class="ban">'+my_rep_un(0,'pm2021_1')+'</div><div class="cheng">'+my_rep_un(0,'pm2021_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'pm2122_1')+'</div><div class="cheng">'+my_rep_un(0,'pm2122_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'pm2223_1')+'</div><div class="cheng">'+my_rep_un(0,'pm2223_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'pm2300_1')+'</div><div class="cheng">'+my_rep_un(0,'pm2300_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'am001_1')+'</div><div class="cheng">'+my_rep_un(0,'am001_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'am12_1')+'</div><div class="cheng">'+my_rep_un(0,'am12_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'am23_1')+'</div><div class="cheng">'+my_rep_un(0,'am23_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'am34_1')+'</div><div class="cheng">'+my_rep_un(0,'am34_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'am45_1')+'</div><div class="cheng">'+my_rep_un(0,'am45_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'am56_1')+'</div><div class="cheng">'+my_rep_un(0,'am56_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'am67_1')+'</div><div class="cheng">'+my_rep_un(0,'am67_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(0,'am78_1')+'</div><div class="cheng">'+my_rep_un(0,'am78_2')+'</div></td>' +
								'        </tr>'+
								'        <tr>'+
								'            <td>实际产量</td>' +
								'            <td><div class="ban">'+my_rep_un(1,'pm2021_1')+'</div><div class="cheng">'+my_rep_un(1,'pm2021_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'pm2122_1')+'</div><div class="cheng">'+my_rep_un(1,'pm2122_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'pm2223_1')+'</div><div class="cheng">'+my_rep_un(1,'pm2223_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'pm2300_1')+'</div><div class="cheng">'+my_rep_un(1,'pm2300_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'am001_1')+'</div><div class="cheng">'+my_rep_un(1,'am001_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'am12_1')+'</div><div class="cheng">'+my_rep_un(1,'am12_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'am23_1')+'</div><div class="cheng">'+my_rep_un(1,'am23_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'am34_1')+'</div><div class="cheng">'+my_rep_un(1,'am34_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'am45_1')+'</div><div class="cheng">'+my_rep_un(1,'am45_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'am56_1')+'</div><div class="cheng">'+my_rep_un(1,'am56_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'am67_1')+'</div><div class="cheng">'+my_rep_un(1,'am67_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(1,'am78_1')+'</div><div class="cheng">'+my_rep_un(1,'am78_2')+'</div></td>' +
								'        </tr>'+
								'        <tr>'+
								'            <td>差异产量</td>' +
								'            <td><div class="ban">'+my_rep_un(2,'pm2021_1')+'</div><div class="cheng">'+my_rep_un(2,'pm2021_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'pm2122_1')+'</div><div class="cheng">'+my_rep_un(2,'pm2122_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'pm2223_1')+'</div><div class="cheng">'+my_rep_un(2,'pm2223_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'pm2300_1')+'</div><div class="cheng">'+my_rep_un(2,'pm2300_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'am001_1')+'</div><div class="cheng">'+my_rep_un(2,'am001_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'am12_1')+'</div><div class="cheng">'+my_rep_un(2,'am12_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'am23_1')+'</div><div class="cheng">'+my_rep_un(2,'am23_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'am34_1')+'</div><div class="cheng">'+my_rep_un(2,'am34_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'am45_1')+'</div><div class="cheng">'+my_rep_un(2,'am45_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'am56_1')+'</div><div class="cheng">'+my_rep_un(2,'am56_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'am67_1')+'</div><div class="cheng">'+my_rep_un(2,'am67_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(2,'am78_1')+'</div><div class="cheng">'+my_rep_un(2,'am78_2')+'</div></td>' +
								'        </tr>'+
								'         <tr>'+
								'            <td>累计产量</td>' +
								'            <td><div class="ban">'+my_rep_un(3,'pm2021_1')+'</div><div class="cheng">'+my_rep_un(3,'pm2021_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'pm2122_1')+'</div><div class="cheng">'+my_rep_un(3,'pm2122_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'pm2223_1')+'</div><div class="cheng">'+my_rep_un(3,'pm2223_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'pm2300_1')+'</div><div class="cheng">'+my_rep_un(3,'pm2300_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'am001_1')+'</div><div class="cheng">'+my_rep_un(3,'am001_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'am12_1')+'</div><div class="cheng">'+my_rep_un(3,'am12_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'am23_1')+'</div><div class="cheng">'+my_rep_un(3,'am23_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'am34_1')+'</div><div class="cheng">'+my_rep_un(3,'am34_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'am45_1')+'</div><div class="cheng">'+my_rep_un(3,'am45_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'am56_1')+'</div><div class="cheng">'+my_rep_un(3,'am56_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'am67_1')+'</div><div class="cheng">'+my_rep_un(3,'am67_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(3,'am78_1')+'</div><div class="cheng">'+my_rep_un(3,'am78_2')+'</div></td>' +
								'        </tr>'+
								'        <tr>'+
								'            <td>制程不良</td>' +
								'            <td><div class="ban">'+my_rep_un(4,'pm2021_1')+'</div><div class="cheng">'+my_rep_un(4,'pm2021_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'pm2122_1')+'</div><div class="cheng">'+my_rep_un(4,'pm2122_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'pm2223_1')+'</div><div class="cheng">'+my_rep_un(4,'pm2223_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'pm2300_1')+'</div><div class="cheng">'+my_rep_un(4,'pm2300_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'am001_1')+'</div><div class="cheng">'+my_rep_un(4,'am001_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'am12_1')+'</div><div class="cheng">'+my_rep_un(4,'am12_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'am23_1')+'</div><div class="cheng">'+my_rep_un(4,'am23_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'am34_1')+'</div><div class="cheng">'+my_rep_un(4,'am34_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'am45_1')+'</div><div class="cheng">'+my_rep_un(4,'am45_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'am56_1')+'</div><div class="cheng">'+my_rep_un(4,'am56_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'am67_1')+'</div><div class="cheng">'+my_rep_un(4,'am67_2')+'</div></td>' +
								'            <td><div class="ban">'+my_rep_un(4,'am78_1')+'</div><div class="cheng">'+my_rep_un(4,'am78_2')+'</div></td>' +
								'        </tr>'+
								'        <tr style="background-color:#ff0000">'+
								'            <td colspan="13" height="50px" valign="top">异常说明：'+my_rep_un(0,'nightException')+'</td>'+
								'        </tr>'+
								'    </table ></body> </html> '
		                        result.update(content);
	                  	},
	                 	failure : function(response, opts) {
							obj = Ext.decode(response.responseText);
							Ext.Msg.alert("系统提示", obj.returnMsg);
	                  	}
	         			}); 
	         
	         
	   			 	},
					  interval : 60000
					};
			        smt_cn_runner.start(reList);
	             }
	           },
	           
	           
	           'window[id=8a82809153a173410153a74816b20001_win]':{
					beforehide:function(e,Opts){
						smt_cn_runner.stopAll();
						//alert('here contr2');
					}
			    }
	  });
	},
	views : ['core.lineproduce_query.view.Main',
		'core.lineproduce_query.view.SearchView',
		'core.lineproduce_query.view.ResultView'],
		
	stores : ['core.lineproduce_query.store.Store'],
	
	models : ['core.lineproduce_query.model.Model']
});