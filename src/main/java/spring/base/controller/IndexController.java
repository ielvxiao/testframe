package spring.base.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import spring.base.domain.Author;
import spring.base.domain.Msg;
import spring.base.security.SecurityUser;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2016/12/27.
 */
@Controller
public class IndexController {
  @Resource
  private Author author;

  @RequestMapping("/")
    public String index(Model model) {
      Msg msg = new Msg("测试标题","测试内容","额外信息");
      model.addAttribute("msg",msg);
    System.out.println(author.getName()+"================================");
      return "/index";
  }
  @RequestMapping("/index")
  public String a(){

    return "/index";
  }
}
