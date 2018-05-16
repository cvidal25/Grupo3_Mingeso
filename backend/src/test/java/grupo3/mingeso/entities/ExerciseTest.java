package grupo3.mingeso.entities;

import org.junit.Test;
import java.sql.Timestamp;

import static org.junit.Assert.*;

public class ExerciseTest {

    @Test
    public void exercise() {

        Exercise exercise = new Exercise();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        exercise.setExerciseID(12345);
        assertTrue(12345 == exercise.getExerciseID());
        //assertEquals(12345,exercise.getExerciseID(),"hola");

        exercise.setExerciseBody("This is an excercise content");
        assertEquals("This is an excercise content",exercise.getExerciseBody());

        exercise.setExerciseFinishlDate(timestamp);
        assertEquals(timestamp,exercise.getExerciseFinishlDate());

        exercise.setExerciseInput("hola");
        assertEquals("hola",exercise.getExerciseInput());

        exercise.setExerciseIntialDate(timestamp);
        assertEquals(timestamp,exercise.getExerciseIntialDate());

        exercise.setExerciseLenguge(1);
        assertTrue(1 == exercise.getExerciseLenguge());
        //assertEquals(1,exercise.getExerciseLenguge());

        exercise.setExerciseOutput("aloh");
        assertEquals("aloh",exercise.getExerciseOutput());

        exercise.setExercisePublished(true);
        assertEquals(true,exercise.isExercisePublished());

        exercise.setExerciseScore(5);
        assertTrue(5 == exercise.getExerciseScore());

        exercise.setExerciseTitle("Title of an excercise");
        assertEquals("Title of an excercise", exercise.getExerciseTitle());


    }
}