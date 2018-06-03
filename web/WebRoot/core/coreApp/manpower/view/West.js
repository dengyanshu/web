Ext.define("core.manpower.view.West",{
	extend:'Ext.panel.Panel',
	width:600,
	alias:'widget.m-northpanel-west',
	region:'west',
	html:' <table height="175"  width="598" class="manpower"  border="2" cellpadding="0" cellspacing="0">' +
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
	'</table>'

	
});