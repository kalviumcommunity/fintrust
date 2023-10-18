CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)
);


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    address VARCHAR(255),
    role_id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);


CREATE TABLE branch (
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    phone_number INT
);


CREATE TABLE accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    account_type VARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2),
    interest_rate DECIMAL(5, 2),
    overdraft_limit DECIMAL(10, 2),
    user_id INT,
    branch INT,
    FOREIGN KEY (branch) REFERENCES branch(branch_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);




CREATE TABLE loan (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    loan_type VARCHAR(255) NOT NULL,
    loan_amount DECIMAL(10, 2),
    account_id INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

