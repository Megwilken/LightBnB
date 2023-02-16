INSERT INTO users (name, email, password) 
VALUES ('Alice Jones', 'alice.jones@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
        ('Bob Smith', 'bobbiesmith@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
        ('Charlie Brown', 'CB@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Cozy Cottage', 'description', 'https://images.pexels.com/photos/4450329/pexels-photo-4450329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/4450329/pexels-photo-4450329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 100, 1, 1, 1, 'Canada', '3 Cobble St', 'St.Johns', 'Newfoundland', 'N1N1N1', true),
        (1, 'Luxurious Mansion', 'description', 'https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg?auto=compress&cs=tinysrgb&w=800', 1000, 10, 10, 10, 'Canada', '54 Applebee Drive', 'Victoria', 'British Columbia', 'V1V1V1', true),
        (2, 'Spacious Townhome', 'description', 'https://images.pexels.com/photos/5845675/pexels-photo-5845675.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/5845675/pexels-photo-5845675.jpeg?auto=compress&cs=tinysrgb&w=800', 50, 0, 1, 1, 'Canada', '123 Main St', 'Toronto', 'Ontario', 'T1T1T1', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2023-05-07', '2023-05-18', 1, 2),
        ('2023-02-23', '2023-03-01', 2, 3),
        ('2024-01-01', '2024-01-10', 3, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 5, 'messages'),
        (2, 2, 2, 4, 'messages'),
        (3, 3, 3, 3, 'messages');