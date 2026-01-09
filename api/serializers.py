from rest_framework import serializers
from .models import Anggota, Buku, Transaksi
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class AnggotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anggota
        fields = '__all__'

class BukuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buku
        fields = '__all__'

class TransaksiSerializer(serializers.ModelSerializer):
    buku = serializers.PrimaryKeyRelatedField(queryset=Buku.objects.all(), write_only=True)
    buku_detail = BukuSerializer(source='buku', read_only=True)
    anggota = AnggotaSerializer(read_only=True)

    class Meta:
        model = Transaksi
        fields = '__all__'