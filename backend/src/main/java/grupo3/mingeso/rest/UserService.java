package grupo3.mingeso.rest;

import grupo3.mingeso.entities.User;
import grupo3.mingeso.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@RestController
@CrossOrigin
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //Crear un Usuario

    //CREATE ONE
    @CrossOrigin(origins = {"http://localhost:3000"})
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public User create(@RequestBody User user) {
        user.setUserPassword(bCryptPasswordEncoder.encode(user.getUserPassword()));
        return userRepository.save(user);
    }


}
