from rest_framework import routers

from submissions.api import *

router = routers.DefaultRouter()
router.register(r'categories', CategoryViewSet, base_name='category')
router.register(r'votes', VotesViewSet, base_name='vote')


urlpatterns = router.urls
