package grupo3.mingeso.rest;

import grupo3.mingeso.entities.Exercise;
import grupo3.mingeso.others.CodeAnalysis;
import grupo3.mingeso.others.Factory;
import grupo3.mingeso.repository.ExerciseRepository;
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

    //obtain and execute code having the exercise
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
    }
}
