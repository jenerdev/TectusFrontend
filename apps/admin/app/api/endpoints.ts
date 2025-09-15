import { JobStatusType } from './models';

const endpoints = {
  job: {
    detail: (id: string) => `api/jobs/vendor/${id}`,
    list: (status: JobStatusType) => `api/jobs/${status}`,
  },
  vendor: {
    details: 'api/go/user/me',
    personnels: 'api/go/personnel/employees',
  },
  user: {
    login: 'api/go/user/login',
    logout: 'api/go/user/logout',
  },
};

export default endpoints;