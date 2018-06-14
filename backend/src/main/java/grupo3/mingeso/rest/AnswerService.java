package grupo3.mingeso.rest;

import grupo3.mingeso.entities.Exercise;
import grupo3.mingeso.others.Factory;
import grupo3.mingeso.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/answer")
public class AnswerService {

    @Autowired
    ExerciseRepository exerciseRepository;

    //obtain and execute code having the exercise
    /*Parameters:
    Enters as JSON:
        - language
        - code
        - exerciseID
        - date
        - solving time
        - userID
     Calculated in backend or obtained from database (These should be shown by frontend):
        - score
        - user output
        - exercise input
        - exercise output
    * */
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String[] obtainCode(@RequestBody Factory factory){
        Exercise exercise = exerciseRepository.findById(factory.getExercise_id()).get();
        factory.setInput(exercise.getExerciseInput());
        factory.setOutput(exercise.getExerciseOutput());
        //Obtener el id del usuario, tiempo en resolver el ejercicio y la fecha en que se solucionó eso para guardarlo en userExercise.
        return factory.executeFactory();

    }
}
