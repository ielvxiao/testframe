package spring.base.controller.advice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;


/**
 * @ControllerAdvice 作用
 */
// 1. 该注解使用了@Component注解,所以会被自动注册为 spring bean
// 2. 相当于一个拦截器, 在 @Controller 的 @RequestMapping 方法执行之前执行。相当于全局 @Controller 的拦截器
// 2.1 @ControllerAdvice 中使用 @ExceptionHandler、@InitBinder、@ModelAttribute 的三个方法，在所有的 @Controller 中的 @RequestMapping 注解的方法执行之前执行
// 2.2 被 @ControllerAdvice 注解的类，使用 @ExceptionHandler、@InitBinder、@ModelAttribute 三个注解来添加操作。

// @ControllerAdvice(basePackages = {"com.concretepage.controller"} ) //指定拦截应用到哪些包的 controller 中
// @ControllerAdvice(annotations=RestController.class)仅处理 @RestController 标记的的 controller
@ControllerAdvice
public class CurrentUserControllerAdvice {

    private static final Logger logger = LoggerFactory.getLogger(CurrentUserControllerAdvice.class);

    /**
     * 应用到所有 @RequestMapping 注解方法，在其执行之前执行下面的三个方法
     */

    /**
     * 执行每个 url 时，都检查是否经过验证,把返回值放入 Model
     *
     * @param authentication 会被
     * @return 返回值 和 CustomUserDetailsService 的返回值org.springframework.security.core.userdetails.User  为 UserDetails类型
     * ---
     * @ModelAttribute 会把键值对，放入到全局 ，所有注解 @RequstMapping 的方法，均可以获得到。
     * 本例中，把获得的用户信息，放入到全局 Model
     * ---
     * public void getSomething(@ModelAttribute("currentUser") UserDetails user) {
     * user.get...
     * //此处可以获得   @ModelAttribute 放入 Model 中的信息 UserDetails
     * }
     * ---
     */

    // @ModelAttribute 在方法上注解 :
    // 1. 则会在 spring context 中查找属性名为 authentication 的对象，并把该对象赋值给该方法的参数。本例中 authentication 参数会被自动赋值为 SecurityContextHolder.getContext().getAuthentication()
    // 2. 该方法的返回值，以 @ModelAttribute 的 value 值为名字，放入 Model，可以在页面段获取。
    // 在本项目中 : 可以通过 currentUser.username 获得用户名 (username 为 UserDetails 属性)
    @ModelAttribute(value = "currentUser") // currentUser 在页面端用到
    public UserDetails getCurrentUser(Authentication authentication) {

        //如果 loadUserByUsername 没有找到用户，会返回 返回用户名 anonymousUser 的用户默认用户
        // 下面 logger 的结果为测试信息
        // is isAuthenticated() ? true
        // Authentication name : anonymousUser
//        if (authentication != null) {
//            logger.info("is isAuthenticated() ? " + SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
//            logger.info("Authentication name : " + SecurityContextHolder.getContext().getAuthentication().getName());
//            logger.info("getCredentials name : " + SecurityContextHolder.getContext().getAuthentication().getCredentials());
//            logger.info("getDetails name : " + SecurityContextHolder.getContext().getAuthentication().getDetails());
//            for (GrantedAuthority authority : SecurityContextHolder.getContext().getAuthentication().getAuthorities())
//                logger.info("authority(role) : " + authority.getAuthority());
//
//            //测试验证对象类型
//            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//            if (principal instanceof UserDetails) {
//                logger.info("loadUserByUsername 的返回值类型是 UserDetails : " + ((UserDetails) principal).getUsername());
//            }
//            if (principal instanceof Principal) {
//                logger.info("loadUserByUsername 的返回值类型是 Principal : " + ((Principal) principal).getName());
//            }
//        } else {
//            logger.info("authentication is null.");
//        }

        return (authentication == null) ? null : (UserDetails) authentication.getPrincipal();
    }

    /***
     * @param binder
     * @InitBinder 用来配置全局 Controller ，设置 WebDataBinder，WebDataBinder 用来自动绑定前台请求参数到 Model 中。
     */
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        //忽略 request 中的参数 dis ，更多关于 WebDataBinder ，可参考文档。
        //binder.setDisallowedFields("dis");
    }

    // 应用到所有 @RequestMapping 注解的方法，在该方法抛出 NoSuchElementException 异常时执行此方法

    /**
     * @param e
     * @return
     * @ExceptionHandler 用来设置 Controller 全局异常处理
     */
    @ExceptionHandler(NoSuchElementException.class)   // 捕获特定异常，也可以通用为 Exception.class
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNoSuchElementException(NoSuchElementException e) {
        return e.getMessage();
        // return "viewName"; // 返回一个逻辑视图名
    }

}

