CREATE DATABASE IF NOT EXISTS `mingesobd`;
USE `mingesobd`;

DROP TABLE IF EXISTS `answer`;
DROP TABLE IF EXISTS `user_excercise`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `excercise`;



/*TABLES*/
/*--------Table: Excercise--------*/
CREATE TABLE `excercise`(
	`excercise_id` int unsigned NOT NULL auto_increment,
	`title` varchar(30) NOT NULL,
	`body` varchar(2048) NOT NULL, 
	`language` int NOT NULL, /* 1 = Python; 2 = Java; 3 = C */
	`initial_date` date NOT NULL,
	`finish_date` date NOT NULL,
	`total_score` int unsigned NOT NULL,
	primary key(`excercise_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*--------Table: User--------*/
CREATE TABLE `user`(
	`user_id` int unsigned NOT NULL auto_increment,
	`username` varchar(60) NOT NULL,
	`user_type` int NOT NULL,	/* 1 = coordinador; 2 = profesor; 3 = estudiante */
	`email` varchar(256) NOT NULL,
	`career` varchar(55),
	`coordination` varchar(5) NOT NULL,	
	primary key(`user_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*--------Table: User_Excercise--------*/
CREATE TABLE `user_excercise`(
	`user_id` int unsigned NOT NULL,
	`excercise_id` int unsigned NOT NULL,
	`solving_time`time,
	`score` int,
	`date_resolution` date,
	primary key(`user_id`,`excercise_id`),
	CONSTRAINT `fk_user_excercise-user` FOREIGN KEY(`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
	CONSTRAINT `fk_user_excercise-excercise` FOREIGN KEY(`excercise_id`) REFERENCES `excercise` (`excercise_id`) ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*--------Table: Answer--------*/
CREATE TABLE `answer`(
	`id_answer` int unsigned NOT NULL auto_increment,
	`excercise_id` int unsigned NOT NULL,
	`input` varchar(1000),
	`output` varchar(1000),
	primary key(`id_answer`),
	KEY `idx_fk_excercise_id` (`excercise_id`),
	CONSTRAINT `fk_excercise_answer` FOREIGN KEY(`excercise_id`) REFERENCES `excercise` (`excercise_id`) ON UPDATE CASCADE 
)ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*DATA FILLING*/
/*USERS*/
/*
INSERT INTO `mingesobd`.`user`
(`username`,`user_type`,`email`,`password`,`coordination`)
VALUES ('Shalini Henna Ramchandani Moorjimal',1,'ejemplo.ejemplo@usach.cl','ejemplopass1','A-1');

INSERT INTO `mingesobd`.`user`
(`username`,`user_type`,`email`,`password`,`coordination`)
VALUES ('Christian David Vidal',2,'ejemplo2.ejemplo2@usach.cl','ejemplopass2','B-2');

INSERT INTO `mingesobd`.`user`
(`username`,`user_type`,`email`,`password`,`coordination`)
VALUES ('Jorge Paredes',2,'ejemplo3.ejemplo3@usach.cl','ejemplopass3','A-1');

INSERT INTO `mingesobd`.`user`
(`username`,`user_type`,`email`,`password`,`career`,`coordination`)
VALUES ('Eduardo Bustamante',3,'ejemplo4.ejemplo4@usach.cl','ejemplopass4','Ingeniería Civil Informática','A-1');

INSERT INTO `mingesobd`.`user`
(`username`,`user_type`,`email`,`password`,`career`,`coordination`)
VALUES ('Nombre del alumno',3,'ejemplo5.ejemplo5@usach.cl','ejemplopass5','Ingeniería Civil Mecánica','B-2');

/*EXCERCISES*/
/*
INSERT INTO `mingesobd`.`excercise`
(`title`,`body`,`language`,`initial_date`,`finish_date`,`total_score`)
VALUES ('Enunciado 1 en Python','Lorem ipsum dolor sit amet consectetur adipiscing, elit imperdiet cras facilisi hac, laoreet etiam nec accumsan nascetur. Rhoncus non metus quam semper nulla orci integer consequat gravida, viverra porta lectus volutpat nec nascetur hendrerit enim, facilisis bibendum pellentesque proin tempus quisque vivamus at. Cubilia mattis mauris montes volutpat imperdiet in quis nec, vivamus rhoncus natoque neque morbi himenaeos platea enim sollicitudin, a libero aenean erat elementum est mus.

Habitasse curabitur mi aliquet ultricies ornare magnis tristique cubilia augue, nostra massa leo eget iaculis sodales sollicitudin pretium, sed dapibus faucibus hac nam ligula aenean eros. Dictum aenean netus cursus convallis fames nibh sagittis tellus cras eget, purus augue condimentum primis vestibulum bibendum taciti consequat vel potenti, turpis montes tortor odio praesent phasellus class at ligula. Eu semper nullam vel ultricies enim habitasse proin lobortis natoque curae, tortor non sollicitudin venenatis lectus placerat interdum egestas in suspendisse taciti, tincidunt nulla magnis hendrerit sodales id nec tempor scelerisque.',1,'2016-03-14','2016-03-15',5);

INSERT INTO `mingesobd`.`excercise`
(`title`,`body`,`language`,`initial_date`,`finish_date`,`total_score`)
VALUES ('Enunciado 2 en Java','2Lorem ipsum dolor sit amet consectetur adipiscing, elit imperdiet cras facilisi hac, laoreet etiam nec accumsan nascetur. Rhoncus non metus quam semper nulla orci integer consequat gravida, viverra porta lectus volutpat nec nascetur hendrerit enim, facilisis bibendum pellentesque proin tempus quisque vivamus at. Cubilia mattis mauris montes volutpat imperdiet in quis nec, vivamus rhoncus natoque neque morbi himenaeos platea enim sollicitudin, a libero aenean erat elementum est mus.

Habitasse curabitur mi aliquet ultricies ornare magnis tristique cubilia augue, nostra massa leo eget iaculis sodales sollicitudin pretium, sed dapibus faucibus hac nam ligula aenean eros. Dictum aenean netus cursus convallis fames nibh sagittis tellus cras eget, purus augue condimentum primis vestibulum bibendum taciti consequat vel potenti, turpis montes tortor odio praesent phasellus class at ligula. Eu semper nullam vel ultricies enim habitasse proin lobortis natoque curae, tortor non sollicitudin venenatis lectus placerat interdum egestas in suspendisse taciti, tincidunt nulla magnis hendrerit sodales id nec tempor scelerisque.',2,'2017-04-14','2017-04-15',10);

INSERT INTO `mingesobd`.`excercise`
(`title`,`body`,`language`,`initial_date`,`finish_date`,`total_score`)
VALUES ('Enunciado 3 en C','3Lorem ipsum dolor sit amet consectetur adipiscing, elit imperdiet cras facilisi hac, laoreet etiam nec accumsan nascetur. Rhoncus non metus quam semper nulla orci integer consequat gravida, viverra porta lectus volutpat nec nascetur hendrerit enim, facilisis bibendum pellentesque proin tempus quisque vivamus at. Cubilia mattis mauris montes volutpat imperdiet in quis nec, vivamus rhoncus natoque neque morbi himenaeos platea enim sollicitudin, a libero aenean erat elementum est mus.

Habitasse curabitur mi aliquet ultricies ornare magnis tristique cubilia augue, nostra massa leo eget iaculis sodales sollicitudin pretium, sed dapibus faucibus hac nam ligula aenean eros. Dictum aenean netus cursus convallis fames nibh sagittis tellus cras eget, purus augue condimentum primis vestibulum bibendum taciti consequat vel potenti, turpis montes tortor odio praesent phasellus class at ligula. Eu semper nullam vel ultricies enim habitasse proin lobortis natoque curae, tortor non sollicitudin venenatis lectus placerat interdum egestas in suspendisse taciti, tincidunt nulla magnis hendrerit sodales id nec tempor scelerisque.',3,'2018-08-04','2018-10-16',2);

/*ANSWERS*/
/*
INSERT INTO `mingesobd`.`answer`
(`excercise_id`,`input`,`output`)
VALUES(1,'1999','2000');

INSERT INTO `mingesobd`.`answer`
(`excercise_id`,`input`,`output`)
VALUES(1,'hola','output');

INSERT INTO `mingesobd`.`answer`
(`excercise_id`,`input`,`output`)
VALUES(2,'1999','2000');

INSERT INTO `mingesobd`.`answer`
(`excercise_id`,`input`,`output`)
VALUES(3,'2000','jajaja');

INSERT INTO `mingesobd`.`answer`
(`excercise_id`,`input`,`output`)
VALUES(2,'hola','output');

INSERT INTO `mingesobd`.`answer`
(`excercise_id`,`input`,`output`)
VALUES(1,'2000','jajaja');


/*USER_EXCERCISES*/
/*
INSERT INTO `mingesobd`.`user_excercise`
(`user_id`,`excercise_id`)
VALUES(2,1);

INSERT INTO `mingesobd`.`user_excercise`
(`user_id`,`excercise_id`)
VALUES(3,2);

INSERT INTO `mingesobd`.`user_excercise`
(`user_id`,`excercise_id`)
VALUES(1,3);

INSERT INTO `mingesobd`.`user_excercise`
(`user_id`,`excercise_id`,`solving_time`,`score`,`date_resolution`)
VALUES(4,1,'23:01:00',5,'2016-03-14');

INSERT INTO `mingesobd`.`user_excercise`
(`user_id`,`excercise_id`,`solving_time`,`score`,`date_resolution`)
VALUES(5,1,'02:10:00',2,'2016-03-14');

INSERT INTO `mingesobd`.`user_excercise`
(`user_id`,`excercise_id`,`solving_time`,`score`,`date_resolution`)
VALUES(4,3,'07:00:23',0,'2018-08-10'); 
*/