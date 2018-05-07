package grupo3.mingeso.entities;


import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
@NamedQuery(name = "User.findAll", query = "SELECT a FROM User a")
public class User {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "user_id", unique = true, nullable = false)
    private Integer userID;


    @Column(name = "username", nullable = false)
    private String userName;

    @Column(name = "user_type", nullable = false)
    private Integer userType;

    @Column(name = "email", unique = true, nullable = false)
    private String userEmail;

    @Column(name = "password", nullable = false)
    private String userPassword;

    @Column(name = "career", nullable = false)
    private String userCareer;

    @Column(name = "coordination", nullable = false)
    private String userCoordination;


    public User() {
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserCareer() {
        return userCareer;
    }

    public void setUserCareer(String userCareer) {
        this.userCareer = userCareer;
    }

    public String getUserCoordination() {
        return userCoordination;
    }

    public void setUserCoordination(String userCoordination) {
        this.userCoordination = userCoordination;
    }
}