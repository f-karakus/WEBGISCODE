CREATE EXTENSION postgis;

-- Kategori tablosunu oluşturma
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) unique NOT NULL
);

-- Kategori tablosuna örnek kayıtlar ekleme
INSERT INTO category (name) VALUES
    ('Barınak'),
    ('Battaniye'),
    ('Gıda'),
    ('Isıtıcı'),
    ('Yakıt'),
    ('Kozmetik');

-- Item tablosunu oluşturma, kategori referansını da ekleyerek
CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    category_id INTEGER NOT NULL,
    location GEOMETRY(POINT, 4326) NOT NULL,
    CONSTRAINT fk_name 
    FOREIGN KEY(category_id)
    REFERENCES category(id)

);

--INSERT 'Ekmek', 3, ST_SetSRID(ST_MakePoint(32.853179 ,39.919403), 4326));

--DELETE FROM item WHERE id = 1;

--DROP TABLE item;