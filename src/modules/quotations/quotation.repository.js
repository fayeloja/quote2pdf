//Handles database operations - SQL only
async function findById(id) {
  return db.oneOrNone(`SELECT * FROM quotations WHERE id = $1`, [id]);
}

async function updateStatus(id, status) {
  return db.one(
    `
    UPDATE quotations
    SET status = $2, updated_at = NOW()
    WHERE id = $1
    RETURNING *
    `,
    [id, status],
  );
}

function assertOwnership(entity, userId) {
  if (entity.user_id !== userId) {
    throw new ForbiddenError();
  }
}
