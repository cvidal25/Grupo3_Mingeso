package grupo3.mingeso.entities;

import org.junit.Test;
import java.sql.Timestamp;
import static org.junit.Assert.*;

public class UserExerciseTest {

    @Test
    public void userExcercise() {

        UserExercise userExercise = new UserExercise();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        userExercise.setUserExerciseID(12345);
        assertTrue(12345 == userExercise.getUserExerciseID());

        userExercise.setUserScore(50);
        assertTrue(50 == userExercise.getUserScore());

        userExercise.setUserDateResolution(timestamp);
        assertEquals(timestamp, userExercise.getUserDateResolution());

        userExercise.setUserSolvingTime(123);
        assertEquals(123,userExercise.getUserSolvingTime());

        userExercise.setUserOutput("aloh");
        assertEquals("aloh",userExercise.getUserOutput());
    }
}