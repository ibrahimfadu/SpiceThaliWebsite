from django.db import models

class Dish(models.Model):
    CATEGORY_CHOICES = [
        ('north', 'North Indian'),
        ('south', 'South Indian'),
    ]
    
    SPICE_LEVEL_CHOICES = [
        ('None', 'None'),
        ('Mild', 'Mild'),
        ('Medium', 'Medium'),
        ('Spicy', 'Spicy'),
    ]
    
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    spice_level = models.CharField(max_length=10, choices=SPICE_LEVEL_CHOICES)
    image = models.URLField()
    available = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('preparing', 'Preparing'),
        ('ready', 'Ready'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    customer_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    items = models.TextField()  # JSON string of cart items
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2)
    gst = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"

class Contact(models.Model):
    SUBJECT_CHOICES = [
        ('reservation', 'Table Reservation'),
        ('catering', 'Catering Inquiry'),
        ('feedback', 'Feedback'),
        ('complaint', 'Complaint'),
        ('other', 'Other'),
    ]
    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True)
    subject = models.CharField(max_length=20, choices=SUBJECT_CHOICES)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.subject}"