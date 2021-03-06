package grupo3.mingeso.repository;

import grupo3.mingeso.entities.Exercise;
import grupo3.mingeso.entities.User;
import grupo3.mingeso.entities.UserExercise;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.sql.Timestamp;
import java.util.List;

public interface UserExerciseRepository extends CrudRepository<UserExercise, Integer>{
    UserExercise findByExerciseAndUser(Exercise ex, User us);
    List<UserExercise> findAllByUserUserMailAndUserDateResolutionBetweenOrderByUserDateResolution(String mail, Timestamp start, Timestamp end);
    List<UserExercise> findAllByUserUserCareerAndUserDateResolutionBetweenOrderByUserDateResolution(String career, Timestamp start, Timestamp end);
    List<UserExercise> findAllByUserUserCoordinationAndUserDateResolutionBetweenOrderByUserDateResolution(String coordination, Timestamp start, Timestamp end);
    List<UserExercise> findAllByUserUserID(int id);

    @Query("select user.userID,count(userExerciseID) from UserExercise ue where ue.userDateResolution between ?1 and ?2 group by ue.user order by count(ue.userExerciseID) desc")
    List<UserExercise> rankingStudents(Timestamp firstDate, Timestamp lastDate);

    @Query("select user.userID,count(userExerciseID) from UserExercise ue where ue.user.userID in (select userID from User where userCoordination = ?3) and userDateResolution between ?1 and ?2 group by ue.user order by count(ue.userExerciseID) desc")
    List<UserExercise> rankingCoordination(Timestamp firstDate, Timestamp lastDate,String coordination);

    @Query("select user.userID,count(userExerciseID) from UserExercise ue where ue.user.userID in (select userID from User where userCareer = ?3) and userDateResolution between ?1 and ?2 group by ue.user order by count(ue.userExerciseID) desc")
    List<UserExercise> rankingCareer(Timestamp firstDate, Timestamp lastDate,String career);
}