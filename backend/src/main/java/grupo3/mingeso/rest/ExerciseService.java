package grupo3.mingeso.rest;
import grupo3.mingeso.repository.ExerciseRepository;
import grupo3.mingeso.entities.Exercise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/exercise")
public class ExerciseService {

    @Autowired
    ExerciseRepository exerciseRepository;
    //GET ALL
    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Exercise> getAllExercise() {
        return exerciseRepository.findAll();
    }

    //GET ONE
    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Optional<Exercise> findOne(@PathVariable("id") Integer id) {
        return exerciseRepository.findById(id);
    }

    //CREATE ONE
    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Exercise create(@RequestBody Exercise resource) {

        return exerciseRepository.save(resource);
    }

    //DELETE ONE
    @CrossOrigin(origins = {"http://localhost:3000"})
    @DeleteMapping(value = "exercise/{id}")
    @ResponseBody
    public void productDelete(@PathVariable Integer id){
        exerciseRepository.deleteById(id);

    }

    //UPDATE
    @CrossOrigin(origins = {"http://localhost:3000"})
    @PutMapping(value = "/exercise", params = {"id","body"})
    public Exercise update(@RequestParam("id") Integer id, @RequestParam("body") String body,
                          HttpServletResponse httpResponse) {

        if(!exerciseRepository.existsById(id)) {
            httpResponse.setStatus(HttpStatus.NOT_FOUND.value());
            return null;
        }

        Exercise exercise = exerciseRepository.findById(id).get();
        exercise.setExerciseBody(body);
        return exerciseRepository.save(exercise);
    }


}
