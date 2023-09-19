import format from "pg-format";
import { client } from "../database";
import {
  IProject,
  TProjectCreate,
  TProjectInfo,
  TProjectResult,
  TProjectUpdate,
} from "../interfaces";
import { QueryConfig, QueryResult } from "pg";

const createNewProject = async (payload: TProjectCreate): Promise<IProject> => {
  if (!payload.endDate) {
    payload.endDate = null;
  }

  const queryFormat: string = format(
    "INSERT INTO projects (%I) VALUES (%L) RETURNING *;",
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: TProjectResult = await client.query(queryFormat);
  return queryResult.rows[0];
};

const getProjectById = async (id: number): Promise<TProjectInfo> => {
  const queryString: string = `
  SELECT
    p."developerId" "projectId", p."name" "projectName", p."description" "projectDescription", p."repository" "projectRepository", p."startDate" "projectStartDate", p."endDate" "projectEndDate", d."name"  "projectDeveloperName"
  FROM
    projects p
  LEFT JOIN 
    developers d on p."developerId"  = d.id
  WHERE 
    p.id = $1
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TProjectInfo> = await client.query(queryConfig);

  return queryResult.rows[0];
};

const updateProject = async (payload: TProjectUpdate, id: number): Promise<IProject> => {
  const queryFormat: string = format(
    "UPDATE projects SET (%I) = ROW (%L) WHERE id = $1 RETURNING *;",
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: TProjectResult = await client.query(queryFormat, [id]);

  return queryResult.rows[0];
};

export default { createNewProject, getProjectById, updateProject };
