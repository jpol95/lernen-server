create table teacher_lang_rels(
    teacher_id integer not null references quizzes(id) on delete cascade, 
    lang_id integer not null references languages(id) on delete cascade
);