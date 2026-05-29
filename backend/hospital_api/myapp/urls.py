from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_root, name='api_root'),
    path('appointments/', views.create_appointment, name='create_appointment'),
    path('appointments/<int:pk>/', views.appointment_detail, name='appointment_detail'),
    path('appointments/<int:pk>/approve/', views.approve_appointment, name='approve_appointment'),
    path('appointments/<int:pk>/reject/', views.reject_appointment, name='reject_appointment'),
    path('contacts/', views.create_contact, name='create_contact'),
    path('enquiries/<int:pk>/', views.enquiry_detail, name='enquiry_detail'),
    path('send-otp/', views.send_otp, name='send_otp'),
    path('verify-otp/', views.verify_otp, name='verify_otp'),
    path('patient/appointments/', views.get_patient_appointments, name='patient_appointments'),
    path('patient/enquiries/', views.get_patient_enquiries, name='patient_enquiries'),
]

