import { QueryResult } from "pg";

interface IDeveloper {
  id: number;
  name: string;
  email: string;
}

type TDeveloperCreate = Omit<IDeveloper, "id">;
type TDeveloperUpdate = Partial<TDeveloperCreate>;
type TDeveloperResult = QueryResult<IDeveloper>;

interface IDeveloperInfos {
  id: number;
  developerSince: Date;
  preferredOS: string;
  developerId: number;
}

type TDeveloperInfosCreate = Omit<IDeveloperInfos, "id">;
type TDeveloperInfosUpdate = Partial<TDeveloperInfosCreate>;
type TDeveloperInfosResult = QueryResult<IDeveloperInfos>;
type TDeveloperInfo = {
  developerId: number;
  developerName: string;
  developerEmail: string;
  developerInfoDeveloperSince: string | null;
  developerInfoPreferredOS: string | null;
};

interface IProject {
  id: number;
  name: string;
  description: string;
  estimatedTime: string;
  repository: string;
  startDate: Date;
  endDate: Date | null;
  developerId: number;
}

type TProjectCreate = Omit<IProject, "id">;
type TProjectUpdate = Partial<TProjectCreate>;
type TProjectResult = QueryResult<IProject>;
type TProjectInfo = {
  projectId: number;
  projectName: string;
  projectDescription: string;
  projectRepository: string;
  projectStartDate: string;
  projectEndDate: string | null;
  projectDeveloperName: string | null;
};

export {
  IDeveloper,
  TProjectInfo,
  TDeveloperCreate,
  TDeveloperUpdate,
  TDeveloperResult,
  IDeveloperInfos,
  TDeveloperInfosCreate,
  TDeveloperInfosUpdate,
  TDeveloperInfosResult,
  TDeveloperInfo,
  IProject,
  TProjectCreate,
  TProjectUpdate,
  TProjectResult,
};
