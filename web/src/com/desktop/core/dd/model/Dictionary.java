package com.desktop.core.dd.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.Proxy;

import com.desktop.annotation.FieldInfo;
import com.desktop.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
@Entity //实体
@GenericGenerator(name="systemUUID",strategy="uuid")
@Proxy(lazy = true)
public class Dictionary extends BaseEntity {
	@FieldInfo(name="主键",type="ID")
	private String ddId;
	@FieldInfo(name="字典名称")
	private String ddName;
	@FieldInfo(name="字典编码")
	@JsonProperty
	private String ddCode;
	@FieldInfo(name="字典类型")
	@JsonProperty
	private String ddType;
	@FieldInfo(name="启用")
	private String enabled;
	/**字典项*/
	private Set<DictionaryItem> children=new HashSet<DictionaryItem>();	
	public String getEnabled() {
		return enabled;
	}
	@Id
	@GeneratedValue(generator="systemUUID")
	@Column(length=50)
	public String getDdId() {
		return ddId;
	}
	public void setDdId(String ddId) {
		this.ddId = ddId;
	}
	public String getDdName() {
		return ddName;
	}
	public void setDdName(String ddName) {
		this.ddName = ddName;
	}
	public String getDdCode() {
		return ddCode;
	}
	public void setDdCode(String ddCode) {
		this.ddCode = ddCode;
	}
	public String getDdType() {
		return ddType;
	}
	public void setDdType(String ddType) {
		this.ddType = ddType;
	}
	public void setEnabled(String enabled) {
		this.enabled = enabled;
	}
	@JsonIgnore
	@OneToMany(mappedBy="dictionary",cascade={CascadeType.REMOVE},fetch=FetchType.LAZY)
    @LazyCollection(LazyCollectionOption.TRUE)
	public Set<DictionaryItem> getChildren() {
		return children;
	}
	public void setChildren(Set<DictionaryItem> children) {
		this.children = children;
	}
	
}
