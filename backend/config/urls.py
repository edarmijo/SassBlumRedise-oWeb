"""
URL configuration for config project.

API routing is mounted per-app under /api/. Each app owns its own urls.py
(SRP: config only composes; each app declares its own routes).
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    # ── API ────────────────────────────────────────────────────────────────
    path("api/auth/", include("apps.authentication.urls")),
    path("api/usuarios/", include("apps.authentication.user_urls")),
    path("api/servicios/", include("apps.catalog.urls")),
    path("api/tickets/", include("apps.tickets.urls")),
    path("api/reportes/", include("apps.reports.urls")),
    path("api/notificaciones/", include("apps.notifications.urls")),
]
