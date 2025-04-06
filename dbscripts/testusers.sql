-- The passwords are hashed using bcrypt. The plaintext password for both users is 'password'.
INSERT INTO users (id, username, password)
VALUES
(1, 'admin', '$2b$10$YFgdsCJC0d8y1kPIX.bOEOBicbxO/GTJx.P3hlAeq6m.0nyeQREtu'), 
(2, 'user', '$2b$10$YFgdsCJC0d8y1kPIX.bOEOBicbxO/GTJx.P3hlAeq6m.0nyeQREtu');
