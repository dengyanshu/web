package com.desktop.security;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.security.userdetails.UserDetails;
import org.springframework.security.userdetails.UserDetailsService;
import org.springframework.security.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.desktop.rbac.model.Department;
import com.desktop.rbac.model.EndUser;
import com.desktop.rbac.model.Role;
/**
 * 登录验证实现类
 * @author 陈永化
 *
 */
@Component("securityManager")
public class SecurityManagerImpl extends HibernateDaoSupport implements UserDetailsService,SecurityManager {
	@Resource(name="sf")
	public void setSuperSessionFactory(SessionFactory sessionFactory) {
		super.setSessionFactory(sessionFactory);
	}
	@Override
	@SuppressWarnings("unchecked")
	public UserDetails loadUserByUsername(String userCode)throws UsernameNotFoundException, DataAccessException {	
		//访问数据库以usercode查询该用户信息
	    Transaction tx = null;
	    Session session=getHibernateTemplate().getSessionFactory().openSession();
	    tx = session.beginTransaction();
	    Query query = session.createQuery("FROM EndUser WHERE userCode = ?");
	    query.setString(0, userCode);
		List<EndUser> users = query.list();
		
	    if(users.isEmpty()) {
            throw new UsernameNotFoundException("user: " + userCode + " not found(or wrong password)!");   
        }
	    EndUser user = users.iterator().next();
	    EndUser currentUser=buildCurrentUser(user); //构建一个通用的user
	    tx.commit();	
		return currentUser;
	}
	private EndUser buildCurrentUser(EndUser user){
		EndUser currentUser=new EndUser();
		Department currentDept=new Department();
		//封装用户信息
		currentUser.setUserId(user.getUserId());
		currentUser.setUserCode(user.getUserCode());
		currentUser.setUsername(user.getUsername());
		currentUser.setBirthday(user.getBirthday());
		currentUser.setSex(user.getSex());
		currentUser.setPassword(user.getPassword());
		Department dept = user.getDepartment();		
		//为登录用户添加所属部门
		if(null != dept) {
			currentDept.setDeptCode(dept.getDeptCode());
			currentDept.setDeptId(dept.getDeptId());
			currentDept.setDeptName(dept.getDeptName());
			currentUser.setDeptCode(dept.getDeptCode());
			currentUser.setDeptId(dept.getDeptId());
			currentUser.setDeptName(dept.getDeptName());
			currentUser.setDepartment(currentDept);
		}
		//为登录用户添加所属角色
		Set<Role> roles=new HashSet<Role>();
		for(Role role:user.getRoles()){
			Role r=new Role();
			r.setRoleCode(role.getRoleCode());
			r.setRoleName(role.getRoleName());
			r.setRoleId(role.getRoleId());
			roles.add(r);
		}
		currentUser.setRoles(roles);
		return currentUser;
	}

}
