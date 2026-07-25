// Workspace migrations — the other half of the referential pin.
//
// A referential change that RETIRES an id leaves a ref that no longer
// resolves: danglingRefs() surfaces it and the user decides what to do. A
// change that REORDERS an axis's poles is silent instead — a weight vector is
// positional (one weight per pole, in pole order), so it stays perfectly valid
// while designating other positions. Nothing to surface, everything to
// rewrite: hence this registry.
//
// INVARIANT: a migration ships in the SAME release as the corpus change it
// compensates. The gate is the id list in the manifest (`referential.
// migrations`), not a date — so a release that shipped a reordered axis
// WITHOUT its migration would leave workspaces written in between to be
// migrated a second time, scrambling correct data.

import { mapRefs } from "./refs.js";

/* eslint-disable @typescript-eslint/no-explicit-any */

/** The workspace files a migration may rewrite, read for it and written back
 * only if it reports a change. */
export interface WorkspaceData {
  profile: any;
  collections: Record<string, any[]>;
}

export interface WorkspaceMigration {
  /** Stamped into `referential.migrations` once applied; never reused. */
  id: string;
  /** One line for the server log when a workspace is actually rewritten. */
  describe: string;
  /** Rewrites in place; returns true when something changed. */
  apply(data: WorkspaceData): boolean;
}

// ── consciousness-nature-poles-2026-07 ────────────────────────────────────

const CN_AXIS = "CONSCIOUSNESS_NATURE";

/** Old pole order → the same pole's index in the new one:
 * PHYSICALISM 0→3, SUBSTANCE_DUALISM 1→0, PROPERTY_DUALISM 2→1,
 * PANPSYCHISM 3→2 (widened into DUAL_ASPECT), ILLUSIONISM 4→4. */
const CN_REMAP = [3, 0, 1, 2, 4];

const CN_OLD_REF = `pole:${CN_AXIS}/PANPSYCHISM`;
const CN_NEW_REF = `pole:${CN_AXIS}/DUAL_ASPECT`;

const cnRef = (ref: string): string => (ref === CN_OLD_REF ? CN_NEW_REF : ref);

/** Permute one stored value; anything but a 5-weight vector is left alone
 * (a hand-edited or already-migrated file is not ours to guess at). */
function cnValue(value: any): boolean {
  if (value?.kind !== "weights" || !Array.isArray(value.weights) || value.weights.length !== CN_REMAP.length) {
    return false;
  }
  const permuted = CN_REMAP.map(() => 0);
  value.weights.forEach((w: number, i: number) => (permuted[CN_REMAP[i]] = w));
  value.weights = permuted;
  return true;
}

/**
 * 2026-07-25: CONSCIOUSNESS_NATURE was remodelled — its poles were reordered
 * and PANPSYCHISM widened into DUAL_ASPECT. Left as they are, the stored
 * vectors would read as another position: a physicalist comes back a dualist.
 * The widening is not a pure rename, but carrying the weight over is the
 * closest reading of what the user meant.
 */
const CONSCIOUSNESS_NATURE_POLES: WorkspaceMigration = {
  id: "consciousness-nature-poles-2026-07",
  describe: `${CN_AXIS}: pole order changed and PANPSYCHISM became DUAL_ASPECT`,
  apply({ profile, collections }) {
    let changed = false;

    const entry = profile?.entries?.[CN_AXIS];
    if (entry) {
      if (cnValue(entry.value)) changed = true;
      for (const record of entry.history ?? []) if (cnValue(record?.value)) changed = true;
    }
    // A position on ANY axis may cite the retired pole as its provenance.
    for (const record of Object.values<any>(profile?.entries ?? {})) {
      for (const step of record?.history ?? []) {
        if (typeof step?.provenance?.ref === "string" && step.provenance.ref === CN_OLD_REF) {
          step.provenance.ref = CN_NEW_REF;
          changed = true;
        }
      }
    }
    for (const items of Object.values(collections)) {
      for (const item of items) if (mapRefs(item, cnRef)) changed = true;
    }
    return changed;
  },
};

export const MIGRATIONS: WorkspaceMigration[] = [CONSCIOUSNESS_NATURE_POLES];

export const MIGRATION_IDS = MIGRATIONS.map((m) => m.id);
