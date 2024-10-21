Stack :
Frontend: React Js
Backend: Node Js
Database: Oracle DB

Node Version : v21.3.0

To get Started:
1) Clone the project from Github (UI and Backend)
2) npm install --legacy-peer-deps (to install node modules)
3) npm start (to start the application)
4) If you find any modules missing --> npm install module-name

In Database
To add first admin 
-- Insert admin users
--$2b$10$rYDdH5k9z5Noe3oJh5iyzeLZatg1.Eh3W5.3ZnK2dFnasIVg9Gk6y = 1234
INSERT INTO users (username, password, firstName, lastName, role, startDate)
VALUES ('Hitesh', '$2b$10$rYDdH5k9z5Noe3oJh5iyzeLZatg1.Eh3W5.3ZnK2dFnasIVg9Gk6y', 'hitesh', 'Reddy', 'admin', '2022-01-15');


