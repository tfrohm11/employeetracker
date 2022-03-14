use employer_trackerDB; 

INSERT INTO department (department_name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal"), ("Administration");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2), ("Software Engineer", 350000, 2), 
("Sales Lead", 100000, 1), ("Salesperson", 50000, 1),
("Legal Team Lead", 200000, 4), ("Lawyer", 150000, 4),
("Accountant", 95000, 3), ("CEO", 3000000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Poopson", 1, 8), ("george", "Butterson", 2, 1), 
("Ashley", "Sorbet", 3, 8), ("Devine", "Mamba", 4, 3),
("Roy", "Gopnik", 6, 5), ("Bernice", "Bigs", 5, 8),
("Royderson", "Villanebo", 7, 8), ("Artur", "Pollackson", 8, null);


