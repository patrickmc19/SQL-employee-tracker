INSERT INTO department (dept_name)
VALUES  ("Pitching"),
        ("Hitting"),
        ("Fielding"),
        ("Strength Training"),
        ("Mobility"),
        ("Recovery");

INSERT INTO role (title, salary, department_id)
VALUES  ("Director of Pitching", 120000, 1),
        ("Pitching Coordinator", 80000, 1),
        ("Advanced Hitting Analyst", 100000, 2),
        ("Hitting Instructor", 60000, 2),
        ("Director of Fielding", 120000, 3),
        ("Fielding Practice Coordinator", 70000, 3),
        ("Personal Trainer", 75000, 4),
        ("Team Lifting Coordinator", 75000, 4),
        ("Bio-Mechanical Analyst", 100000, 5),
        ("Team Flexibility Coordinator", 60000, 5),
        ("Team Masseuse", 75000, 6),
        ("Physical Therapist", 100000, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ("Greg", "Maddux", 1),
        ("Nolan", "Ryan", 2),
        ("Ken", "Griffey", 3),
        ("Ted", "Williams", 4),
        ("Ron", "Washington", 5),
        ("Omar", "Vizquel", 6),
        ("Hulk", "Hogan", 7);

UPDATE employee SET manager_id = 1 WHERE id = 2 or id = 5;