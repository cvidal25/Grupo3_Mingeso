package grupo3.mingeso.rest;

import grupo3.mingeso.others.Factory;
import grupo3.mingeso.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/trial")
public class TrialService {

    //obtain and execute code with just an input
    /*Parameters:
        - language
        - code
        - input
    * */
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String[] obtainCode(@RequestBody Factory factory){
        return factory.executeFactory();
    }

}
