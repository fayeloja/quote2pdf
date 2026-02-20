ALTER TABLE customers
ADD COLUMN updated_at TIMESTAMP
WITH
    TIME ZONE DEFAULT NOW();

CREATE TRIGGER update_customers_modtime
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();