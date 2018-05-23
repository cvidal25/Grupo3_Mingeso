package grupo3.mingeso.rest;

import grupo3.mingeso.others.Factory;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/answer")
public class AnswerService {

    //obtain and execute code
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String obtainCode(@RequestBody Factory factory){
        return factory.executeFactory();
    }
}
