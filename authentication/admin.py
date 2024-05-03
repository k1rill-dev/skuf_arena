from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User, UserPhoto


class PhotoInline(admin.StackedInline):
    model = UserPhoto


class CustomUserAdmin(UserAdmin):
    inlines = (PhotoInline,)
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined", "date_of_birth")}),
    )


admin.site.register(User, CustomUserAdmin)
admin.site.register(UserPhoto)
