"""
UserRepository — encapsulates all ORM access for the User model (Repository).

Responsibility (SRP): every User query lives here. AuthService never touches the
    ORM directly (DIP).
Depends on: BaseRepository[User], User model.
Pattern: Repository.
SOLID: DIP · SRP · LSP
"""

from __future__ import annotations

from typing import Optional

from core.base.base_repository import BaseRepository
from apps.authentication.models import User


class UserRepository(BaseRepository[User]):

    def get_by_id(self, entity_id: int) -> Optional[User]:
        return User.objects.filter(pk=entity_id).first()

    def get_all(self, filters: dict | None = None) -> list[User]:
        qs = User.objects.all()
        if filters:
            qs = qs.filter(**filters)
        return list(qs)

    def create(self, data: dict) -> User:
        password = data.pop("password", None)
        user = User(**data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, entity_id: int, data: dict) -> User:
        User.objects.filter(pk=entity_id).update(**data)
        return User.objects.get(pk=entity_id)

    def delete(self, entity_id: int) -> None:
        User.objects.filter(pk=entity_id).delete()

    # ── Auth-specific ──────────────────────────────────────────────────────────

    def get_by_email(self, email: str) -> Optional[User]:
        return User.objects.filter(email__iexact=email).first()

    def email_exists(self, email: str) -> bool:
        return User.objects.filter(email__iexact=email).exists()
