package com.data.mes.model;

import java.util.List;

public class Param {
	private String sn;
	private String mo;
	private String pn;
	private String beginDate;
	private String endDate;
	private List data;
	private boolean success;
	private String returnMes;
	private String workcenter;
	private String line;
	private String num;
	
	
	public String getBeginDate() {
		return beginDate;
	}
	public List getData() {
		return data;
	}
	public String getEndDate() {
		return endDate;
	}
	public String getLine() {
		return line;
	}
	public String getMo() {
		return mo;
	}
	public String getNum() {
		return num;
	}
	public String getPn() {
		return pn;
	}
	public String getReturnMes() {
		return returnMes;
	}
	public String getSn() {
		return sn;
	}
	public String getWorkcenter() {
		return workcenter;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setBeginDate(String beginDate) {
		this.beginDate = beginDate;
	}
	public void setData(List data) {
		this.data = data;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public void setLine(String line) {
		this.line = line;
	}
	public void setMo(String mo) {
		this.mo = mo;
	}
	public void setNum(String num) {
		this.num = num;
	}
	public void setPn(String pn) {
		this.pn = pn;
	}
	public void setReturnMes(String returnMes) {
		this.returnMes = returnMes;
	}
	public void setSn(String sn) {
		this.sn = sn;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public void setWorkcenter(String workcenter) {
		this.workcenter = workcenter;
	}
}
