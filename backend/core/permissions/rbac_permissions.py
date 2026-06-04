"""
Role-based access control permissions — one class per role (ISP).

Responsibility (SRP): each class decides whether the requesting user holds a specific role.
Depends on: DRF BasePermission.
Pattern: ISP — one permission class per role, never a monolithic PermissionClass.
SOLID: ISP · SRP · OCP
"""

from rest_framework.permissions import BasePermission


class IsClient(BasePermission):
    """Grants access only to authenticated users with role == 'client'."""

    def has_permission(self, request, view) -> bool:
        from apps.authentication.models import User
        return (
            request.user.is_authenticated
            and request.user.role == User.Role.CLIENT
            and request.user.estado == User.Estado.ACTIVE
        )


class IsWorker(BasePermission):
    """Grants access only to authenticated users with role == 'worker'."""

    def has_permission(self, request, view) -> bool:
        from apps.authentication.models import User
        return (
            request.user.is_authenticated
            and request.user.role == User.Role.WORKER
            and request.user.estado == User.Estado.ACTIVE
        )


class IsAdmin(BasePermission):
    """Grants access only to authenticated users with role == 'admin'."""

    def has_permission(self, request, view) -> bool:
        from apps.authentication.models import User
        return (
            request.user.is_authenticated
            and request.user.role == User.Role.ADMIN
            and request.user.estado == User.Estado.ACTIVE
        )
