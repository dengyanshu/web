Ext.define("core.casetrace_query.view.ResultView",{
	extend:'Ext.grid.Panel',
	alias:'widget.casetrace_result',
	region:'center',
	id:'casetrace_result',
	store: 'core.casetrace_query.store.Store',
	columns: [
		{xtype:'rownumberer',text:'序号',width:50},
	    { text: '处理人',  dataIndex: 'disposeUser',width:100},
		{ text: '案件编号',  dataIndex: 'caseNumber',width:150},
		{ text: '案件名称',  dataIndex: 'caseName',width:150},
		{ text: '案件任务',  dataIndex: 'caseTask',width:150},
		{ text: '案件类型',  dataIndex: 'caseType',width:100},
		 { text: '申请时间',  dataIndex: 'applyTime',width:150,renderer:function(value){
		 	if(value=="1900-01-01 00:00:00.0"){
		 		return "";
		 	}else{
				return value.substring(0, 19);  
		 	}
		}},
		 { text: '需求时间',  dataIndex: 'demandTime',width:150,renderer:function(value){
		 	if(value=="1900-01-01 00:00:00.0"){
		 		return "";
		 	}else{
				return value.substring(0, 19);  
		 	}
		}},
		 { text: '预计完成时间',  dataIndex: 'predictAccomplishTime',width:150,renderer:function(value){
		 	if(value=="1900-01-01 00:00:00.0"){
		 		return "";
		 	}else{
				return value.substring(0, 19);  
		 	}
		}},
		 { text: '实际完成时间',  dataIndex: 'realityAccomplishTime',width:150,renderer:function(value){
		 	if(value=="1900-01-01 00:00:00.0"){
		 		return "";
		 	}else{
				return value.substring(0, 19);  
		 	}
		}},
			{ text: '状态',  dataIndex: 'status',width:150},
			{ text: '详细说明',  dataIndex: 'expatiation',width:150,renderer:function(value){
				return value.replace(/<br>/g,"##");
			}},
		    { text: '更新时间',  dataIndex: 'updateTime',width:150,renderer:function(value){return value.substring(0, 19);}},
			{ text: '申请人', dataIndex: 'applicant',width:150}
		],
		features: [{ftype:'grouping',frame:true,startCollapsed:false}],
		
/*		plugins:[{
            ptype: 'rowexpander',
            rowBodyTpl : new Ext.XTemplate(
                '<p><b>案件名称:</b> {caseName}</p>',
                '<p><b>案件任务:</b> {caseTask}</p><br>',
                //'<p><b>案件任务:</b> {change:this.formatChange}</p><br>',
                '<p><b>详细说明:</b> {expatiation}</p>',
            {
                formatChange: function(v){
                    var color = v >= 0 ? 'green' : 'red';
                    return '<span style="color: ' + color + ';">' + Ext.util.Format.usMoney(v) + '</span>';
                }
            })
        }],*/
		viewConfig:{
					forceFit:true,
					enableRowBody:true,
					getRowClass:function(record,rowIndex,p,store){
						var cls="";
						if(record.get('status')=="已驳回"){
							 cls="row-red .x-grid-cell";
						}else if(record.get('status')=="进行中"){
							 cls="row-orange .x-grid-cell";
						}else if(record.get('status')=="待验证" || record.get('status')=="验证OK"){
							 cls="row-green .x-grid-cell";
						}else if(record.get('status')=="外部异常" || record.get('status')=="内部异常"){
							 cls="row-qianchen .x-grid-cell";
						}
						return cls;
				}
		}
	
});