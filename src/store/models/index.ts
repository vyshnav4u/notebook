import { Models } from "@rematch/core";
import { count } from "./count";
import { annotation } from "./annotation";

export interface IRootModel extends Models<IRootModel> {
  count: typeof count;
  annotation: typeof annotation;
}

export const models: IRootModel = { count, annotation };