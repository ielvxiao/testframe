package spring.base.custom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import spring.base.dao.SysUserRepository;
import spring.base.domain.SysUser;
import spring.base.security.SecurityUser;

/**
 * Created by Administrator on 2016/12/28.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    SysUserRepository sysUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SysUser user = sysUserRepository.findByUsername(username);
        return new SecurityUser(user);
    }
}
