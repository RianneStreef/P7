  con.query("create table departments (id int auto_increment primary key, deptName varchar(255) null);", function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });


  con.query("create table jobTitle (id int auto_increment primary key, jobTitle varchar(255) null);", function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });


  con.query("create table country (id int auto_increment primary key, country varchar(255) null);", function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

  con.query("create table articles (id int auto_increment primary key, title varchar(255) null, description varchar(1000) null, URL varchar(255) null, employeeID int null, usersDisliked varchar(255) null, usersLiked    varchar(255)  null);", function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  
  con.query("alter table articles add foreign key (employeeID) references Employees(ID);", function (err, result) {
    if (err) throw err;
    console.log("Table altered");
  });

  con.query("create table Employees (id int auto_increment primary key, firstName varchar(255) null, lastName varchar(255) null, department int null, jobTitle int null, country int null, email varchar(255) null, password varchar(255) null, articles int null, constraint Employees_articles_id_fk foreign key (articles) references articles (id), constraint Employees_country_id_fk foreign key (country) references country (id), constraint Employees_departments__id_fk foreign key (department) references departments (id), constraint Employees_jobTitle_id_fk foreign key (jobTitle) references jobTitle (id));", function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  
  