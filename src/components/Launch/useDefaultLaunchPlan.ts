import { useAPIContext } from 'components/data/apiContext';
import { useFetchableData } from 'components/hooks';
import { NotFoundError } from 'errors';
import { LaunchPlan, WorkflowId } from 'models';

/** Returns a fetchable for the default launch plan whose project/domain/name/version
 * match the values in the given WorkflowId.
 */
export function useDefaultLaunchPlan(workflowId: WorkflowId | null = null) {
    const { getLaunchPlan } = useAPIContext();

    const doFetch = async (id: WorkflowId | null) => {
        if (id === null) {
            throw new Error('No workflow id provided');
        }
        try {
            // Default launch plan is the one whose name/version matches the workflow
            return await getLaunchPlan(id);
        } catch (error) {
            if (error instanceof NotFoundError) {
                console.log('No default launch plan found');
                return undefined;
            }
            throw error;
        }
    };
    return useFetchableData<LaunchPlan | undefined, WorkflowId | null>(
        {
            doFetch,
            defaultValue: undefined,
            debugName: 'useDefaultLaunchPlan',
            autoFetch: workflowId !== null
        },
        workflowId
    );
}
