package grupo3.mingeso.repository;
import grupo3.mingeso.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository  extends CrudRepository<User,Integer> {
}
