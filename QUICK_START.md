# MindCare - Quick Start Guide

## Getting Started

### **Step 1: Start the Application**
```bash
cd sdpproject
npm install  # if not already installed
npm run dev
```
The app will be available at `http://localhost:5174/`

---

## User Journey Examples

### **Example 1: Student Registration & Using Services**

#### **Registration**
1. Click "Create New Account" on intro page
2. Select 🎓 **Student**
3. Fill in:
   - Name: "Rahul Kumar"
   - Email: "rahul@example.com"
   - Password: "Password@123"
4. Click "Create Account"
5. Redirected to **Student Login Page**

#### **Login**
1. Enter email: "rahul@example.com"
2. Enter password: "Password@123"
3. Click "Login"
4. **Student Dashboard** opens

#### **Book a Therapy Session**
1. From Dashboard, click "🛠️ Services" tab
2. Click "Online Therapy Booking" card or navigate to `/therapy-sessions`
3. Browse therapist cards
4. Click on a therapist card to expand
5. View:
   - Therapist qualifications
   - Specialization
   - Student reviews
   - Star rating
6. Click "📅 Book Session" button
7. Fill booking form:
   - Your Name
   - Your Email
   - Preferred Date
   - Preferred Time
8. Click "Send Booking Request"
9. **Booking confirmation message** appears

#### **Leave a Review**
1. On therapist card, click "⭐ Write Review"
2. Select rating (1-5 stars)
3. Write review text
4. Click "✅ Submit Review"
5. Review appears on therapist card
6. Therapist's average rating updates

#### **Take Self-Assessment**
1. From Dashboard, click "🛠️ Services" tab
2. Click "Self Assessment" card
3. Answer all 10 questions
4. Click "Submit Assessment"
5. View personalized results:
   - Your score (0-30)
   - Assessment interpretation
   - Recommended actions
6. Click action buttons to access recommended services

#### **View Articles**
1. From Dashboard, click "📚 Articles" tab
2. Browse mental health articles
3. Each shows:
   - Category badge
   - Title
   - Description
   - Read time estimate

---

### **Example 2: Therapist Registration & Dashboard**

#### **Registration**
1. Click "Create New Account" on intro page
2. Select 👨‍⚕️ **Therapist**
3. Fill in:
   - Name: "Dr. Priya Sharma"
   - Email: "priya.sharma@example.com"
   - Specialization: "Anxiety & Depression"
   - Years of Experience: "10"
   - Password: "DrTherapist@123"
4. Click "Create Account"
5. Redirected to **Therapist Login Page**

#### **Login**
1. Enter email: "priya.sharma@example.com"
2. Enter password: "DrTherapist@123"
3. Click "Login"
4. **Therapist Dashboard** opens

#### **Manage Availability**
1. Look at top right: "🟢 Available" button
2. Click to toggle: "🔴 Busy"
3. Click again to toggle back: "🟢 Available"
4. This affects whether students can book sessions

#### **Review Bookings**
1. Click "📅 Bookings" tab
2. **Two sections**:
   - **⏳ Pending Confirmations**: Booking requests from students
   - **✅ Confirmed Sessions**: Approved appointments
3. For each pending booking:
   - View student details
   - See requested date/time
   - Click "✅ Confirm & Generate Link" to approve
   - System auto-generates Zoom link
   - Student notification is sent
   - Session moves to "Confirmed"

#### **Manage Confirmed Sessions**
1. In "✅ Confirmed Sessions" section
2. View:
   - Student name
   - Date and time
   - Duration
   - Notes about session
   - 🎥 Zoom link
3. Click Zoom link to join the session

#### **View Reviews & Ratings**
1. Click "⭐ Reviews" tab
2. See:
   - **Overall average rating** (e.g., 4.8/5.0)
   - Number of reviews
   - Individual student reviews with:
     - Student name
     - Star rating
     - Review text
     - Date submitted

---

## Key User Actions

### **For Students**:
| Action | Location | Steps |
|--------|----------|-------|
| **Browse Therapists** | `/therapy-sessions` | Click cards to expand |
| **Book Session** | Therapist card | Click "📅 Book Session" |
| **Leave Review** | Therapist card | Click "⭐ Write Review" |
| **Take Assessment** | `/self-assessment` | Answer questions → Submit |
| **View Articles** | Student Dashboard | Click "📚 Articles" tab |
| **Access Mindfulness** | `/mindfulness` | From Services or Dashboard |
| **Join Support Groups** | `/support-groups` | From Services or Dashboard |
| **Logout** | Dashboard sidebar | Click "🚪 Logout" |

### **For Therapists**:
| Action | Location | Steps |
|--------|----------|-------|
| **Toggle Status** | Header | Click "🟢 Available" / "🔴 Busy" |
| **View Pending Bookings** | 📅 Bookings tab | Under "Pending Confirmations" |
| **Confirm Booking** | Pending card | Click "✅ Confirm & Generate Link" |
| **Reject Booking** | Pending card | Click "❌ Reject" |
| **Join Session** | Confirmed card | Click "🎥 Join Zoom" |
| **View Stats** | 📊 Dashboard tab | Quick metrics overview |
| **Read Reviews** | ⭐ Reviews tab | See all student feedback |
| **View Profile** | 📊 Dashboard tab | Professional information |
| **Logout** | Header | Click "Logout" button |

---

## Form Inputs & Validation

### **Student Login**
```
Email: any@example.com
Password: from registration
```

### **Student Signup**
```
Name: Full name (required)
Email: Valid email format (required)
Specialization: Not applicable for students
Password: Minimum 6 characters (required)
Confirm Password: Must match password (required)
```

### **Therapist Signup**
```
Name: Full name (required)
Email: Valid email format (required)
Specialization: Choose from 8 options (required)
Experience: Numeric value (required)
Password: Minimum 6 characters (required)
Confirm Password: Must match password (required)
```

### **Booking Form**
```
Your Name: Text input (required)
Your Email: Valid email (required)
Preferred Date: Future date (required)
Preferred Time: Select from available slots (required)
```

### **Review Form**
```
Rating: 1-5 stars (required)
Review Text: Minimum 1 character (required)
```

### **Self-Assessment**
```
All 10 questions: Must answer each (required)
Options: 4 choices per question
```

---

## Test Data

### **Sample Student Account**
- Email: `student@example.com`
- Password: `Student@123`

### **Sample Therapist Accounts**
1. **Dr. Priya Sharma**
   - Email: `priya@example.com`
   - Password: `Doctor@123`
   - Specialization: Anxiety & Stress

2. **Dr. Rohan Kumar**
   - Email: `rohan@example.com`
   - Password: `Doctor@123`
   - Specialization: Depression & Mood

3. **Dr. Sneha Iyer**
   - Email: `sneha@example.com`
   - Password: `Doctor@123`
   - Specialization: Student Counseling

---

## Common Workflows

### **Workflow 1: Student Finds Help for Anxiety**
1. **Sign Up** as Student
2. **Take Self-Assessment** (identify anxiety symptoms)
3. **Review Results** (recommendations appear)
4. **Book Session** with Anxiety specialist
5. **Attend Therapy** (Zoom call at scheduled time)
6. **Leave Review** (rate therapist)
7. **Join Support Group** (connect with others)
8. **Try Mindfulness** (practice techniques)

### **Workflow 2: Therapist Accepts New Patients**
1. **Sign Up** as Therapist with credentials
2. **Login** to Dashboard
3. **Toggle Availability** to Available
4. **View Pending** booking requests
5. **Confirm Sessions** (Zoom link auto-generated)
6. **Join Zoom** at session time
7. **View Reviews** (track patient feedback)
8. **Manage Schedule** (accept/reject bookings)

### **Workflow 3: Student Compares Therapists**
1. **Go to** Online Therapy Booking
2. **Browse** multiple therapist profiles
3. **Compare** ratings and reviews
4. **Check** specializations match needs
5. **Verify** availability status
6. **Book** with chosen therapist
7. **Receive** confirmation with Zoom link

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Can't login** | Verify email and password match signup |
| **No therapists showing** | Refresh page, check that you're on `/therapy-sessions` |
| **Booking fails** | Ensure all form fields are filled correctly |
| **Review won't submit** | Make sure review text is not empty |
| **Assessment won't submit** | Answer all 10 questions before submitting |
| **Zoom link missing** | Therapist needs to confirm booking first |
| **Can't toggle availability** | Therapist must be logged in to their dashboard |

---

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (responsive design)

---

## Performance Tips

- Clear browser cache if experiencing issues
- Use incognito/private mode for clean sessions
- Don't use same browser for multiple logins
- Close other tabs to improve performance

---

## Reset Data

To start fresh:
1. **Clear localStorage**: Open DevTools (F12) → Application → Local Storage → Clear All
2. **Hard refresh**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. **Sign up again** with new account

---

## Support

For detailed information, see `WORKFLOW_GUIDE.md`

**Happy Healing! 🧘‍♀️💚**
