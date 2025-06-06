from rest_framework import serializers
from .models import Dish, Order, Contact

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'