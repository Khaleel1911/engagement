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
import couple1 from './assets/couple1.webp'
import couple2 from './assets/couple2.webp'
import kalash from './assets/kalash.webp'
import monogram from './assets/monogram.webp'

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
    fullName: 'Neha Chauhan',
    parents: 'Shri Yogendra Chauhan & Smt. Sunita Chauhan',
    relation: 'Daughter of',
    photo: bridePhoto,
    photoPosition: '50% 20%',
    about: 'Warm laughter, a heart full of music, and a smile that makes every room feel like home.',
  },

  // Main ceremony date/time, used by the countdown (local time, 24h)
  mainDate: '2026-12-07T11:00:00',
  displayDate: 'Monday, 7th December 2026',

  hostFamily: 'The Chauhan Family',
  city: 'Bharuch, Gujarat',

  images: { logo, monogram, rings, ganesh, kalash, couple1, couple2 },
  music: '/music/shehnai.mp3', // optional background music

  events: [
    {
      id: 'goldhana',
      title: 'Chandlo & Gol Dhana',
      date: '2026-12-07',
      start: '10:00',
      end: '11:00',
      icon: 'kalash',
      description:
        'The families meet over gol dhana, sweets and blessings. A chandlo of kumkum marks the beginning of a sacred bond.',
      venue: 'Hotel Unity',
      address: 'NH 48, beside Swaminarayan Temple, Zadeshwar Chowkdi, Meghdoot Twp, Zadeshwar, Bharuch, Gujarat 392015',
      mapQuery: 'Hotel Unity, NH 48, Zadeshwar, Bharuch, Gujarat 392015',
    },
    {
      id: 'sagai',
      title: 'Sagai: Ring Ceremony',
      date: '2026-12-07',
      start: '11:00',
      end: '13:00',
      icon: 'rings',
      description:
        'Before Ganesh ji and our elders, two hearts exchange rings and promises. The heart of the celebration.',
      venue: 'Hotel Unity',
      address: 'NH 48, beside Swaminarayan Temple, Zadeshwar Chowkdi, Meghdoot Twp, Zadeshwar, Bharuch, Gujarat 392015',
      mapQuery: 'Hotel Unity, NH 48, Zadeshwar, Bharuch, Gujarat 392015',
    },
    {
      id: 'bhoj',
      title: 'Bhojan & Raas Garba',
      date: '2026-12-07',
      start: '19:00',
      end: '23:00',
      icon: 'diya',
      description:
        'An evening of a grand Gujarati thali, dhol, dandiya raas and garba. Come hungry, leave dancing.',
      venue: 'Hotel Unity',
      address: 'NH 48, beside Swaminarayan Temple, Zadeshwar Chowkdi, Meghdoot Twp, Zadeshwar, Bharuch, Gujarat 392015',
      mapQuery: 'Hotel Unity, NH 48, Zadeshwar, Bharuch, Gujarat 392015',
    },
  ],

  story: [
    {
      year: '[Year]',
      title: 'The First Hello',
      text: 'It began with a simple hello and a conversation that somehow never really ended.',
    },
    {
      year: '[Year]',
      title: 'Families Meet',
      text: 'Chai, laughter and a little nervousness. Two families discovered they already felt like one.',
    },
    {
      year: '[Year]',
      title: 'The Blessing',
      text: 'With the aashirwad of our elders and Ganesh ji, a beautiful yes was spoken.',
    },
    {
      year: '2026',
      title: 'Sagai',
      text: 'And now, we invite you to witness the first step of forever.',
    },
  ],

  // Add more photos to src/assets and list them here
  gallery: [
    { src: couple1, caption: 'Two Souls' },
    { src: couple2, caption: 'Together', position: '50% 30%' },
    { src: groomPhoto, caption: 'Rahul', position: '50% 10%' },
    { src: bridePhoto, caption: 'Neha' },
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
