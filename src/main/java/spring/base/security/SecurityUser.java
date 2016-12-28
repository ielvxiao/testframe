package spring.base.security;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import spring.base.domain.SysUser;
/**
 * 重新包装 org.springframework.security.core.userdetails.User 类型
 * 作用：
 * 1. 继承 org.springframework.security.core.userdetails.User ，可以作为 loadUserByUsername 的返回值
 * 2. 重新包装后的 domain, 可包含三种属性:
 * 2.1  org.springframework.security.core.userdetails.User 中的属性
 * 2.2  UserEntity  中的属性
 * 2.3  常用的自定义属性
 * 三种属性，传递到 model 中，方便逻辑处理
 */
public class SecurityUser extends User {
    private SysUser user;
    private String[] roles;
    public SecurityUser(SysUser sysUser) {
        super(sysUser.getUsername(),sysUser.getPassword(), AuthorityUtils.createAuthorityList(sysUser.getStringRoles()));
        this.user = sysUser;
        roles = sysUser.getStringRoles();
    }
    /**
     * 直接获取自定义的 UserEntity
     *
     * @return
     */
    public SysUser getUser() {
        return user;
    }
    /**
     * 如果 CurrentUser 在 model 中名字为 currentUser
     * 该方法的返回值获取 : currentUser.id
     *
     * @return
     */
    public Long getId() {
        return user.getId();
    }


    /**
     * 如果 CurrentUser 在 model 中名字为 currentUser
     * 该方法的返回值获取 : currentUser.role
     * 可以显式定义 roles 变量后赋值
     *
     * @return
     */
    public String[] getRoles() {
        // return user.getStringRoles();
        return roles;
    }

}
