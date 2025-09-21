import { AuthRoleEnum, JobStatusType } from './models';

const endpoints = {
  job: {
    detail: (id: string) => `api/jobs/vendor/${id}`,
    list: (status: JobStatusType, role: AuthRoleEnum) => {
      if (status === 'accepted' && role === AuthRoleEnum.PROVIDER) {
        return 'api/go/vendor/my-assigned-jobs';
      }

      const mapping = {
        [AuthRoleEnum.PROVIDER]: `api/jobs/${status}`,
        [AuthRoleEnum.PERSONNEL]: `api/go/personnel/jobs/${status}`,
      };
      return mapping[role];
    },
  },
  personnel: {
    list: 'api/go/personnel/employees',
    details: 'api/go/personnel/me',
  },
  user: {
    login: 'api/user/login',
    logout: 'api/go/user/logout',
    changePassword: 'api/user/change-password',
    vendor: {
      details: 'api/go/user/me',
    },
  },
};

export default endpoints;
