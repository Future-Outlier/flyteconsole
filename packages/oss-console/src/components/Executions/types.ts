import { NodeExecution, NodeExecutionMetadata } from '../../models/Execution/types';
import { TaskTemplate } from '../../models/Task/types';

export interface ExecutionPhaseConstants {
  text: string;
  value: string;
  badgeColor: string;
  nodeColor: string;
  textColor: string;
}

export enum NodeExecutionDisplayType {
  ArrayNode = 'Array Node',
  MapTask = 'Map Task',
  BatchHiveTask = 'Hive Batch Task',
  BranchNode = 'Branch Node',
  GateNode = 'Gate Node',
  DynamicTask = 'Dynamic Task',
  HiveTask = 'Hive Task',
  PythonTask = 'Python Task',
  SidecarTask = 'Sidecar Task',
  SparkTask = 'Spark Task',
  Workflow = 'Sub-Workflow',
  Unknown = 'Unknown',
  UnknownTask = 'Unknown Task',
  WaitableTask = 'Waitable Task',
  MpiTask = 'MPI Task',
  // plugins
  ARRAY_AWS = 'AWS Map Task',
  ARRAY_K8S = 'K8S Map Task',
}

export interface ParentNodeExecution extends NodeExecution {
  metadata: NodeExecutionMetadata & {
    isParentNode: true;
  };
}

export interface DynamicNodeExecution extends NodeExecution {
  metadata: NodeExecutionMetadata & {
    isDynamic: true;
  };
}

export interface NodeExecutionDetails {
  displayId?: string;
  displayName?: string;
  displayType: string;
  scopedId?: string;
  subWorkflowName?: string;
  taskTemplate?: TaskTemplate;
}
