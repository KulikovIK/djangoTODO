from django_filters import rest_framework as filters
from .models import ToDo, Project


class ProjectFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['title']


class ToDoFilter(filters.FilterSet):
    project = filters.CharFilter(field_name='project')
    created_at = filters.DateFromToRangeFilter()

    class Meta:
        model = ToDo
        fields = ['project', 'created_at']
