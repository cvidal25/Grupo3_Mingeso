package grupo3.mingeso.entities;

import org.junit.Test;

import static org.junit.Assert.*;

public class UserTest {
    @Test
    public void user() {

        User user = new User();

        user.setUserID(12345);
        assertTrue(12345 == user.getUserID());

        user.setUserCareer("Ejemplo Carrera");
        assertEquals("Ejemplo Carrera",user.getUserCareer());

        user.setUserCoordination("B-3");
        assertEquals("B-3",user.getUserCoordination());

        user.setUserMail("ejemplo.ejemplo@ejemplo.cl");
        assertEquals("ejemplo.ejemplo@ejemplo.cl",user.getUserMail());

        user.setUserName("Alumno Ejemplo");
        assertEquals("Alumno Ejemplo",user.getUserName());

        user.setUserType(1); //tipo estudiante
        assertTrue(1 == user.getUserType());

    }
}