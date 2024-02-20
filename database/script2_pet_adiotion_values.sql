INSERT INTO permission (id, title, description) VALUES
(1, 'permission_one', 'permission one description'),
(2, 'permission_two', 'permission two description');

INSERT INTO role (id, title) VALUES
(1, 'role_one'),
(2, 'role_two');

INSERT INTO role_permission (role_id, permission_id) VALUES
(1, 1),
(2, 2);

INSERT INTO photo (id, photo) VALUES
(1, 'photo_one.jpg'),
(2, 'photo_two.jpg');

INSERT INTO address (id, city) VALUES
(1, 'city_one'),
(2, 'city_two');

INSERT INTO contact (id, name, info) VALUES
(1, 'contact_one', 'some info about contact one'),
(2, 'contact_two', 'some info about contact two');

INSERT INTO post (id, photo_id, address_id, contact_id, pet_name, description, created, status, valid) VALUES
(1, 1, 1, 1, 'pet_one', 'description about pet one', CURDATE(), 'active', 'valid'),
(2, 2, 2, 2, 'pet_two', 'description about pet two', CURDATE(), 'inactive', 'invalid');

INSERT INTO user (id, post_id, username, password, email) VALUES
(1, 1, 'username_one', 'password_one', 'email.one@gmail.com'),
(2, 2, 'username_two', 'password_two', 'email.two@gmail.com');

INSERT INTO user_role (id, role_id, user_id) VALUES
(1, 1, 1),
(2, 2, 2);

INSERT INTO filter (id, title) VALUES
(1, 'filter_one'),
(2, 'filter_two');

INSERT INTO post_filter (id, post_id, filter_id) VALUES
(1, 1, 1),
(2, 2, 2);