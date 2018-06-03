Ext.define("core.smt_xbc_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.smt_xbc_kanban.model.Model',
	autoLoad:true,
	proxy:{
		url:'/web/kanban/smt_line_lines!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
	}
	/*
	data: [
        { src:'core/css/image/smt_line.png', caption:'1' },  
        { src:'core/css/image/smt_line.png', caption:'2' },
        { src:'core/css/image/smt_line.png', caption:'3' },
        { src:'core/css/image/smt_line.png', caption:'4' },
        { src:'core/css/image/smt_line.png', caption:'5' },
        { src:'core/css/image/smt_line.png', caption:'6' },
        { src:'core/css/image/smt_line.png', caption:'7' },
        { src:'core/css/image/smt_line.png', caption:'8' },
        { src:'core/css/image/smt_line.png', caption:'9' },
        { src:'core/css/image/smt_line.png', caption:'10' },
        { src:'core/css/image/smt_line.png', caption:'11' },
        { src:'core/css/image/smt_line.png', caption:'12' },  
        { src:'core/css/image/smt_line.png', caption:'13' },
        { src:'core/css/image/smt_line.png', caption:'14' },
        { src:'core/css/image/smt_line.png', caption:'15' },
        { src:'core/css/image/smt_line.png', caption:'16' },
        { src:'core/css/image/smt_line.png', caption:'17' },
        { src:'core/css/image/smt_line.png', caption:'18' },
        { src:'core/css/image/smt_line.png', caption:'19' },
        { src:'core/css/image/smt_line.png', caption:'20' },
        { src:'core/css/image/smt_line.png', caption:'21' },
        { src:'core/css/image/smt_line.png', caption:'22' },
        { src:'core/css/image/smt_line.png', caption:'23' },
        { src:'core/css/image/smt_line.png', caption:'24' },
        { src:'core/css/image/smt_line.png', caption:'25' },
        { src:'core/css/image/smt_line.png', caption:'26' },
        { src:'core/css/image/smt_line.png', caption:'27' },
        { src:'core/css/image/smt_line.png', caption:'28' },
        { src:'core/css/image/smt_line.png', caption:'29' },
        { src:'core/css/image/smt_line.png', caption:'30' },
        { src:'core/css/image/smt_line.png', caption:'31' }
    ]
    */
	
});