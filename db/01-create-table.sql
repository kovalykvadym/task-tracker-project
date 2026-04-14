create table tasks
(
    id          SERIAL primary key,
    description text      not null,
    status      varchar   not null,
    created_at  timestamp not null,
    updated_at  timestamp not null
)