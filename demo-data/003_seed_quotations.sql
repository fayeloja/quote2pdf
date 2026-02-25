INSERT INTO
    quotations (
        id,
        user_id,
        customer_id,
        quote_number,
        issue_date,
        expiry_date,
        notes,
        sub_total,
        tax_total,
        grand_total
    )
VALUES (
        '33333333-3333-3333-3333-333333333331',
        '11111111-1111-1111-1111-111111111111',
        '22222222-2222-2222-2222-222222222221',
        1001,
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '7 days',
        'Website development project',
        500000,
        75000,
        575000
    ),
    (
        '33333333-3333-3333-3333-333333333332',
        '11111111-1111-1111-1111-111111111111',
        '22222222-2222-2222-2222-222222222222',
        1002,
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '14 days',
        'Mobile app UI redesign',
        350000,
        52500,
        402500
    )