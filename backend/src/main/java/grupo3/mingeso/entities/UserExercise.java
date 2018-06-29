package grupo3.mingeso.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

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
    private Timestamp userDateResolution;

    @Column(name = "solving_time",nullable = false)
    private int userSolvingTime; //in seconds

    @Column(name = "user_output",nullable = false, length = 2048)
    private String userOutput;

    @Column(name = "code", nullable = false, length = 16384)
    private String code;

    @Column(name = "commentAnalysis", nullable = false)
    private boolean commentAnalysis;

    @Column(name = "mainBodyAnalysis", nullable = false)
    private boolean mainBodyAnalysis;

    @Column(name = "invalidVariables", nullable = false, length = 2048)
    private String invalidVariables;

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

    public Timestamp getUserDateResolution() {
        return userDateResolution;
    }

    public void setUserDateResolution(Timestamp userDateResolution) {
        this.userDateResolution = userDateResolution;
    }

    public int getUserSolvingTime() {
        return userSolvingTime;
    }

    public void setUserSolvingTime(int userSolvingTime) {
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

    public String getCode() { return code; }

    public void setCode(String code) { this.code = code; }

    public boolean isCommentAnalysis() { return commentAnalysis; }

    public void setCommentAnalysis(boolean commentAnalysis) { this.commentAnalysis = commentAnalysis; }

    public boolean isMainBodyAnalysis() { return mainBodyAnalysis; }

    public void setMainBodyAnalysis(boolean mainBodyAnalysis) { this.mainBodyAnalysis = mainBodyAnalysis; }

    public String getInvalidVariables() { return invalidVariables; }

    public void setInvalidVariables(String invalidVariables) { this.invalidVariables = invalidVariables; }
}
