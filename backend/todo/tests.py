from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, \
    APITestCase

from authapp.models import CustomUser
from authapp.views import CustomUserModelViewSet
from todo.models import Project, ToDo
from todo.views import ProjectViewSet


class TestUserViewSet(TestCase):

    def setUp(self) -> None:
        self.admin = CustomUser.objects.create_superuser(
            username='admin',
            password='admin',
            email='admin_ne@user.net'
        )

        self.user = CustomUser.objects.create_user(
            username='user',
            password='user',
            email='user@admin.net'
        )

    def test_get_user_list_by_anon_fail(self):
        factory = APIRequestFactory()
        requests = factory.get('api/users/')
        view = CustomUserModelViewSet.as_view({'get': 'list'})
        response = view(requests)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_user_list_by_admin_success(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = CustomUserModelViewSet.as_view({'get': 'list'})
        force_authenticate(request, self.admin)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProjectViewSet(TestCase):

    def setUp(self) -> None:
        self.admin = CustomUser.objects.create_superuser(
            username='admin',
            password='admin',
            email='admin_ne@user.net'
        )
        self.user = mixer.blend(CustomUser)
        self.project = mixer.blend(Project)

    def test_add_project_by_anon_fail(self):
        factory = APIRequestFactory()
        request = factory.post('/api/project/',
                               {
                                   "title": "DRF",
                                   "repository": "http://DRF.com",
                                   "users": [
                                       1,
                                       2
                                   ]
                               },
                               format="json")
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_add_project_by_admin_success(self):
        factory = APIRequestFactory()
        request = factory.post('/api/project/',
                               {
                                   "title": "DRF",
                                   "repository": "http://DRF.com",
                                   "users": [
                                       1,
                                       2
                                   ]
                               },
                               format="json")
        force_authenticate(request, self.admin)
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestToDoViewSet(APITestCase):

    def setUp(self) -> None:
        self.admin = CustomUser.objects.create_superuser(
            username='admin',
            password='admin',
            email='admin_ne@user.net'
        )
        self.user = mixer.blend(CustomUser)
        self.todo = mixer.blend(ToDo)

    def test_get_todo_list_success(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(f'/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_todo_item_success(self):
        self.client.force_authenticate(self.admin)
        response = self.client.get(f'/api/todo/{self.todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_todo_item_success(self):
        self.client.force_authenticate(self.user)
        response = self.client.put(f'/api/todo/{self.todo.id}/',
                                   {
                                       "body": "заметка",
                                       "project": 1,
                                       "user": 1
                                   }
                                   )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
