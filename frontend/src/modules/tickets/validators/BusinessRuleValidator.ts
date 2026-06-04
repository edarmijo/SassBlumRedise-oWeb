/**
 * Chain of Responsibility node — validates client-side business rules.
 *
 * Responsibility (SRP): enforce only UI-level business rules before submitting.
 *     No text field checks, no file checks — only pre-submit domain constraints.
 * Depends on: BaseValidator (src/core/base/BaseValidator.ts).
 * Pattern: Chain of Responsibility node.
 * SOLID: SRP · OCP · LSP
 *
 * Rules enforced (client-side mirror of BE BusinessRuleValidator):
 *   - Submission only within business hours (Mon–Fri 07:00–20:00, local time)
 *     Note: the authoritative check lives in the BE; this is UX-only early feedback.
 *
 * OCP: new client-side rule = new node; this class unchanged.
 *
 * Note: duplicate-ticket check is NOT done here (requires API call) — it lives in BE only.
 */

import { BaseValidator, type ValidationResult } from '../../../core/base/BaseValidator'

export class BusinessRuleValidator extends BaseValidator {
  validate(data: unknown): ValidationResult {
    // Implementation: check current local time against business hours window
    // Return ValidationResult(isValid=false, field='horario') outside window
    throw new Error('Not implemented — Sprint 2 execution phase')
  }
}
