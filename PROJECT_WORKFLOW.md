# MindCare - Complete Project Workflow

## 🎯 Project Overview
MindCare is a comprehensive mental health and wellness platform designed to connect students with licensed therapists, provide mindfulness resources, support groups, and self-assessment tools.

---

## 📊 Complete Application Workflow

### 1. **Landing Page (IntroPage)**
**Route:** `/`

**Features:**
- Welcome banner introducing MindCare platform
- 4 feature cards highlighting key services:
  - 👨‍⚕️ Licensed Therapists
  - 🧘 Mindfulness Guides  
  - 👥 Support Groups
  - 📋 Self Assessment
- Three main action buttons:
  - Login as Student
  - Login as Therapist
  - Create New Account

**Visual Design:**
- Gradient background (blue to purple)
- Responsive grid layout
- Hover animations and transitions
- Mobile-friendly design

---

### 2. **Authentication System**

#### A. **Student Login Page**
**Route:** `/login-student`

**Process:**
1. User enters email and password
2. System checks localStorage for `student_{email}` key
3. If credentials match, user is authenticated
4. User is redirected to Student Dashboard
5. Auth data stored in localStorage as `authUser`

**Features:**
- Email validation
- Password security check
- Error messages for invalid credentials
- Links to signup and home page

#### B. **Therapist Login Page**
**Route:** `/login-therapist`

**Process:**
1. User enters email and password
2. System checks localStorage for `therapist_{email}` key
3. If credentials match, user is authenticated
4. User is redirected to Therapist Dashboard
5. Auth data stored in localStorage as `authUser`

**Features:**
- Same validation as student login
- Separate styling (purple/pink gradient)
- Professional appearance for medical professionals

#### C. **Signup Page**
**Route:** `/signup`

**Process:**
1. User selects role (Student or Therapist)
2. Fill in personal details
3. For Therapists: Enter specialization and experience
4. Create password and confirm
5. Data stored in localStorage under user role
6. Redirect to appropriate login page

**Student Signup Fields:**
- Full Name
- Email
- Password & Confirmation

**Therapist Signup Fields:**
- Full Name
- Email
- Specialization (dropdown with options like "Anxiety & Depression", "Relationship Therapy", etc.)
- Years of Experience
- Password & Confirmation

---

### 3. **Student Dashboard**
**Route:** `/student-dashboard`

**Authentication:** Students only (redirects if not authenticated as student)

**Layout:**
- Fixed sidebar navigation (blue-purple gradient)
- Main content area with tab-based navigation

**Tabs:**

#### A. **Home Tab** 🏠
**Features:**
- Welcome greeting with student name
- Quick stats cards (4 metrics):
  - 📅 Upcoming Sessions
  - ⭐ Therapists Followed
  - 🎯 Assessments Taken
  - 💪 Mindfulness Sessions
- Wellness tips section with 3 actionable tips
  - Stay Hydrated
  - Take a Walk
  - Sleep Well

#### B. **Services Tab** 🛠️
**4 Service Cards with click-to-navigate buttons:**

1. **Online Therapy Booking** 👨‍⚕️
   - Navigate to: `/therapy-sessions`
   - Features: Book certified therapists, video/audio calls, flexible scheduling, ratings & reviews

2. **Mindfulness Guides** 🧘
   - Navigate to: `/mindfulness`
   - Features: Guided meditations, breathing exercises, yoga sessions, sleep stories

3. **Support Groups** 👥
   - Navigate to: `/support-groups`
   - Features: Topic-based groups, peer support, community forums, weekly discussions

4. **Self Assessment** 📋
   - Navigate to: `/self-assessment`
   - Features: Mental health screening, anxiety/depression evaluation, detailed reports

#### C. **Articles Tab** 📚
**6 Educational Articles:**
1. Understanding Anxiety: Signs and Coping Strategies
2. The Power of Mindfulness in Daily Life
3. Building Healthy Relationships
4. Improving Sleep Quality for Better Mental Health
5. Stress Management Techniques That Work
6. Creating Your Self-Care Routine

**Features:**
- Category badges (Mental Health, Wellness, Relationships, Sleep, Stress Management, Self-Care)
- Read time indicators
- Author attribution

**Logout Button**
- Clears user authentication
- Redirects to `/`

---

### 4. **Online Therapy Booking System**
**Route:** `/therapy-sessions`

#### A. **Therapist Listing**
**Displays 3 Sample Therapists:**

**Each Therapist Card Shows:**
- Name
- Specialization
- Availability Status (🟢 Available / 🔴 Busy)
- ⭐ Rating (e.g., 4.8/5)
- Number of Reviews

**Expanded View (Click on card):**
- Age
- Phone Number
- Experience Years
- Qualifications
- Education Background
- Personal Message
- Student Reviews (up to 2 shown)
- Booking and Review Buttons

#### B. **Booking Process**

**Step 1: Click "Book Session"**
- Opens booking modal

**Step 2: Fill Booking Form**
- Your Full Name *
- Your Email Address *
- Preferred Date * (date picker, min = today)
- Preferred Time * (dropdown with time slots)

**Step 3: Submit**
- Shows confirmation dialog with:
  - Doctor name
  - Scheduled date and time
  - Next steps information

**System Updates:**
- Booking stored in localStorage
- Therapist receives notification
- Both parties get confirmation email (simulated)
- Zoom/Google Meet link generated and shared

#### C. **Review System**

**Before Booking - View Reviews**
- See up to 2 existing reviews from other students
- Review content from real students (simulated)
- Star ratings (⭐⭐⭐⭐⭐)

**After Booking - Write Review**
- Click "Write Review" button
- Rating selector (1-5 stars)
- Review text area (min. 10 characters)
- Submit review
- New review added to therapist's profile

---

### 5. **Therapist Dashboard**
**Route:** `/therapist-dashboard`

**Authentication:** Therapists only

**Header:**
- Welcome message
- Availability toggle button (🟢 Available / 🔴 Busy)
- Logout button

**Tabs:**

#### A. **Dashboard Tab** 📊

**Statistics Cards (4 metrics):**
1. Total Sessions (this month)
2. Average Rating
3. Total Unique Patients
4. Current Status (Available/Busy)

**Upcoming Confirmed Sessions Section:**
- Displays upcoming booked sessions
- Shows:
  - Student name
  - Date & Time
  - Duration
  - Session notes
- "Join Zoom" button (links to Zoom meeting)

**Profile Information Section:**
- Name (Dr. Prefix)
- Email
- Specialization
- Years of Experience
- Current Availability Status

#### B. **Bookings Tab** 📅

**Two Sections:**

**Pending Confirmations:**
- Shows pending booking requests from students
- For each booking:
  - Student name
  - Email
  - Preferred date & time
  - Duration
  - Session notes
  - Buttons:
    - ✅ Confirm & Generate Link
    - ❌ Reject

**Confirmed Sessions:**
- Shows confirmed bookings
- For each session:
  - Student name
  - Email
  - Date & Time
  - Duration
  - Zoom Link (clickable)
  - Session reminder notification

#### C. **Reviews Tab** ⭐

**Rating Summary:**
- Display average rating (e.g., 4.7/5.0)
- Total number of reviews

**Individual Reviews:**
- Student name
- Date of review
- Star rating
- Review text (in quotes)

---

### 6. **Self-Assessment Tool**
**Route:** `/self-assessment`

**10 Scientifically-Backed Questions:**

1. Visual pleasure in activities (0-3 points)
2. Feeling down/depressed (0-3 points)
3. Sleep issues (0-3 points)
4. Tiredness/low energy (0-3 points)
5. Trouble concentrating (0-3 points)
6. Anxiety/worry (0-3 points)
7. Feeling overwhelmed (0-3 points)
8. Social connections quality (0-3 points)
9. Life satisfaction (0-3 points)
10. Physical activity frequency (0-3 points)

**Scoring:**
- Total Score Range: 0-30
- Score 0-4: Low risk (✅ Green)
- Score 5-9: Mild symptoms (🟡 Yellow)
- Score 10-14: Moderate symptoms (🟠 Orange)
- Score 15+: Severe symptoms (🔴 Red)

**Results Report:**
- Personalized message based on score
- Recommended next steps (3-5 recommendations)
- Action buttons:
  - 📅 Book Therapy Session
  - 🧘 Try Mindfulness
  - 👥 Join Support Group
  - 🔄 Retake Assessment

---

### 7. **Mindfulness Guides**
**Route:** `/mindfulness`

**Content Sections:**

**Mindfulness Tips:**
- Deep Breathing
- Body Scan meditation
- Gratitude Practice
- Mindful Walking
- 5+ additional techniques

**Video Resources:**
- Guided meditations
- Breathing exercises
- Yoga sessions
- Sleep stories
- Wellness talks

**Mental Health Tips:**
- Sleep hygiene
- Exercise benefits
- Social connection importance
- Diet and nutrition
- Work-life balance

---

### 8. **Support Groups**
**Route:** `/support-groups`

**Features:**

**Anonymous Chat/Forum:**
- Post messages anonymously
- See messages from other group members
- Real-time message updates

**Success Stories:**
- Real testimonials from students who improved
- Each story includes:
  - Name
  - Problem faced
  - Solution through MindCare
  - How they help others now

**Testimonial Examples:**
1. **Ananya S.** - Overcome exam anxiety through therapy + mindfulness
2. **Rohan K.** - Recovered from depression via therapy + support groups
3. **Sneha I.** - Managed burnout with counseling + meditation

**Group Topics:**
- Exam Stress
- Depression Support
- Anxiety Management
- Relationship Issues
- Career Guidance
- Sleep Issues
- + More

---

## 🔐 Authentication & Data Storage

### LocalStorage Structure:

**For Students:**
```json
{
  "student_email@example.com": {
    "name": "Student Name",
    "email": "email@example.com",
    "password": "encrypted_password",
    "role": "student",
    "bookings": [],
    "assessmentScores": { "score": 15, "date": "02/26/2026" }
  }
}
```

**For Therapists:**
```json
{
  "therapist_email@example.com": {
    "name": "Dr. Name",
    "email": "email@example.com",
    "password": "encrypted_password",
    "role": "therapist",
    "specialization": "Anxiety & Depression",
    "experience": "10",
    "ratings": 4.8,
    "reviews": [],
    "availability": true,
    "bookings": []
  }
}
```

**Current User:**
```json
{
  "authUser": {
    "name": "User Name",
    "email": "email@example.com",
    "role": "student|therapist",
    "specialization": "..." // therapist only
  }
}
```

---

## 🚀 Key Features Summary

### For Students:
✅ Create account as student
✅ Login with email/password
✅ View personalized dashboard
✅ Browse certified therapists with ratings
✅ Book therapy sessions with date/time selection
✅ Receive confirmation with Zoom link
✅ Write and read reviews for therapists
✅ Take scientifically-backed self-assessment
✅ Access mindfulness guides and exercises
✅ Join anonymous support groups
✅ Read wellness articles
✅ Session reminders (24 hours before)
✅ Logout functionality

### For Therapists:
✅ Create account with specialization
✅ Login with email/password
✅ View professional dashboard
✅ Toggle availability (Available/Busy)
✅ Receive booking requests from students
✅ Confirm/reject bookings
✅ Generate Zoom links for confirmed sessions
✅ View upcoming sessions
✅ Receive student reviews and ratings
✅ Track total sessions and average rating
✅ View student profile information
✅ Logout functionality

---

## 🎨 Design System

### Color Scheme:
- **Primary:** #667eea (Blue)
- **Secondary:** #764ba2 (Purple)
- **Accent:** #48dbfb (Light Blue)
- **Success:** #52c41a (Green)
- **Warning:** #ffa940 (Orange)
- **Error:** #ff6b6b (Red)

### Typography:
- Font Family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif
- Heading Sizes: H1 (2-2.5rem), H2 (1.8rem), H3 (1.3rem), H4 (1.1rem)
- Line Heights: 1.6 for body text, 1.8 for descriptions

### Responsive Design:
- Mobile: < 600px
- Tablet: 600px - 1024px
- Desktop: > 1024px

---

## 🔄 User Workflows

### **Student Workflow:**
```
1. Landing Page (IntroPage)
   ↓
2. Choose: "Login as Student" OR "Create New Account"
   ↓
   If Create Account:
   - Select "Student" role
   - Fill in details
   - Stored in localStorage
   - Redirect to student login
   ↓
3. Student Login Page
   - Enter credentials
   - Redirect to Student Dashboard
   ↓
4. Student Dashboard
   - Choose service:
     a) Therapy Sessions → Browse therapists → Book session → Write review
     b) Mindfulness → View exercises and tips
     c) Support Groups → Read testimonials, join groups
     d) Self-Assessment → Answer questions → Get report
     e) Articles → Read wellness content
   ↓
5. Logout → Back to IntroPage
```

### **Therapist Workflow:**
```
1. Landing Page (IntroPage)
   ↓
2. Choose: "Login as Therapist" OR "Create New Account"
   ↓
   If Create Account:
   - Select "Therapist" role
   - Fill in specialization and experience
   - Stored in localStorage
   - Redirect to therapist login
   ↓
3. Therapist Login Page
   - Enter credentials
   - Redirect to Therapist Dashboard
   ↓
4. Therapist Dashboard
   - View Dashboard:
     * Check statistics
     * View upcoming sessions
     * Toggle availability
   - Manage Bookings:
     * Confirm pending requests
     * Generate Zoom links
     * View confirmed sessions
   - View Reviews:
     * Check average rating
     * Read student feedback
   ↓
5. Logout → Back to IntroPage
```

---

## 📱 Mobile Responsiveness

All pages are fully responsive with:
- Single column layout on mobile
- Hamburger-style navigation
- Touch-friendly buttons
- Optimized text sizes
- Full-width cards
- Stacked form elements
- Vertical scrolling on dashboards

---

## ⚡ Technology Stack

- **Frontend:** React 19.2.0
- **Routing:** React Router 7.9.6
- **Build Tool:** Vite 7.2.4
- **State Management:** React Hooks & LocalStorage
- **Styling:** CSS3 with Gradients & Animations
- **Linting:** ESLint

---

## 📝 Summary

MindCare provides a complete mental health platform with role-based access, comprehensive therapy booking system, peer support, mindfulness resources, and self-assessment tools. The platform uses localStorage for data persistence and provides a seamless experience for both students seeking mental health support and therapists providing professional counseling services.

