/**
 * Compatibility shim. Public Door 2 no longer uses a cart.
 * New code should import `@/lib/solutionDraft`.
 */
export {
  addDraftNeed as addSolutionCartItem,
  readSolutionDraft,
  removeDraftNeed as removeSolutionCartItem,
  SOLUTION_DRAFT_EVENT as SOLUTION_CART_EVENT,
  type SolutionDraftNeed as PublicSolutionCartItem,
} from "./solutionDraft";
