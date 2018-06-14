package grupo3.mingeso.rest;

import grupo3.mingeso.entities.Exercise;
import grupo3.mingeso.entities.User;
import grupo3.mingeso.entities.UserExercise;
import grupo3.mingeso.others.Factory;
import grupo3.mingeso.repository.ExerciseRepository;
import grupo3.mingeso.repository.UserExerciseRepository;
import grupo3.mingeso.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


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