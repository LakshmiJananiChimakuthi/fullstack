# MindCare - Mental Health & Well-being Platform

## Overview

MindCare is a comprehensive mental health and counseling platform that connects students with licensed therapists and provides essential mental wellness resources. The application features a complete workflow from introduction, authentication, personalized dashboards, and various mental health services.

---

## Complete Workflow

### **1. Landing Page (Intro Page) - `/`**

**Purpose**: Introduces users to the MindCare platform with features overview.

**Components**:
- Hero section with platform tagline
- 4 feature cards showcasing main services:
  - 👨‍⚕️ Licensed Therapists
  - 🧘 Mindfulness Guides
  - 👥 Support Groups
  - 📋 Self Assessment
- Three action buttons:
  - **Login as Student** → `/login-student`
  - **Login as Therapist** → `/login-therapist`
  - **Create New Account** → `/signup`

---

### **2. Authentication Flow**

#### **A. Signup Page - `/signup`**

**Step 1: Role Selection**
- Users choose their role: **Student** or **Therapist**
- Visual cards with role descriptions

**Step 2: Registration Form**

**For Students**:
- Full Name
- Email Address
- Password (minimum 6 characters)
- Confirm Password

**For Therapists**:
- Full Name
- Email Address
- Specialization (dropdown with 8 options):
  - General Counseling
  - Anxiety & Depression
  - Relationship Therapy
  - Trauma & PTSD
  - Stress Management
  - Cognitive Behavioral Therapy
  - Family Therapy
  - Child Psychology
- Years of Experience
- Password
- Confirm Password

**Data Storage**: 
- Student data stored as `student_${email}` in localStorage
- Therapist data stored as `therapist_${email}` in localStorage

---

#### **B. Login Pages**

**Student Login - `/login-student`**
- Email and password authentication
- Redirects to `/student-dashboard`
- Error handling for invalid credentials

**Therapist Login - `/login-therapist`**
- Email and password authentication
- Redirects to `/therapist-dashboard`
- Professional login interface with gradient styling

---

### **3. Student Dashboard - `/student-dashboard`**

**Navigation Tabs**:
1. **🏠 Home Tab**
   - Personalized welcome message
   - Quick stats cards:
     - Upcoming Sessions
     - Therapists Followed
     - Assessments Taken
     - Mindfulness Sessions
   - Today's Wellness Tips (3 cards with daily advice)

2. **🛠️ Services Tab**
   - **Online Therapy Booking** → `/therapy-sessions`
     - Book 1-on-1 counseling sessions
     - Video and audio calls available
     - Flexible scheduling
     - Therapist ratings & reviews
   
   - **Mindfulness Guides** → `/mindfulness`
     - Guided meditations
     - Breathing exercises
     - Yoga sessions
     - Sleep stories
   
   - **Support Groups** → `/support-groups`
     - Topic-based communities
     - Peer support networks
     - Community forums
     - Weekly discussions
   
   - **Self Assessment** → `/self-assessment`
     - Mental health screening
     - Anxiety evaluation
     - Depression assessment
     - Detailed reports

3. **📚 Articles Tab**
   - Collection of mental health articles:
     - Understanding Anxiety
     - Mindfulness in Daily Life
     - Building Healthy Relationships
     - Improving Sleep Quality
     - Stress Management Techniques
     - Creating Self-Care Routines
   - Each article shows: category, title, description, and read time

**Sidebar Features**:
- Navigation buttons with icons
- User profile display
- Logout button with confirmation

---

### **4. Therapist Dashboard - `/therapist-dashboard`**

**Header Section**:
- Therapist name and title
- **Availability Toggle** (🟢 Available / 🔴 Busy)
  - Click to toggle availability status
  - Affects whether students can book sessions
- Logout button

**Three Main Tabs**:

#### **Tab 1: Dashboard Overview**
Shows key metrics:
- **Total Sessions**: Sessions booked this month
- **Average Rating**: Star rating from student reviews
- **Total Patients**: Unique student count
- **Current Status**: Available/Busy indicator

**Upcoming Sessions Section**:
- List of confirmed sessions
- Shows: Student name, date, time, duration, notes
- **Join Zoom** button to access video call

**Profile Information**:
- Name, Email, Specialization
- Years of Experience
- Current Availability Status

#### **Tab 2: Bookings Management**
Organized in two sections:

**Pending Confirmations**:
- Shows booking requests from students
- Each card displays:
  - Student name and email
  - Requested date and time
  - Session duration
  - Session notes
- **Buttons**:
  - ✅ **Confirm & Generate Link**: Auto-generates Zoom link and notifies both parties
  - ❌ **Reject**: Decline the booking request

**Confirmed Sessions**:
- Shows approved appointments
- Includes auto-generated Zoom link
- Session reminder notification

#### **Tab 3: Reviews & Ratings**
- **Rating Summary**:
  - Average rating (out of 5.0)
  - Total number of reviews
  - Visual star display

- **Reviews List**:
  - Student name
  - Star rating (⭐)
  - Review text
  - Date of review
- Helps maintain professional reputation

---

### **5. Online Therapy Booking - `/therapy-sessions`**

**Therapist Directory**:
- Cards for each licensed therapist
- **Quick Info Display**:
  - Name and specialization
  - Availability status (🟢 Available / 🔴 Busy)
  - Star rating and review count

**Expandable Therapist Cards**:
Click to expand and view:
- Age, phone, experience
- Qualifications and graduation institution
- Personal message from therapist
- Student reviews (latest 2)
- **Action Buttons**:
  - 📅 Book Session
  - ⭐ Write Review

**Booking Modal**:
- Form to request a session:
  - Your name
  - Your email (receives Zoom link confirmation)
  - Preferred date
  - Preferred time slot (10 AM - 6 PM)
- Information box explaining next steps
- Zoom link will be provided after confirmation

**Review System**:
- 5-star rating selector
- Text area for review
- Reviews appear on therapist card after submission
- Ratings are aggregated for therapist average

---

### **6. Self-Assessment - `/self-assessment`**

**10 Scientifically-Backed Questions**:
Based on mental health screening protocols (similar to PHQ-9 and GAD-7):

1. Interest/pleasure in activities (depression indicator)
2. Feeling down/depressed/hopeless (depression indicator)
3. Sleep issues (sleep quality)
4. Energy levels (fatigue)
5. Concentration difficulties (focus issues)
6. Anxiety/worry frequency (anxiety indicator)
7. Stress overwhelm (stress management)
8. Social connections quality (isolation risk)
9. Life satisfaction (overall well-being)
10. Physical activity frequency (self-care habits)

**Scoring System** (0-30 scale):
- **0-4**: Good mental health
- **5-9**: Mild stress/mood changes
- **10-14**: Moderate depression/anxiety
- **15+**: Significant challenges requiring professional help

**Personalized Results**:
- Score display with severity indicator
- Assessment report with interpretation
- Recommended next steps based on score:
  - **Low Score**: Maintain current healthy habits
  - **Medium Score**: Consider therapy or mindfulness
  - **High Score**: Professional intervention recommended

**Action Buttons**:
- 📅 Book Therapy Session
- 🧘 Try Mindfulness
- 👥 Join Support Group
- 🔄 Retake Assessment

---

### **7. Additional Services**

#### **Mindfulness Guides - `/mindfulness`**
- Guided meditation sessions
- Breathing exercises
- Yoga practices
- Sleep relaxation stories

#### **Support Groups - `/support-groups`**
- Peer support communities
- Topic-specific discussion groups
- Forum for sharing experiences
- Facilitator-led discussions

---

## Key Features Summary

### **Authentication & Authorization**
✅ Role-based signup (Student vs Therapist)
✅ Separate login pages for each role
✅ localStorage-based authentication
✅ Session persistence
✅ Logout functionality with confirmation

### **Student Features**
✅ Comprehensive dashboard with navigation
✅ Browse and filter therapists
✅ Book therapy sessions with scheduling
✅ Leave reviews and ratings for therapists
✅ View other students' reviews
✅ Self-assessment with detailed results
✅ Access mindfulness and support resources
✅ Read mental health articles

### **Therapist Features**
✅ Professional dashboard
✅ View incoming booking requests
✅ Confirm/reject bookings
✅ Auto-generate Zoom links
✅ Toggle availability status
✅ View confirmed sessions
✅ Manage therapist profile
✅ Monitor ratings and reviews
✅ Track patient statistics

### **Session Management**
✅ Booking confirmation system
✅ Zoom link generation and sharing
✅ Session reminders
✅ Session history tracking
✅ Duration and notes management

### **Review System**
✅ 5-star rating system
✅ Text reviews from students
✅ Review display on therapist cards
✅ Aggregate rating calculations
✅ Review count tracking

### **Mental Health Assessment**
✅ 10-question comprehensive assessment
✅ Evidence-based screening questions
✅ Severity-based scoring (0-30 scale)
✅ Personalized recommendations
✅ Action buttons for next steps
✅ Results saving to localStorage

---

## Technology Stack

- **Frontend**: React 19.2.0
- **Routing**: React Router DOM 7.9.6
- **State Management**: React hooks
- **Data Storage**: localStorage
- **Styling**: CSS3 with gradients and animations
- **Build Tool**: Vite
- **Package Manager**: npm

---

## File Structure

```
src/
├── IntroPage.jsx / IntroPage.css
├── StudentLoginPage.jsx
├── TherapistLoginPage.jsx
├── SignupPage.jsx / SignupPage.css
├── StudentDashboard.jsx / StudentDashboard.css
├── LoginPage.jsx / LoginPage.css
├── App.jsx
├── HomePage.jsx
├── bookingUtils.jsx
├── pages/
│   ├── TherapySessions.jsx / TherapySessions.css
│   ├── Mindfulness.jsx / Mindfulness.css
│   ├── SupportGroups.jsx / SupportGroups.css
│   ├── SelfAssessment.jsx / SelfAssessment.css
│   ├── DoctorDashboard.jsx / DoctorDashboard.css
│   └── TherapistDashboard.jsx / TherapistDashboard.css
```

---

## How to Use

### **For Students**:
1. Go to home page (/)
2. Click "Create New Account"
3. Select "Student" as role
4. Fill in registration details
5. Login with credentials
6. Access student dashboard
7. Browse therapists and book sessions
8. Take self-assessment
9. Access mindfulness and support resources

### **For Therapists**:
1. Go to home page (/)
2. Click "Create New Account"
3. Select "Therapist" as role
4. Fill in professional details and specialization
5. Login with credentials
6. Access therapist dashboard
7. Manage bookings and toggle availability
8. View ratings and reviews
9. Confirm sessions and generate Zoom links

---

## Future Enhancements

- Backend integration for persistent data storage
- Real Zoom/Google Meet API integration
- Email notifications for bookings and reminders
- Payment gateway integration
- Video call recording capabilities
- Advanced search and filtering for therapists
- Calendar view for appointments
- Mobile app version
- AI-powered therapist matching
- Chat support between students and therapists
- Prescription and document sharing
- Insurance integration
- Multi-language support
- Accessibility improvements (WCAG compliance)

---

## Notes

- **Demo Data**: The application uses demo therapist data and mock bookings for demonstration
- **Storage**: All data is stored in browser localStorage (for demo purposes)
- **Authentication**: Simple email/password validation (in production, use secure backend)
- **Zoom Links**: Auto-generated for demo (in production, use Zoom API)
- **Session Reminders**: Notifications are alert-based (in production, use email/SMS)

---

## Contact & Support

For questions or issues, please contact the development team.

---

**Last Updated**: February 26, 2026
**Version**: 1.0.0
