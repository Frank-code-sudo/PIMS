import React from 'react';
import * as reducerTypes from 'constants/reducerTypes';
import { createMemoryHistory } from 'history';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ReviewWorkflowStatus } from 'features/projects/constants';
import { ITask, IProject, IProjectTask } from 'features/projects/interfaces';
import { ProjectActions } from 'constants/actionTypes';
import { render, waitFor } from '@testing-library/react';
import { useKeycloak } from '@react-keycloak/web';
import { Claims } from 'constants/claims';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { ReviewApproveStep } from '..';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { Button } from 'react-bootstrap';
import GenericModal from 'components/common/GenericModal';
import { IProperty } from 'features/properties/list/interfaces';
import { act } from 'react-dom/test-utils';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('@react-keycloak/web');
const mockKeycloak = (claims: string[]) => {
  (useKeycloak as jest.Mock).mockReturnValue({
    keycloak: {
      userInfo: {
        agencies: [1],
        roles: claims,
      },
      subject: 'test',
    },
  });
};

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const mockAxios = new MockAdapter(axios);
mockAxios.onAny().reply(200, {});

const mockTasks: IProjectTask[] = [
  {
    projectNumber: 123,
    taskId: 1,
    isOptional: false,
    isCompleted: true,
    name: 'task-0',
    description: 'one',
    taskType: 1,
    sortOrder: 0,
    completedOn: new Date(),
    statusId: 0,
    statusCode: ReviewWorkflowStatus.PropertyReview,
  },
  {
    projectNumber: 123,
    taskId: 2,
    isOptional: false,
    isCompleted: true,
    name: 'task-1',
    description: 'two',
    taskType: 1,
    sortOrder: 0,
    completedOn: new Date(),
    statusId: 0,
    statusCode: ReviewWorkflowStatus.DocumentReview,
  },
];

const incompleteTask: IProjectTask[] = [
  {
    projectNumber: 123,
    taskId: 1,
    isOptional: false,
    isCompleted: false,
    name: 'task-0',
    description: 'one',
    taskType: 1,
    sortOrder: 0,
    completedOn: new Date(),
    statusId: 0,
    statusCode: ReviewWorkflowStatus.PropertyReview,
  },
];

const mockProperty: IProperty = {
  id: 0,
  city: '',
  propertyTypeId: 0,
  propertyType: 'Land',
  latitude: 23,
  longitude: 23,
  pid: '123-123-123',
  classificationId: 2,
  classification: 'Surplus Active',
  description: 'test',
  isSensitive: false,
  agencyId: 0,
  agency: 'test',
  agencyCode: 'TST',
  address: '1234 Test St',
  addressId: 1,
  administrativeArea: 'Victoria',
  province: 'BC',
  postal: 'A1A 1A1',
  market: 123,
  netBook: 223,
  assessedLand: 123,
  landArea: 123,
  landLegalDescription: 'test',
};

const mockProject = (tasks: any) => {
  return {
    projectNumber: 'test-01',
    name: 'my project',
    description: 'my project description',
    privateNote: 'private note',
    publicNote: 'public note',
    properties: [mockProperty],
    agencyId: 1,
    statusId: 0,
    statusCode: ReviewWorkflowStatus.PropertyReview,
    exemptionRequested: true,
    exemptionRationale: 'rationale',
    tierLevelId: 1,
    tasks: tasks,
    note: 'my notes',
    id: 1,
    fiscalYear: 2020,
    projectAgencyResponses: [],
    notes: [],
    marketedOn: '2020-01-01',
    offerAcceptedOn: '2020-01-01',
    purchaser: 'purchaser',
    offerAmount: 2,
    disposedOn: '2020-01-01',
    gainBeforeSpl: -13,
    programCost: 4,
    actualFiscalYear: '2020',
    plannedFutureUse: 'future',
    preliminaryFormSignedBy: 'prelimsign',
    finalFormSignedBy: 'finalsign',
    interestComponent: 5,
    loanTermsNote: 'loannote',
    ocgFinancialStatement: 6,
    salesCost: 7,
    netProceeds: -17,
    market: 9,
    netBook: 10,
    gainNote: 'gainNote',
    programCostNote: 'programcostnote',
    priorYearAdjustmentAmount: 9,
    remediationNote: 'remediationNote',
    adjustmentNote: 'adjustmentNote',
    closeOutNote: 'closeOutNote',
    salesHistoryNote: 'salesHistoryNote',
    comments: 'comments',
    removalFromSplRequestOn: '2020-01-01',
    removalFromSplApprovedOn: '2020-01-01',
    removalFromSplRationale: 'rationale',
  } as any;
};

export const tasks: ITask[] = [
  {
    taskId: 1,
    name: 'task-0',
    sortOrder: 0,
    description: 'test',
    taskType: 1,
  },
  {
    taskId: 2,
    name: 'task-1',
    sortOrder: 0,
    description: 'test',
    taskType: 1,
  },
];

const store = (project: IProject) => {
  return mockStore({
    [reducerTypes.LOOKUP_CODE]: { lookupCodes: [] },
    [reducerTypes.ProjectReducers.PROJECT]: { project },
    [reducerTypes.ProjectReducers.TASKS]: tasks,
    [reducerTypes.NETWORK]: {
      requests: {
        [ProjectActions.GET_PROJECT]: {},
      },
    },
  });
};

const getReviewApproveStep = (storeOverride?: any) => (
  <Provider store={storeOverride ?? store(mockProject(mockTasks))}>
    <Router history={history}>
      <ReviewApproveStep />
    </Router>
  </Provider>
);

describe('Review Approve Step', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    mockAxios.onAny().reply(200, {});
    mockKeycloak([]);
  });
  it('renders correctly', () => {
    act(() => {
      const { container } = render(getReviewApproveStep());
      expect(container.firstChild).toMatchSnapshot();
    });
  });
  it('edit button is visible when user has correct claims', () => {
    mockKeycloak([Claims.ADMIN_PROJECTS]);
    act(() => {
      const { getByText } = render(getReviewApproveStep());
      const editButton = getByText(/Edit/);
      expect(editButton).toBeTruthy();
    });
  });
  it('edit button is not visible when user does not have required agency/claims', () => {
    act(() => {
      const { queryByText } = render(getReviewApproveStep());
      const editButton = queryByText(/Edit/);
      expect(editButton).toBeFalsy();
    });
  });

  it('Review step submits correctly', async () => {
    mockAxios.reset();
    (useKeycloak as jest.Mock).mockReturnValue({
      keycloak: {
        userInfo: {
          agencies: [1],
          roles: Claims.ADMIN_PROJECTS,
        },
        subject: 'test',
      },
    });
    let component: any;
    await waitFor(async () => {
      component = mount(getReviewApproveStep(store(mockProject(mockTasks))));
      const button = component.findWhere((node: { type: () => any; text: () => string }) => {
        return node.type() === Button && node.text() === 'Save';
      });

      button.simulate('click');
      expect(mockAxios.history.put).toHaveLength(1);
    });
  });
});

describe('Review approve modal behaviour', () => {
  it('confirmation popup does not appear when there are incomplete tasks', async () => {
    (useKeycloak as jest.Mock).mockReturnValue({
      keycloak: {
        userInfo: {
          agencies: [1],
          roles: Claims.ADMIN_PROJECTS,
        },
        subject: 'test',
      },
    });
    await act(async () => {
      const component = mount(getReviewApproveStep(store(mockProject(incompleteTask))));
      const button = component.findWhere((node: { type: () => any; text: () => string }) => {
        return node.type() === Button && node.text() === 'Approve';
      });

      button.simulate('click');

      return Promise.resolve().then(() => {
        expect(component.find(GenericModal)).toHaveLength(0);
      });
    });
  });
});
