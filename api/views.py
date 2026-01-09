from rest_framework import viewsets
from .models import Anggota, Buku, Transaksi
from .serializers import AnggotaSerializer, BukuSerializer, TransaksiSerializer, UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "is_superuser": user.is_superuser,
        "email": user.email
    })

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        user_data = {
            "username": request.data.get("username"),
            "email": request.data.get("email"),
            "password": request.data.get("password"),
        }

        serializer = self.get_serializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        Anggota.objects.create(
            user=user,
            nama=request.data.get("nama", ""),
            email=request.data.get("email", ""),
            kategori=request.data.get("kategori", ""),
        )

        return Response({
            "message": "User registered & anggota created",
            "user_id": user.id,
            "username": user.username
        }, status=201)

class AnggotaViewSet(viewsets.ModelViewSet):
    queryset = Anggota.objects.all()
    serializer_class = AnggotaSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]

class BukuViewSet(viewsets.ModelViewSet):
    queryset = Buku.objects.all()
    serializer_class = BukuSerializer
    permission_classes = [AllowAny]

class TransaksiViewSet(viewsets.ModelViewSet):
    queryset = Transaksi.objects.all()
    serializer_class = TransaksiSerializer
    authentication_classes = [JWTAuthentication] 
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        anggota = Anggota.objects.get(user=self.request.user)
        transaksi = serializer.save(anggota=anggota)
        buku = transaksi.buku
        if buku.jumlah_tersedia > 0:
            buku.jumlah_tersedia -= 1
            buku.save()

class BookPopularityView(APIView):
    """
    View untuk mendapatkan data buku terpopuler berdasarkan jumlah peminjaman.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        popularity_data = Buku.objects.annotate(
            borrow_count=Count('transaksi')
        ).order_by('-borrow_count') 

        top_books = popularity_data[:5]
        response_data = []
        for book in top_books:
            response_data.append({
                'judul': book.judul,
                'penulis': book.penulis,
                'borrow_count': book.borrow_count
            })

        return Response(response_data)