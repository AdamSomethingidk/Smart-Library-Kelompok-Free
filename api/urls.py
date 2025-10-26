from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnggotaViewSet, BukuViewSet, TransaksiViewSet

router = DefaultRouter()
router.register(r'anggota', AnggotaViewSet)
router.register(r'buku', BukuViewSet)
router.register(r'transaksi', TransaksiViewSet)

urlpatterns = [
    path('', include(router.urls)),
]