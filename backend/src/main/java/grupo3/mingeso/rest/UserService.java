package grupo3.mingeso.rest;

import grupo3.mingeso.repository.UserRepository;
import grupo3.mingeso.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/user")
public class UserService {

    @Autowired
    UserRepository userRepository;

    //Get all
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Iterable<User> getAllUsers(){ return userRepository.findAll(); }

    //Get one
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Optional<User> findOne(@PathVariable("id") Integer id) {
        return userRepository.findById(id);
    }

    //CREATE ONE
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public User create(@RequestBody User resource) {

        return userRepository.save(resource);
    }

    //DELETE ONE
    @DeleteMapping(value = "delete/{id}")
    @ResponseBody
    public void productDelete(@PathVariable Integer id){
        userRepository.deleteById(id);

    }

    //UPDATE
    @PutMapping(value = "/update", params = {"id","username","userCareer"})
    public User update(@RequestParam("id") Integer id, @RequestParam("username") String username, @RequestParam("userCareer") String userCareer,
                           HttpServletResponse httpResponse) {

        if(!userRepository.existsById(id)) {
            httpResponse.setStatus(HttpStatus.NOT_FOUND.value());
            return null;
        }

        User user = userRepository.findById(id).get();
        user.setUserName(username);
        user.setUserCareer(userCareer);
        return userRepository.save(user);
    }
}