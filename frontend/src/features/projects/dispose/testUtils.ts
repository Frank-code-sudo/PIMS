import { getCurrentFiscalYear } from 'utils';
import { DisposeWorkflowStatus, SPPApprovalTabs } from 'features/projects/constants';
import { IProjectTask, IProject, ITask, INotification } from 'features/projects/interfaces';
import { ProjectActions } from 'constants/actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as API from 'constants/API';
import { NoteTypes, PropertyTypes } from '../../../constants';
import { useKeycloak } from '@react-keycloak/web';
import { WorkflowStatus } from 'hooks/api/projects';

export const mockKeycloak = (claims: string[], agencies: number[]) => {
  (useKeycloak as jest.Mock).mockReturnValue({
    keycloak: {
      userInfo: {
        agencies: agencies,
        roles: claims,
      },
      subject: 'test',
    },
  });
};

export const mockTasks: IProjectTask[] = [
  {
    projectNumber: 123,
    taskId: 1,
    isOptional: true,
    isCompleted: false,
    name: 'task-0',
    description: 'one',
    taskType: 1,
    sortOrder: 0,
    completedOn: new Date(),
    statusId: 0,
    statusCode: DisposeWorkflowStatus.RequiredDocumentation,
  },
  {
    projectNumber: 123,
    taskId: 2,
    isOptional: true,
    isCompleted: true,
    name: 'task-1',
    description: 'two',
    taskType: 1,
    sortOrder: 0,
    completedOn: new Date(),
    statusId: 0,
    statusCode: DisposeWorkflowStatus.RequiredDocumentation,
  },
];

export const mockNotification: INotification[] = [
  {
    id: 0,
    key: '',
    projectId: 1,
    status: 'Pending',
    sendOn: '2030-01-01',
    to: 'test@test.com',
    subject: 'Testing',
    total: 0,
    projectNumber: '',
  },
];

export const mockProject: IProject = {
  projectNumber: 'test-01',
  name: 'my project',
  description: 'my project description',
  privateNote: 'private note',
  publicNote: 'public note',
  notes: [
    {
      noteType: NoteTypes.General,
      note: 'general',
    },
    {
      noteType: NoteTypes.Public,
      note: 'public',
    },
    {
      noteType: NoteTypes.Private,
      note: 'private',
    },
    {
      noteType: NoteTypes.Exemption,
      note: 'exemption',
    },
    {
      noteType: NoteTypes.AgencyInterest,
      note: 'agencyinterest',
    },
    {
      noteType: NoteTypes.Financial,
      note: 'financial',
    },
    {
      noteType: NoteTypes.PreMarketing,
      note: 'premarketing',
    },
    {
      noteType: NoteTypes.Marketing,
      note: 'marketing',
    },
    {
      noteType: NoteTypes.ContractInPlace,
      note: 'contractinplace',
    },
    {
      noteType: NoteTypes.Reporting,
      note: 'reporting',
    },
    {
      noteType: NoteTypes.LoanTerms,
      note: 'loanterms',
    },
    {
      noteType: NoteTypes.Adjustment,
      note: 'adjustment',
    },
    {
      noteType: NoteTypes.SplCost,
      note: 'sppcost',
    },
    {
      noteType: NoteTypes.SplGain,
      note: 'sppgain',
    },
    {
      noteType: NoteTypes.SalesHistory,
      note: 'saleshistory',
    },
    {
      noteType: NoteTypes.CloseOut,
      note: 'closeout',
    },
    {
      noteType: NoteTypes.Comments,
      note: 'comments',
    },
  ],
  properties: [],
  agencyId: 1,
  statusId: 0,
  statusCode: WorkflowStatus.ApprovedForErp,
  status: {
    id: 1,
    name: 'Approved for ERP',
    sortOrder: 0,
    route: '',
    description: '',
    workflowCode: '',
    code: WorkflowStatus.ApprovedForErp,
    isMilestone: true,
    tasks: [],
    isOptional: false,
    isActive: true,
  },
  statusHistory: [],
  tierLevelId: 1,
  tasks: mockTasks,
  note: 'my notes',
  id: 1,
  fiscalYear: 2020,
  projectAgencyResponses: [],
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

export const mockWorkflow = [
  {
    description:
      'A new draft project that is not ready to submit to apply to be added to the Surplus Property Program.',
    route: '/projects/draft',
    isMilestone: false,
    code: 'DR',
    id: 1,
    name: 'Draft',
    isDisabled: false,
    sortOrder: 0,
    isOptional: false,
    workflowCode: 'SUBMIT-DISPOSAL',
    type: 'ProjectStatus',
    createdOn: '2020-06-29T04:46:45.2666667',
    rowVersion: 'AAAAAAAACUM=',
    isActive: true,
    tasks: [],
  },
  {
    description: 'Add properties to the project.',
    route: '/projects/properties',
    isMilestone: false,
    code: 'DR-P',
    id: 2,
    name: 'Select Properties',
    isDisabled: false,
    sortOrder: 1,
    isOptional: false,
    workflowCode: 'SUBMIT-DISPOSAL',
    type: 'ProjectStatus',
    createdOn: '2020-06-29T04:46:45.2666667',
    rowVersion: 'AAAAAAAACUQ=',
    isActive: true,
    tasks: [],
  },
  {
    description: 'Assign tier level, classification and update current financial information.',
    route: '/projects/information',
    isMilestone: false,
    code: 'DR-I',
    id: 3,
    name: 'Update Information',
    isDisabled: false,
    sortOrder: 2,
    isOptional: false,
    workflowCode: 'SUBMIT-DISPOSAL',
    type: 'ProjectStatus',
    createdOn: '2020-06-29T04:46:45.2666667',
    rowVersion: 'AAAAAAAACUU=',
    isActive: true,
    tasks: [],
  },
  {
    description:
      'Required documentation has been completed and sent (Surplus Declaration \u0026 Readiness Checklist, Triple Bottom Line).',
    route: '/projects/documentation',
    isMilestone: false,
    code: 'DR-D',
    id: 4,
    name: 'Required Documentation',
    isDisabled: false,
    sortOrder: 3,
    isOptional: false,
    workflowCode: 'SUBMIT-DISPOSAL',
    type: 'ProjectStatus',
    createdOn: '2020-06-29T04:46:45.2666667',
    rowVersion: 'AAAAAAAACUY=',
    isActive: true,
    tasks: [],
  },
  {
    description: 'The project is ready to be approved by owning agency.',
    route: '/projects/approval',
    isMilestone: false,
    code: 'DR-A',
    id: 5,
    name: 'Approval',
    isDisabled: false,
    sortOrder: 4,
    isOptional: false,
    workflowCode: 'SUBMIT-DISPOSAL',
    type: 'ProjectStatus',
    createdOn: '2020-06-29T04:46:45.2666667',
    rowVersion: 'AAAAAAAACUc=',
    isActive: true,
    tasks: [],
  },
  {
    description:
      'The project has been submitted for review to be added to the Surplus Property Program.',
    route: '/projects/review',
    isMilestone: false,
    code: 'DR-RE',
    id: 6,
    name: 'Review',
    isDisabled: false,
    sortOrder: 5,
    isOptional: false,
    workflowCode: 'SUBMIT-DISPOSAL',
    type: 'ProjectStatus',
    createdOn: '2020-06-29T04:46:45.2666667',
    rowVersion: 'AAAAAAAACUg=',
    isActive: true,
    tasks: [],
  },
];

const mockStore = configureMockStore([thunk]);
export const getStore = (mockProject: IProject, tab?: SPPApprovalTabs) =>
  mockStore({
    lookupCode: {
      lookupCodes: [
        {
          code: 'BCP',
          name: 'BC Transit Parent',
          isDisabled: false,
          id: 1,
          type: API.AGENCY_CODE_SET_NAME,
        },
        {
          code: 'BCT',
          name: 'BC Transit',
          isDisabled: false,
          id: 0,
          type: API.AGENCY_CODE_SET_NAME,
          parentId: 1,
        },
      ],
    },
    project: { project: mockProject },
    tasks: tasks,
    network: {
      [ProjectActions.GET_PROJECT]: {},
    },
    erpTab: tab,
    splTab: tab,
  });

export const mockApiProjectParcel = {
  id: 1007,
  projectId: '1007',
  propertyType: 'Land',
  parcelId: 87,
  propertyTypeId: PropertyTypes.PARCEL,
  parcel: {
    pid: '000-359-173',
    landArea: 34.74,
    landLegalDescription:
      'Lot 1, Plan 35726, Section 1, Nanaimo District, Except Plan VIP 66138 and Except Plan VIP 66141',
    zoning: '',
    zoningPotential: '',
    evaluations: [
      {
        parcelId: 87,
        date: '2018-01-01T00:00:00',
        key: 'Assessed',
        value: 10048000,
        firm: '',
        createdOn: '0001-01-01T00:00:00',
        updatedOn: '2020-07-27T19:20:44.5984243',
        rowVersion: 'AAAAAAAAWyU=',
      },
    ],
    fiscals: [
      {
        parcelId: 87,
        fiscalYear: getCurrentFiscalYear() - 1,
        key: 'NetBook',
        value: 0,
        createdOn: '2020-07-19T03:52:56.3079867',
        rowVersion: 'AAAAAAAAEF4=',
      },
      {
        parcelId: 87,
        fiscalYear: getCurrentFiscalYear(),
        key: 'NetBook',
        value: 1,
        createdOn: '0001-01-01T00:00:00',
        updatedOn: '2020-07-27T19:20:44.5984245',
        rowVersion: 'AAAAAAAAWyY=',
      },
      {
        parcelId: 87,
        fiscalYear: getCurrentFiscalYear(),
        key: 'Market',
        value: 1,
        createdOn: '0001-01-01T00:00:00',
        updatedOn: '2020-07-27T19:20:44.5984247',
        rowVersion: 'AAAAAAAAWyc=',
      },
    ],
    buildings: [],
    id: 87,
    projectNumber: 'SPP-10006',
    description: 'Nanaimo Main Campus except Wakesiah Ave \u0026 Res.',
    classificationId: 4,
    classification: 'Disposed',
    agencyId: 0,
    address: {
      id: 374,
      line1: '900 Fifth Street',
      administrativeArea: 'Nanaimo',
      provinceId: 'BC',
      province: 'British Columbia',
      postal: 'V9R 5S5',
      createdOn: '2020-07-19T03:52:56.3079873',
      rowVersion: 'AAAAAAAAEFs=',
    },
    latitude: 49.1556433,
    longitude: -123.9681175,
    isSensitive: false,
    isVisibleToOtherAgencies: false,
    createdOn: '2020-07-19T03:52:56.3079875',
    updatedOn: '2020-07-27T19:17:36.3603827',
    rowVersion: 'AAAAAAAAWuU=',
  },
  createdOn: '2020-07-27T19:15:57.8361774',
  updatedOn: '2020-07-27T19:17:36.3603819',
  rowVersion: 'AAAAAAAAWuY=',
};

export const mockApiProjectBuilding = {
  id: 1007,
  projectId: '1007',
  propertyType: 'Building',
  propertyTypeId: PropertyTypes.BUILDING,
  buildingId: 87,
  building: {
    pid: '000-359-173',
    landArea: 34.74,
    landLegalDescription:
      'Lot 1, Plan 35726, Section 1, Nanaimo District, Except Plan VIP 66138 and Except Plan VIP 66141',
    zoning: '',
    zoningPotential: '',
    evaluations: [
      {
        parcelId: 87,
        date: '2018-01-01T00:00:00',
        key: 'Assessed',
        value: 10048000,
        firm: '',
        createdOn: '0001-01-01T00:00:00',
        updatedOn: '2020-07-27T19:20:44.5984243',
        rowVersion: 'AAAAAAAAWyU=',
      },
    ],
    fiscals: [
      {
        parcelId: 87,
        fiscalYear: getCurrentFiscalYear() - 1,
        key: 'NetBook',
        value: 0,
        createdOn: '2020-07-19T03:52:56.3079867',
        rowVersion: 'AAAAAAAAEF4=',
      },
      {
        parcelId: 87,
        fiscalYear: getCurrentFiscalYear(),
        key: 'NetBook',
        value: 1,
        createdOn: '0001-01-01T00:00:00',
        updatedOn: '2020-07-27T19:20:44.5984245',
        rowVersion: 'AAAAAAAAWyY=',
      },
      {
        parcelId: 87,
        fiscalYear: getCurrentFiscalYear(),
        key: 'Market',
        value: 1,
        createdOn: '0001-01-01T00:00:00',
        updatedOn: '2020-07-27T19:20:44.5984247',
        rowVersion: 'AAAAAAAAWyc=',
      },
    ],
    buildings: [],
    id: 87,
    projectNumber: 'SPP-10006',
    description: 'Nanaimo Main Campus except Wakesiah Ave \u0026 Res.',
    classificationId: 4,
    classification: 'Disposed',
    agencyId: 0,
    address: {
      id: 374,
      line1: '900 Fifth Street',
      administrativeArea: 'Nanaimo',
      provinceId: 'BC',
      province: 'British Columbia',
      postal: 'V9R 5S5',
      createdOn: '2020-07-19T03:52:56.3079873',
      rowVersion: 'AAAAAAAAEFs=',
    },
    latitude: 49.1556433,
    longitude: -123.9681175,
    isSensitive: false,
    isVisibleToOtherAgencies: false,
    createdOn: '2020-07-19T03:52:56.3079875',
    updatedOn: '2020-07-27T19:17:36.3603827',
    rowVersion: 'AAAAAAAAWuU=',
  },
  createdOn: '2020-07-27T19:15:57.8361774',
  updatedOn: '2020-07-27T19:17:36.3603819',
  rowVersion: 'AAAAAAAAWuY=',
};

export const mockApiProject = {
  id: 1007,
  projectNumber: 'SPP-10006',
  name: 'test',
  reportedFiscalYear: 2021,
  actualFiscalYear: 2021,
  workflowId: 6,
  workflowCode: 'SPL',
  statusId: 32,
  statusCode: 'DIS',
  status: {
    description: 'The project has been disposed externally.',
    route: '/projects/disposed',
    isTerminal: true,
    tasks: [
      {
        taskId: 0,
        isCompleted: false,
        isOptional: false,
        isDisabled: false,
        sortOrder: 0,
        createdOn: '2020-07-19T03:52:01.1366667',
        rowVersion: 'AAAAAAAACbU=',
      },
      {
        taskId: 0,
        isCompleted: false,
        isOptional: false,
        isDisabled: false,
        sortOrder: 0,
        createdOn: '2020-07-19T03:52:01.1366667',
        rowVersion: 'AAAAAAAACbY=',
      },
      {
        taskId: 0,
        isCompleted: false,
        isOptional: false,
        isDisabled: false,
        sortOrder: 0,
        createdOn: '2020-07-19T03:52:01.1366667',
        rowVersion: 'AAAAAAAACbc=',
      },
    ],
    code: 'DIS',
    id: 32,
    name: 'Disposed',
    isDisabled: false,
    sortOrder: 21,
    type: 'ProjectStatus',
    createdOn: '2020-07-19T03:52:01.07',
    rowVersion: 'AAAAAAAACZM=',
  },
  riskId: 1,
  risk: 'Complete',
  tierLevelId: 1,
  tierLevel: 'Tier 1',
  purchaser: 'test',
  agencyId: 1,
  agency: 'AEST',
  submittedOn: '2020-07-27T19:16:39.5570424',
  approvedOn: '2020-07-27T19:16:39.5569856',
  clearanceNotificationSentOn: '2020-07-06T00:00:00',
  marketedOn: '2020-06-30T00:00:00',
  disposedOn: '2020-07-22T00:00:00',
  offerAcceptedOn: '2020-06-29T00:00:00',
  preliminaryFormSignedOn: '2020-07-01T00:00:00',
  finalFormSignedOn: '2020-07-08T00:00:00',
  exemptionRequested: false,
  netBook: 1234.0,
  market: 0.0,
  assessed: 10048000.0,
  salesCost: 0.0,
  netProceeds: 0.0,
  programCost: 0.0,
  gainLoss: 0.0,
  sppCapitalization: 0.0,
  gainBeforeSpl: 0.0,
  gainAfterSpp: 0.0,
  interestComponent: 0.0,
  offerAmount: 123.0,
  saleWithLeaseInPlace: false,
  priorYearAdjustment: false,
  priorYearAdjustmentAmount: 0.0,
  realtorCommission: 0.0,
  preliminaryFormSignedBy: 'pre',
  finalFormSignedBy: 'final',
  notes: [],
  properties: [mockApiProjectParcel, mockApiProjectBuilding],
  tasks: [
    {
      projectId: '1007',
      taskId: 1,
      isCompleted: true,
      completedOn: '2020-07-27T19:16:05.18',
      name: 'Surplus Declaration \u0026 Readiness Checklist completed and sent',
      description: 'Surplus Declaration \u0026 Readiness Checklist document emailed to SRES.',
      isOptional: false,
      isDisabled: false,
      sortOrder: 1,
      statusId: 4,
      statusCode: 'DR-D',
      createdOn: '2020-07-27T19:15:53.5521732',
      updatedOn: '2020-07-27T19:20:44.5984249',
      rowVersion: 'AAAAAAAAWyg=',
    },
    {
      projectId: '1007',
      taskId: 2,
      isCompleted: true,
      completedOn: '2020-07-27T19:16:05.18',
      name: 'Triple Bottom Line completed and sent',
      description: 'Triple Bottom Line document emailed to SRES.',
      isOptional: false,
      isDisabled: false,
      sortOrder: 2,
      statusId: 4,
      statusCode: 'DR-D',
      createdOn: '2020-07-27T19:15:53.5521733',
      updatedOn: '2020-07-27T19:20:44.598425',
      rowVersion: 'AAAAAAAAWyk=',
    },
    {
      projectId: '1007',
      taskId: 3,
      isCompleted: true,
      name: 'Review completed',
      description: 'Project property information has been reviewed',
      isOptional: false,
      isDisabled: false,
      sortOrder: 0,
      statusId: 7,
      statusCode: 'AS-I',
      createdOn: '2020-07-27T19:15:53.5521734',
      updatedOn: '2020-07-27T19:20:44.5984251',
      rowVersion: 'AAAAAAAAWyo=',
    },
    {
      projectId: '1007',
      taskId: 4,
      isCompleted: false,
      name: 'Review completed',
      description: 'Project property information has been reviewed',
      isOptional: false,
      isDisabled: false,
      sortOrder: 0,
      statusId: 8,
      statusCode: 'AS-EXE',
      createdOn: '2020-07-27T19:15:53.5521735',
      updatedOn: '2020-07-27T19:20:44.5984254',
      rowVersion: 'AAAAAAAAWys=',
    },
    {
      projectId: '1007',
      taskId: 5,
      isCompleted: true,
      name: 'Documents received and review completed',
      description: 'Documents have been received, reviewed and approved.',
      isOptional: false,
      isDisabled: false,
      sortOrder: 0,
      statusId: 10,
      statusCode: 'AS-D',
      createdOn: '2020-07-27T19:15:53.5521736',
      updatedOn: '2020-07-27T19:20:44.5984256',
      rowVersion: 'AAAAAAAAWyw=',
    },
    {
      projectId: '1007',
      taskId: 6,
      isCompleted: false,
      name: 'Appraisal ordered',
      description: 'An appraisal has been ordered.',
      isOptional: true,
      isDisabled: false,
      sortOrder: 1,
      statusId: 11,
      statusCode: 'AS-AP',
      createdOn: '2020-07-27T19:15:53.5521738',
      updatedOn: '2020-07-27T19:20:44.5984257',
      rowVersion: 'AAAAAAAAWy0=',
    },
    {
      projectId: '1007',
      taskId: 7,
      isCompleted: false,
      name: 'Appraisal received',
      description: 'An appraisal has been received.',
      isOptional: true,
      isDisabled: false,
      sortOrder: 2,
      statusId: 11,
      statusCode: 'AS-AP',
      createdOn: '2020-07-27T19:15:53.552174',
      updatedOn: '2020-07-27T19:20:44.5984259',
      rowVersion: 'AAAAAAAAWy4=',
    },
    {
      projectId: '1007',
      taskId: 8,
      isCompleted: false,
      name: 'Appraisal completed',
      description: 'An appraisal has been reviewed and completed.',
      isOptional: true,
      isDisabled: false,
      sortOrder: 3,
      statusId: 11,
      statusCode: 'AS-AP',
      createdOn: '2020-07-27T19:15:53.5521741',
      updatedOn: '2020-07-27T19:20:44.598426',
      rowVersion: 'AAAAAAAAWy8=',
    },
    {
      projectId: '1007',
      taskId: 9,
      isCompleted: false,
      name: 'Preparation and due diligence',
      description: 'First Nations consulatation preparation and due diligence.',
      isOptional: true,
      isDisabled: false,
      sortOrder: 1,
      statusId: 12,
      statusCode: 'AS-FNC',
      createdOn: '2020-07-27T19:15:53.5521742',
      updatedOn: '2020-07-27T19:20:44.5984261',
      rowVersion: 'AAAAAAAAWzA=',
    },
    {
      projectId: '1007',
      taskId: 10,
      isCompleted: false,
      name: 'Consultation underway',
      description: 'First Nations consulation is underway.',
      isOptional: true,
      isDisabled: false,
      sortOrder: 2,
      statusId: 12,
      statusCode: 'AS-FNC',
      createdOn: '2020-07-27T19:15:53.5521744',
      updatedOn: '2020-07-27T19:20:44.5984263',
      rowVersion: 'AAAAAAAAWzE=',
    },
    {
      projectId: '1007',
      taskId: 11,
      isCompleted: false,
      name: 'Consultation complete',
      description: 'First Nations consultation is complete.',
      isOptional: true,
      isDisabled: false,
      sortOrder: 3,
      statusId: 12,
      statusCode: 'AS-FNC',
      createdOn: '2020-07-27T19:15:53.5521745',
      updatedOn: '2020-07-27T19:20:44.5984264',
      rowVersion: 'AAAAAAAAWzI=',
    },
    {
      projectId: '1007',
      taskId: 12,
      isCompleted: false,
      name: 'Notification to confirm exemption request sent to agency ADM',
      description: 'ADM has been notified of request for exemption',
      isOptional: false,
      isDisabled: false,
      sortOrder: 1,
      statusId: 13,
      statusCode: 'AS-EXP',
      createdOn: '2020-07-27T19:15:53.5521747',
      updatedOn: '2020-07-27T19:20:44.5984266',
      rowVersion: 'AAAAAAAAWzM=',
    },
    {
      projectId: '1007',
      taskId: 13,
      isCompleted: false,
      name: 'Confirmation has been received from agency ADM',
      description: 'ADM has approved the request for exemption',
      isOptional: false,
      isDisabled: false,
      sortOrder: 2,
      statusId: 13,
      statusCode: 'AS-EXP',
      createdOn: '2020-07-27T19:15:53.5521748',
      updatedOn: '2020-07-27T19:20:44.5984268',
      rowVersion: 'AAAAAAAAWzQ=',
    },
    {
      projectId: '1007',
      taskId: 14,
      isCompleted: true,
      name: 'Appraisal ordered',
      description: 'An appraisal has been ordered.',
      isOptional: false,
      isDisabled: false,
      sortOrder: 1,
      statusId: 32,
      statusCode: 'DIS',
      createdOn: '2020-07-27T19:15:53.552175',
      updatedOn: '2020-07-27T19:20:44.5984269',
      rowVersion: 'AAAAAAAAWzU=',
    },
    {
      projectId: '1007',
      taskId: 15,
      isCompleted: true,
      name: 'Appraisal received',
      description: 'An appraisal has been received.',
      isOptional: false,
      isDisabled: false,
      sortOrder: 2,
      statusId: 32,
      statusCode: 'DIS',
      createdOn: '2020-07-27T19:15:53.5521751',
      updatedOn: '2020-07-27T19:20:44.5984271',
      rowVersion: 'AAAAAAAAWzY=',
    },
    {
      projectId: '1007',
      taskId: 16,
      isCompleted: true,
      name: 'Appraisal completed',
      description: 'An appraisal has been reviewed and completed.',
      isOptional: false,
      isDisabled: false,
      sortOrder: 3,
      statusId: 32,
      statusCode: 'DIS',
      createdOn: '2020-07-27T19:15:53.5521753',
      updatedOn: '2020-07-27T19:20:44.5984272',
      rowVersion: 'AAAAAAAAWzc=',
    },
    {
      projectId: '1007',
      taskId: 17,
      isCompleted: true,
      name: 'Bid Rigging, Collusion and Bias',
      description:
        'I confirm I have reviewed the offer and to the best of my knowledge confirm there is no identifiable opportunity for bid rigging, collusion and bias',
      isOptional: false,
      isDisabled: false,
      sortOrder: 4,
      statusId: 42,
      statusCode: 'SPL-CIP-C',
      createdOn: '2020-07-27T19:15:53.5521755',
      updatedOn: '2020-07-27T19:20:44.5984275',
      rowVersion: 'AAAAAAAAWzg=',
    },
  ],
  projectAgencyResponses: [],
  createdOn: '2020-07-27T19:15:53.5521726',
  updatedOn: '2020-07-27T19:20:44.5984234',
  rowVersion: 'AAAAAAAAWzk=',
  fiscalYear: 2020,
  description: 'desc',
  publicNote: 'public note',
  privateNote: 'private note',
  note: 'note',
};

export const mockFlatProject = {
  projectNumber: 'SPP-10006',
  name: 'test',
  note: 'note',
  notes: [
    {
      id: undefined,
      noteType: NoteTypes.General,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.Public,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.Private,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.Exemption,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.AgencyInterest,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.Financial,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.PreMarketing,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.Marketing,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.ContractInPlace,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.Reporting,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.LoanTerms,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.Adjustment,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.SplCost,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.SplGain,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.SalesHistory,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.CloseOut,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.Comments,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.Appraisal,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.Offer,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.Remediation,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.SplRemoval,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      noteType: NoteTypes.Documentation,
      note: '',
      projectId: 1007,
      rowVersion: undefined,
    },
    {
      id: undefined,
      note: '',
      noteType: NoteTypes.ErpNotification,
      projectId: 1007,
      rowVersion: undefined,
    },
  ],
  description: 'desc',
  properties: [
    {
      name: undefined,
      id: 87,
      projectPropertyId: 1007,
      parcelId: 87,
      pid: '000-359-173',
      description: 'Nanaimo Main Campus except Wakesiah Ave & Res.',
      landLegalDescription:
        'Lot 1, Plan 35726, Section 1, Nanaimo District, Except Plan VIP 66138 and Except Plan VIP 66141',
      zoning: '',
      zoningPotential: '',
      isSensitive: false,
      latitude: 49.1556433,
      longitude: -123.9681175,
      agencyId: 0,
      agency: '',
      agencyCode: '',
      subAgency: undefined,
      classification: 'Disposed',
      classificationId: 4,
      addressId: 374,
      address: '900 Fifth Street , Nanaimo',
      administrativeArea: 'Nanaimo',
      province: 'British Columbia',
      postal: 'V9R 5S5',
      assessedLand: '',
      assessedLandDate: undefined,
      assessedLandFirm: undefined,
      assessedLandRowVersion: undefined,
      assessedBuilding: 10048000,
      assessedBuildingDate: '2018-01-01T00:00:00',
      assessedBuildingFirm: '',
      assessedBuildingRowVersion: 'AAAAAAAAWyU=',
      netBook: 1,
      netBookFiscalYear: getCurrentFiscalYear(),
      netBookRowVersion: 'AAAAAAAAWyY=',
      market: 1,
      marketFiscalYear: getCurrentFiscalYear(),
      marketRowVersion: 'AAAAAAAAWyc=',
      propertyTypeId: 0,
      propertyType: 'Land',
      landArea: 34.74,
      parcels: [],
    },
    {
      id: 87,
      name: undefined,
      projectPropertyId: 1007,
      parcelId: 87,
      pid: '000-359-173',
      description: 'Nanaimo Main Campus except Wakesiah Ave & Res.',
      landLegalDescription:
        'Lot 1, Plan 35726, Section 1, Nanaimo District, Except Plan VIP 66138 and Except Plan VIP 66141',
      zoning: '',
      zoningPotential: '',
      isSensitive: false,
      latitude: 49.1556433,
      longitude: -123.9681175,
      agencyId: 0,
      agency: '',
      agencyCode: '',
      subAgency: undefined,
      classification: 'Disposed',
      classificationId: 4,
      addressId: 374,
      address: '900 Fifth Street , Nanaimo',
      administrativeArea: 'Nanaimo',
      province: 'British Columbia',
      postal: 'V9R 5S5',
      assessedLand: '',
      assessedLandDate: undefined,
      assessedLandFirm: undefined,
      assessedLandRowVersion: undefined,
      assessedBuilding: 10048000,
      assessedBuildingDate: '2018-01-01T00:00:00',
      assessedBuildingFirm: '',
      assessedBuildingRowVersion: 'AAAAAAAAWyU=',
      netBook: 1,
      netBookFiscalYear: getCurrentFiscalYear(),
      netBookRowVersion: 'AAAAAAAAWyY=',
      market: 1,
      marketFiscalYear: getCurrentFiscalYear(),
      marketRowVersion: 'AAAAAAAAWyc=',
      propertyTypeId: PropertyTypes.BUILDING,
      propertyType: 'Land',
      landArea: 34.74,
      parcels: [],
    },
  ],
  tierLevelId: 1,
  statusId: 32,
  agencyId: 1,
  tasks: [
    {
      projectId: '1007',
      taskId: 1,
      isCompleted: true,
      completedOn: '2020-07-27T19:16:05.18',
      name: 'Surplus Declaration & Readiness Checklist completed and sent',
      description: 'Surplus Declaration & Readiness Checklist document emailed to SRES.',
      isOptional: false,
      isDisabled: false,
      sortOrder: 1,
      statusId: 4,
      statusCode: 'DR-D',
      createdOn: '2020-07-27T19:15:53.5521732',
      updatedOn: '2020-07-27T19:20:44.5984249',
      rowVersion: 'AAAAAAAAWyg=',
    },
    {
      projectId: '1007',
      taskId: 2,
      isCompleted: true,
      completedOn: '2020-07-27T19:16:05.18',
      name: 'Triple Bottom Line completed and sent',
      description: 'Triple Bottom Line document emailed to SRES.',
      isOptional: false,
      isDisabled: false,
      sortOrder: 2,
      statusId: 4,
      statusCode: 'DR-D',
      createdOn: '2020-07-27T19:15:53.5521733',
      updatedOn: '2020-07-27T19:20:44.598425',
      rowVersion: 'AAAAAAAAWyk=',
    },
    {
      projectId: '1007',
      taskId: 3,
      isCompleted: true,
      name: 'Review completed',
      description: 'Project property information has been reviewed',
      isOptional: false,
      isDisabled: false,
      sortOrder: 0,
      statusId: 7,
      statusCode: 'AS-I',
      createdOn: '2020-07-27T19:15:53.5521734',
      updatedOn: '2020-07-27T19:20:44.5984251',
      rowVersion: 'AAAAAAAAWyo=',
    },
    {
      projectId: '1007',
      taskId: 4,
      isCompleted: false,
      name: 'Review completed',
      description: 'Project property information has been reviewed',
      isOptional: false,
      isDisabled: false,
      sortOrder: 0,
      statusId: 8,
      statusCode: 'AS-EXE',
      createdOn: '2020-07-27T19:15:53.5521735',
      updatedOn: '2020-07-27T19:20:44.5984254',
      rowVersion: 'AAAAAAAAWys=',
    },
    {
      projectId: '1007',
      taskId: 5,
      isCompleted: true,
      name: 'Documents received and review completed',
      description: 'Documents have been received, reviewed and approved.',
      isOptional: false,
      isDisabled: false,
      sortOrder: 0,
      statusId: 10,
      statusCode: 'AS-D',
      createdOn: '2020-07-27T19:15:53.5521736',
      updatedOn: '2020-07-27T19:20:44.5984256',
      rowVersion: 'AAAAAAAAWyw=',
    },
    {
      projectId: '1007',
      taskId: 6,
      isCompleted: false,
      name: 'Appraisal ordered',
      description: 'An appraisal has been ordered.',
      isOptional: true,
      isDisabled: false,
      sortOrder: 1,
      statusId: 11,
      statusCode: 'AS-AP',
      createdOn: '2020-07-27T19:15:53.5521738',
      updatedOn: '2020-07-27T19:20:44.5984257',
      rowVersion: 'AAAAAAAAWy0=',
    },
    {
      projectId: '1007',
      taskId: 7,
      isCompleted: false,
      name: 'Appraisal received',
      description: 'An appraisal has been received.',
      isOptional: true,
      isDisabled: false,
      sortOrder: 2,
      statusId: 11,
      statusCode: 'AS-AP',
      createdOn: '2020-07-27T19:15:53.552174',
      updatedOn: '2020-07-27T19:20:44.5984259',
      rowVersion: 'AAAAAAAAWy4=',
    },
    {
      projectId: '1007',
      taskId: 8,
      isCompleted: false,
      name: 'Appraisal completed',
      description: 'An appraisal has been reviewed and completed.',
      isOptional: true,
      isDisabled: false,
      sortOrder: 3,
      statusId: 11,
      statusCode: 'AS-AP',
      createdOn: '2020-07-27T19:15:53.5521741',
      updatedOn: '2020-07-27T19:20:44.598426',
      rowVersion: 'AAAAAAAAWy8=',
    },
    {
      projectId: '1007',
      taskId: 9,
      isCompleted: false,
      name: 'Preparation and due diligence',
      description: 'First Nations consulatation preparation and due diligence.',
      isOptional: true,
      isDisabled: false,
      sortOrder: 1,
      statusId: 12,
      statusCode: 'AS-FNC',
      createdOn: '2020-07-27T19:15:53.5521742',
      updatedOn: '2020-07-27T19:20:44.5984261',
      rowVersion: 'AAAAAAAAWzA=',
    },
    {
      projectId: '1007',
      taskId: 10,
      isCompleted: false,
      name: 'Consultation underway',
      description: 'First Nations consulation is underway.',
      isOptional: true,
      isDisabled: false,
      sortOrder: 2,
      statusId: 12,
      statusCode: 'AS-FNC',
      createdOn: '2020-07-27T19:15:53.5521744',
      updatedOn: '2020-07-27T19:20:44.5984263',
      rowVersion: 'AAAAAAAAWzE=',
    },
    {
      projectId: '1007',
      taskId: 11,
      isCompleted: false,
      name: 'Consultation complete',
      description: 'First Nations consultation is complete.',
      isOptional: true,
      isDisabled: false,
      sortOrder: 3,
      statusId: 12,
      statusCode: 'AS-FNC',
      createdOn: '2020-07-27T19:15:53.5521745',
      updatedOn: '2020-07-27T19:20:44.5984264',
      rowVersion: 'AAAAAAAAWzI=',
    },
    {
      projectId: '1007',
      taskId: 12,
      isCompleted: false,
      name: 'Notification to confirm exemption request sent to agency ADM',
      description: 'ADM has been notified of request for exemption',
      isOptional: false,
      isDisabled: false,
      sortOrder: 1,
      statusId: 13,
      statusCode: 'AS-EXP',
      createdOn: '2020-07-27T19:15:53.5521747',
      updatedOn: '2020-07-27T19:20:44.5984266',
      rowVersion: 'AAAAAAAAWzM=',
    },
    {
      projectId: '1007',
      taskId: 13,
      isCompleted: false,
      name: 'Confirmation has been received from agency ADM',
      description: 'ADM has approved the request for exemption',
      isOptional: false,
      isDisabled: false,
      sortOrder: 2,
      statusId: 13,
      statusCode: 'AS-EXP',
      createdOn: '2020-07-27T19:15:53.5521748',
      updatedOn: '2020-07-27T19:20:44.5984268',
      rowVersion: 'AAAAAAAAWzQ=',
    },
    {
      projectId: '1007',
      taskId: 14,
      isCompleted: true,
      name: 'Appraisal ordered',
      description: 'An appraisal has been ordered.',
      isOptional: false,
      isDisabled: false,
      sortOrder: 1,
      statusId: 32,
      statusCode: 'DIS',
      createdOn: '2020-07-27T19:15:53.552175',
      updatedOn: '2020-07-27T19:20:44.5984269',
      rowVersion: 'AAAAAAAAWzU=',
    },
    {
      projectId: '1007',
      taskId: 15,
      isCompleted: true,
      name: 'Appraisal received',
      description: 'An appraisal has been received.',
      isOptional: false,
      isDisabled: false,
      sortOrder: 2,
      statusId: 32,
      statusCode: 'DIS',
      createdOn: '2020-07-27T19:15:53.5521751',
      updatedOn: '2020-07-27T19:20:44.5984271',
      rowVersion: 'AAAAAAAAWzY=',
    },
    {
      projectId: '1007',
      taskId: 16,
      isCompleted: true,
      name: 'Appraisal completed',
      description: 'An appraisal has been reviewed and completed.',
      isOptional: false,
      isDisabled: false,
      sortOrder: 3,
      statusId: 32,
      statusCode: 'DIS',
      createdOn: '2020-07-27T19:15:53.5521753',
      updatedOn: '2020-07-27T19:20:44.5984272',
      rowVersion: 'AAAAAAAAWzc=',
    },
    {
      projectId: '1007',
      taskId: 17,
      isCompleted: true,
      name: 'Bid Rigging, Collusion and Bias',
      description:
        'I confirm I have reviewed the offer and to the best of my knowledge confirm there is no identifiable opportunity for bid rigging, collusion and bias',
      isOptional: false,
      isDisabled: false,
      sortOrder: 4,
      statusId: 42,
      statusCode: 'SPL-CIP-C',
      createdOn: '2020-07-27T19:15:53.5521755',
      updatedOn: '2020-07-27T19:20:44.5984275',
      rowVersion: 'AAAAAAAAWzg=',
    },
  ],
  projectAgencyResponses: [],
  publicNote: 'public note',
  privateNote: 'private note',
  statusCode: 'DIS',
  fiscalYear: 2020,
  confirmation: false,
  approvedOn: '2020-07-27T19:16:39.5569856',
  deniedOn: '',
  cancelledOn: '',
  submittedOn: '2020-07-27T19:16:39.5570424',
  initialNotificationSentOn: '',
  thirtyDayNotificationSentOn: '',
  sixtyDayNoficationSentOn: '',
  ninetyDayNotificationSentOn: '',
  onHoldNotificationSentOn: '',
  transferredWithinGreOn: '',
  clearanceNotificationSentOn: '2020-07-06T00:00:00',
  marketedOn: '2020-06-30T00:00:00',
  disposedOn: '2020-07-22T00:00:00',
  offerAcceptedOn: '2020-06-29T00:00:00',
  assessedOn: '',
  adjustedOn: '',
  preliminaryFormSignedOn: '2020-07-01T00:00:00',
  finalFormSignedOn: '2020-07-08T00:00:00',
  netBook: 1234,
  assessed: 10048000,
  appraised: '',
  market: 0,
  workflowCode: 'SPL',
  offerAmount: 123,
  purchaser: 'test',
  manager: '',
  actualFiscalYear: 2021,
  plannedFutureUse: '',
  preliminaryFormSignedBy: 'pre',
  finalFormSignedBy: 'final',
  interestComponent: 0,
  ocgFinancialStatement: '',
  salesCost: 0,
  gainBeforeSpl: 0,
  gainAfterSpp: 0,
  programCost: 0,
  priorYearAdjustmentAmount: 0,
  id: 1007,
  reportedFiscalYear: 2021,
  workflowId: 6,
  status: {
    description: 'The project has been disposed externally.',
    route: '/projects/disposed',
    isTerminal: true,
    tasks: [
      {
        createdOn: '2020-07-19T03:52:01.1366667',
        isCompleted: false,
        isDisabled: false,
        isOptional: false,
        rowVersion: 'AAAAAAAACbU=',
        sortOrder: 0,
        taskId: 0,
      },
      {
        createdOn: '2020-07-19T03:52:01.1366667',
        isCompleted: false,
        isDisabled: false,
        isOptional: false,
        rowVersion: 'AAAAAAAACbY=',
        sortOrder: 0,
        taskId: 0,
      },
      {
        createdOn: '2020-07-19T03:52:01.1366667',
        isCompleted: false,
        isDisabled: false,
        isOptional: false,
        rowVersion: 'AAAAAAAACbc=',
        sortOrder: 0,
        taskId: 0,
      },
    ],
    code: 'DIS',
    id: 32,
    name: 'Disposed',
    isDisabled: false,
    sortOrder: 21,
    type: 'ProjectStatus',
    createdOn: '2020-07-19T03:52:01.07',
    rowVersion: 'AAAAAAAACZM=',
  },
  riskId: 1,
  risk: 'Complete',
  tierLevel: 'Tier 1',
  agency: 'AEST',
  exemptionRequested: false,
  netProceeds: 0,
  gainLoss: 0,
  sppCapitalization: 0,
  saleWithLeaseInPlace: false,
  priorYearAdjustment: false,
  realtorCommission: 0,
  removalFromSplRequestOn: '',
  removalFromSplApprovedOn: '',
  removalFromSplRationale: '',
  createdOn: '2020-07-27T19:15:53.5521726',
  updatedOn: '2020-07-27T19:20:44.5984234',
  rowVersion: 'AAAAAAAAWzk=',
};
