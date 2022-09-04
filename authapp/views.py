from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, UpdateModelMixin

from .models import CustomUser
from .serializers import CustomUserModelSerializer, CustomUserModelSerializerV2


class CustomUserModelViewSet(GenericViewSet,
                             RetrieveModelMixin,
                             ListModelMixin,
                             UpdateModelMixin):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return CustomUserModelSerializerV2
        return CustomUserModelSerializer
