// src/utils/constants.js
export const APP_NAME = 'BONUS BUS';
export const APP_VERSION = '1.0.0';

export const CITIES = [
  'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kakinada',
  'Rajahmundry', 'Tirupati', 'Anantapur', 'Kurnool', 'Kadapa',
  'Ongole', 'Chittoor', 'Machilipatnam', 'Srikakulam', 'Vizianagaram',
  'Anakapalle', 'Bheemili', 'Narsipatnam', 'Tuni', 'Paderu',
  'Araku Valley', 'Sabbavaram', 'Eluru', 'Bhimavaram', 'Tadepalligudem',
  'Palakollu', 'Tanuku', 'Nidadavole', 'Amalapuram', 'Ramachandrapuram',
  'Mandapeta', 'Chilakaluripet', 'Tenali', 'Mangalagiri', 'Tadikonda',
  'Nuzvid', 'Gudivada', 'Kavali', 'Kovvur', 'Rajanagaram',
  'Samalkot', 'Pithapuram', 'Yeleswaram', 'Madanapalle', 'Punganur',
  'Rayachoti', 'Proddatur', 'Badvel', 'Mydukur', 'Jammalamadugu',
  'Adoni', 'Nandyal', 'Dharmavaram', 'Hindupur', 'Madakasira',
  'Puttaparthi'
];

export const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', icon: 'bi-qr-code' },
  { id: 'card', name: 'Card', icon: 'bi-credit-card' },
  { id: 'netbanking', name: 'Net Banking', icon: 'bi-bank' },
  { id: 'wallet', name: 'Wallet', icon: 'bi-wallet2' }
];

export const BUS_TYPES = [
  { id: 'ac-sleeper', name: 'AC Sleeper', icon: 'bi-moon' },
  { id: 'ac-seater', name: 'AC Seater', icon: 'bi-person-workspace' },
  { id: 'ac-semi-sleeper', name: 'AC Semi-Sleeper', icon: 'bi-person-workspace' },
  { id: 'ac-luxury', name: 'AC Luxury', icon: 'bi-stars' }
];

export const DISCOUNT_TIERS = [
  { minMembers: 10, discount: 10, label: 'Small Group (10-19)' },
  { minMembers: 20, discount: 15, label: 'Medium Group (20-34)' },
  { minMembers: 35, discount: 18, label: 'Medium-Large Group (35-49)' },
  { minMembers: 50, discount: 20, label: 'Large Group (50+)' }
];

export const TEMPLE_ROUTES = [
  {
    id: 1,
    name: 'Tirupati Tirumala',
    location: 'Tirupati',
    distance: '150 km',
    duration: '3h 30m',
    price: 850,
    color: '#fd7e14'
  },
  {
    id: 2,
    name: 'Srikalahasti',
    location: 'Srikalahasti',
    distance: '120 km',
    duration: '2h 45m',
    price: 650,
    color: '#198754'
  },
  // ... more temples
];

export const ROUTE_FARES = {
  'Visakhapatnam → Vijayawada': 600,
  'Vijayawada → Tirupati': 500,
  'Visakhapatnam → Tirupati': 450,
  'Tirupati → Visakhapatnam': 550,
  'Guntur → Kurnool': 400,
  'Rajahmundry → Vijayawada': 450,
  'Visakhapatnam → Hyderabad': 650,
  'Vijayawada → Bengaluru': 700,
};

export const AMENITIES = [
  { id: 'wifi', name: 'Free WiFi', icon: 'bi-wifi' },
  { id: 'charging', name: 'Charging Ports', icon: 'bi-battery-charging' },
  { id: 'ac', name: 'AC', icon: 'bi-snow2' },
  { id: 'water', name: 'Drinking Water', icon: 'bi-droplet' },
  { id: 'snacks', name: 'Snacks', icon: 'bi-cup-hot' },
  { id: 'comfort', name: 'Comfy Seats', icon: 'bi-person-workspace' }
];

export const GREEN_POINTS_RULES = {
  perRide: 10,
  referral: 100,
  cashback: 0.1, // 10% cashback
  co2SavedPerKm: 0.15 // kg CO2 saved per km
};

export const CONTACT_INFO = {
  helpline: '+91 1800-123-456',
  email: 'support@bonusbus.ap.gov.in',
  workingHours: '8:00 AM - 8:00 PM',
  office: 'Secretariat, Amaravati, Andhra Pradesh'
};

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/bonusbus',
  twitter: 'https://twitter.com/bonusbus',
  instagram: 'https://instagram.com/bonusbus',
  linkedin: 'https://linkedin.com/company/bonusbus'
};
