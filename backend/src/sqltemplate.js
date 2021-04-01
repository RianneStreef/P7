con.query(
  "create table articles (id int auto_increment primary key, title varchar(255) null, description varchar(1000) null, URL varchar(255) null, usersDisliked varchar(255) null, usersLiked    varchar(255)  null);",
  function (err, result) {
    if (err) throw err;
    console.log("Table created");
  }
);

con.query(
  "create table Users (id int auto_increment primary key, firstName varchar(255) null, lastName varchar(255) null, email varchar(255) null, password varchar(255) null), articlesRead varchar(255) null;",
  function (err, result) {
    if (err) throw err;
    console.log("Table created");
  }
);
