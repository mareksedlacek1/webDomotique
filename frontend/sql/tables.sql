CREATE DATABASE IF NOT EXISTS mon_site;
USE mon_site;
DROP TABLE IF EXISTS utilisateurs;
CREATE TABLE IF NOT EXISTS utilisateurs (
    email VARCHAR(255) PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INT,
    genre ENUM('Homme', 'Femme', 'autre'),
    type ENUM('Mère', 'Père', 'Enfant', 'Domestique', 'Nourrice', 'Gardien', 'Jardinier', 'Cuisinière', 'Ménage','Admin') NOT NULL,
    photo VARCHAR(255) NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS  listeAttente;
CREATE TABLE IF NOT EXISTS listeAttente (
    email VARCHAR(255) PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INT,
    genre ENUM('Homme', 'Femme', 'autre'),
    type ENUM('Mère', 'Père', 'Enfant', 'Domestique', 'Nourrice', 'Gardien', 'Jardinier', 'Cuisinière', 'Ménage') NOT NULL,
    photo VARCHAR(255) NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
INSERT INTO utilisateurs (
    email, nom, password, age, genre, type, photo, role
) VALUES (
    'admin@example.com', 
    'admin', 
    'admin', 
    30, 
    'Homme', 
    'Admin', 
    NULL, 
    'admin'
);

INSERT INTO utilisateurs (email, nom, password, age, genre, type, photo, role, created_at) VALUES
('alice.dupont@example.com', 'Alice Dupont', 'hashed_password_1', 30, 'Femme', 'Mère', NULL, 'user', NOW()),
('jean.martin@example.com', 'Jean Martin', 'hashed_password_2', 45, 'Homme', 'Père', NULL, 'admin', NOW()),
('marie.rousseau@example.com', 'Marie Rousseau', 'hashed_password_3', 10, 'Femme', 'Enfant', NULL, 'user', NOW()),
('lucie.petit@example.com', 'Lucie Petit', 'hashed_password_4', 8, 'Femme', 'Enfant',NULL, 'user', NOW()),
('paul.lefevre@example.com', 'Paul Lefevre', 'hashed_password_5', 6, 'Homme', 'Enfant', NULL, 'user', NOW()),
('antoine.dupont@example.com', 'Antoine Dupont', 'hashed_password_6', 12, 'Homme', 'Enfant', NULL, 'user', NOW()),
('sophie.leroy@example.com', 'Sophie Leroy', 'hashed_password_7', 7, 'Femme', 'Enfant', NULL, 'user', NOW()),
('michel.dubois@example.com', 'Michel Dubois', 'hashed_password_8', 52, 'Homme', 'Jardinier', NULL, 'user', NOW()),
('david.gautier@example.com', 'David Gautier', 'hashed_password_9', 34, 'Homme', 'Gardien', NULL, 'user', NOW()),
('claire.bernard@example.com', 'Claire Bernard', 'hashed_password_10', 25, 'Femme', 'Ménage', NULL, 'user', NOW());

INSERT INTO listeAttente (email, nom, password, age, genre, type, photo, role, created_at) VALUES
('clara.bellamy@example.com', 'Clara Bellamy', 'hashed_password_11', 28, 'Femme', 'Domestique',NULL, 'user', NOW()),
('marc.lefevre@example.com', 'Marc Lefevre', 'hashed_password_12', 50, 'Homme', 'Jardinier', NULL, 'user', NOW()),
('elise.dupuis@example.com', 'Elise Dupuis', 'hashed_password_13', 33, 'Femme', 'Cuisinière', NULL, 'user', NOW()),
('julien.martin@example.com', 'Julien Martin', 'hashed_password_14', 41, 'Homme', 'Ménage', NULL, 'user', NOW()),
('audrey.dupont@example.com', 'Audrey Dupont', 'hashed_password_15', 37, 'Femme', 'Nourrice', NULL, 'user', NOW()),
('pierre.bernard@example.com', 'Pierre Bernard', 'hashed_password_16', 47, 'Homme', 'Gardien', NULL, 'user', NOW()),
('charlotte.rousseau@example.com', 'Charlotte Rousseau', 'hashed_password_19', 32, 'Femme', 'Domestique', NULL, 'user', NOW()),
('vincent.petit@example.com', 'Vincent Petit', 'hashed_password_20', 60, 'Homme', 'Jardinier', NULL, 'user', NOW());

DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
