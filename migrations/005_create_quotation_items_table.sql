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