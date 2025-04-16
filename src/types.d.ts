export type Day = {
  filler: boolean;
  date?: Date;
  day?: number;
  isToday?: boolean;
  contests?: Contest[];
};

export type Contest = {
  _id: string;
  contestCode: string;
  contestDuration: number;
  contestEndDate: string; // ISO date string
  contestName: string;
  contestRegistrationEndDate: string; // ISO date string
  contestRegistrationStartDate: string; // ISO date string
  contestSlug: string;
  contestStartDate: string; // ISO date string
  contestType: string;
  contestUrl: string;
  platform: string;
};
