{/*const express = require('express');
const router = express.Router();

const unrecognizedCount = {}; // Track failed attempts per user (for demo, using IP as identifier)

router.post('/chat', (req, res) => {
  const { message } = req.body;
  const userId = req.ip; // In real apps, use authenticated user ID

  let reply = '';
  const msg = message.toLowerCase();

  // Define possible patterns and responses
  const patterns = [
    {keywords:['hi','hello','how are you?'], response:'Hello!'},
    { keywords: ['hours', 'timing', 'open'], response: 'Library is open from 9 AM to 5 PM, Monday to Saturday.' },
    { keywords: ['issue', 'borrow'], response: 'To issue a book, go to Dashboard > Books.' },
    { keywords: ['return'], response: 'You can return books from your Dashboard under "My Books".' },
    { keywords: ['fine', 'penalty'], response: 'You can check and pay fines in the "My Account" section.' },
    { keywords: ['lost book'], response: 'Please contact the librarian immediately regarding lost books.' },
    { keywords: ['forgot password'], response: 'Click "Forgot Password" on the login page to reset it.' },
    { keywords: ['ebooks', 'pdfs', 'notes'], response: 'eBooks, notes, and past papers are available under "Resources".' },
    { keywords: ['admin contact'], response: 'For admin assistance, email admin@library.com or visit the front desk.' },
    { keywords: ['dark mode', 'theme'], response: 'You can toggle dark mode from your profile settings.' },
    { keywords: ['due date', 'due'], response: 'Your borrowed book due dates are visible in the "My Books" section.' },
    { keywords: ['mobile', 'app'], response: 'The platform is mobile-friendly and accessible via any browser.' },
    { keywords: ['book suggestions'], response: 'Book suggestions are provided based on your reading history.' },
    { keywords: ['upload books', 'upload notes'], response: 'Faculty and admins can upload materials via the dashboard.' },
    { keywords: ['dashboard'], response: 'The dashboard gives you access to books, resources, and your account info.' },
    { keywords: ['notifications'], response: 'You will receive notifications for due dates and important updates.' },
    { keywords: ['reminders'], response: 'Due date reminders are sent via email and shown on your dashboard.' },
    { keywords: ['library rules'], response: 'Library rules are available under the "About" section of the platform.' },
    { keywords: ['help'], response: 'For help, you can ask me, visit the "Help" section, or contact the librarian.' },
    { keywords: ['search books'], response: 'Use the search bar on the dashboard to find books by title or author.' },
    { keywords: ['qr code', 'barcode'], response: 'Each book has a QR code for easy scanning and management.' },
    { keywords: ['profile'], response: 'You can view and edit your profile from the top-right menu.' },
    { keywords: ['logout'], response: 'Click on your profile and select "Logout" to safely exit the system.' },
    { keywords: ['suggest book'], response: 'You can suggest new books through the "Suggest Book" option on the dashboard.' },
    { keywords: ['faculty'], response: 'Faculty can upload materials, track students, and suggest resources.' },
    { keywords: ['student'], response: 'Students can borrow books, track due dates, and access resources.' },
    { keywords: ['admin'], response: 'Admins manage users, books, and overall library operations.' },
    { keywords: ['statistics'], response: 'Library usage statistics are available under the "Analytics" section.' },
    { keywords: ['feedback'], response: 'You can submit feedback via the "Feedback" option on your dashboard.' },
    { keywords: ['late return'], response: 'Late returns may incur fines. Please check your account for details.' },
    { keywords: ['opening hours'], response: 'Library operates Monday to Saturday, 9 AM to 5 PM.' },
    { keywords: ['holiday'], response: 'Library remains closed on national holidays and Sundays.' },
    { keywords: ['library location'], response: 'The library is located on the 1st floor of the Academic Block.' },
    { keywords: ['events'], response: 'Upcoming library events are listed on the homepage.' },
    { keywords: ['books available'], response: 'Check book availability using the search feature on your dashboard.' },
    { keywords: ['report issue'], response: 'To report a technical issue, contact support@library.com.' },
    { keywords: ['browser'], response: 'The platform works best on Chrome, Edge, or Firefox browsers.' },
    { keywords: ['language'], response: 'Currently, the platform supports English.' },
    { keywords: ['printing'], response: 'For printing resources, please contact the library staff.' },
    { keywords: ['renew book'], response: 'Book renewals can be done from your "My Books" section if eligible.' },
    { keywords: ['reservation'], response: 'You can reserve a book using the "Reserve" option under book details.' },
    { keywords: ['library map'], response: 'A digital map is available in the "About" section to navigate the library.' },
    { keywords: ['wifi'], response: 'Wi-Fi is available inside the library. Contact staff for access.' },
    { keywords: ['study rooms'], response: 'Study rooms can be booked through the dashboard under "Facilities".' },
    { keywords: ['past papers'], response: 'Past exam papers are accessible under the "Resources" section.' },
    { keywords: ['lecture notes'], response: 'Faculty can upload lecture notes for students in the "Resources" area.' },
    { keywords: ['notifications off'], response: 'You can manage notification preferences in your profile settings.' },
    { keywords: ['account blocked'], response: 'For blocked accounts, please contact admin@library.com.' },
  ];

  // Check for matching patterns
  const match = patterns.find(p => p.keywords.some(kw => msg.includes(kw)));

  if (match) {
    reply = match.response;
    unrecognizedCount[userId] = 0; // Reset failed count on success
  } else {
    unrecognizedCount[userId] = (unrecognizedCount[userId] || 0) + 1;
    
    if (unrecognizedCount[userId] >= 3) {
      reply = "I'm having trouble understanding you. Please contact the library admin for further assistance.";
      unrecognizedCount[userId] = 0; // Reset after suggesting admin
    } else {
      reply = "Sorry, I didn't understand that. Could you please rephrase?";
    }
  }

  // Add feedback message after valid response
  if (match) {
    reply += " 📢 If this answer was helpful, type 'feedback' to share your experience.";
  }

  res.json({ reply });
});

module.exports = router;
*/}