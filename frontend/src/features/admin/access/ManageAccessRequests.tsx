import * as React from 'react';
import { Container } from 'react-bootstrap';
import { AccessRequestStatus } from 'constants/accessStatus';
import { Table } from 'components/Table';
import { toFilteredApiPaginateParams } from 'utils/CommonFunctions';
import * as API from 'constants/API';
import { IAccessRequest } from 'interfaces';
import './ManageAccessRequests.scss';
import { IGenericNetworkAction, useAppSelector } from 'store';
import { useAccessRequest } from 'store/slices/hooks';
import * as actionTypes from 'constants/actionTypes';
import { IAccessRequestModel } from './interfaces';
import { AccessRequestFilter } from './components/Filter';
import { IFilterData } from 'actions/IFilterData';
import { columnDefinitions } from './constants/constants';
import { AccessRequestDetails } from './components/Details';

const ManageAccessRequests = () => {
  const api = useAccessRequest();
  const { pagedAccessRequests, pageSize, pageIndex, filter } = useAppSelector(
    store => store.accessRequest,
  );
  const [selectedRequest, setSelectedRequest] = React.useState<IAccessRequestModel | undefined>(
    undefined,
  );
  const columns = React.useMemo(() => columnDefinitions, []);
  const updateRequestAccessAdmin = useAppSelector(
    store =>
      (store.network.requests as any)[
        actionTypes.UPDATE_REQUEST_ACCESS_ADMIN
      ] as IGenericNetworkAction,
  );

  React.useEffect(() => {
    if (!updateRequestAccessAdmin?.isFetching) {
      const paginateParams: API.IPaginateAccessRequests = toFilteredApiPaginateParams<IFilterData>(
        pageIndex,
        pageSize,
        '',
        filter,
      );
      paginateParams.status = AccessRequestStatus.OnHold;
      api.getAccessRequestsAction(paginateParams);
    }
  }, [api, pageSize, filter, pageIndex, updateRequestAccessAdmin?.isFetching]);

  const requests = (pagedAccessRequests.items as IAccessRequest[]).map(
    ar =>
      ({
        id: ar.id as number,
        userId: ar.user.id as string,
        username: ar.user.username as string,
        firstName: ar.user.firstName as string,
        lastName: ar.user.lastName as string,
        email: ar.user.email as string,
        status: ar.status as string,
        note: ar.note as string,
        position: ar.user.position,
        agency: ar.agencies && ar.agencies.length !== 0 ? ar.agencies[0].name : ('' as string),
        role: ar.roles && ar.roles.length !== 0 ? ar.roles[0].name : '',
      } as IAccessRequestModel),
  );

  const showDetails = (req: IAccessRequestModel) => {
    setSelectedRequest(req);
  };

  return (
    <div className="manage-access-requests">
      <div className="ScrollContainer">
        <Container fluid className="TableToolbar">
          <span className="title mr-auto">PIMS Guests (Pending Approval)</span>
        </Container>
        <div className="search-bar">
          <AccessRequestFilter
            initialValues={filter}
            applyFilter={filter => api.updateFilter(filter)}
          />
        </div>
        {!!selectedRequest && (
          <AccessRequestDetails
            request={selectedRequest}
            onClose={() => setSelectedRequest(undefined)}
          />
        )}
        <Table<IAccessRequestModel>
          name="accessRequestsTable"
          columns={columns}
          data={requests}
          defaultCanSort={true}
          pageCount={Math.ceil(pagedAccessRequests.total / pageSize)}
          onRequestData={req => () => {
            if (pageIndex !== req.pageIndex) api.updatePageIndex(req.pageIndex);
          }}
          onRowClick={showDetails}
          clickableTooltip="Click user IDIR/BCeID to view User Information. Click row to open Access Request details."
        />
      </div>
    </div>
  );
};

export default ManageAccessRequests;
