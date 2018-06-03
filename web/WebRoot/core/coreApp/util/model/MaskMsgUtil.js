Ext.define("core.util.model.MaskMsgUtil",{
	msg:function(win){
		var mask=new Ext.LoadMask(win,{
			msg:'正在查询中,请稍后!',
			removeMask:true//完成后移除
		});
		return mask;
		
	}
});
