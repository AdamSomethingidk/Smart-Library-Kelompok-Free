from rest_framework import serializers
from .models import Anggota, Buku, Transaksi

class AnggotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anggota
        fields = '__all__'

class BukuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buku
        fields = '__all__'

class TransaksiSerializer(serializers.ModelSerializer):
    buku = BukuSerializer(read_only=True)
    anggota = AnggotaSerializer(read_only=True)

    class Meta:
        model = Transaksi
        fields = '__all__'