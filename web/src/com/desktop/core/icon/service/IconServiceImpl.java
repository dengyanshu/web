package com.desktop.core.icon.service;

import java.io.File;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.desktop.action.BaseAction;
import com.desktop.constant.StringVeriable;
import com.desktop.core.icon.model.SysIcon;
import com.desktop.service.PcServiceTemplate;
import com.desktop.utils.FileUtil;
import com.desktop.utils.PropUtil;
import com.desktop.utils.StringUtil;
@Component("iconService")
public class IconServiceImpl implements IconService {
	private PcServiceTemplate pcServiceTemplate;
	@Override
	public void syncIconCss() {
		// TODO Auto-generated method stub
		String filePath=PropUtil.get("sys.icon.filepath");
		File iconFile=FileUtil.createFile(BaseAction.webrootAbsPath+filePath);
		StringBuffer cssStr=buildIconStr();
		FileUtil.writeFileStr(cssStr.toString(), iconFile);
	}
	/**
	 * 构建图标的样式文本
	 * @param icon
	 * @return
	 */
	private StringBuffer buildIconStr(){
		StringBuffer cssStr=new StringBuffer("");
		List<SysIcon> icons=(List<SysIcon>) pcServiceTemplate.queryByHql(" from SysIcon");
		for(SysIcon icon:icons){
			String iconCls=icon.getIconCls();
			String iconPath=icon.getIcon();
			String pixel=icon.getPixel();
			Integer width=16;
			Integer height=16;
			if(StringUtil.isNotEmpty(pixel)){
				String[] pixelArray=pixel.split("\\*");
				if(pixelArray.length>1){
					width=Integer.parseInt(pixelArray[0]);
					height=Integer.parseInt(pixelArray[1]);
				}
			}
			String iconStr="."+iconCls+"{width:"+width+";height:"+height+";background-image: url("+iconPath+")!important;}\n";
			cssStr.append(iconStr);
		}
		return cssStr;
		
	}
	@Resource(name="pcServiceTemplate")
	public void setPcServiceTemplate(PcServiceTemplate pcServiceTemplate) {
		this.pcServiceTemplate = pcServiceTemplate;
	}
	
	
}
