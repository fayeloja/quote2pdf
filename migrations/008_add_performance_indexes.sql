CREATE INDEX idx_customers_user_id ON customers (user_id);

CREATE INDEX idx_quotations_user_id ON quotations (user_id);

CREATE INDEX idx_quotations_customer_id ON quotations (customer_id);

CREATE INDEX idx_quotation_items_quotation_id ON quotation_items (quotation_id);