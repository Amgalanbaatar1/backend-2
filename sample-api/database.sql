CREATE Table tasks (
    id BIGINT PRIMARY KEY ,title VARCHAR(255), description TEXT,createdAt DATE
);


select * from tasks

select title , id from tasks

select title from tasks

insert into tasks values(5,'Shalaa ugaaa')

insert into tasks values (6,'Toosoo arch')


delete from tasks where id =5

update tasks set title="Aygaa ugaa " where id=6