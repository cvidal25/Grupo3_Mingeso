package grupo3.mingeso.entities;
import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name="user")
@NamedQuery(name = "User.findAll", query = "SELECT u FROM User u")
public class User implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "user_id", unique = true, nullable = false)
    @GeneratedValue
    private Integer userID;

    @Column(name = "username", nullable = false, length = 60)
    private String userName;

    @Column(name = "user_type", nullable = false) /* 1 = coordinador; 2 = profesor; 3 = estudiante */
    private Integer userType;

    @Column(name = "email", nullable = false, length = 256)
    private String userMail;

    @Column(name = "password", nullable = false, length = 100)
    private String userPass;

    @Column(name = "career", nullable = false, length = 55)
    private String userCareer;

    @Column(name = "coordination", nullable = false, length = 5)
    private String userCoordination;

    public void User(){}

    public Integer getUserID() { return userID; }

    public void setUserID(Integer userID) { this.userID = userID; }

    public String getUserName() { return userName; }

    public void setUserName(String userName) { this.userName = userName; }

    public Integer getUserType() { return userType; }

    public void setUserType(Integer userType) { this.userType = userType; }

    public String getUserMail() { return userMail; }

    public void setUserMail(String userMail) { this.userMail = userMail; }

    public String getUserPass() { return userPass; }

    public void setUserPass(String userPass) { this.userPass = userPass; }

    public String getUserCareer() { return userCareer; }

    public void setUserCareer(String userCareer) { this.userCareer = userCareer; }

    public String getUserCoordination() { return userCoordination; }

    public void setUserCoordination(String userCoordination) { this.userCoordination = userCoordination; }
}
