import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { IDeveloperInfos, TDeveloperInfosCreate } from "../interfaces";
import { NotFound } from "../error";
import format from "pg-format";

const createNewDeveloperInfos = async (
  developerId: number,
  developerInfosRequest: TDeveloperInfosCreate
): Promise<IDeveloperInfos> => {
  const developerInfosAddId: TDeveloperInfosCreate = {
    ...developerInfosRequest,
    developerId: developerId,
  };

  const queryStringSelectDeveloper: string = `
        SELECT
            *
        FROM
            developers
        WHERE
            id = $1;
    `;

  const queryConfigSelectDeveloper: QueryConfig = {
    text: queryStringSelectDeveloper,
    values: [developerId],
  };

  const queryResultSelectDeveloper: QueryResult = await client.query(queryConfigSelectDeveloper);

  if (queryResultSelectDeveloper.rowCount === 0) {
    throw new NotFound("Developer not found.");
  }

  const queryFormatDeveloperInfo: string = format(
    `
            INSERT INTO 
            "developerInfos"(%I)
            VALUES
                (%L)
            RETURNING *;
        `,
    Object.keys(developerInfosAddId),
    Object.values(developerInfosAddId)
  );

  const queryResultDeveloperInfo: QueryResult<IDeveloperInfos> = await client.query(
    queryFormatDeveloperInfo
  );

  const queryStringUpdateDeveloperInfos: string = `
        UPDATE
        "developerInfos" 
        SET 
            "developerId" = $1
        WHERE 
            id = $2;
    `;

  const queryConfigUpdateDeveloperInfos: QueryConfig = {
    text: queryStringUpdateDeveloperInfos,
    values: [developerId, queryResultDeveloperInfo.rows[0].id],
  };

  await client.query(queryConfigUpdateDeveloperInfos);

  return queryResultDeveloperInfo.rows[0];
};

export default { createNewDeveloperInfos };
