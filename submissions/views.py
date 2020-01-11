from django.conf.urls import url
from rest_framework import serializers, views
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response

from submissions.models import Image


class FileUploadView(views.APIView):
    parser_classes = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            image = Image()
            image.user = request.user
            image.file = request.FILES['file']
            image.save()
            return Response(
                {"id": image.id},
                status=204
            )
        return Response(status=500)

urlpatterns = [
    url(r"^upload/?", FileUploadView.as_view(), name="uploadfile"),
]
