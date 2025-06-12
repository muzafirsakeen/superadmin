from rest_framework import serializers
from .models import User, PagePermission, Comment, CommentHistory

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'is_super_admin']

class PagePermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PagePermission
        fields = ['id', 'user', 'page', 'can_view', 'can_edit', 'can_create', 'can_delete']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'page', 'user', 'text', 'created_at', 'updated_at']

class CommentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentHistory
        fields = ['id', 'comment', 'text', 'modified_by', 'modified_at']
