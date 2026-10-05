// ─────────────────────────────────────────────────────────────
//  EDIT EVERYTHING HERE. All names, dates, venue and images
//  used across the site come from this one file.
//  Photos live in src/assets/ (imported below). Any missing photo shows an
//  elegant placeholder frame automatically.
// ─────────────────────────────────────────────────────────────
import logo from './assets/logo.webp'
import rings from './assets/rings.webp'
import ganesh from './assets/ganesh.webp'
import groomPhoto from './assets/groom.webp'
import bridePhoto from './assets/bride.webp'
import kalash from './assets/kalash.webp'
import monogram from './assets/monogram.webp'
import groomFather from './assets/groomfather.webp'
import groomMother from './assets/groommother.webp'
import brideFather from './assets/bridefather.webp'
import brideMother from './assets/bridemother.webp'
import bgm from './assets/bgm.mp3'

export const config = {
  groom: {
    name: 'Rahul',
    fullName: 'Rahul Chauhan',
    parents: 'Shri Vijay Singh Chauhan & Smt. Kusum Chauhan',
    relation: 'Son of',
    photo: groomPhoto,
    photoPosition: '50% 8%', // which part of the photo to keep in the arch
    about: 'Calm, curious and endlessly kind. Believes every good day starts with coffee and ends with family.',
  },
  bride: {
    name: 'Neha',
    fullName: 'Dr. Neha Chauhan',
    parents: 'Shri Yogendra Chauhan & Smt. Sunita Chauhan',
    relation: 'Daughter of',
    photo: bridePhoto,
    photoPosition: '50% 20%',
    about: 'Warm laughter, a heart full of music, and a smile that makes every room feel like home.',
  },

  // Main ceremony date/time, used by the countdown (local time, 24h)
  mainDate: '2026-12-07T10:00:00',
  displayDate: 'Monday, 7th December 2026',

  hostFamily: 'The Chauhan Family',
  city: 'Bharuch, Gujarat',

  images: { logo, monogram, rings, ganesh, kalash },
  music: bgm, // background music (src/assets/bgm.mp3), starts when the doors open

  // `time` is what guests see; start/end (24h) are only used for the "Save the date" calendar entry
  events: [
    {
      id: 'sagai',
      title: 'Sagai',
      date: '2026-12-07',
      start: '10:00',
      end: '12:00',
      time: '10:00 AM – 12:00 PM',
      icon: 'rings',
      description:
        'Before Ganesh ji and our elders, two hearts exchange rings and promises. The heart of the celebration.',
      venue: 'Hotel Unity',
      address: 'NH 48, beside Swaminarayan Temple, Zadeshwar Chowkdi, Meghdoot Twp, Zadeshwar, Bharuch, Gujarat 392015',
      mapQuery: 'Hotel Unity, NH 48, Zadeshwar, Bharuch, Gujarat 392015',
    },
    {
      id: 'lunch',
      title: 'Lunch',
      date: '2026-12-07',
      start: '12:00',
      end: '14:00',
      time: '12:00 PM onwards',
      icon: 'kalash',
      description: 'Stay and share a grand Gujarati thali with both families, served with love and plenty of sweets.',
      venue: 'Hotel Unity',
      address: 'NH 48, beside Swaminarayan Temple, Zadeshwar Chowkdi, Meghdoot Twp, Zadeshwar, Bharuch, Gujarat 392015',
      mapQuery: 'Hotel Unity, NH 48, Zadeshwar, Bharuch, Gujarat 392015',
    },
    {
      id: 'garba',
      title: 'Raas Garba',
      date: '2026-12-07',
      start: '14:00',
      end: '17:00',
      time: 'After lunch',
      icon: 'diya',
      description: 'Dhol, dandiya raas and garba to round off the day. Come hungry, leave dancing.',
      venue: 'Hotel Unity',
      address: 'NH 48, beside Swaminarayan Temple, Zadeshwar Chowkdi, Meghdoot Twp, Zadeshwar, Bharuch, Gujarat 392015',
      mapQuery: 'Hotel Unity, NH 48, Zadeshwar, Bharuch, Gujarat 392015',
    },
  ],

  // "Our Families" page: parents' photos, names and both home addresses for each side
  families: [
    {
      side: "Groom's Side",
      sideHindi: 'वर पक्ष',
      father: {
        title: 'सूरत जिला अध्यक्ष',
        name: 'श्री विजय गोविंद सिंह चौहान',
        org: 'राष्ट्रीय चौहान महासंघ',
        photo: groomFather,
        photoPosition: '50% 15%',
      },
      mother: { name: 'श्रीमती कुसुम चौहान', photo: groomMother, photoPosition: '50% 12%' },
      // TODO: placeholders (the venue address) until the groom's real Surat and UP addresses arrive
      addresses: [
        { place: 'Surat', lines: ['NH 48, beside Swaminarayan Temple, Zadeshwar Chowkdi,', 'Meghdoot Twp, Zadeshwar, Bharuch, Gujarat 392015'] },
        { place: 'Uttar Pradesh', lines: ['NH 48, beside Swaminarayan Temple, Zadeshwar Chowkdi,', 'Meghdoot Twp, Zadeshwar, Bharuch, Gujarat 392015'] },
      ],
    },
    {
      side: "Bride's Side",
      sideHindi: 'वधू पक्ष',
      father: {
        title: 'राष्ट्रीय उपाध्यक्ष',
        name: 'श्री योगेन्द्र शंकर चौहान',
        org: 'राष्ट्रीय चौहान महासंघ',
        photo: brideFather,
        photoPosition: '50% 8%',
      },
      mother: { name: 'श्रीमती सुनीता चौहान', photo: brideMother, photoPosition: '50% 15%' },
      addresses: [
        { place: 'Bharuch', lines: ['91, Sharnam Vatika Society, opposite Novus Hotel,', 'NH-48, Vadadla, Bharuch, Gujarat'] },
        { place: 'Uttar Pradesh', lines: ['Village Mishraulliya, Post Batulahi,', 'Tahsil Rudrapur, District Deoria, Uttar Pradesh'] },
      ],
    },
  ],

  venue: {
    name: 'Hotel Unity',
    address: 'NH 48, beside Swaminarayan Temple, Zadeshwar Chowkdi, Meghdoot Twp, Zadeshwar, Bharuch, Gujarat – 392015',
    mapQuery: 'Hotel Unity, NH 48, Zadeshwar, Bharuch, Gujarat 392015', // what Google Maps should search for
    notes: 'Ample parking available. On NH 48 at Zadeshwar Chowkdi, right beside the Swaminarayan Temple.',
    // Labels on the illustrated map (swap for real nearby places)
    mapLabels: { start: 'City Centre', landmark: 'Mandir', pond: 'Talav', river: 'Narmada', station: 'Station' },
   },

  // Shown in the footer ("For any queries")
  rsvp: {
    contacts: [
      { name: 'Rahul', phone: '+91 87329 66848' },
      { name: 'Neha', phone: '+91 78749 50775' },
    ],
  },

  hashtag: '#RahulNehaKiSagai',
}
