import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by Administrator on 2016/11/13.
 */
@Controller
@EnableAutoConfiguration
public class WebApplication {
    @RequestMapping("/")
    @ResponseBody
    String home(){
        return "hello world";
    }

    public static void main(String[] args) {
        SpringApplication.run(WebApplication.class,args);
    }
}
