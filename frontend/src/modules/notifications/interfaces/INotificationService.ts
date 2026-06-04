/**
 * Root contract for the notification service on the frontend.
 *
 * Responsibility (SRP): declare how components and hooks interact with notifications.
 *     No channel logic, no WebSocket management — only application-level operations.
 * Depends on: Notification and NotificationPreferences types defined below.
 * Pattern: DIP anchor — useNotifications hook depends on this, never on a concrete service.
 * SOLID: DIP · OCP · SRP
 *
 * Sprint coverage:
 *   S19 → this file (contract + types)
 *   S26 → NotificationClientContext + useNotifications hook implement/consume this
 */

// ── Shared types ──────────────────────────────────────────────────────────────

export type NotificationTipo =
  | 'creacion'
  | 'asignacion'
  | 'cambio_estado'
  | 'comentario'
  | 'reasignacion'
  | 'password_reset'
  | 'informacion'

export interface Notification {
  id: string
  tipo: NotificationTipo
  titulo: string
  cuerpo: string
  leida: boolean
  payload: Record<string, unknown>
  creadoEn: string  // ISO 8601
}

export interface NotificationPreferences {
  emailActivo: boolean
  inAppActivo: boolean
  wsActivo: boolean
}

export interface PaginatedNotifications {
  items: Notification[]
  total: number
  unreadCount: number
  page: number
}

// ── Service contract ──────────────────────────────────────────────────────────

export interface INotificationService {
  /**
   * Load paginated notifications for the current user.
   * Called on mount and after marking notifications as read.
   */
  getUserNotifications(page?: number): Promise<PaginatedNotifications>

  /**
   * Mark a single notification as read.
   * Returns the updated notification.
   */
  markAsRead(notificationId: string): Promise<Notification>

  /** Load the current user's channel preferences. */
  getPreferences(): Promise<NotificationPreferences>

  /** Partially update the current user's channel preferences. */
  setPreferences(data: Partial<NotificationPreferences>): Promise<NotificationPreferences>
}
