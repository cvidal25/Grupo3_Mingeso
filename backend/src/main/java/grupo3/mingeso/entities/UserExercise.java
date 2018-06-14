package grupo3.mingeso.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "user_excercise")
@NamedQuery(name = "UserExercise.findAll", query = "SELECT a FROM UserExercise a")
public class UserExercise implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "user_exercise_id",unique = true, nullable = false)
    private Integer userExerciseID;

    @Column(name = "score",nullable = false)
    private Integer userScore;

    @Column(name = "date_resolution",nullable = false)
    private Date userDateResolution;

    @Column(name = "solving_time",nullable = false)
    private Timestamp userSolvingTime;

    @Column(name = "user_output",nullable = false, length = 2048)
    private String userOutput;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public UserExercise(){}

    public Integer getUserExerciseID() {
        return userExerciseID;
    }

    public void setUserExerciseID(Integer userExerciseID) {
        this.userExerciseID = userExerciseID;
    }

    public Integer getUserScore() {
        return userScore;
    }

    public void setUserScore(Integer userScore) {
        this.userScore = userScore;
    }

    public Date getUserDateResolution() {
        return userDateResolution;
    }

    public void setUserDateResolution(Date userDateResolution) {
        this.userDateResolution = userDateResolution;
    }

    public Timestamp getUserSolvingTime() {
        return userSolvingTime;
    }

    public void setUserSolvingTime(Timestamp userSolvingTime) {
        this.userSolvingTime = userSolvingTime;
    }

    public String getUserOutput() {
        return userOutput;
    }

    public void setUserOutput(String userOutput) {
        this.userOutput = userOutput;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
