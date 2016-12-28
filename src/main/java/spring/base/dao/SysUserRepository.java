package spring.base.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import spring.base.domain.SysRole;
import spring.base.domain.SysUser;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/12/27.
 */
public interface SysUserRepository extends JpaRepository<SysUser, Long>{

//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//
//    public SysUser findByUsername(String username) {
//        SysRole role = new SysRole();
//        List<SysRole> list = new ArrayList<SysRole>();
//
//        SysUser user = new SysUser();
//        Map map = jdbcTemplate.queryForMap("SELECT * FROM sys_user u LEFT JOIN sys_user_roles ur ON u.id=ur.sys_user_id LEFT JOIN sys_role r ON r.id=ur.sys_role_id WHERE u.username= ?",username);
//        user.setId(Long.parseLong(map.get("id").toString()));
//        user.setUsername(map.get("username").toString());
//        user.setPassword(map.get("password").toString());
//        role.setId(Long.parseLong(map.get("sys_role_id").toString()));
//        role.setName(map.get("name").toString());
//        list.add(role);
//        user.setRoles(list);
//        return user;
//    }
    SysUser findByUsername(String username);
}
