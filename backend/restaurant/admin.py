from django.contrib import admin
from .models import Dish, Order, Contact

@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'spice_level', 'available')
    list_filter = ('category', 'spice_level', 'available')
    search_fields = ('name', 'description')
    ordering = ('category', 'name')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name', 'phone', 'total', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('customer_name', 'phone')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'subject', 'created_at')
    list_filter = ('subject', 'created_at')
    search_fields = ('first_name', 'last_name', 'email')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)