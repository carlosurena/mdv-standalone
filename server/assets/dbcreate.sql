CREATE table people(
   	person_id int AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(50) not null,
    middle_name varchar(50),
    last_name varchar(50) not null,
    gender varchar(1) not null,
    birthdate date,
    email varchar(50),
    address varchar(50),
    city varchar(50),
    state varchar(2),
    phone varchar(15),
    member_type varchar(50),
    allergies varchar(255),
    user_id int,
    created_on timestamp not null,
    created_by varchar(50) not null,
    updated_on timestamp not null,
    updated_by varchar(50) not null
    );

CREATE table users(
   	user_id int AUTO_INCREMENT PRIMARY KEY,
    email varchar(50) unique not null,
    username varchar(50) not null,
    password varchar(50) not null,
    auth_status varchar(50) not null,
    oath_provider varchar(50),
    photourl varchar(255),
    person_id int not null REFERENCES people(person_id),
    last_login_dt timestamp,
    created_on timestamp not null,
    created_by varchar(50) not null,
    updated_on timestamp not null,
    updated_by varchar(50) not null
    );


CREATE table mdv_events(
   	event_id int AUTO_INCREMENT PRIMARY KEY,
    event_name varchar(50) not null,
    is_recurring boolean,
    frequency varchar(50) not null,
    day_of_week varchar(50) not null,
    time_of_day timestamp,
    created_on timestamp not null,
    created_by varchar(50) not null,
    updated_on timestamp not null,
    updated_by varchar(50) not null
    );

CREATE table mdv_locations(
   	location_id int AUTO_INCREMENT PRIMARY KEY,
    location_name varchar(50) not null,
    created_on timestamp not null,
    created_by varchar(50) not null,
    updated_on timestamp not null,
    updated_by varchar(50) not null
    );

CREATE table mdv_sheets(
   	sheet_id int AUTO_INCREMENT PRIMARY KEY,
    event_id int not null REFERENCES mdv_event(event_id),
    location_id int not null REFERENCES mdv_location(location_id),
    sheet_date timestamp not null,
    created_on timestamp not null,
    created_by varchar(50) not null,
    updated_on timestamp not null,
    updated_by varchar(50) not null
    );

CREATE table mdv_attendee_entries(
   	entry_id int AUTO_INCREMENT PRIMARY KEY,
    sheet_id int not null REFERENCES mdv_sheet(sheet_id),
    entry_type varchar(50) not null,
    entry_dt timestamp not null,
    person_id int not null REFERENCES people(person_id),
    created_on timestamp not null,
    created_by varchar(50) not null,
    updated_on timestamp not null,
    updated_by varchar(50) not null
    );