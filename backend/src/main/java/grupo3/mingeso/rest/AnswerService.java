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

        Exercise exercise = exerciseRepository.findById(factory.getExercise_id()).get();
        User user = userRepository.findById(factory.getUser_id()).get();
        if(userExerciseRepository.findByExerciseAndUser(exercise,user)!= null) {
            System.out.println("Este ejercicio ya fue resulto por el usuario");
            return null;
        }
        //Análisis del código
        CodeAnalysis code = new CodeAnalysis();
        HashMap<String,String> list =code.Analysis(factory.getCode(),factory.getLanguage());

        //Obtención Inputs y Outputs del ejercicio
        factory.setInput(exercise.getExerciseInput());
        factory.setOutput(exercise.getExerciseOutput());

        //Obtención de datos para la tabla UsuarioEjercicio
        UserExercise userExercise = new UserExercise();
        userExercise.setUserDateResolution(factory.getResolving_date());
        userExercise.setUserSolvingTime(factory.getResolving_time());
        userExercise.setExercise(exercise);
        userExercise.setUser(user);

        //Ejecución del código con todos los inputs y retorna un arreglo con todos los outputs correspondientes.
        String[] arrayJson = factory.executeFactory();
        int score = Integer.parseInt(arrayJson[arrayJson.length-1]);
        userExercise.setUserScore(score);

        //outputs
        String outputs = "";
        for(int i = 0; i < arrayJson.length-1; i++){
            if(i != 0){
                outputs = outputs.concat("/@");
            }
            outputs = outputs.concat(separateOutput(arrayJson[i]));
        }

        userExercise.setUserOutput(outputs);

        userExercise.setCode(factory.getCode());

        for ( Map.Entry<String, String> entry : list.entrySet()) {
            String title = entry.getKey();
            String value = entry.getValue();
            boolean answer = false;
            if(value.equals("Fallido")){
                answer = false;
            }else if(value.equals("Exitoso")){
                answer = true;
            }

            if(title.equals("Analisis de Comentario")){
                userExercise.setCommentAnalysis(answer);
            }else if(title.equals("Analisis del Cuerpo Principal")){
                userExercise.setMainBodyAnalysis(answer);
            }else if(title.equals("Analisis de Identación")){
                userExercise.setIdentationAnalysis(answer);
            }else if(title.equals("Variables Invalidas")){
                userExercise.setInvalidVariables(value);
            }
        }

        //Almacenamiento de los datos en la tabla UsuarioEjercicio
        userExerciseRepository.save(userExercise);

        //Formación de la respuesta a retornar con los resultados del análisis y ejecución del código..
        int i;
        for(i = 0; i < arrayJson.length; i++){
            if(i == arrayJson.length-1)
                list.put("score",arrayJson[i]);
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
