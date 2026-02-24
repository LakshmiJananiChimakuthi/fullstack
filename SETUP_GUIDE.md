# MindCare Setup & Quick Start Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to project directory:**
```bash
cd c:\Users\lakshmi janani\OneDrive\Desktop\fullstack\sdpproject
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open in browser:**
```
http://localhost:5173
```

---

## 🎯 Testing the Application

### **Step 1: Initial Landing**
- You'll see the IntroPage with MindCare intro and feature cards
- Three buttons available:
  - "Login as Student"
  - "Login as Therapist"  
  - "Create New Account"

### **Step 2: Create an Account**

**Option A: Create Student Account**
1. Click "Create New Account"
2. Select "Student" role
3. Fill in:
   - Full Name
   - Email (e.g., student@example.com)
   - Password (min 6 chars)
4. Click "Create Account"
5. You'll be redirected to Student Login page

**Option B: Create Therapist Account**
1. Click "Create New Account"
2. Select "Therapist" role
3. Fill in:
   - Full Name
   - Email (e.g., doctor@example.com)
   - Specialization (dropdown)
   - Years of Experience
   - Password (min 6 chars)
4. Click "Create Account"
5. You'll be redirected to Therapist Login page

### **Step 3: Login**

**For Student:**
1. Click "Login as Student"
2. Enter your email and password
3. Click "Login"
4. You'll redirected to Student Dashboard

**For Therapist:**
1. Click "Login as Therapist"
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to Therapist Dashboard

---

## 👨‍🎓 Student Features to Test

### 1. **Dashboard Home Tab** 🏠
- See welcome greeting with your name
- View 4 quick stat cards
- Read daily wellness tips

### 2. **Services Tab** 🛠️
- **Online Therapy Booking:**
  - Click "Book Now"
  - Browse 3 sample therapists
  - Click on therapist card to expand details
  - See therapist info, reviews, and ratings
  - Click "Book Session" to open booking form
  - Fill date and time
  - Click "Send Booking Request"
  - You'll see a confirmation message
  - Click "Write Review" to leave feedback (1-5 stars + text)

- **Mindfulness Guides:**
  - View mindfulness tips (breathing, meditation, etc.)
  - Access wellness exercises
  
- **Support Groups:**
  - See testimonials from other students
  - Read success stories
  - Participate in anonymous chat

- **Self-Assessment:**
  - Answer 10 mental health questions (0-3 scale)
  - Get personalized score (0-30)
  - Based on score, get recommendations:
    - Score 0-4: Healthy mental state
    - Score 5-9: Some mild stress - consider therapy
    - Score 10-14: Moderate symptoms - therapy recommended
    - Score 15+: Severe symptoms - urgent professional help needed
  - Buttons to book therapy or try mindfulness

### 3. **Articles Tab** 📚
- Read 6 wellness articles
- See category tags
- View read time and author info
- Articles include mental health, relationships, sleep, stress, and self-care

### 4. **Logout**
- Click logout button
- Returns to IntroPage
- Authentication cleared

---

## 👨‍⚕️ Therapist Features to Test

### 1. **Dashboard Tab** 📊
- View 4 statistics:
  - Total sessions this month
  - Average rating (from student reviews)
  - Total unique patients
  - Current availability status
- See upcoming confirmed sessions
- View your profile information

### 2. **Availability Toggle**
- Click "Available" or "Busy" button in header
- Status changes and persists
- Shows current availability to students

### 3. **Bookings Tab** 📅
- **Pending Confirmations Section:**
  - See demo booking from a student
  - Click "Confirm & Generate Link" to:
    - Automatically generate Zoom link
    - Move booking to confirmed section
    - Send notification to student
  - Click "Reject" to dismiss booking

- **Confirmed Sessions Section:**
  - Shows confirmed bookings
  - Displays Zoom link (clickable)
  - Shows session reminder message
  - Click "Join Zoom" to open meeting (demo link)

### 4. **Reviews Tab** ⭐
- See average rating (e.g., 4.7/5.0)
- View individual student reviews
- Each review shows:
  - Student name
  - Date of review
  - Star rating
  - Review text

### 5. **Logout**
- Click logout button
- Returns to IntroPage

---

## 🧪 Demo Data

The application comes with pre-loaded demo data:

### **Sample Therapists:**
1. **Dr. Priya Sharma** - Anxiety & Stress Specialist (4.8 rating)
2. **Dr. Rohan Kumar** - Depression & Mood Disorders (4.6 rating)
3. **Dr. Sneha Iyer** - Student Counseling Expert (4.7 rating, currently busy)

### **Sample Reviews:**
Each therapist has 2-3 sample reviews from "students" with varying ratings

### **Sample Bookings (for Therapist Dashboard):**
- One pending booking request to confirm
- One confirmed booking with active Zoom link

---

## 🔄 Workflow Examples

### **Complete Student Booking Workflow:**
```
1. Login as Student
2. Go to Services → Online Therapy Booking
3. Click on therapist card to see details + reviews
4. Click "Book Session"
5. Fill form (date, time)
6. Submit booking
7. See confirmation
8. (After session) Click "Write Review"
9. Enter rating + review text
10. Submit review
```

### **Complete Therapist Session Workflow:**
```
1. Login as Therapist
2. Check Bookings tab
3. See pending request from student
4. Click "Confirm & Generate Link"
5. Zoom link generated
6. Click "Join Zoom" for the session
7. After session, student leaves review
8. View review in Reviews tab
9. Check updated average rating
```

---

## 🔧 Troubleshooting

### Issue: Dev server won't start
**Solution:** 
- Clear node_modules: `rm -r node_modules`
- Reinstall: `npm install`
- Start again: `npm run dev`

### Issue: Can't login
**Solution:**
- Make sure you created an account first
- Email and password must match exactly
- Check browser console for errors

### Issue: localStorage not working
**Solution:**
- Check that localStorage is enabled in browser
- Clear browser cache and try again
- Check browser console for any errors

### Issue: Routes not working
**Solution:**
- Make sure dev server is running
- Check that you're accessing correct routes
- Use "Home" link or back button to navigate

---

## 📋 Build & Deploy

### Build for Production:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```

### Lint Code:
```bash
npm run lint
```

---

## 📁 Project Structure

```
src/
├── IntroPage.jsx & IntroPage.css
├── StudentLoginPage.jsx
├── TherapistLoginPage.jsx
├── SignupPage.jsx & SignupPage.css
├── StudentDashboard.jsx & StudentDashboard.css
├── HomePage.jsx & HomePage.css
├── LoginPage.jsx & LoginPage.css
├── pages/
│   ├── DoctorDashboard.jsx
│   ├── TherapistDashboard.jsx & TherapistDashboard.css
│   ├── TherapySessions.jsx & TherapySessions.css
│   ├── Mindfulness.jsx & Mindfulness.css
│   ├── SupportGroups.jsx & SupportGroups.css
│   └── SelfAssessment.jsx & SelfAssessment.css
├── App.jsx & App.css
├── main.jsx
├── index.css
└── bookingUtils.jsx
```

---

## 🎓 Key Concepts

### **Role-Based Access:**
- Students can only access student routes
- Therapists can only access therapist routes
- Redirects if accessing wrong role routes

### **Data Persistence:**
- All data stored in browser's localStorage
- Data persists after page refresh (but clears after browser restart)
- Passwords stored as plain text (demo only - use encryption in production)

### **Authentication:**
- Simple email/password validation
- Auth token stored in localStorage
- Logout clears auth token

### **Responsive Design:**
- Mobile-first approach
- Breakpoints at 600px and 1024px
- Touch-friendly buttons and forms
- Flexible layouts

---

## ✅ Checklist for First-Time Users

- [ ] Install dependencies (`npm install`)
- [ ] Start dev server (`npm run dev`)
- [ ] Open browser at localhost:5173
- [ ] Create a student account
- [ ] Login as student
- [ ] Explore dashboard tabs
- [ ] Book a therapy session
- [ ] Write a review
- [ ] Take self-assessment
- [ ] Logout
- [ ] Create a therapist account
- [ ] Login as therapist
- [ ] View demo bookings
- [ ] Confirm a booking
- [ ] View reviews and ratings
- [ ] Toggle availability status

---

## 📚 Additional Resources

- **Full Workflow Documentation:** See `PROJECT_WORKFLOW.md`
- **React Docs:** https://react.dev
- **React Router:** https://reactrouter.com
- **Vite:** https://vitejs.dev

---

## 🎉 You're All Set!

The MindCare application is fully functional and ready to use. Start by exploring different user roles and test all features. Enjoy!

