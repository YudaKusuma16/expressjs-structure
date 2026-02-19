CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Optional: Insert sample data
INSERT INTO
    products (
        name,
        description,
        price,
        image,
        stock
    )
VALUES (
        'Laptop',
        'High-performance laptop for work and gaming',
        999.99,
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        15
    ),
    (
        'Wireless Mouse',
        'Ergonomic wireless mouse with long battery life',
        29.99,
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        50
    ),
    (
        'USB-C Cable',
        'Fast charging USB-C cable, 2 meters',
        12.99,
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        100
    ),
    (
        'Keyboard',
        'Mechanical keyboard with RGB backlighting',
        79.99,
        'https://images.unsplash.com/photo-1587829741301-dc798b91a603?w=400',
        25
    ),
    (
        'Headphones',
        'Noise-cancelling over-ear headphones',
        149.99,
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        30
    );