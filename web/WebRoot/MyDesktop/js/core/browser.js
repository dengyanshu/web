function browserinfo() {
	var Browser_Name = navigator.appName;							//浏览器名称
	var Browser_Version = parseFloat(navigator.appVersion);	//浏览器版本号
	var Browser_Agent = navigator.userAgent;							//浏览器用户代理
	var Actual_Version, Actual_Name;										//当前版本和名称
	var is_IE = (Browser_Name == "Microsoft Internet Explorer");	//判读是否为ie浏览器
	var is_NN = (Browser_Name == "Netscape");								//判断是否为netscape浏览器
	var is_op = (Browser_Name == "Opera");										//判断是否为Opera浏览器
	if (is_NN) {
		//大于5.0继续执行，小于5.0返回
		//如果是Opera浏览器			
		//indexOf()返回 String 对象内第一次出现子字符串的字符位置 没有找到返回-1
		if (Browser_Version >= 5.0) {
			if (Browser_Agent.indexOf("Netscape") != -1) {		
				var Split_Sign = Browser_Agent.lastIndexOf("/");
				var Version = Browser_Agent.lastIndexOf(" ");
				var Bname = Browser_Agent.substring(0, Split_Sign);
				var Split_sign2 = Bname.lastIndexOf(" ");
				Actual_Version = Browser_Agent.substring(Split_Sign + 1,
						Browser_Agent.length);
				Actual_Name = Bname.substring(Split_sign2 + 1, Bname.length);

			}
			if (Browser_Agent.indexOf("Firefox") != -1) {
				var Split_Sign = Browser_Agent.lastIndexOf("/");
				var Version = Browser_Agent.lastIndexOf(" ");
				Actual_Version = Browser_Agent.substring(Split_Sign + 1,
						Browser_Agent.length);
				Actual_Name = Browser_Agent.substring(Version + 1, Split_Sign);

			}
			if (Browser_Agent.indexOf("Safari") != -1) {
				if (Browser_Agent.indexOf("Chrome") != -1) {
					var Split_Sign = Browser_Agent.lastIndexOf(" ");
					var Version = Browser_Agent.substring(0, Split_Sign);;
					var Split_Sign2 = Version.lastIndexOf("/");
					var Bname = Version.lastIndexOf(" ");
					Actual_Version = Version.substring(Split_Sign2 + 1,
							Version.length);
					Actual_Name = Version.substring(Bname + 1, Split_Sign2);
				} else {
					var Split_Sign = Browser_Agent.lastIndexOf("/");
					var Version = Browser_Agent.substring(0, Split_Sign);;
					var Split_Sign2 = Version.lastIndexOf("/");
					var Bname = Browser_Agent.lastIndexOf(" ");
					Actual_Version = Browser_Agent.substring(Split_Sign2 + 1,
							Bname);
					Actual_Name = Browser_Agent
							.substring(Bname + 1, Split_Sign);

				}
			}

		} else {
			Actual_Version = Browser_Version;
			Actual_Name = Browser_Name;
		}
	//如果是IE浏览器	
	} else if (is_IE) {
		var Version_Start = Browser_Agent.indexOf("MSIE");
		var Version_End = Browser_Agent.indexOf(";", Version_Start);
		Actual_Version = Browser_Agent
				.substring(Version_Start + 5, Version_End)
		Actual_Name = Browser_Name;

		if (Browser_Agent.indexOf("Maxthon") != -1
				|| Browser_Agent.indexOf("MAXTHON") != -1) {
			var mv = Browser_Agent.lastIndexOf(" ");
			var mv1 = Browser_Agent.substring(mv, Browser_Agent.length - 1);
			mv1 = "遨游版本:" + mv1;
			Actual_Name += "(Maxthon)";
			Actual_Version += mv1;
		}
	//如果是Opera浏览器	
	} else if (Browser_Agent.indexOf("Opera") != -1) {
		Actual_Name = "Opera";
		var tempstart = Browser_Agent.indexOf("Opera");
		var tempend = Browser_Agent.length;
		Actual_Version = Browser_Version;
	} else {
		Actual_Name = "Unknown Navigator"
		Actual_Version = "Unknown Version"
	}
	/*------------------------------------------------------------------------------
	 --你能给navigator创建新的属性(性能)(Acutal_Name and Actual_Version) --
	 --Userage:                                                                     --
	 --1,Call This Function.                                                        --
	 --2,use the property Like This:navigator.Actual_Name/navigator.Actual_Version;--
	 ------------------------------------------------------------------------------*/
	navigator.Actual_Name = Actual_Name;
	navigator.Actual_Version = Actual_Version;

	/*---------------------------------------------------------------------------
	 --或者创建一个类.                                                     --
	 --Userage:                                                                  --
	 --1,Create a instance of this object like this:var browser=new browserinfo;--
	 --2,user this instance:browser.Version/browser.Name;                        --
	 ---------------------------------------------------------------------------*/
	this.Name = Actual_Name;
	this.Version = Actual_Version;
}

	browserinfo();
	document.write("你使用的浏览器是:" + navigator.userAgent);
	document.write("<br>");
	document.write("你使用的浏览器是:" + navigator.Actual_Name + ",版本号:"+ navigator.Actual_Version);