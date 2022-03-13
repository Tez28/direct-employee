INSERT INTO department (name)
VALUES ("SECURITY"), ("Big Data"), ("Engineering"), ("Management");

INSERT INTO role(title, salary, department_id)
VALUES ('FSO', 130000.00, 1), ('Data Scientist', 300000.00, 2), ('Engineer', 300000.00, 3), ('PM', 400000.00, 4);

INSERT INTO employee (last_name, first_name, role_id, manager_id)
VALUES ("Smith", "John", 1, 4), ("Carter", "Marc", 2, 4), ("Cannady", "Tez", 3, 4), ("Rodgers", "Jessica", 4, 4);