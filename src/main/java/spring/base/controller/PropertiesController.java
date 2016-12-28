package spring.base.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.base.domain.TestSetting;

/**
 * Created by Administrator on 2016/12/26.
 */
@RestController
public class PropertiesController {
    @Value("${author.name}")
    private String authorname;
    @Value("${author.age}")
    private int authorage;

    @RequestMapping("/author")
    String author() {
        return "auhor is" + authorname +"age is" +authorage;
    }
    @Autowired
    private TestSetting testSetting;

    @RequestMapping("/book")
    public String book(){
        return "book.author"+testSetting.getAuthor() + "book.name" + testSetting.getName();
    }

    @RequestMapping("/editbook")
    public String book(String name){
        testSetting.setName(name);
        return "book.author"+testSetting.getAuthor() + "\nbook.name" + testSetting.getName();
    }
}
