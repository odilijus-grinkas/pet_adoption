INSERT INTO permission (title, description) VALUES
('one', 'permission one description'),
('two', 'permission two description');

INSERT INTO role (title) VALUES
('role_one'),
('role_two');

INSERT INTO role_permission (role_id, permission_id) VALUES
(1, 1),
(2, 2);

INSERT INTO user (username, password, email) VALUES
('username_one', 'password_one', 'email.one@gmail.com'),
('username_two', 'password_two', 'email.two@gmail.com');

INSERT INTO user_role (role_id, user_id) VALUES
(1, 1),
(2, 2);

INSERT INTO city (city) VALUES
('city_one'),
('city_two');

INSERT INTO post (user_id, city_id, pet_name, description, created, status, valid) VALUES
(1, 1, 'pet_one', 'description about pet one', CURDATE(), 'active', 'valid'),
(2, 2, 'pet_two', 'description about pet two', CURDATE(), 'inactive', 'invalid');

INSERT INTO photo (post_id,photo) VALUES
(1,'photo_one.jpg'),
(2,'photo_two.jpg');

INSERT INTO contact (post_id,name, info) VALUES
(1,'contact_one', 'some info about contact one'),
(2,'contact_two', 'some info about contact two');

INSERT INTO filter (title) VALUES
('filter_one'),
('filter_two');

INSERT INTO post_filter (post_id, filter_id) VALUES
(1, 1),
(2, 2);