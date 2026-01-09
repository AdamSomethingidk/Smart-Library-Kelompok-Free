from django.db import models
from django.contrib.auth.models import User

class Anggota(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    nama = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    tanggal_bergabung = models.DateField(auto_now_add=True)
    kategori = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        verbose_name = "Anggota"
        verbose_name_plural = "Daftar Anggota"
    def __str__(self):
        return self.nama

class Buku(models.Model):
    judul = models.CharField(max_length=255)
    penulis = models.CharField(max_length=150)
    tahun_terbit = models.IntegerField(blank=True, null=True)
    genre = models.CharField(max_length=50, blank=True, null=True)
    jumlah_tersedia = models.IntegerField(default=1)

    class Meta:
        verbose_name = "Buku"
        verbose_name_plural = "Daftar Buku"

    def __str__(self):
        return self.judul

class Transaksi(models.Model):
    STATUS_CHOICES = [
        ('Dipinjam', 'Dipinjam'),
        ('Kembali', 'Kembali'),
        ('Terlambat', 'Terlambat'),
    ]

    buku = models.ForeignKey(Buku, on_delete=models.CASCADE)
    anggota = models.ForeignKey(Anggota, on_delete=models.CASCADE)
    tanggal_pinjam = models.DateField(auto_now_add=True)
    tanggal_kembali = models.DateField(blank=True, null=True)
    tanggal_jatuh_tempo = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Dipinjam')

    class Meta:
        verbose_name = "Transaksi"
        verbose_name_plural = "Daftar Transaksi"
    def __str__(self):
        return f"{self.anggota.nama} pinjam {self.buku.judul}"