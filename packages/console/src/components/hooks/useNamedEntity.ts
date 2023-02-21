import { useAPIContext } from 'components/data/apiContext';
import { Core } from '@flyteorg/flyteidl-types';
import { RequestConfig } from 'models/AdminEntity/types';
import { getNamedEntity } from 'models/Common/api';
import {
  DomainIdentifierScope,
  NamedEntity,
  ResourceIdentifier,
  ResourceType,
} from 'models/Common/types';
import { useFetchableData } from './useFetchableData';
import { usePagination } from './usePagination';

/** Fetches a NamedEntity (Workflow, LaunchPlan, Task, etc) for a given
 * resourceType/project/domain/name. This is useful to determine any metadata
 * associated with the given entity name */
export function useNamedEntity(input: ResourceIdentifier) {
  return useFetchableData<NamedEntity, ResourceIdentifier>(
    {
      debugName: 'NamedEntity',
      defaultValue: {} as NamedEntity,
      doFetch: id => getNamedEntity(id),
      useCache: true,
    },
    input,
  );
}

/** Fetches the NamedEntity record for a LaunchPlan */
export function useLaunchPlanNamedEntity(
  input: Omit<ResourceIdentifier, 'resourceType'>,
) {
  return useNamedEntity({
    ...input,
    resourceType: Core.ResourceType.LAUNCH_PLAN,
  });
}

/** Fetches the NamedEntity record for a Task */
export function useTaskNamedEntity(
  input: Omit<ResourceIdentifier, 'resourceType'>,
) {
  return useNamedEntity({ ...input, resourceType: Core.ResourceType.TASK });
}

/** Fetches the NamedEntity record for a Workflow */
export function useWorkflowNamedEntity(
  input: Omit<ResourceIdentifier, 'resourceType'>,
) {
  return useNamedEntity({
    ...input,
    resourceType: Core.ResourceType.WORKFLOW,
  });
}

/** A hook for fetching a paginated list of task names */
export function useTaskNameList(
  scope: DomainIdentifierScope,
  config: RequestConfig,
) {
  const { listNamedEntities } = useAPIContext();
  return usePagination<NamedEntity, DomainIdentifierScope>(
    { ...config, fetchArg: scope },
    (scope, requestConfig) =>
      listNamedEntities(
        { ...scope, resourceType: ResourceType.TASK },
        requestConfig,
      ),
  );
}

/** A hook for fetching a paginated list of workflow names */
export function useWorkflowNameList(
  scope: DomainIdentifierScope,
  config: RequestConfig,
) {
  const { listNamedEntities } = useAPIContext();
  return usePagination<NamedEntity, DomainIdentifierScope>(
    { ...config, fetchArg: scope },
    (scope, requestConfig) =>
      listNamedEntities(
        { ...scope, resourceType: ResourceType.WORKFLOW },
        requestConfig,
      ),
  );
}