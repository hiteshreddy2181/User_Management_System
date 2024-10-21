--Create users table 
CREATE TABLE users (
    username VARCHAR2(50) UNIQUE NOT NULL,
    password VARCHAR2(100) NOT NULL,
    firstName VARCHAR2(50) NOT NULL,
    lastName VARCHAR2(50) NOT NULL,
    role VARCHAR2(20) CHECK (role IN ('student', 'admin', 'studentadmin')) NOT NULL,
    startDate VARCHAR2(50),        -- Applicable only for Admin users
    dateOfAdmission VARCHAR2(50)     -- Applicable only for Student users
);

--Drop users table
drop table users

--Select all the data from users
select * from users

-- Insert admin users
--$2b$10$rYDdH5k9z5Noe3oJh5iyzeLZatg1.Eh3W5.3ZnK2dFnasIVg9Gk6y = 1234
INSERT INTO users (username, password, firstName, lastName, role, startDate)
VALUES ('Hitesh', '$2b$10$rYDdH5k9z5Noe3oJh5iyzeLZatg1.Eh3W5.3ZnK2dFnasIVg9Gk6y', 'hitesh', 'Reddy', 'admin', '2022-01-15');

INSERT INTO users (username, password, firstName, lastName, role, startDate)
VALUES ('Sagar', '1234', 'sagar', 'murahari', 'admin', '2022-01-15');

-- Insert student users
INSERT INTO users (username, password, firstName, lastName, role, dateOfAdmission)
VALUES ('deepu', '1234', 'Jayadeep', 'Reddy', 'student','2022-01-15');

INSERT INTO users (username, password, firstName, lastName, role, dateOfAdmission)
VALUES ('Vinay', '1234', 'Vinay', 'Shekar', 'student', '2022-01-15');

-- Insert student admin users
INSERT INTO users (username, password, firstName, lastName, role, startDate, dateOfAdmission)
VALUES ('jay', '1234', 'Bob', 'Jay', 'studentadmin', '2022-01-15', '2022-01-15');

INSERT INTO users (username, password, firstName, lastName, role, startDate, dateOfAdmission)
VALUES ('Sara', '1234', 'Sara', 'Taylor', 'studentadmin', '2022-01-15','2022-01-15');

select * from users

COMMIT;

SELECT * FROM users WHERE username = "Sam"

UPDATE users
SET password = '$2b$10$rYDdH5k9z5Noe3oJh5iyzeLZatg1.Eh3W5.3ZnK2dFnasIVg9Gk6y';
