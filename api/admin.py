from django.contrib import admin
from .models import Anggota, Buku, Transaksi

# Register model
admin.site.register(Anggota)
admin.site.register(Buku)
admin.site.register(Transaksi)