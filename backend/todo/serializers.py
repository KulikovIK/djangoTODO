from rest_framework.serializers import StringRelatedField, ModelSerializer

from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    # users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'
