package grupo3.mingeso.rest;

import grupo3.mingeso.entities.UserExercise;
import grupo3.mingeso.repository.UserExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/userExercise")
public class UserExerciseService {
    @Autowired
    UserExerciseRepository userExerciseRepository;

    //Get all
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Iterable<UserExercise> getAllUserExcercises(){ return userExerciseRepository.findAll(); }

    //Get one
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Optional<UserExercise> findOne(@PathVariable("id") Integer id) {
        return userExerciseRepository.findById(id);
    }

    //create one
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public UserExercise create(@RequestBody UserExercise resource) {

        return userExerciseRepository.save(resource);
    }
}