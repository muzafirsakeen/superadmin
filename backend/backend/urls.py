from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from dashboard.views import UserViewSet, PagePermissionViewSet, CommentViewSet, CommentHistoryViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'permissions', PagePermissionViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'comment-history', CommentHistoryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
