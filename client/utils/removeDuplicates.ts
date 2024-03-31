import { Threads } from "@/types";

const seenIds = new Set();

export const removeDuplicates = (obj: Threads) => {
  if (seenIds.has(obj.id)) {
    return false;
  }
  seenIds.add(obj.id);
  return true;
};
