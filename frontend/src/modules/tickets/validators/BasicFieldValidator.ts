/**
 * Chain of Responsibility node — validates text fields on the ticket form.
 *
 * Responsibility (SRP): enforce only character-count rules on asunto and descripcion.
 *     No file checks, no API calls — just field length.
 * Depends on: BaseValidator (src/core/base/BaseValidator.ts).
 * Pattern: Chain of Responsibility node.
 * SOLID: SRP · OCP · LSP
 *
 * Rules enforced:
 *   - asunto:      required, max 80 characters
 *   - descripcion: required, min 10 characters
 *
 * OCP: new field rule = new validator node; this class unchanged.
 *
 * Usage (assembled by ValidatorFactory):
 *   const chain = ValidatorFactory.buildTicketChain()
 *   const result = chain.run(formData)
 */

import { BaseValidator, type ValidationResult } from '../../../core/base/BaseValidator'

export class BasicFieldValidator extends BaseValidator {
  private static readonly ASUNTO_MAX = 80
  private static readonly DESCRIPCION_MIN = 10

  validate(data: unknown): ValidationResult {
    // Implementation: check (data as TicketFormData).asunto.length and descripcion.length
    // Return ValidationResult with field='asunto' or field='descripcion' on failure
    throw new Error('Not implemented — Sprint 2 execution phase')
  }
}
