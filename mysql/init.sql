CREATE TABLE IF NOT EXISTS menu (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    hasChildren TINYINT(1) NOT NULL DEFAULT 0,
    parentId INT NULL,
    url VARCHAR(255) NOT NULL,
    isActive TINYINT(1) NOT NULL DEFAULT 1,
    isDeleted TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (parentId) REFERENCES menu(id) ON DELETE CASCADE
);

INSERT INTO menu (id, name, description, hasChildren, parentId, url, isActive, isDeleted) VALUES
(15, 'Dash Board', 'Dash Board Page', 0, NULL, '/dashboard', 1, 0),
(16, 'NEW DASHBOAD', 'Adding New Dashboard', 0, NULL, '/addDashItem', 1, 0),
(17, 'Products', 'All Products', 0, NULL, '/products', 1, 0),
(18, 'Message', 'Send Messages', 0, NULL, '/message', 1, 0),
(19, 'New Menu', 'Add A new MENU', 0, NULL, '/newMenu', 1, 0),
(20, 'About', 'About My Collegues', 0, NULL, '/about', 1, 0),
(21, 'New About', 'Create New About', 0, NULL, '/addAbout', 1, 0),
(22, 'New Product', 'Add new product', 0, NULL, '/newProduct', 1, 0),
(23, 'Contacts', 'View All Contacts', 0, NULL, '/contact', 1, 0),
(24, 'New Contact', 'Create New Contact', 0, NULL, '/newContact', 1, 0);

CREATE TABLE IF NOT EXISTS contact (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    uniqId VARCHAR(100) UNIQUE
);

INSERT INTO contact (id, name, uniqId) VALUES
(1, '0741099245', NULL),
(2, 'ISABIRYE ELIJAH', '0741099245');

CREATE TABLE IF NOT EXISTS product (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    image VARCHAR(512),
    stock INT NOT NULL DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    reviews INT DEFAULT 0,
    createdAt DATETIME,
    updatedAt DATETIME,
    isActive TINYINT(1),
    discount DECIMAL(5,2) DEFAULT 0.00,
    manufacturer VARCHAR(255),
    warranty VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS person (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    occupation VARCHAR(255),
    contact_id INT,
    FOREIGN KEY (contact_id) REFERENCES contact(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS dashboard (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    url VARCHAR(255) NOT NULL,
    value DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS social (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NOT NULL,
    isActive TINYINT(1) NOT NULL DEFAULT 1,
    isDeleted TINYINT(1) NOT NULL DEFAULT 0,
    about_id INT NOT NULL,
    FOREIGN KEY (about_id) REFERENCES about(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS about (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(10) NOT NULL,
    contact VARCHAR(255),
    email VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(50),
    website VARCHAR(255),
    description VARCHAR(1000),
    image VARCHAR(500)
);

INSERT INTO about (id, name, status, contact, email, address, phone, website, description, image) VALUES
(9, 'ISABIRYE ELIJAH', 'true', '0741099245', 'isabiryeelijah10@gmail.com', 'LUMU', '0741099245', 'https://glam-squad-haven.vercel.app', 'Ilove programming', 'https://i.postimg.cc/rFmVKkVT/k.jpg'),
(11, 'ISAAC NEWTON', 'true', '+25549748485', 'isaacnewton@gmail.com', 'LUMU', '+25549748485', 'http://isaacnetons.com', 'Business Man', 'https://i.postimg.cc/rFmVKkVT/k.jpg');

CREATE TABLE IF NOT EXISTS message (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    type VARCHAR(100) NOT NULL
);

