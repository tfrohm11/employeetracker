create database employer_trackerDB;
use employer_trackerDB; 

create table employee (
id integer not null auto_increment,
first_name varchar(40),
last_name varchar(40),
role_id integer,
manager_id integer,
primary key (id)
);

create table role (
id integer not null auto_increment,
title varchar(40),
salary decimal (8,1),
department_id integer,
primary key (id)
);


create table department (
id integer not null auto_increment,
department_name varchar(40),
primary key (id)
);
