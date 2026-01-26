CREATE TABLE user (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    business_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password_hash TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    company_name TEXT,
    city TEXT,
    state TEXT,
    country TEXT DEFAULT 'Nigeria' created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        UNIQUE (tradesman_id, email),
        UNIQUE (tradesman_id, phone)
);

CREATE INDEX idx_customers_tradesman_id ON customers (tradesman_id);

CREATE TABLE quotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    user_id UUID NOT NULL REFERENCES users (id),
    customer_id UUID REFERENCES customers (id),
    quote_number INTEGER NOT NULL,
    status TEXT CHECK (
        status IN (
            'draft',
            'sent',
            'accepted',
            'declined',
            'expired'
        )
    ) DEFAULT 'draft',
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expiry_date DATE,
    notes TEXT,
    sub_total NUMERIC(12, 2) DEFAULT 0.00,
    tax_total NUMERIC(12, 2) DEFAULT 0.00,
    grand_total NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        UNIQUE (user_id, quote_number)
);

CREATE INDEX idx_quotations_user_id ON quotations (user_id);

CREATE INDEX idx_quotations_customer_id ON quotations (customer_id);

CREATE TABLE quotation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    quotation_id UUID NOT NULL REFERENCES quotations (id) ON DELETE CASCADE,
    service_type TEXT NOT NULL,
    description TEXT NOT NULL,
    quantity NUMERIC(10, 2) NOT NULL DEFAULT 1,
    unit TEXT NOT NULL,
    unit_price NUMERIC(12, 2) NOT NULL,
    tax_rate NUMERIC(5, 2) DEFAULT 0.00, -- e.g. 20.00 = 20%
    base_amount NUMERIC(12, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    tax_amount NUMERIC(12, 2) GENERATED ALWAYS AS (
        (quantity * unit_price) * (tax_rate / 100)
    ) STORED,
    line_total NUMERIC(12, 2) GENERATED ALWAYS AS (
        (quantity * unit_price) + (
            (quantity * unit_price) * (tax_rate / 100)
        )
    ) STORED,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        CHECK (quantity > 0),
        CHECK (unit_price >= 0),
        CHECK (
            tax_rate >= 0
            AND tax_rate <= 100
        )
);

CREATE INDEX idx_quotation_items_quotation_id ON quotation_items (quotation_id);