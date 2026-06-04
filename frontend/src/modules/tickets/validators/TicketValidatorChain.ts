/**
 * Façade over the ticket creation validator chain built by ValidatorFactory.
 *
 * Responsibility (SRP): expose a single run(data) entry point.
 *     Does not know which nodes exist or in what order — ValidatorFactory decides.
 * Depends on: ValidatorFactory (src/core/factories/ValidatorFactory.ts) — DIP.
 * Pattern: Chain of Responsibility (façade) + Factory (delegates construction).
 * SOLID: SRP · DIP · OCP
 *
 * OCP: adding nodes in Sprint 4 = one line in ValidatorFactory; this class unchanged.
 *
 * Usage in CreateTicketForm:
 *   const chain = new TicketValidatorChain()
 *   const result = chain.run(formData)
 *   if (!result.isValid) showError(result.errors)
 */

import type { ValidationResult } from '../../../core/base/BaseValidator'

export class TicketValidatorChain {
  // root: BaseValidator — assigned by ValidatorFactory in constructor

  constructor() {
    // Implementation: import ValidatorFactory, call buildTicketChain(), store root node
  }

  /**
   * Run the full chain from the root node.
   * @param data - the form data object (typed as TicketCreatePayload)
   * @returns ValidationResult — first failure stops the chain (fail-fast)
   */
  run(data: unknown): ValidationResult {
    // Implementation: return this.root.run(data)
    throw new Error('Not implemented — Sprint 2 execution phase')
  }
}
