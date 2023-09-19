import { DataSource } from "typeorm";                 // <- linha alterada
import { AppDataSource } from "../../../data-source"; // <- linha alterada
import userCreateService from "../../../services/user/userCreate.service";

describe("Create an user", () => {
  let connection: DataSource;             // <- linha alterada

  beforeAll(async () => {                 // <- linha alterada
    await AppDataSource.initialize()      // <- linha alterada
      .then((res) => (connection = res))  // <- linha alterada
      .catch((err) => {         // <- linha alterada
        console.error("Error during Data Source initialization", err); // <- linha alterada
      });                       // <- linha alterada
  });                           // <- linha alterada

  afterAll(async () => {        // <- linha alterada
    await connection.destroy(); // <- linha alterada
  });                           // <- linha alterada

  test("Should insert the information of the new user in the database", async () => {
    const email = "email@mail.com";
    const name = "name";
    const age = 20;

    const userData = { email, name, age };

    const newUser = await userCreateService(userData);

    expect(newUser).toEqual(
      expect.objectContaining({
        id: 1,
        email,
        name,
        age,
      })
    );
  });
});

