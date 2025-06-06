from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DishViewSet, OrderViewSet, ContactViewSet

router = DefaultRouter()
router.register(r'dishes', DishViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'contacts', ContactViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dishes/category/<str:category>/', DishViewSet.as_view({'get': 'category'}), name='dishes-by-category'),
]