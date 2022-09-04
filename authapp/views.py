from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, UpdateModelMixin

from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CustomUserModelViewSet(GenericViewSet,
                             RetrieveModelMixin,
                             ListModelMixin,
                             UpdateModelMixin):

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
