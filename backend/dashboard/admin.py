from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, PagePermission, Comment, CommentHistory

class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ('email', 'is_super_admin', 'is_staff', 'is_active')
    list_filter = ('is_super_admin', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password', 'username')}),
        ('Permissions', {'fields': ('is_super_admin', 'is_staff', 'is_active', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_super_admin', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)

admin.site.register(User, UserAdmin)
admin.site.register(PagePermission)
admin.site.register(Comment)
admin.site.register(CommentHistory)
