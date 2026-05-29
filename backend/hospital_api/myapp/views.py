from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail, EmailMultiAlternatives
from django.utils.html import strip_tags
from django.http import HttpResponse
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
import datetime as dt
import random
import os
from .models import Appointment, ContactMessage, Patient, OTPVerification
from .serializers import AppointmentSerializer, ContactMessageSerializer, PatientSerializer

def send_sms_to_doctor(patient_name, phone, department, date, time):
    doctor_phone = os.environ.get('DOCTOR_PHONE_NUMBER', '+919876543210')
    message_body = (
        f"Alert: New ZVM Hospital Appointment!\n"
        f"Patient: {patient_name}\n"
        f"Phone: {phone}\n"
        f"Department: {department}\n"
        f"Date: {date}\n"
        f"Time: {time}"
    )
    
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID', '')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN', '')
    from_number = os.environ.get('TWILIO_FROM_NUMBER', '')
    
    if account_sid and auth_token and from_number:
        try:
            from twilio.rest import Client
            client = Client(account_sid, auth_token)
            client.messages.create(
                body=message_body,
                from_=from_number,
                to=doctor_phone
            )
            print(f"--- Real SMS sent to Doctor at {doctor_phone} via Twilio ---")
            return True
        except Exception as e:
            print(f"--- Twilio SMS Dispatch Failed: {str(e)} ---")
    
    # Fallback log print
    print("\n" + "="*80)
    print(f"[SMS ALERT TO DOCTOR: {doctor_phone}]")
    print(message_body)
    print("="*80 + "\n")
    return False

@api_view(['POST'])
def create_appointment(request):
    department = request.data.get('department')
    date_str = request.data.get('date')
    time_slot = request.data.get('time')
    
    if not department or not date_str or not time_slot:
        return Response({'error': 'Department, date, and time slot are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
    try:
        booking_date = dt.datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)
        
    # 1. Double-booking slot validation check
    existing_booking = Appointment.objects.filter(
        department=department,
        date=booking_date,
        time=time_slot
    ).exclude(status='Rejected').first()
    
    if existing_booking:
        # Slot is taken! Let's search for the next available slot.
        standard_slots = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM']
        suggested_time = None
        suggested_date = booking_date
        
        # Check standard slots on the requested day
        for slot in standard_slots:
            slot_taken = Appointment.objects.filter(
                department=department,
                date=booking_date,
                time=slot
            ).exclude(status='Rejected').exists()
            if not slot_taken:
                suggested_time = slot
                break
                
        # If all slots on requested day are taken, check the next day at 9:00 AM
        if not suggested_time:
            suggested_date = booking_date + dt.timedelta(days=1)
            suggested_time = '9:00 AM'
            # Loop to find a free day
            while True:
                day_taken = Appointment.objects.filter(
                    department=department,
                    date=suggested_date,
                    time=suggested_time
                ).exclude(status='Rejected').exists()
                if not day_taken:
                    break
                suggested_date += dt.timedelta(days=1)
                
        return Response({
            'error': f'Doctor is unavailable at {time_slot} on {date_str}.',
            'suggested_slot': {
                'date': str(suggested_date),
                'time': suggested_time
            }
        }, status=status.HTTP_400_BAD_REQUEST)
        
    # If slot is free, proceed with saving the appointment
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        appointment = serializer.save()
        
        # Send elite HTML email to the Doctor
        doctor_email = getattr(settings, 'ADMIN_EMAIL', 'prathmeshpandore@gmail.com')
        subject = f"Appointment Request: {appointment.name} - {appointment.department}"
        
        # HTML Content with beautiful green/red action buttons
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f9fc;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #eef2f6;">
            <h2 style="color: #2D3748; border-bottom: 2px solid #edf2f7; padding-bottom: 10px;">New Consultation Request</h2>
            <p style="font-size: 16px; color: #4A5568;">A patient has booked a new clinical consultation slot. Details are provided below:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #718096; width: 150px;">Patient Name:</td>
                <td style="padding: 8px 0; color: #2D3748;">{appointment.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #718096;">Contact Phone:</td>
                <td style="padding: 8px 0; color: #2D3748;">{appointment.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #718096;">Patient Email:</td>
                <td style="padding: 8px 0; color: #2D3748;">{appointment.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #718096;">Department Unit:</td>
                <td style="padding: 8px 0; color: #2D3748; font-weight: bold;">{appointment.department}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #718096;">Date & Time:</td>
                <td style="padding: 8px 0; color: #2D3748;">{appointment.date} at {appointment.time}</td>
              </tr>
            </table>
            <p style="font-size: 14px; color: #718096; margin-top: 30px; margin-bottom: 20px;">Please click one of the actions below to review this booking:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:8000/api/appointments/{appointment.id}/approve/" style="background-color: #38A169; color: white; padding: 14px 28px; text-decoration: none; border-radius: 12px; font-weight: bold; margin-right: 15px; display: inline-block; box-shadow: 0 4px 6px rgba(56, 161, 105, 0.2);">Approve Booking</a>
              <a href="http://localhost:8000/api/appointments/{appointment.id}/reject/" style="background-color: #E53E3E; color: white; padding: 14px 28px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px rgba(229, 62, 62, 0.2);">Reject Booking</a>
            </div>
          </div>
        </body>
        </html>
        """
        text_content = strip_tags(html_content)
        
        try:
            msg = EmailMultiAlternatives(
                subject,
                text_content,
                settings.DEFAULT_FROM_EMAIL or 'noreply@hospital.com',
                [doctor_email]
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send()
        except Exception as e:
            print(f"Failed to send email to doctor: {str(e)}")
            
        # Send SMS Alert to Doctor
        send_sms_to_doctor(
            patient_name=appointment.name,
            phone=appointment.phone,
            department=appointment.department,
            date=str(appointment.date),
            time=appointment.time
        )
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_contact(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        contact = serializer.save()
        
        # Send email notification
        subject = f"New Contact Form Submission: {contact.subject}"
        message = (
            f"A new message was received from the contact form.\n\n"
            f"Name: {contact.name}\n"
            f"Email: {contact.email}\n"
            f"Subject: {contact.subject}\n"
            f"Message: {contact.message}\n"
        )
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL or 'noreply@hospital.com',
            [settings.ADMIN_EMAIL],
            fail_silently=False,
        )
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def send_otp(request):
    email = request.data.get('email')
    phone = request.data.get('phone')
    
    if not email and not phone:
        return Response({'error': 'Email or phone number is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Generate 6-digit OTP
    otp_code = f"{random.randint(100000, 999999)}"
    expires_at = timezone.now() + timedelta(minutes=5)
    
    # Store OTP in database and delete old ones
    if email:
        OTPVerification.objects.filter(email=email).delete()
        OTPVerification.objects.create(
            email=email,
            otp=otp_code,
            expires_at=expires_at
        )
    else:
        OTPVerification.objects.filter(phone=phone).delete()
        OTPVerification.objects.create(
            phone=phone,
            otp=otp_code,
            expires_at=expires_at
        )
        
    resp_data = {'success': 'OTP sent successfully'}
    
    if email:
        # Send via email
        subject = "ZVM Hospital - Your Patient Portal Verification Code"
        message = (
            f"Welcome to Z.V.M. Unani Medical College & Hospital.\n\n"
            f"Your verification code (OTP) is: {otp_code}\n"
            f"This code will expire in 5 minutes.\n\n"
            f"Please do not share this code with anyone.\n\n"
            f"Best regards,\n"
            f"ZVM Hospital Team"
        )
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL or 'noreply@zvmhospital.com',
                [email],
                fail_silently=False,
            )
            if settings.EMAIL_BACKEND == 'django.core.mail.backends.console.EmailBackend':
                resp_data['development_otp'] = otp_code
            return Response(resp_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': f'Failed to send email: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        # Send via SMS (Twilio or Console fallback)
        account_sid = os.environ.get('TWILIO_ACCOUNT_SID', '')
        auth_token = os.environ.get('TWILIO_AUTH_TOKEN', '')
        from_number = os.environ.get('TWILIO_FROM_NUMBER', '')
        
        message_body = f"Your ZVM Hospital patient portal verification code is: {otp_code}. It will expire in 5 minutes."
        
        if account_sid and auth_token and from_number:
            try:
                from twilio.rest import Client
                client = Client(account_sid, auth_token)
                client.messages.create(
                    body=message_body,
                    from_=from_number,
                    to=phone
                )
            except Exception as e:
                print(f"Twilio Patient OTP dispatch failed: {str(e)}")
                
        # Console output as fallback (and dev convenience)
        print("\n" + "="*80)
        print(f"[SMS OTP TO PATIENT PHONE: {phone}]")
        print(message_body)
        print("="*80 + "\n")
        
        resp_data['development_otp'] = otp_code # Always provide OTP in response during dev/fallback
        return Response(resp_data, status=status.HTTP_200_OK)

@api_view(['POST'])
def verify_otp(request):
    email = request.data.get('email')
    phone = request.data.get('phone')
    otp_code = request.data.get('otp')
    name = request.data.get('name', '')
    
    if not otp_code:
        return Response({'error': 'OTP is required'}, status=status.HTTP_400_BAD_REQUEST)
    if not email and not phone:
        return Response({'error': 'Email or phone number is required'}, status=status.HTTP_400_BAD_REQUEST)
        
    # Fetch the latest verification record
    if email:
        otp_record = OTPVerification.objects.filter(email=email).order_by('-created_at').first()
    else:
        otp_record = OTPVerification.objects.filter(phone=phone).order_by('-created_at').first()
        
    if not otp_record:
        return Response({'error': 'No OTP record found. Please send OTP first.'}, status=status.HTTP_400_BAD_REQUEST)
        
    if otp_record.expires_at < timezone.now():
        return Response({'error': 'OTP has expired. Please request a new one.'}, status=status.HTTP_400_BAD_REQUEST)
        
    if otp_record.otp != otp_code:
        return Response({'error': 'Invalid OTP code. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)
        
    # Valid OTP
    otp_record.is_verified = True
    otp_record.save()
    
    # Fetch or register Patient in database
    if email:
        patient, created = Patient.objects.get_or_create(email=email)
        if created or not patient.name:
            patient.name = name or email.split('@')[0].capitalize()
        if phone:
            patient.phone = phone
    else:
        patient, created = Patient.objects.get_or_create(phone=phone)
        if created or not patient.name:
            patient.name = name or f"Patient_{phone[-4:]}"
            
    patient.save()
    
    return Response({
        'success': 'OTP verified successfully',
        'patient': {
            'email': patient.email or '',
            'name': patient.name,
            'phone': patient.phone or ''
        }
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_patient_appointments(request):
    email = request.query_params.get('email')
    phone = request.query_params.get('phone')
    
    if not email and not phone:
        return Response({'error': 'Email or phone query parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
    if email:
        appointments = Appointment.objects.filter(email=email).order_by('-date', '-time')
    else:
        appointments = Appointment.objects.filter(phone=phone).order_by('-date', '-time')
        
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT', 'DELETE'])
def appointment_detail(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
    except Appointment.DoesNotExist:
        return Response({'error': 'Appointment not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        serializer = AppointmentSerializer(appointment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE':
        appointment.delete()
        return Response({'success': 'Appointment deleted successfully'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_patient_enquiries(request):
    email = request.query_params.get('email')
    phone = request.query_params.get('phone')
    
    if not email and not phone:
        return Response({'error': 'Email or phone query parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
    if email:
        enquiries = ContactMessage.objects.filter(email=email).order_by('-created_at')
    else:
        # If logged in with phone only, match by Patient record's email if available, otherwise return empty
        patient = Patient.objects.filter(phone=phone).first()
        if patient and patient.email:
            enquiries = ContactMessage.objects.filter(email=patient.email).order_by('-created_at')
        else:
            enquiries = ContactMessage.objects.none()
            
    serializer = ContactMessageSerializer(enquiries, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT', 'DELETE'])
def enquiry_detail(request, pk):
    try:
        enquiry = ContactMessage.objects.get(pk=pk)
    except ContactMessage.DoesNotExist:
        return Response({'error': 'Enquiry not found'}, status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'PUT':
        serializer = ContactMessageSerializer(enquiry, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE':
        enquiry.delete()
        return Response({'success': 'Enquiry deleted successfully'}, status=status.HTTP_200_OK)
@api_view(['GET'])
def approve_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
    except Appointment.DoesNotExist:
        return HttpResponse('<h2>Appointment not found</h2>', status=404)
        
    appointment.status = 'Approved'
    appointment.save()
    
    # Send email notification to patient
    subject = "Appointment Confirmed - ZVM Hospital"
    message = (
        f"Hello {appointment.name},\n\n"
        f"Your appointment request for the {appointment.department} unit has been APPROVED by the doctor.\n\n"
        f"Details:\n"
        f"Date: {appointment.date}\n"
        f"Time: {appointment.time}\n\n"
        f"We look forward to seeing you.\n\n"
        f"Best regards,\n"
        f"ZVM Hospital Team"
    )
    try:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL or 'noreply@hospital.com',
            [appointment.email],
            fail_silently=False,
        )
    except Exception as e:
        print(f"Failed to send email to patient: {str(e)}")
        
    # Render beautiful HTML confirmation page
    html_page = f"""
    <html>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; padding: 50px; background-color: #f7f9fc;">
      <div style="max-width: 500px; margin: auto; background: white; padding: 40px; border-radius: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #eef2f6;">
        <div style="font-size: 60px; margin-bottom: 20px;">✔️</div>
        <h1 style="color: #38A169; margin-bottom: 15px; font-weight: 800;">Appointment Approved!</h1>
        <p style="color: #4A5568; font-size: 16px; line-height: 1.6;">
          The consultation for <strong>{appointment.name}</strong> on {appointment.date} at {appointment.time} is successfully approved.
        </p>
        <p style="color: #718096; font-size: 14px; margin-top: 25px;">
          An confirmation email has been dispatched to the patient.
        </p>
      </div>
    </body>
    </html>
    """
    return HttpResponse(html_page)


@api_view(['GET'])
def reject_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
    except Appointment.DoesNotExist:
        return HttpResponse('<h2>Appointment not found</h2>', status=404)
        
    appointment.status = 'Rejected'
    appointment.save()
    
    # Send email notification to patient
    subject = "Appointment Declined - ZVM Hospital"
    message = (
        f"Hello {appointment.name},\n\n"
        f"We regret to inform you that your appointment request for {appointment.department} unit on {appointment.date} at {appointment.time} has been DECLINED by the doctor due to unavailability.\n\n"
        f"Please log in to your patient portal and reschedule or select another time slot.\n\n"
        f"Best regards,\n"
        f"ZVM Hospital Team"
    )
    try:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL or 'noreply@hospital.com',
            [appointment.email],
            fail_silently=False,
        )
    except Exception as e:
        print(f"Failed to send email to patient: {str(e)}")
        
    # Render beautiful HTML confirmation page
    html_page = f"""
    <html>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; padding: 50px; background-color: #f7f9fc;">
      <div style="max-width: 500px; margin: auto; background: white; padding: 40px; border-radius: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #eef2f6;">
        <div style="font-size: 60px; margin-bottom: 20px;">❌</div>
        <h1 style="color: #E53E3E; margin-bottom: 15px; font-weight: 800;">Appointment Declined</h1>
        <p style="color: #4A5568; font-size: 16px; line-height: 1.6;">
          The consultation request for <strong>{appointment.name}</strong> on {appointment.date} at {appointment.time} has been declined.
        </p>
        <p style="color: #718096; font-size: 14px; margin-top: 25px;">
          An alert email has been sent informing the patient of this status.
        </p>
      </div>
    </body>
    </html>
    """
    return HttpResponse(html_page)


@api_view(['GET'])
def api_root(request):
    return Response({
        "message": "Welcome to ZVM Hospital API Root",
        "endpoints": {
            "appointments": "/api/appointments/",
            "appointment_detail": "/api/appointments/<int:pk>/",
            "contacts": "/api/contacts/",
            "enquiry_detail": "/api/enquiries/<int:pk>/",
            "send_otp": "/api/send-otp/",
            "verify_otp": "/api/verify-otp/",
            "patient_appointments": "/api/patient/appointments/",
            "patient_enquiries": "/api/patient/enquiries/"
        }
    }, status=status.HTTP_200_OK)


