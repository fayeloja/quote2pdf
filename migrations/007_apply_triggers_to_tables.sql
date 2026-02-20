-- Watch the quotations table
CREATE TRIGGER update_quotations_modtime
BEFORE UPDATE ON quotations
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Watch the users table
CREATE TRIGGER update_users_modtime
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();