package com.desktop.dao;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Component;

import com.desktop.utils.StringUtil;
@Component("pcDaoTemplate")
public class PcDaoTemplateImpl implements PcDaoTemplate{
	private HibernateTemplate hibernateTemplate;
	private SessionFactory sessionFactory;
	private static Logger logger = Logger.getLogger(HibernateTemplate.class);
	public Object findById(Class<?> clazz,String id) {

		return (Object) hibernateTemplate.get(clazz.getName(), id);
	}
	public List<?> findAll(Class<?> clazz) {
		List<?> list=null;
				list=hibernateTemplate.find("from "+clazz.getName());
		return list;
	}
	//修改count
	public Integer getCount(String hql) {
		Integer c = 0;
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		Object count = query.uniqueResult();
		if(null != count && StringUtil.isInteger(count.toString())) {
			c = Integer.parseInt(count.toString());
		}
		return c;
//		return hibernateTemplate.find("from " + clazz.getName() +" where 1=1 "+whereSql).size();
	}
	public List<?> findByPage(final Class<?> clazz,final String whereSql,final int from,final int size) {
		
		return (List<?>) getHibernateTemplate().execute(new HibernateCallback() {

			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				
				return session.createQuery("from " + clazz.getName()+" where 1=1 "+whereSql)
						.setFirstResult(from).setMaxResults(size).list();
			}
		});
	}
	
	public void delete(Object Object) {
		hibernateTemplate.delete(Object);
		
	}
	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}
	@Override
	public Object getEntityByHql(String hql) {
		// TODO Auto-generated method stub
		List<?> datas=hibernateTemplate.find(hql);
		if(datas!=null && datas.size()>0){
			if(datas.size()==1){
				return datas.get(0);
			}else{
				logger.error("获取数据大于一条");
				return null;
			}
		}else{
			return null;
		}
	}
	@Override
	public Long executeSql(String sql) {
		Long c = 0L;
		Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		Object count = query.executeUpdate();
		if(null != count && StringUtil.isInteger(count.toString())) {
			c = Long.parseLong(count.toString());
		}
		return c;
	}

	@Override
	public Object save(Object entity) {
		// TODO Auto-generated method stub
		hibernateTemplate.save(entity);
		return entity;
	}
	@Override
	public Object update(Object entity) {
		hibernateTemplate.saveOrUpdate(entity);
		return entity;
	}
	@Override
	public List<?> queryByHql(String hql) {
		// TODO Auto-generated method stub
		System.out.println(hql);
		return hibernateTemplate.find(hql);
	}
	@Override
	public List<?> queryBySql(String sql) {
		// TODO Auto-generated method stub
		Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		List<?> list = query.list();
		return list;
	}
	@Override
	public List<?> queryBySql(String sql, Class<?> c) {
		// TODO Auto-generated method stub
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.addEntity(c);
		List<?> list = query.list();
		return list;
	}
	@Resource(name="hibernateTemplate")
	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}
	@Resource(name="sf")
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	@Override
	public List<?> queryByHql(String hql, Integer start, Integer limit) {
		// TODO Auto-generated method stub
		Query query=sessionFactory.getCurrentSession().createQuery(hql);
		if(limit>0){
			query.setFirstResult(start);
			query.setMaxResults(limit);
		}
		return query.list();
	}
	@Override
	public Long executeHql(String hql) {
		// TODO Auto-generated method stub
		return new Long(hibernateTemplate.bulkUpdate(hql));
	}
	
	
}
