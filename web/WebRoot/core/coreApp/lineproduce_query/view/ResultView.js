Ext.define("core.lineproduce_query.view.ResultView",{
	extend:'Ext.panel.Panel',
	region:'center',
	width:1000,
	padding:'10 5 3 10',
	alias : 'widget.lineproduce_result',
	frame : true,
	margin:'10 5 3 10',
    

	
    html:'    <table border="2" cellpadding="3" >'+
'       <caption style="font-size: 40px"> SMT制造中心看板 </caption>'+
'        <tr> '+
'           <td rowspan="4">产线</td> <td rowspan="4" colspan="2">(当前线体)</td> <td rowspan="5"> 白班责任人 </td> <td > 组长 </td><td >  </td>'+
'           <td rowspan="5"> 夜班责任人 </td> <td > 组长 </td><td > </td><td > 白班达成率 </td> <td> </td><td > 5S稽核数 </td> <td> </td>'+
'        </tr>'+
'        <tr> '+
'               <td > 操作员 </td><td > </td><td > 操作员 </td><td >  </td>'+
'              <td > 夜班达成率 </td> <td> </td><td > 5S改善数 </td> <td> </td>'+
'        </tr>'+
'        <tr> '+
'               <td > 工程工艺</td><td >  </td><td > 工程工艺</td><td >  </td>'+
'              <td > 白班本周达成率 </td> <td> </td><td > ESD稽核数 </td> <td> </td>'+
'        </tr>'+
'        <tr> '+
'               <td > 工程设备 </td><td >  </td><td > 工程设备</td><td >  </td>'+
'              <td > 夜班本周达成率 </td> <td> </td><td > ESD改善数 </td> <td> </td>'+
'        </tr>'+
'        <tr>   <td> 工单</td><td colspan="2"> </td>'+
'               <td > IPQC </td><td > </td><td > IPQC </td><td > </td>'+
'              <td > 白班累计产量 </td> <td> </td><td > 白班培训工时 </td> <td> </td>'+
'        </tr>'+
'        <tr> '+
'           <td >料号</td> <td  colspan="2"></td> <td > 实际人数</td> <td colspan="2">  </td><td > 标准人数 </td><td colspan="2"> </td>'+
'            <td > 夜班累计产量 </td> <td> </td><td > 夜班培训工时 </td> <td></td>'+
'        </tr>'+
'        <tr> '+
'           <td >产品机型</td> <td  colspan="2"></td> <td > 生产日期</td> <td colspan="2">  </td><td > 目标产量 </td><td colspan="2"> </td>'+
'            <td > 标准工时  </td> <td> </td><td > 锡膏型号</td> <td></td>'+
'        </tr>'+
'        <tr > '+
'           <td colspan="14" height="20px"></td>'+
'        </tr>'+
'        <tr>'+
'            <td>生产日期</td><td>8:00-9:00</td><td>9:00-10:00</td>'+
'            <td>10:00-11:00</td><td>11:00-12:00</td>'+
'           <td>12:00-13:00</td><td>13:00-14:00</td>'+
'            <td>14:00-15:00</td><td>15:00-16:00</td>'+
'            <td>16:00-17:00</td><td>17:00-18:00</td>'+
'           <td>18:00-19:00</td> <td>19:00-20:00</td>'+
'        </tr>'+
'        <tr>'+
'            <td>目标产量</td><td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'           <td></td> <td></td>'+
'        </tr>'+
'        <tr>'+
'            <td>实际产量</td><td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'           <td></td> <td></td>'+
'        </tr>'+
'        <tr>'+
'            <td>累计产量</td><td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'           <td></td> <td></td>'+
'        </tr>'+
'        <tr>'+
'            <td>制程不良率</td><td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'           <td></td> <td></td>'+
'        </tr>'+
'        <tr>'+
'            <td colspan="14" height="70px" valign="top">异常说明：</td>'+
'        </tr>'+
'         <tr>'+
'            <td>生产日期</td><td>8:00-9:00</td><td>9:00-10:00</td>'+
'            <td>10:00-11:00</td><td>11:00-12:00</td>'+
'           <td>12:00-13:00</td><td>13:00-14:00</td>'+
'            <td>14:00-15:00</td><td>15:00-16:00</td>'+
'            <td>16:00-17:00</td><td>17:00-18:00</td>'+
'           <td>18:00-19:00</td> <td>19:00-20:00</td>'+
'        </tr>'+
'        <tr>'+
'            <td>目标产量</td><td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'           <td></td> <td></td>'+
'        </tr>'+
'        <tr>'+
'            <td>实际产量</td><td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'           <td></td> <td></td>'+
'        </tr>'+
'        <tr>'+
'            <td>累计产量</td><td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'           <td></td> <td></td>'+
'        </tr>'+
'        <tr>'+
'            <td>制程不良率</td><td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'            <td></td><td></td>'+
'           <td></td> <td></td>'+
'        </tr>'+
'        <tr>'+
'            <td colspan="14" height="70px" valign="top">异常说明：</td>'+
'        </tr>'+
'    </table >'
	
});