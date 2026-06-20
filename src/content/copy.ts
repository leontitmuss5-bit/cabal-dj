// Single source of truth for site copy. Edit here, not in components.
// Rule: say less. If a line could be on any DJ site, cut it.

// Flip to true when the Sets page is ready to go live again.
export const features = {
  sets: false,
};

export const brand = {
  name: 'CaBaL',
  email: 'bookings@cabal.dj', // TODO confirm real address
  instagram: '@cabal_dj_',
  instagramUrl: 'https://instagram.com/cabal_dj_',
  replyHours: 48,
};

export const home = {
  kicker: 'Sydney DJ collective',
  tagline: 'Clubs. Weddings. Everything between.',
  marquee: 'CABAL — SYDNEY — JAZZ HOUSE — HARDGROOVE — UKG — TRANCE — ',
  footerLine: 'The Greenwood · the Cult · the Steyne · Block Party',
};

export const weddings = {
  hero: 'Events',
  subline: 'A set built around your night. Not a playlist on shuffle.',
  intro:
    'Three DJs who play Sydney\u2019s clubs on the weekend and your event like it matters more. One conversation beforehand, a floor read properly on the night.',
  subsections: [
    { h: 'Weddings', p: 'First dance to last song. Must-plays, no-gos, and the feel you want — carried across the whole night.' },
    { h: 'Parties', p: 'Birthdays, engagements, warehouse nights, backyards. You bring the people.' },
    { h: 'Corporate', p: 'Launches and end-of-years that don\u2019t feel like a function band.' },
  ],
  included: [
    'Full sound system — speakers, decks, lighting. Owned, not rented',
    'Setup, soundcheck, pack-down handled',
    'Must-plays and do-not-plays sorted beforehand',
    'Announcements and transitions, clean',
    'Backup gear for everything',
  ],
  packages: [
    { name: 'Basic', price: 'from $300', detail: '3 hours · 1× JBL EON 715 · lights' },
    { name: 'Full', price: 'from $500', detail: 'up to 5 hours · 2× JBL EON 715 + sub · full lights', featured: true },
    { name: 'Pro', price: 'POA', detail: 'full night · custom production scaled to the venue' },
  ],
  packageNote: 'Indicative — every event is quoted to its night.',
  faq: [
    { q: 'How far ahead should we book?', a: 'Two weeks is comfortable. Less is often fine — ask.' },
    { q: 'Do you take requests?', a: 'We build a must-play and do-not-play list with you, then read the floor on the night.' },
    { q: 'Deposit?', a: '50% to hold the date, 50% after.' },
    { q: 'Outside Sydney?', a: 'Often. Tell us where.' },
    { q: 'What if something fails?', a: 'Backup gear, backup plan. The night doesn\u2019t stop.' },
  ],
};

// Interactive rig — hotspots map onto /media/rig-setup.jpg.
// box is % of the image: { x, y, w, h } from top-left.
export const rigParts = [
  {
    id: 'speakers',
    label: 'Speakers',
    spec: '2× JBL EON 715',
    blurb: '15" powered PA speakers — 1300W each. Loud, clean and even, whether it’s a backyard or a packed room. Add a sub for the bigger nights.',
    boxes: [
      { x: 3.5, y: 31, w: 20, h: 24 },
      { x: 76.5, y: 31, w: 20, h: 24 },
    ],
  },
  {
    id: 'lights',
    label: 'Lights',
    spec: 'Chauvet GigBAR 2',
    blurb: 'All-in-one lighting bar — derbies, wash, lasers and strobe, beat-synced to the music. The room moves with the set.',
    boxes: [{ x: 31.5, y: 37, w: 37.5, h: 10 }],
  },
  {
    id: 'decks',
    label: 'Decks',
    spec: 'Denon DJ Prime 4+',
    blurb: 'Standalone 4-channel pro system — four decks, no laptop. The same setup we run in the clubs, brought to your night.',
    boxes: [{ x: 32, y: 69, w: 34, h: 11 }],
  },
];

export const clubs = {
  hero: 'Sets',
  intro: 'Jazz and funk house through trance and hardgroove. Filmed at Selecta Studios, played across Sydney.',
  sets: [
    { title: 'Jazz / funk house', tag: 'studio · selecta' },
    { title: 'Classic house', tag: 'live · the greenwood' },
    { title: 'Trance / hardgroove', tag: 'warehouse · block party' },
  ],
  playedAt: ['The Greenwood', 'the Cult', 'the Steyne', 'Block Party'],
  mixes: [
    { title: 'Jazz / funk house', tag: 'studio · selecta' },
    { title: 'Classic house', tag: 'live' },
    { title: 'Trance / hardgroove', tag: 'warehouse' },
  ],
  industryContact: 'Venue & agency enquiries',
};

export const about = {
  hero: 'Three of us',
  definition: {
    word: 'CaB·aL',
    pronunciation: '/ kəˈbal / noun',
    text: 'A small, tightly bound group of people united by a shared obsession — in our case, the ones who control the room without anyone knowing their names. Operating through instinct, trust, and an unreasonable attachment to the groove. Negative connotations optional.',
  },
  story:
    'Leon, Cade and Blake. Years apart around Sydney\u2019s pubs and clubs before realising the sets were better as a unit. The crew that plays the clubs is the crew at your event — that\u2019s the whole point.',
  members: [
    { name: 'Leon Titmuss', role: 'jazz / funk / classic house · UKG', bio: 'The most experienced of the three. Clean mixing, digs for the niche records.' },
    { name: 'Cade Slayter', role: 'hardgroove · commercial', bio: 'Brings the vibe. Will play anything, loose and fun.' },
    { name: 'Blake Dewhurst', role: 'hardgroove · house', bio: 'Versatile and clean. Lives for hardgroove.' },
  ],
  setup:
    'We own the rig — speakers, decks, lighting. What you hear at soundcheck is what you get at peak.',
};

export const epk = {
  bio: 'Cabal — Leon Titmuss, Cade Slayter, Blake Dewhurst. Sydney three-piece moving between jazz and funk house, classic house, trance and hardgroove. Self-contained: own rig, own sound. Clubs, festivals, private events.',
  includes: ['logo pack', 'hi-res stills', 'technical setup', 'genre list', 'mix links'],
};

// Real media assets (processed from the Cabal set into /public/media)
export const media = {
  // brand
  logo: '/media/cabal-logo.png',
  brandSquare: '/media/brand-square.jpg',
  homeBg: '/media/home-bg.jpg',

  // amber rig / laser atmosphere — the brand's look
  laserAmber: '/media/laser-amber.jpg',
  laserAmber2: '/media/laser-amber-2.jpg',
  laserColor: '/media/laser-color.jpg',

  // crowd + party energy
  party: [
    '/media/party-01.jpg', '/media/party-02.jpg', '/media/party-03.jpg',
    '/media/party-04.jpg', '/media/party-05.jpg', '/media/party-06.jpg',
    '/media/party-07.jpg', '/media/party-08.jpg',
  ],
  boothPov: '/media/booth-pov.jpg',
  crew: '/media/crew.jpg',
  crew2: '/media/crew-2.jpg',
  djTrio: '/media/dj-trio.jpg',

  // profiles
  leon: '/media/leon.jpg',
  cade: '/media/cade.jpg',
  blake: '/media/blake.jpg',

  // recent set — scrolling gallery on the events page
  recentSet: [
    '/media/recent/1.jpg', '/media/recent/2.jpg', '/media/recent/3.jpg',
    '/media/recent/4.jpg', '/media/recent/5.jpg',
  ],
};
