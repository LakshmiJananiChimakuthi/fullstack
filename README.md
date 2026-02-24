# MindCare - Comprehensive Mental Health & Wellness Platform

A fullstack React application providing a complete ecosystem for mental health support, connecting students with licensed therapists, offering mindfulness resources, peer support groups, and self-assessment tools.

## ✨ Key Features

### **For Students:**
- 🎓 **Create & Manage Account** - Role-based registration and login
- 👨‍⚕️ **Book Therapy Sessions** - Browse therapists with ratings & reviews
- ⭐ **Rate & Review Therapists** - Leave feedback after sessions  
- 🧘 **Mindfulness Guides** - Meditations, breathing exercises, yoga
- 👥 **Support Groups** - Join Anonymous peer communities
- 📋 **Self-Assessment** - Mental health screening (10 scientifically-backed questions)
- 📚 **Wellness Articles** - Educational mental health content
- 🔔 **Session Reminders** - 24-hour notifications before appointments

### **For Therapists:**
- 👨‍⚕️ **Professional Profile** - Certified therapist account setup
- 📊 **Dashboard Overview** - View statistics, sessions, and ratings
- 📅 **Booking Management** - Confirm/reject student requests
- 🟢 **Availability Toggle** - Set busy/available status
- ⭐ **Rating System** - View average ratings and reviews
- 🎥 **Zoom Integration** - Auto-generate meeting links

## 🛠️ Tech Stack

- **React** 19.2.0 - Frontend framework
- **Vite** 7.2.4 - Build tool & dev server
- **React Router DOM** 7.9.6 - Client-side routing
- **CSS3** - Styling with gradients & animations
- **LocalStorage** - Data persistence

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev         # Opens on http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📖 Interactive Features

### **Student Workflow:**
1. Landing page → Signup as Student → Login → Student Dashboard
2. Browse therapists → Book session → Write review
3. Take self-assessment → Get mental health score + recommendations
4. Explore mindfulness & support groups
5. Logout

### **Therapist Workflow:**
1. Landing page → Signup as Therapist → Login → Therapist Dashboard
2. Manage bookings → Confirm sessions → Generate Zoom links
3. Toggle availability → View student reviews & ratings
4. Logout

## 🎨 Pages & Routes

| Route | Component | Role | Description |
|-------|-----------|------|-------------|
| `/` | IntroPage | Public | Landing page with features |
| `/login-student` | StudentLoginPage | Public | Student authentication |
| `/login-therapist` | TherapistLoginPage | Public | Therapist authentication |
| `/signup` | SignupPage | Public | Role-based account creation |
| `/student-dashboard` | StudentDashboard | Student | Main dashboard (Home/Services/Articles) |
| `/therapy-sessions` | TherapySessions | Student | Therapist marketplace & booking |
| `/mindfulness` | Mindfulness | Student | Wellness guides & exercises |
| `/support-groups` | SupportGroups | Student | Peer support community |
| `/self-assessment` | SelfAssessment | Student | Mental health screening tool |
| `/therapist-dashboard` | TherapistDashboard | Therapist | Professional dashboard |

## 🔐 Authentication & Data

**Storage:** Browser LocalStorage
- Student accounts: `student_{email}`
- Therapist accounts: `therapist_{email}`
- Current session: `authUser`

**Features:**
- Email/password authentication
- Role-based access control
- Session persistence
- Logout clears auth data

## 📊 Demo Data Included

**3 Sample Therapists:**
- Dr. Priya Sharma (4.8★ - Anxiety Specialist, Available)
- Dr. Rohan Kumar (4.6★ - Depression Specialist, Available)
- Dr. Sneha Iyer (4.7★ - Student Counselor, Busy)

**Sample Reviews & Bookings** for testing

## 📚 Documentation

See additional documentation files:
- **PROJECT_WORKFLOW.md** - Detailed feature workflows
- **SETUP_GUIDE.md** - Step-by-step setup & testing

## 🎓 Testing Checklist

- ✅ Create student account
- ✅ Login as student
- ✅ Book therapy session
- ✅ Write review for therapist
- ✅ Take self-assessment
- ✅ Create therapist account
- ✅ Login as therapist
- ✅ Confirm student bookings
- ✅ View reviews & ratings
- ✅ Toggle availability

## 🏗️ Project Structure

```
src/
├── IntroPage.jsx (+.css)
├── StudentLoginPage.jsx
├── TherapistLoginPage.jsx  
├── SignupPage.jsx (+.css)
├── StudentDashboard.jsx (+.css)
├── HomePage.jsx (+.css)
├── pages/
│   ├── TherapySessions.jsx (+.css)
│   ├── TherapistDashboard.jsx (+.css)
│   ├── SelfAssessment.jsx (+.css)
│   ├── Mindfulness.jsx (+.css)
│   ├── SupportGroups.jsx (+.css)
│   └── DoctorDashboard.jsx
├── App.jsx (+.css)
├── main.jsx
└── bookingUtils.jsx
```

## 🎯 Key Capabilities

✅ Multi-role authentication (Student/Therapist)
✅ Therapist marketplace with search & filtering
✅ Session booking with date/time selection
✅ 5-star review system with comments
✅ Zoom link auto-generation
✅ 10-question mental health assessment
✅ Mindfulness exercises & guided meditations
✅ Anonymous peer support community
✅ Responsive mobile & desktop design
✅ Real-time booking confirmation

## 💡 Built With ❤️ For Mental Health & Wellness

Start here → `npm install` → `npm run dev` → Explore!


