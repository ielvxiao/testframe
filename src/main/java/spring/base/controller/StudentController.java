package spring.base.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import spring.base.domain.StudentEntity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2016/12/26.
 */
@Controller
public class StudentController {
     @RequestMapping("/student")
    public String index(Model model) {
         StudentEntity single = new StudentEntity("single", 11);
         List<StudentEntity> people = new ArrayList<StudentEntity>();
         StudentEntity s1 = new StudentEntity("xx",22);
         StudentEntity s2 = new StudentEntity("yy",33);
         StudentEntity s3 = new StudentEntity("zz",44);
         people.add(s1);
         people.add(s2);
         people.add(s3);
         model.addAttribute("singlestudent", single);
         model.addAttribute("students", people);
         return "/student";
     }
}
