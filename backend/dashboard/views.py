from rest_framework import viewsets
from .models import User, PagePermission, Comment, CommentHistory
from .serializers import UserSerializer, PagePermissionSerializer, CommentSerializer, CommentHistorySerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]  # Only super admin can create/update users

class PagePermissionViewSet(viewsets.ModelViewSet):
    queryset = PagePermission.objects.all()
    serializer_class = PagePermissionSerializer
    permission_classes = [IsAdminUser]

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        # Save old content before updating for history tracking
        old_comment = Comment.objects.get(pk=serializer.instance.pk)
        if old_comment.content != serializer.validated_data.get('content'):
            CommentHistory.objects.create(
                comment=old_comment,
                modified_by=self.request.user,
                previous_content=old_comment.content
            )
        serializer.save()

class CommentHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CommentHistory.objects.all()
    serializer_class = CommentHistorySerializer
    permission_classes = [IsAdminUser]  # Only super admin can see history
