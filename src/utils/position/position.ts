import { delegy } from "delegy";

import { FlowFields } from "../../types/fields";
import { Position } from "../../types/position";

import { ListPositionUtils } from "./types/list";
import { CondPositionUtils } from "./types/cond";
import { LoopPositionUtils } from "./types/loop";

export namespace PositionUtils {
  export const createFlowFields = delegy<Position, [], ["type"], [], FlowFields>([], ["type"], {
    list: ListPositionUtils.createFlowFields,
    cond: CondPositionUtils.createFlowFields,
    loop: LoopPositionUtils.createFlowFields,
  });
}
