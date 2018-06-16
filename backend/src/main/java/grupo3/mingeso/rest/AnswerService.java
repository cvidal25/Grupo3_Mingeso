package grupo3.mingeso.rest;

import grupo3.mingeso.entities.Exercise;
import grupo3.mingeso.entities.User;
import grupo3.mingeso.entities.UserExercise;
import grupo3.mingeso.others.CodeAnalysis;
import grupo3.mingeso.others.Factory;
import grupo3.mingeso.repository.ExerciseRepository;
import grupo3.mingeso.repository.UserExerciseRepository;
import grupo3.mingeso.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static org.apache.commons.lang3.StringUtils.substringBefore;

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
    public Map<String, String> executeCode(@RequestBody Factory factory){
        CodeAnalysis code = new CodeAnalysis();
        HashMap<String,String> list =code.Analysis(factory.getCode(),factory.getLanguage());

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

        //output
        String outputs = "";
        for(int i = 0; i < arrayJson.length-1; i++){
            if(i != 0){
                outputs = outputs.concat(", ");
            }
            outputs = outputs.concat(separateOutput(arrayJson[i]));
        }
        System.out.println(outputs);
        userExercise.setUserOutput(outputs);

        userExerciseRepository.save(userExercise);

        int i;
        for(i = 0; i < arrayJson.length; i++){
            if(i == arrayJson.length-1)
                list.put("score",arrayJson[i]); //verificar si al front le sirve como string o int
            else
                list.put("codeExecution".concat(Integer.toString(i)),arrayJson[i]);
        }

        return list;
    }

    public String separateOutput(String jsonOutput){
        String output = "";
        if(jsonOutput.contains("stdout")){
            output = substringBefore(jsonOutput,"\",\"");
            output = output.replace("{\"stdout\":\"","");
        }
        return output;
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