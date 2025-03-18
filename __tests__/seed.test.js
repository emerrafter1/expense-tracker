describe("seed", () => {
  describe.todo("users table", () => {
    test("users tables exists", () => {
      return db
        .query(
          `SELECT EXISTS( SELECT FROM information_schema.table WHERE table_name = 'users');`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
  });

//   describe("categories table");
//   describe("accounts table");
//   describe("expenses table");
});
