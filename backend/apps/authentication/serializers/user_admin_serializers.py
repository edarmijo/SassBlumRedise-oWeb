"""User admin serializers — one per operation (SRP). HU-14."""

from rest_framework import serializers


class UserCreateSerializer(serializers.Serializer):
    nombre = serializers.CharField(max_length=150)
    apellido = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    role = serializers.ChoiceField(choices=["worker", "admin"], default="worker")
