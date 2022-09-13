import graphene
from graphene_django import DjangoObjectType

from authapp.models import CustomUser
from todo.models import ToDo, Project

"""
Запрос списка проектов, участвующих в них пользователей с 
сообщением и статусом заемтки
{
  allProjects {
    title
    users {
      username
      todoSet {
        body
        isActive
      }
    }
  }
}

Простой запрос 'всего'

{
  allProjects {
    title
    repository
  }
  allUsers {
    username
    email
    isStaff
    isSuperuser
  }
  allTodo {
    body
    isActive
    createdAt
  }
}

"""


class UsersType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UsersType)
    all_projects = graphene.List(ProjectType)
    all_todo = graphene.List(ToDoType)

    user_by_id = graphene.Field(UsersType, id=graphene.Int(required=True))
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    todo_by_id = graphene.Field(ToDoType, id=graphene.Int(required=True))

    def resolve_all_users(self, info):
        return CustomUser.objects.all()

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_all_todos(self, info):
        return ToDo.objects.all()

    def resolve_user_by_id(self, info, id):
        try:
            return CustomUser.objects.get(pk=id)
        except CustomUser.DoesNotExist:
            return None

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(pk=id)
        except Project.DoesNotExist:
            return None

    def resolve_todo_by_id(self, info, id):
        try:
            return ToDo.objects.get(pk=id)
        except ToDo.DoesNotExist:
            return None


class ToDoMutation(graphene.Mutation):
    class Arguments:
        body = graphene.String()
        # is_active = graphene.Boolean()
        id = graphene.ID()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, body, is_active, id):
    # def mutate(cls, root, info, body, id):

        if any([body, is_active]):
        # if body:
            todo = ToDo.objects.get(pk=id)
            if body:
                todo.body = body
            if is_active:
                todo.is_active = is_active
            todo.save()
            return ToDoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = ToDoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
