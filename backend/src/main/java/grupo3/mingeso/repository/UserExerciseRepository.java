package grupo3.mingeso.repository;

import grupo3.mingeso.entities.Exercise;
import grupo3.mingeso.entities.User;
import grupo3.mingeso.entities.UserExercise;
import org.springframework.data.repository.CrudRepository;

import java.sql.Timestamp;
import java.util.List;

public interface UserExerciseRepository extends CrudRepository<UserExercise, Integer>{
    UserExercise findByExerciseAndUser(Exercise ex, User us);
    List<UserExercise> findAllByUserUserMailAndUserDateResolutionBetweenOrderByUserDateResolution(String mail, Timestamp start, Timestamp end);
    List<UserExercise> findAllByUserUserCareerAndUserDateResolutionBetweenOrderByUserDateResolution(String career, Timestamp start, Timestamp end);
    List<UserExercise> findAllByUserUserCoordinationAndUserDateResolutionBetweenOrderByUserDateResolution(String coordination, Timestamp start, Timestamp end);
}