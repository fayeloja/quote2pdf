-- 1. Add the column only if it doesn't exist
ALTER TABLE quotations
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';

-- 2. Fill any existing NULLs with 'draft' so the NOT NULL constraint doesn't fail
UPDATE quotations SET status = 'draft' WHERE status IS NULL;

-- 3. Now make it NOT NULL
ALTER TABLE quotations ALTER COLUMN status SET NOT NULL;

-- 4. Drop the constraint if it exists (prevents "already exists" errors)
-- and then add the fresh CHECK constraint
ALTER TABLE quotations
DROP CONSTRAINT IF EXISTS quotations_status_check;

ALTER TABLE quotations
ADD CONSTRAINT quotations_status_check CHECK (
    status IN (
        'draft',
        'sent',
        'accepted',
        'rejected',
        'converted'
    )
);