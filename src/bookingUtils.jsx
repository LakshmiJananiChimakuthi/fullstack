/**
 * Booking and Email Notification Utilities
 * 
 * This file contains utilities for managing therapy session bookings
 * and sending email notifications with Google Meet links.
 */

/**
 * Generate a random Google Meet link
 * In production, this should call the Google Meet API
 */
export const generateGoogleMeetLink = () => {
  const randomId = Math.random().toString(36).substring(2, 15);
  const part1 = randomId.slice(0, 3);
  const part2 = randomId.slice(3, 7);
  const part3 = randomId.slice(7, 10);
  return `https://meet.google.com/${part1}-${part2}-${part3}`;
};

/**
 * Send email notification to doctor and patient
 * In production, this should call your backend API endpoint
 */
export const sendBookingNotification = async (bookingDetails) => {
  const { doctorEmail, patientEmail, doctorName, patientName, date, time, meetLink } = bookingDetails;

  const emailData = {
    to: [doctorEmail, patientEmail],
    subject: "Therapy Session Booking Confirmed",
    htmlBody: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #667eea; text-align: center;">Therapy Session Confirmed ✅</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Session Details:</h3>
          <p><strong>Patient:</strong> ${patientName}</p>
          <p><strong>Doctor:</strong> ${doctorName}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
        </div>

        <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
          <h3 style="color: #667eea; margin-top: 0;">📹 Google Meet Link:</h3>
          <p style="margin: 10px 0;">
            <a href="${meetLink}" style="color: #667eea; font-size: 16px; text-decoration: none; font-weight: bold;">
              ${meetLink}
            </a>
          </p>
          <p style="color: #666; font-size: 14px;">Click the link above or copy and paste it into your browser to join the session.</p>
        </div>

        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #856404; margin: 0; font-size: 14px;">
            <strong>⏰ Reminder:</strong> Please join the session 5 minutes before the scheduled time.
          </p>
        </div>

        <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px;">
          If you need to reschedule or cancel, please contact us as soon as possible.
        </p>
      </div>
    `,
    plainTextBody: `
      Therapy Session Confirmed
      
      Session Details:
      Patient: ${patientName}
      Doctor: ${doctorName}
      Date: ${date}
      Time: ${time}
      
      Google Meet Link: ${meetLink}
      
      Please join the session at the scheduled time. Click or copy the link above to join.
      
      If you need to reschedule or cancel, please contact us as soon as possible.
    `
  };

  console.log("📧 Email notification prepared:", emailData);

  // In production, uncomment and implement the API call:
  /*
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
  */

  // For demo purposes, return success
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        success: true, 
        message: "Email notification sent successfully (demo mode)" 
      });
    }, 500);
  });
};

/**
 * Send cancellation notification
 */
export const sendCancellationNotification = async (cancellationDetails) => {
  const { doctorEmail, patientEmail, doctorName, patientName, date, time, reason } = cancellationDetails;

  const emailData = {
    to: [doctorEmail, patientEmail],
    subject: "Therapy Session Cancelled",
    htmlBody: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #eb3349; text-align: center;">Session Cancelled ❌</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Cancelled Session Details:</h3>
          <p><strong>Patient:</strong> ${patientName}</p>
          <p><strong>Doctor:</strong> ${doctorName}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
        </div>

        <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px;">
          Please contact us to reschedule your session.
        </p>
      </div>
    `
  };

  console.log("📧 Cancellation email prepared:", emailData);
  
  // In production, call your API here
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        success: true, 
        message: "Cancellation notification sent (demo mode)" 
      });
    }, 500);
  });
};

/**
 * Create a booking request
 */
export const createBookingRequest = async (bookingData) => {
  const { doctorId, doctorName, doctorEmail, patientName, patientEmail, date, time } = bookingData;

  const booking = {
    id: Date.now(),
    doctorId,
    doctorName,
    doctorEmail,
    patientName,
    patientEmail,
    date,
    time,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  console.log("📝 Booking request created:", booking);

  // Save to localStorage
  const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  existingBookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(existingBookings));

  // In production, save to database via API:
  /*
  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking)
    });

    if (!response.ok) {
      throw new Error('Failed to create booking');
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { success: false, error: error.message };
  }
  */

  // Return the booking
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        success: true, 
        data: booking,
        message: "Booking request sent to doctor" 
      });
    }, 500);
  });
};

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Get available time slots
 */
export const getAvailableTimeSlots = () => {
  return [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM"
  ];
};

/**
 * Validate booking data
 */
export const validateBookingData = (bookingData) => {
  const errors = [];

  if (!bookingData.patientName || bookingData.patientName.trim() === '') {
    errors.push("Patient name is required");
  }

  if (!bookingData.patientEmail || !isValidEmail(bookingData.patientEmail)) {
    errors.push("Valid email is required");
  }

  if (!bookingData.date) {
    errors.push("Date is required");
  } else {
    const selectedDate = new Date(bookingData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.push("Cannot book session in the past");
    }
  }

  if (!bookingData.time) {
    errors.push("Time is required");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get all bookings from localStorage
 */
export const getAllBookings = () => {
  const bookingsStr = localStorage.getItem('bookings');
  const bookings = JSON.parse(bookingsStr || '[]');
  console.log('🗂️ getAllBookings() - total bookings in storage:', bookings.length);
  console.log('📋 Full bookings array:', bookings);
  return bookings;
};

/**
 * Get bookings for a specific doctor
 */
export const getDoctorBookings = (doctorEmail) => {
  const allBookings = getAllBookings();
  const doctorBookings = allBookings.filter(booking => booking.doctorEmail === doctorEmail);
  console.log(`👨‍⚕️ Doctor (${doctorEmail}) has ${doctorBookings.length} bookings:`, doctorBookings);
  return doctorBookings;
};

/**
 * Get bookings for a specific student
 */
export const getStudentBookings = (patientEmail) => {
  const allBookings = getAllBookings();
  console.log('🔍 ALL bookings in localStorage:', allBookings);
  const studentBookings = allBookings.filter(booking => booking.patientEmail === patientEmail);
  console.log(`🎓 Student (${patientEmail}) bookings:`, studentBookings);
  return studentBookings;
};

/**
 * Update booking status
 */
export const updateBookingStatus = (bookingId, status, meetLink = null) => {
  console.log('🔧 updateBookingStatus called:', { bookingId, status, meetLink });
  const allBookings = getAllBookings();
  const updatedBookings = allBookings.map(booking => {
    if (booking.id === bookingId) {
      console.log('📝 Updating booking:', { oldStatus: booking.status, newStatus: status, meetLink });
      return { ...booking, status, meetLink, updatedAt: new Date().toISOString() };
    }
    return booking;
  });
  const updated = updatedBookings.find(b => b.id === bookingId);
  console.log('💾 Updated booking object:', updated);
  localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  console.log('✅ Saved to localStorage. New bookings array:', updatedBookings);
  return updated;
};

/**
 * Save completed session to history
 */
export const saveCompletedSession = (sessionData) => {
  const completedSessions = JSON.parse(localStorage.getItem('completedSessions') || '[]');
  completedSessions.push({
    ...sessionData,
    completedAt: new Date().toISOString()
  });
  localStorage.setItem('completedSessions', JSON.stringify(completedSessions));
};

/**
 * Get completed sessions for a doctor
 */
export const getDoctorCompletedSessions = (doctorEmail) => {
  const completedSessions = JSON.parse(localStorage.getItem('completedSessions') || '[]');
  return completedSessions.filter(session => session.doctorEmail === doctorEmail);
};

export default {
  generateGoogleMeetLink,
  sendBookingNotification,
  sendCancellationNotification,
  createBookingRequest,
  formatDate,
  getAvailableTimeSlots,
  validateBookingData,
  getAllBookings,
  getDoctorBookings,
  getStudentBookings,
  updateBookingStatus,
  saveCompletedSession,
  getDoctorCompletedSessions
};
