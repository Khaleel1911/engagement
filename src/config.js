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

export const config = {
  groom: {
    name: 'Rahul',
    fullName: 'Rahul Chauhan',
    parents: 'Shri [Father’s Name] & Smt. [Mother’s Name]',
    relation: 'सुपुत्र', // son of
    photo: groomPhoto,
    photoPosition: '50% 8%', // which part of the photo to keep in the arch
    about: 'Calm, curious and endlessly kind. Believes every good day starts with chai and ends with family.',
  },
  bride: {
    name: 'Neha',
    fullName: 'Neha [Surname]',
    parents: 'Shri [Father’s Name] & Smt. [Mother’s Name]',
    relation: 'सुपुत्री', // daughter of
    photo: bridePhoto,
    photoPosition: '50% 20%',
    about: 'Warm laughter, a heart full of music, and a smile that makes every room feel like home.',
  },

  // Main ceremony date/time, used by the countdown (local time, 24h)
  mainDate: '2026-12-12T11:00:00',
  displayDate: 'Saturday, 12th December 2026',
  displayDateHindi: 'शनिवार, 12 दिसंबर 2026',

  hostFamily: 'The Chauhan Family',
  city: '[City], Chhattisgarh',

  images: { logo, rings, ganesh, couple1, couple2 },
  music: '/music/shehnai.mp3', // optional background music

  events: [
    {
      id: 'tilak',
      title: 'Tilak & Phaldan',
      hindi: 'तिलक एवं फलदान',
      date: '2026-12-12',
      start: '10:00',
      end: '11:00',
      icon: 'kalash',
      description:
        'The families meet with coconut, fruits, sweets and blessings. A tilak of kumkum marks the beginning of a sacred bond.',
      venue: '[Venue Name]',
      address: '[Full Address], [City], Chhattisgarh',
      mapQuery: 'Raipur Chhattisgarh',
    },
    {
      id: 'sagai',
      title: 'Sagai: Ring Ceremony',
      hindi: 'सगाई · अंगूठी रस्म',
      date: '2026-12-12',
      start: '11:00',
      end: '13:00',
      icon: 'rings',
      description:
        'Before Ganesh ji and our elders, two hearts exchange rings and promises. The heart of the celebration.',
      venue: '[Venue Name]',
      address: '[Full Address], [City], Chhattisgarh',
      mapQuery: 'Raipur Chhattisgarh',
    },
    {
      id: 'bhoj',
      title: 'Preetibhoj & Sangeet',
      hindi: 'प्रीतिभोज एवं संगीत',
      date: '2026-12-12',
      start: '19:00',
      end: '23:00',
      icon: 'diya',
      description:
        'An evening of Chhattisgarhi flavours, folk songs, dhol and dance. Come hungry, leave dancing.',
      venue: '[Venue Name]',
      address: '[Full Address], [City], Chhattisgarh',
      mapQuery: 'Raipur Chhattisgarh',
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
    name: '[Venue Name]',
    address: '[Full Address], [City], Chhattisgarh – [PIN]',
    mapQuery: 'Raipur Chhattisgarh', // what Google Maps should search for
    notes: 'Ample parking available. The venue is 15 minutes from [Railway Station / Airport].',
    // Labels on the illustrated map (swap for real nearby places)
    mapLabels: { start: 'City Centre', landmark: 'Mandir', pond: 'Talab', river: 'Nadi', station: 'Station' },
  },

  // Shown in the footer ("For any queries")
  rsvp: {
    contacts: [
      { name: '[Contact Name]', phone: '+91 XXXXX XXXXX' },
      { name: '[Contact Name]', phone: '+91 XXXXX XXXXX' },
    ],
  },

  hashtag: '#RahulNehaKiSagai',
}
