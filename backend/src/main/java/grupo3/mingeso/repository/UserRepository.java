package grupo3.mingeso.repository;
import grupo3.mingeso.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository  extends CrudRepository<User,Integer> {
    User findByUserMail(String email);
    List<User> findByUserCareer(String career);
    List<User> findByUserCoordination(String Coordination);
}
