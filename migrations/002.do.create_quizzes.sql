create table quiz(
    id integer primary key generated by default as identity, 
    teacher_id integer not null references teachers(id) on delete cascade, 
    setup text
);