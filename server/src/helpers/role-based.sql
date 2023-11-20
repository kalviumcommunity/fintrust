CREATE ROLE `User`;
CREATE ROLE `Admin`;
CREATE ROLE Employee;

GRANT select, insert, update ON users TO Admin;
GRANT select, insert ON users TO Employee;
GRANT select, update ON users TO User;


GRANT ALL ON loan TO Admin;
GRANT ALL ON branch TO Admin;
GRANT ALL ON accounts TO Admin;

REVOKE UPDATE ON users FROM Userf