import {
  IDeveloper,
  TDeveloperCreate,
  TDeveloperInfo,
  TDeveloperResult,
  TDeveloperUpdate,
} from "../interfaces";
import format from "pg-format";
import { client } from "../database";
import { QueryConfig, QueryResult } from "pg";

const createNewDeveloper = async (payload: TDeveloperCreate): Promise<IDeveloper> => {
  const queryFormat: string = format(
    "INSERT INTO developers (%I) VALUES (%L) RETURNING *;",
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: TDeveloperResult = await client.query(queryFormat);
  return queryResult.rows[0];
};

const getDeveloperById = async (id: number): Promise<TDeveloperInfo> => {
  const queryString: string = `
    SELECT
      dev."id" "developerId", dev."name" "developerName", dev."email" "developerEmail", devInfos."developerSince" "developerInfoDeveloperSince", devInfos."preferredOS" "developerInfoPreferredOS"
    FROM
      developers dev
    LEFT JOIN 
    "developerInfos" devInfos ON devInfos."developerId" = dev."id"
    WHERE
      dev."id" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TDeveloperInfo> = await client.query(queryConfig);

  return queryResult.rows[0];
};

const updateDeveloper = async (payload: TDeveloperUpdate, id: string): Promise<IDeveloper> => {
  const queryFormat: string = format(
    "UPDATE developers SET (%I) = ROW (%L) WHERE id = $1 RETURNING *;",
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: TDeveloperResult = await client.query(queryFormat, [id]);

  return queryResult.rows[0];
};

const deleteDeveloper = async (id: string): Promise<void> => {
  await client.query("DELETE FROM developers WHERE id = $1", [id]);
};

export default { createNewDeveloper, getDeveloperById, updateDeveloper, deleteDeveloper };
