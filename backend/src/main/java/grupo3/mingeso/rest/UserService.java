package grupo3.mingeso.rest;

import grupo3.mingeso.repository.UserRepository;
import grupo3.mingeso.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
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

    //Get User by their email
    @RequestMapping(value = "/email/{email}",method = RequestMethod.GET)
    @ResponseBody
    public User findMail(@PathVariable("email") String email){ return userRepository.findByUserMail(email); }

    //Get Users by Coordination
    @RequestMapping(value = "/coordination/{coordination}",method = RequestMethod.GET)
    @ResponseBody
    public List<User> getAllUsersCoordination(@PathVariable("coordination") String coordination){ return userRepository.findByUserCoordination(coordination); }

    //Get Users by Career
    //número de problemas resueltos por carrera
    @GetMapping(value = "/career", params = {"career"})
    @ResponseBody
    public List<User> countAllByCareer(@RequestParam("career") String career) {
        return userRepository.findByUserCareer(career);
    }

    //Get Coordination
    @GetMapping(value = "/coordination/mail", params = {"mail"})
    @ResponseBody
    public String getCoordination(@RequestParam("mail") String email) {
        User user = userRepository.findByUserMail(email);
        return user.getUserCoordination();
    }


}
