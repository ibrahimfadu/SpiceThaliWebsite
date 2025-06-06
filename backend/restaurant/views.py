from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Dish, Order, Contact
from .serializers import DishSerializer, OrderSerializer, ContactSerializer

class DishViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    
    @action(detail=False, methods=['get'])
    def category(self, request):
        category = request.query_params.get('category')
        if category in ['north', 'south']:
            dishes = Dish.objects.filter(category=category, available=True)
            serializer = self.get_serializer(dishes, many=True)
            return Response(serializer.data)
        return Response({'error': 'Invalid category'}, status=status.HTTP_400_BAD_REQUEST)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)