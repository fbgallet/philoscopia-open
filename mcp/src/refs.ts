// Where referential refs live inside a workspace record. One vocabulary, two
// faces: the checker reads them (writes may never invent a ref, and refs that
// stopped resolving are surfaced), the migrations rewrite them when the
// referential renames what they point at. Kept in one module so the two can
// never drift apart.

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Fields holding an array of refs (workspace-local ids ride along). */
const REF_ARRAYS = ["relatedAxes", "anchors", "grounds", "challengedBy", "inspiredBy", "relatedConcepts"] as const;

/** Fields holding a single ref. */
const REF_STRINGS = ["ref", "figureRef", "workRef"] as const;

/** A reading's agreements/disagreements may each echo a referential position. */
const REF_STANCES = ["agreements", "disagreements"] as const;

export function collectRefs(entry: any): string[] {
  const refs: string[] = [];
  for (const key of REF_ARRAYS) {
    if (Array.isArray(entry[key])) refs.push(...entry[key]);
  }
  for (const key of REF_STRINGS) {
    if (typeof entry[key] === "string") refs.push(entry[key]);
  }
  for (const key of REF_STANCES) {
    if (Array.isArray(entry[key])) {
      for (const stance of entry[key]) if (typeof stance?.ref === "string") refs.push(stance.ref);
    }
  }
  return refs;
}

/** Rewrite every ref of a record in place through `map` (identity = untouched).
 * Returns true when at least one ref changed. */
export function mapRefs(entry: any, map: (ref: string) => string): boolean {
  let changed = false;
  const rewrite = (ref: string): string => {
    const next = map(ref);
    if (next !== ref) changed = true;
    return next;
  };
  for (const key of REF_ARRAYS) {
    if (Array.isArray(entry[key])) entry[key] = entry[key].map(rewrite);
  }
  for (const key of REF_STRINGS) {
    if (typeof entry[key] === "string") entry[key] = rewrite(entry[key]);
  }
  for (const key of REF_STANCES) {
    if (Array.isArray(entry[key])) {
      for (const stance of entry[key]) if (typeof stance?.ref === "string") stance.ref = rewrite(stance.ref);
    }
  }
  return changed;
}
