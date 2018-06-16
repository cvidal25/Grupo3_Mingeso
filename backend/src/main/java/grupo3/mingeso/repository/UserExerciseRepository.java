package grupo3.mingeso.repository;
import grupo3.mingeso.entities.Exercise;
import grupo3.mingeso.entities.User;
import grupo3.mingeso.entities.UserExercise;
import org.springframework.data.repository.CrudRepository;

public interface UserExerciseRepository extends CrudRepository<UserExercise, Integer>{
    UserExercise findByExerciseAndUser(Exercise ex, User us);
}
