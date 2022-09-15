from django.urls import re_path, path
from django.views.generic import TemplateView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from rest_framework.schemas import get_schema_view as simple_get_schema_view

schema_view = get_schema_view(
    openapi.Info(
        title='ToDo',
        default_version='0.0.1',
        description='ToDo project on REST API',
        contact=openapi.Contact(email='admin@user.net')
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('swagger-ui/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger-ui'),
    path('openapi', simple_get_schema_view(
                title="ToDo",
                description="ToDo project on REST API",
                version="0.0.1"
            ), name='openapi-schema'),
]
