-- user table -- 

use employee_db;


insert into user
    (username, password, email, role)
values( 'Jarrell Houston', ' jpassword', ' jhouston2882@gmail.com', ' technician', "2020-02-11 13:38:00", "2020-02-11 13:38:00");

insert into user
    (username, password, email, role)
values
    ('Andrew Meyers', 'apassword', 'ameyers@gmail.com', 'Manager', "2020-02-11 13:38:00", "2020-02-11 13:38:00");


-- category table -- 



INSERT into categories
    (name, createdAt, UpdatedAt)
values
    ("Laptop", "2020-02-11 13:38:00", "2020-02-11 13:38:00");

INSERT into categories
    (name, createdAt, UpdatedAt)
values
    ("Desktop", "2020-02-11 13:38:00", "2020-02-11 13:38:00");

INSERT into categories
    (name, createdAt, UpdatedAt)
values
    ("Docking Station", "2020-02-11 13:38:00", "2020-02-11 13:38:00");

INSERT into categories
    (name, createdAt, UpdatedAt)
values
    ("Hard Drive", "2020-02-11 13:38:00", "2020-02-11 13:38:00");

INSERT into categories
    (name, createdAt, UpdatedAt)
values
    ("Battery", "2020-02-11 13:38:00", "2020-02-11 13:38:00");

INSERT into categories
    (name, createdAt, UpdatedAt)
values
    ("Ram", "2020-02-11 13:38:00", "2020-02-11 13:38:00");

INSERT into categories
    (name, createdAt, UpdatedAt)
values
    ("Mouse", "2020-02-11 13:38:00", "2020-02-11 13:38:00");

INSERT into categories
    (name, createdAt, UpdatedAt)
values
    ("Keyboard", "2020-02-11 13:38:00", "2020-02-11 13:38:00");


INSERT into loaners
    (model, brand, serialNumber, expenseNumber, techId, CustomerId, checkoutDate, checkoutIn, checkedOut)
value
('Latitude 7450',
'Dell',
'8GKG893','E034536300',
'NULL',
'NULL',
'NULL',
'NULL',
'FALSE'
);

-- loaner table-- 

INSERT into loaners
    (model, brand, serialNumber, expenseNumber, CustomerId, checkedOut, checkoutDate, checkoutIn,techId, createdAt, updatedAt)
values
    ('Latitude 7450', 'Dell', '8GKG893', 'E034536300', NULL, NULL, NULL, NULL, NULL, now(), now());

INSERT into loaners
    (model, brand, serialNumber, expenseNumber, CustomerId, checkedOut, checkoutDate, checkoutIn,techId, createdAt, updatedAt)
values
    ('Latitude 7450', 'Dell', '7GMD32', 'E056322400', 'a0468432', TRUE, '2020-02-11 13:38:00', '2020-02-11 13:38:00', '1', now(), now());


-- equipment table -- 

INSERT into equipment
    (model, brand, serialNumber, expenseNumber, warrantyExpiration, checkedOut, image, createdAt, updatedAt)
values
    ('Latitude 7470', 'Dell', '2MF245GX', 'E034536300', '2020-02-11 13:38:00', FALSE, NULL,
        now(), now());

-- request table -- 
use employee_db;

INSERT into requests
    (status, approvedDate, createdAt, updatedAt, userRequestId, userApproveId, EquipmentId, LoanerId)
values
    ('pending', Null, now(), now(), '1', Null, '1', Null);

INSERT into requests
    (status, approvedDate, createdAt, updatedAt, userRequestId, userApproveId, EquipmentId, LoanerId)
values
    ('approved', NULL, now(), now(), '1', '2', '2', Null);


INSERT into requests
    (status, approvedDate, createdAt, updatedAt, userRequestId, userApproveId, EquipmentId, LoanerId)
values
    ('approved', NULL, now(), now(), '1', '2', NULL, '2');