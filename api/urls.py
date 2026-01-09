from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnggotaViewSet, BukuViewSet, TransaksiViewSet, RegisterView, BookPopularityView, current_user
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
router = DefaultRouter()
router.register(r'anggota', AnggotaViewSet)
router.register(r'buku', BukuViewSet)
router.register(r'transaksi', TransaksiViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('analytics/book-popularity/', BookPopularityView.as_view(), name='book-popularity'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', current_user, name='current_user'),
]