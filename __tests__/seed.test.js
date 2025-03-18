const db = require("../db/connection");
const seed = require("../db/seeds/seed");

beforeEach(() => seed());
afterAll(() => db.end());

describe("seed", () => {
  describe("users table", () => {
    test("users tables exists", () => {
      return db
        .query(
          `SELECT EXISTS( SELECT FROM information_schema.tables WHERE table_name = 'users');`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });

    //user_id

    test("users table has user_id column as a serial", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
                        FROM information_schema.columns
                        WHERE table_name = 'users'
                        AND column_name = 'user_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("user_id");
          expect(column.data_type).toBe("integer");
          expect(column.column_default).toBe(
            "nextval('users_user_id_seq'::regclass)"
          );
        });
    });

    test("users table has user_id column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
                      FROM information_schema.table_constraints AS tc
                      JOIN information_schema.key_column_usage AS kcu
                      ON tc.constraint_name = kcu.constraint_name
                      WHERE tc.constraint_type = 'PRIMARY KEY'
                      AND tc.table_name = 'users';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("user_id");
        });
    });

    //username

    test("users table has username column of varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
                        FROM information_schema.columns
                        WHERE table_name = 'users'
                        AND column_name = 'username';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("username");
          expect(column.data_type).toBe("character varying");
        });
    });

    test("users table ensures username column has unique values", () => {
      return db
        .query(
          `SELECT username, COUNT(*) 
             FROM users 
             GROUP BY username 
             HAVING COUNT(*) > 1;`
        )
        .then(({ rows }) => {
          expect(rows.length).toBe(0);
        });
    });

    test("users table has password column as text", () => {
      return db
        .query(
          `SELECT column_name, data_type, character_maximum_length
                            FROM information_schema.columns
                            WHERE table_name = 'users'
                            AND column_name = 'password';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("password");
          expect(column.data_type).toBe("text");
        });
    });
  });

  //   describe("categories table");

  describe("categories table", () => {
    test("categories table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
                        SELECT FROM 
                            information_schema.tables 
                        WHERE 
                            table_name = 'categories'
                        );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
    test("categories table has category_id column as a serial", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
                        FROM information_schema.columns
                        WHERE table_name = 'categories'
                        AND column_name = 'category_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("category_id");
          expect(column.data_type).toBe("integer");
          expect(column.column_default).toBe(
            "nextval('categories_category_id_seq'::regclass)"
          );
        });
    });
    test("categories table has category_id column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
                      FROM information_schema.table_constraints AS tc
                      JOIN information_schema.key_column_usage AS kcu
                      ON tc.constraint_name = kcu.constraint_name
                      WHERE tc.constraint_type = 'PRIMARY KEY'
                      AND tc.table_name = 'categories';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("category_id");
        });
    });

    test("categories table has category_name column of varying character", () => {
        return db
          .query(
            `SELECT column_name, data_type, column_default
                          FROM information_schema.columns
                          WHERE table_name = 'categories'
                          AND column_name = 'category_name';`
          )
          .then(({ rows: [column] }) => {
            expect(column.column_name).toBe("category_name");
            expect(column.data_type).toBe("character varying");
          });
      });

  
      test("categories table ensures category_name column has unique values", () => {
        return db
          .query(
            `SELECT category_name, COUNT(*) 
               FROM categories 
               GROUP BY category_name 
               HAVING COUNT(*) > 1;`
          )
          .then(({ rows }) => {
            expect(rows.length).toBe(0);
          });
      });
  });
  //   describe("accounts table");
  //   describe("expenses table");
});
