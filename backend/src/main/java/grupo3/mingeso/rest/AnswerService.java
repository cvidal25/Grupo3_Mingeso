package grupo3.mingeso.rest;

import grupo3.mingeso.entities.Exercise;
import grupo3.mingeso.entities.User;
import grupo3.mingeso.entities.UserExercise;
import grupo3.mingeso.others.CodeAnalysis;
import grupo3.mingeso.others.Factory;
import grupo3.mingeso.repository.ExerciseRepository;
import grupo3.mingeso.repository.UserExerciseRepository;
import grupo3.mingeso.repository.UserRepository;
import org.omg.CosNaming.NamingContextExtPackage.StringNameHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.support.SimpleTriggerContext;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/answer")
public class AnswerService {

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserExerciseRepository userExerciseRepository;

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
    public Map<String, String> obtainCode(@RequestBody Factory factory){
        //Exercise exercise = exerciseRepository.findById(factory.getExercise_id()).get();
        //factory.setInput(exercise.getExerciseInput());
        //factory.setOutput(exercise.getExerciseOutput());
        CodeAnalysis code = new CodeAnalysis();

        HashMap<String,String> list =code.Analysis(factory.getCode(),factory.getLanguage());
        //list.put("Lo de la Shalu",factory.executeFactory().toString());

        //Obtener el id del usuario, tiempo en resolver el ejercicio y la fecha en que se solucionó eso para guardarlo en userExercise.
        return list;
    public String[] executeCode(@RequestBody Factory factory){
        Exercise exercise = exerciseRepository.findById(factory.getExercise_id()).get();

        factory.setInput(exercise.getExerciseInput());
        factory.setOutput(exercise.getExerciseOutput());

        User user = userRepository.findById(factory.getUser_id()).get();

        UserExercise userExercise = new UserExercise();
        userExercise.setUserDateResolution(factory.getResolving_date());
        userExercise.setUserSolvingTime(factory.getResolving_time());
        userExercise.setExercise(exercise);
        userExercise.setUser(user);

        String[] arrayJson = factory.executeFactory();
        int score = Integer.parseInt(arrayJson[arrayJson.length-1]);
        userExercise.setUserScore(score);
        userExercise.setUserOutput("aloh/@oahc/@iab"); //estático
        userExerciseRepository.save(userExercise);

        return arrayJson;
    }
}

//Obtener el id del usuario, tiempo en resolver el ejercicio y la fecha en que se solucionó eso para guardarlo en userExercise.
/*IDEA:
    - Del ejercicio obtener input y output y asignarle al factory
        - Obtener ejercicio
        - Obtener user
        - Obtener tiempo
        - Obtener fecha

- Obtener output user (backend) --> Complejo
        - Obtener puntaje calculado (backend)
* */