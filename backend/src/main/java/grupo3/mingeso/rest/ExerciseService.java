package grupo3.mingeso.rest;
import grupo3.mingeso.repository.ExerciseRepository;
import grupo3.mingeso.entities.Exercise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/exercise")
public class ExerciseService {

    @Autowired
    ExerciseRepository exerciseRepository;
    //GET ALL
        @RequestMapping(method = RequestMethod.GET)
        @ResponseBody
    public Iterable<Exercise> getAllExercise() {
        return exerciseRepository.findAll();
    }

    //GET ONE
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Exercise findOne(@PathVariable("id") Integer id) {
        return exerciseRepository.findById(id).get();
    }

    //CREATE ONE
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Exercise create(@RequestBody Exercise resource) {
        return exerciseRepository.save(resource);
    }

    //DELETE ONE
    @DeleteMapping(value = "delete/{id}")
    @ResponseBody
    public void productDelete(@PathVariable Integer id){
        exerciseRepository.deleteById(id);

    }

    //UPDATE
    @PutMapping(value = "/update", params = {"id","body","published"})
    public Exercise update(@RequestParam("id") Integer id, @RequestParam("body") String body, @RequestParam("published") boolean published,
                          HttpServletResponse httpResponse) {

        if(!exerciseRepository.existsById(id)) {
            httpResponse.setStatus(HttpStatus.NOT_FOUND.value());
            return null;
        }

        Exercise exercise = exerciseRepository.findById(id).get();
        exercise.setExerciseBody(body);
        exercise.setExercisePublished(published);
        return exerciseRepository.save(exercise);
    }


}
