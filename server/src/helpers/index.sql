CREATE INDEX idx_roles_name ON roles(name);

-- Index on the 'username' column of the 'users' table
CREATE INDEX idx_users_username ON users(username);

-- Index on the 'email' column of the 'users' table
CREATE INDEX idx_users_email ON users(email);

-- Index on the 'role_id' column of the 'users' table
CREATE INDEX idx_users_role_id ON users(role_id);

-- Index on the 'address' column of the 'branch' table
CREATE INDEX idx_branch_address ON branch(address);

-- Index on the 'account_type' column of the 'accounts' table
CREATE INDEX idx_accounts_account_type ON accounts(account_type);

-- Index on the 'user_id' column of the 'accounts' table
CREATE INDEX idx_accounts_user_id ON accounts(user_id);

-- Index on the 'branch' column of the 'accounts' table
CREATE INDEX idx_accounts_branch ON accounts(branch);


-- Index on the 'loan_type' column of the 'loan' table
CREATE INDEX idx_loan_loan_type ON loan(loan_type);

-- Index on the 'account_id' column of the 'loan' table
CREATE INDEX idx_loan_account_id ON loan(account_id);

-- Index on the 'user_id' column of the 'loan' table
CREATE INDEX idx_loan_user_id ON loan(user_id);






-- Selecting all columns from the 'users' table(non optimized query)
SELECT * FROM users WHERE username = 'john_doe';

-- Selecting only necessary columns(optimized query)
SELECT id, username, email FROM users WHERE username = 'john_doe';



-- Query without using an index
SELECT * FROM users WHERE email = 'john@example.com';


-- Query utilizing an index on the 'email' column
SELECT * FROM users USE INDEX (idx_users_email) WHERE email = 'john@example.com';
