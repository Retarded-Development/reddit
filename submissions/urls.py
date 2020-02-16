from rest_framework import routers

from submissions.api import *

router = routers.DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'votes', VotesViewSet, basename='vote')
router.register(r'submissions', SubmissionViewSet, basename='submission')
router.register(r'comments', CommentViewSet, basename='comment')

urlpatterns = router.urls
