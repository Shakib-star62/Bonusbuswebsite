// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Button, Form, Badge, 
  Modal, ProgressBar, Alert, Tabs, Tab, Navbar, Dropdown
} from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  
  // Booking type state (Bus or Car)
  const [bookingType, setBookingType] = useState('bus');
  
  // Bus search states
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Car search states
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().split('T')[0]);
  const [dropDate, setDropDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('10:00');
  const [carType, setCarType] = useState('all');
  const [carCapacity, setCarCapacity] = useState('all');
  
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [featuredRoutes, setFeaturedRoutes] = useState([]);
  const [featuredCars, setFeaturedCars] = useState([]);
  const [offers, setOffers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [carSearchResults, setCarSearchResults] = useState([]);
  const [alternativeRoutes, setAlternativeRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCarBookingModal, setShowCarBookingModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter states
  const [filterType, setFilterType] = useState('all'); // For bus filter
  const [carFilterType, setCarFilterType] = useState('all'); // For car filter

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Featured EV bus routes
    setFeaturedRoutes([
      { id: 1, from: 'Visakhapatnam', to: 'Vijayawada', price: '₹850', duration: '6h 30m', departures: '6 buses', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 2, from: 'Vijayawada', to: 'Tirupati', price: '₹650', duration: '8h 15m', departures: '4 buses', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 3, from: 'Guntur', to: 'Kakinada', price: '₹750', duration: '5h 45m', departures: '5 buses', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 4, from: 'Tirupati', to: 'Visakhapatnam', price: '₹1200', duration: '10h 00m', departures: '3 buses', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    ]);

    // Featured EV cars (both 4+1 and 7+1 capacity - no minibuses)
    setFeaturedCars([
      { id: 1, name: 'Tata Nexon EV', type: 'Electric SUV', price: '₹16/km', range: '312 km/charge', capacity: '4+1', features: ['Fast Charging', 'Eco-friendly', 'Pushback'], image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 2, name: 'MG ZS EV', type: 'Electric SUV', price: '₹18/km', range: '461 km/charge', capacity: '4+1', features: ['Fast Charging', 'Premium', 'Sunroof'], image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 3, name: 'Mahindra XUV400 EV', type: 'Electric SUV', price: '₹22/km', range: '456 km/charge', capacity: '7+1', features: ['Fast Charging', 'Spacious', 'Pushback Seats'], image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 4, name: 'BYD e6', type: 'Electric MPV', price: '₹24/km', range: '520 km/charge', capacity: '7+1', features: ['Fast Charging', 'Extra Luggage', 'Pushback Seats'], image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    ]);

    // Offers (visible before login)
    setOffers([
      { id: 1, title: 'Weekend Special', description: '20% off on all EV buses', code: 'WEEKEND20', validTill: 'Mar 31, 2026', bgColor: 'primary' },
      { id: 2, title: 'Group Discount', description: 'Flat ₹500 off on 7+1 cars', code: 'GROUP500', validTill: 'Apr 15, 2026', bgColor: 'success' },
      { id: 3, title: 'First Ride', description: 'Get ₹100 wallet cashback', code: 'FIRSTRIDE', validTill: 'May 1, 2026', bgColor: 'info' },
      { id: 4, title: 'Green Points', description: 'Double points on EV bookings', code: 'GREEN2X', validTill: 'Jun 30, 2026', bgColor: 'warning' },
    ]);
  }, []);

  // Comprehensive EV bus data
  const allBuses = [
    {
      id: 'EV101',
      name: 'GreenLine EV',
      type: 'AC Sleeper',
      from: 'Visakhapatnam',
      to: 'Vijayawada',
      departureTime: '06:00 AM',
      arrivalTime: '12:30 PM',
      duration: '6h 30m',
      price: 850,
      availableSeats: 18,
      totalSeats: 36,
      amenities: ['wifi', 'charging', 'ac', 'water'],
      rating: 4.5,
      reviews: 234,
      busType: 'sleeper',
      operator: 'GreenLine EV Travels',
      busNumber: 'AP31 EV 1234',
      range: '400 km/charge',
      chargingStops: 2
    },
    {
      id: 'EV102',
      name: 'EcoRide EV',
      type: 'AC Seater',
      from: 'Visakhapatnam',
      to: 'Vijayawada',
      departureTime: '08:30 AM',
      arrivalTime: '02:45 PM',
      duration: '6h 15m',
      price: 750,
      availableSeats: 12,
      totalSeats: 40,
      amenities: ['wifi', 'ac', 'water'],
      rating: 4.2,
      reviews: 156,
      busType: 'seater',
      operator: 'EcoRide EV Transport',
      busNumber: 'AP39 EV 5678',
      range: '350 km/charge',
      chargingStops: 2
    },
    {
      id: 'EV103',
      name: 'Volvo EV',
      type: 'AC Semi-Sleeper',
      from: 'Visakhapatnam',
      to: 'Vijayawada',
      departureTime: '10:00 AM',
      arrivalTime: '04:15 PM',
      duration: '6h 15m',
      price: 950,
      availableSeats: 6,
      totalSeats: 32,
      amenities: ['wifi', 'charging', 'ac', 'water', 'snacks'],
      rating: 4.8,
      reviews: 312,
      busType: 'semi-sleeper',
      operator: 'Volvo EV India',
      busNumber: 'AP31 EV 9012',
      range: '450 km/charge',
      chargingStops: 1
    },
    {
      id: 'EV104',
      name: 'City Express EV',
      type: 'AC Sleeper',
      from: 'Visakhapatnam',
      to: 'Vijayawada',
      departureTime: '09:00 PM',
      arrivalTime: '03:30 AM',
      duration: '6h 30m',
      price: 800,
      availableSeats: 24,
      totalSeats: 36,
      amenities: ['wifi', 'charging', 'ac', 'water'],
      rating: 4.3,
      reviews: 189,
      busType: 'sleeper',
      operator: 'City EV Express',
      busNumber: 'AP39 EV 3456',
      range: '380 km/charge',
      chargingStops: 2
    },
    {
      id: 'EV105',
      name: 'BYD EV Bus',
      type: 'AC Sleeper',
      from: 'Visakhapatnam',
      to: 'Vijayawada',
      departureTime: '11:30 PM',
      arrivalTime: '06:00 AM',
      duration: '6h 30m',
      price: 900,
      availableSeats: 15,
      totalSeats: 30,
      amenities: ['wifi', 'charging', 'ac', 'water', 'blankets'],
      rating: 4.7,
      reviews: 278,
      busType: 'sleeper',
      operator: 'BYD EV Motors',
      busNumber: 'AP31 EV 7890',
      range: '500 km/charge',
      chargingStops: 1
    }
  ];

  // Comprehensive EV car data - Both 4+1 and 7+1 capacity (no minibuses)
  const allCars = [
    // 4+1 Capacity Cars
    {
      id: 'CAR001',
      name: 'Tata Nexon EV Max',
      type: 'Electric SUV',
      transmission: 'Automatic',
      fuel: 'Electric',
      price: 16,
      priceUnit: 'km',
      capacity: '4+1',
      range: '312 km/charge',
      chargingTime: '60 min (0-80%)',
      available: true,
      features: ['Fast Charging', 'Eco-friendly', 'Pushback Seats', 'Sunroof', 'Music System'],
      rating: 4.6,
      trips: 2345,
      operator: 'Green EV Cabs',
      regNumber: 'AP39 EV 1111',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'CAR002',
      name: 'MG ZS EV',
      type: 'Electric SUV',
      transmission: 'Automatic',
      fuel: 'Electric',
      price: 18,
      priceUnit: 'km',
      capacity: '4+1',
      range: '461 km/charge',
      chargingTime: '50 min (0-80%)',
      available: true,
      features: ['Fast Charging', 'Premium', 'Sunroof', 'V2L Charging', 'Music System'],
      rating: 4.8,
      trips: 1876,
      operator: 'Premium EV Cabs',
      regNumber: 'AP39 EV 2222',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'CAR003',
      name: 'Hyundai Kona Electric',
      type: 'Electric SUV',
      transmission: 'Automatic',
      fuel: 'Electric',
      price: 17,
      priceUnit: 'km',
      capacity: '4+1',
      range: '452 km/charge',
      chargingTime: '57 min (0-80%)',
      available: true,
      features: ['Fast Charging', 'Smart Tech', 'Pushback Seats', 'Music System'],
      rating: 4.7,
      trips: 1567,
      operator: 'Eco EV Cabs',
      regNumber: 'AP39 EV 3333',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'CAR004',
      name: 'Tata Tiago EV',
      type: 'Electric Hatchback',
      transmission: 'Automatic',
      fuel: 'Electric',
      price: 12,
      priceUnit: 'km',
      capacity: '4+1',
      range: '250 km/charge',
      chargingTime: '45 min (0-80%)',
      available: true,
      features: ['Fast Charging', 'Eco-friendly', 'Compact', 'Music System'],
      rating: 4.4,
      trips: 3124,
      operator: 'City EV Cabs',
      regNumber: 'AP39 EV 4444',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'CAR005',
      name: 'Citroen ë-C3',
      type: 'Electric Hatchback',
      transmission: 'Automatic',
      fuel: 'Electric',
      price: 13,
      priceUnit: 'km',
      capacity: '4+1',
      range: '320 km/charge',
      chargingTime: '50 min (0-80%)',
      available: true,
      features: ['Fast Charging', 'Spacious', 'Music System', 'Eco-friendly'],
      rating: 4.5,
      trips: 987,
      operator: 'Green EV Cabs',
      regNumber: 'AP39 EV 5555',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'CAR006',
      name: 'BYD Atto 3',
      type: 'Electric SUV',
      transmission: 'Automatic',
      fuel: 'Electric',
      price: 20,
      priceUnit: 'km',
      capacity: '4+1',
      range: '521 km/charge',
      chargingTime: '45 min (0-80%)',
      available: true,
      features: ['Fast Charging', 'Premium', 'Sunroof', 'V2L Charging', 'Music System'],
      rating: 4.9,
      trips: 2341,
      operator: 'Luxury EV Cabs',
      regNumber: 'AP39 EV 6666',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    // 7+1 Capacity Cars (Family/Group cars - no minibuses)
    {
      id: 'CAR007',
      name: 'Mahindra XUV400 EV',
      type: 'Electric SUV',
      transmission: 'Automatic',
      fuel: 'Electric',
      price: 22,
      priceUnit: 'km',
      capacity: '7+1',
      range: '456 km/charge',
      chargingTime: '65 min (0-80%)',
      available: true,
      features: ['Fast Charging', 'Spacious', 'Pushback Seats', 'AC', 'Music System'],
      rating: 4.7,
      trips: 1456,
      operator: 'Family EV Cabs',
      regNumber: 'AP39 EV 7777',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'CAR008',
      name: 'BYD e6',
      type: 'Electric MPV',
      transmission: 'Automatic',
      fuel: 'Electric',
      price: 24,
      priceUnit: 'km',
      capacity: '7+1',
      range: '520 km/charge',
      chargingTime: '60 min (0-80%)',
      available: true,
      features: ['Fast Charging', 'Extra Luggage', 'Pushback Seats', 'AC', 'Entertainment System'],
      rating: 4.8,
      trips: 892,
      operator: 'Group EV Cabs',
      regNumber: 'AP39 EV 8888',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const cities = [
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kakinada',
    'Rajahmundry', 'Tirupati', 'Anantapur', 'Kurnool', 'Kadapa',
    'Ongole', 'Chittoor', 'Machilipatnam', 'Srikakulam', 'Vizianagaram'
  ];

  const evCarTypes = [
    'All Types', 'Electric SUV', 'Electric Hatchback', 'Electric MPV'
  ];

  const capacityOptions = [
    'All Capacities', '4+1', '7+1'
  ];

  const handleSearch = () => {
    if (bookingType === 'bus') {
      if (selectedFrom && selectedTo) {
        // No login required for search
        setLoading(true);
        
        setTimeout(() => {
          const direct = allBuses.filter(bus => 
            bus.from === selectedFrom && bus.to === selectedTo
          );
          
          const alternatives = allBuses.filter(bus => 
            (bus.from === selectedFrom || bus.to === selectedTo) && 
            !(bus.from === selectedFrom && bus.to === selectedTo)
          ).slice(0, 4);
          
          setSearchResults(direct);
          setAlternativeRoutes(alternatives);
          setShowSearchResults(true);
          setLoading(false);
          
          const search = { type: 'bus', from: selectedFrom, to: selectedTo, date: selectedDate };
          const updated = [search, ...recentSearches.filter(s => 
            !(s.from === search.from && s.to === search.to)
          ).slice(0, 4)];
          setRecentSearches(updated);
          localStorage.setItem('recentSearches', JSON.stringify(updated));
          
          setTimeout(() => {
            document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }, 1500);
      }
    } else {
      // Car search
      if (pickupLocation && dropLocation) {
        // No login required for search
        setLoading(true);
        
        setTimeout(() => {
          let filtered = allCars;
          
          // Filter by car type (if not 'all')
          if (carType !== 'all' && carType !== 'All Types') {
            filtered = filtered.filter(car => car.type === carType);
          }
          
          // Filter by capacity
          if (carCapacity !== 'all' && carCapacity !== 'All Capacities') {
            filtered = filtered.filter(car => car.capacity === carCapacity);
          }
          
          setCarSearchResults(filtered);
          setShowSearchResults(true);
          setLoading(false);
          
          const search = { type: 'car', from: pickupLocation, to: dropLocation, date: pickupDate };
          const updated = [search, ...recentSearches.filter(s => 
            !(s.from === search.from && s.to === search.to)
          ).slice(0, 4)];
          setRecentSearches(updated);
          localStorage.setItem('recentSearches', JSON.stringify(updated));
          
          setTimeout(() => {
            document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }, 1500);
      }
    }
  };

  const handleBookNow = (bus) => {
    // Show login prompt only when booking
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    setSelectedBus(bus);
    setShowBookingModal(true);
  };

  const handleBookCarNow = (car) => {
    // Show login prompt only when booking
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    setSelectedCar(car);
    setShowCarBookingModal(true);
  };

  const handleConfirmBooking = () => {
    setShowBookingModal(false);
    alert(`EV Bus booking confirmed for ${selectedBus?.id}! Check your email for confirmation.`);
  };

  const handleConfirmCarBooking = () => {
    setShowCarBookingModal(false);
    alert(`EV Car booking confirmed for ${selectedCar?.name}! Driver details will be sent to your phone.`);
  };

  const swapLocations = () => {
    setSelectedFrom(selectedTo);
    setSelectedTo(selectedFrom);
  };

  const swapCarLocations = () => {
    setPickupLocation(dropLocation);
    setDropLocation(pickupLocation);
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: 'bi-wifi',
      charging: 'bi-battery-charging',
      'Fast Charging': 'bi-lightning-charge',
      ac: 'bi-snow2',
      water: 'bi-droplet',
      snacks: 'bi-cup-hot',
      'Music System': 'bi-music-note',
      'Pushback Seats': 'bi-arrow-bar-right',
      Sunroof: 'bi-brightness-high',
      'Eco-friendly': 'bi-tree',
      'Premium': 'bi-gem',
      'Smart Tech': 'bi-cpu',
      'Compact': 'bi-box',
      'Spacious': 'bi-arrows-angle-expand',
      'V2L Charging': 'bi-plug',
      'blankets': 'bi-snow',
      'Entertainment System': 'bi-tv',
      'Extra Luggage': 'bi-bag'
    };
    return icons[amenity] || 'bi-check-circle';
  };

  const filterByBusType = (type) => {
    if (type === 'all') return searchResults;
    return searchResults.filter(bus => bus.busType === type);
  };

  const filterByCarType = (type) => {
    if (type === 'all' || type === 'All Types') return carSearchResults;
    return carSearchResults.filter(car => car.type === type);
  };

  const filterByCarCapacity = (capacity) => {
    if (capacity === 'all' || capacity === 'All Capacities') return carSearchResults;
    return carSearchResults.filter(car => car.capacity === capacity);
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  // Top Menu Items
  const topMenuItems = [
    { path: '/', icon: 'bi-house-door', label: 'Home' },
    { path: '/pass', icon: 'bi-ticket-perforated', label: 'Monthly Pass' },
    { path: '/temples', icon: 'bi-building', label: 'Temple Tours' },
    { path: '/group', icon: 'bi-people', label: 'Group Booking' },
    { path: '/offers', icon: 'bi-gift', label: 'Offers' },
  ];

  // Bottom navigation items
  const bottomMenuItems = [
    { path: '/', icon: 'bi-house-door', label: 'Home' },
    { path: '/bookings', icon: 'bi-calendar-check', label: 'Bookings' },
    { path: '/wallet', icon: 'bi-wallet2', label: 'Wallet' },
    { path: '/account', icon: 'bi-person', label: 'Account' },
  ];

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Top Navigation Bar */}
      <Navbar bg="white" expand="lg" className="border-bottom py-2 sticky-top shadow-sm">
        <Container fluid>
          {/* Logo/Brand */}
          <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-2">
              <div className="bg-success bg-opacity-10 rounded-3 p-2">
                <i className="bi bi-ev-station text-success fs-3"></i>
              </div>
              <div>
                <h5 className="mb-0 fw-bold" style={{ 
                  background: 'linear-gradient(135deg, #0d6efd, #198754)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  BONUS BUS
                </h5>
                <small className="text-success">100% Electric · Go Green</small>
              </div>
            </div>
          </Navbar.Brand>

          {/* Search Bar - Desktop */}
          <div className="d-none d-md-flex align-items-center" style={{ maxWidth: '400px', width: '100%' }}>
            <form onSubmit={handleSearchSubmit} className="w-100">
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-search text-secondary"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search EV routes, buses, or cars..."
                  className="form-control bg-light border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Top Menu Items - Desktop */}
          <div className="d-none d-md-flex align-items-center gap-2">
            {topMenuItems.map(item => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "primary" : "light"}
                onClick={() => {
                  // Only check authentication for non-home protected routes
                  if (!isAuthenticated && item.path !== '/') {
                    setShowLoginPrompt(true);
                  } else {
                    navigate(item.path);
                  }
                }}
                className="d-flex align-items-center gap-2 px-3"
                size="sm"
              >
                <i className={`bi ${item.icon}`}></i>
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="d-flex align-items-center gap-3">
            {/* Help/Support */}
            <Button 
              variant="link" 
              className="text-secondary p-2 d-none d-md-block"
              onClick={() => window.open('tel:1800123456')}
            >
              <i className="bi bi-headset fs-5"></i>
            </Button>

            {/* Notification Bell */}
            {isAuthenticated && (
              <Button 
                variant="link" 
                className="position-relative text-secondary p-2 d-none d-md-block"
                onClick={() => navigate('/notifications')}
              >
                <i className="bi bi-bell fs-5"></i>
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 end-0 rounded-pill"
                  style={{ fontSize: '0.6rem' }}
                >
                  3
                </Badge>
              </Button>
            )}
            
            {/* Wallet Balance or Login/Signup Buttons */}
            {isAuthenticated ? (
              <Button 
                variant="success" 
                className="d-flex align-items-center gap-2"
                size="sm"
                onClick={() => navigate('/wallet')}
              >
                <i className="bi bi-wallet2"></i>
                <span className="fw-bold">₹{user?.walletBalance?.toFixed(2) || '2,450.75'}</span>
              </Button>
            ) : (
              <>
                {/* Desktop Login Button */}
                <Button 
                  variant="outline-primary" 
                  className="d-none d-md-flex align-items-center gap-2 rounded-pill"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  <i className="bi bi-box-arrow-in-right"></i>
                  <span>Login</span>
                </Button>
                
                {/* Desktop Sign Up Button */}
                <Button 
                  variant="success" 
                  className="d-none d-md-flex align-items-center gap-2 rounded-pill"
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
                  <i className="bi bi-person-plus"></i>
                  <span>Sign Up</span>
                </Button>
              </>
            )}

            {/* User Dropdown */}
            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" size="sm" className="border-0 d-flex align-items-center">
                  <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" 
                       style={{ width: '30px', height: '30px' }}>
                    <i className="bi bi-person text-white"></i>
                  </div>
                  <span className="d-none d-md-inline ms-2">{user?.name?.split(' ')[0] || 'User'}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow-lg border-0 mt-2" style={{ minWidth: '240px' }}>
                  <Dropdown.Header className="text-center py-3">
                    <div className="fw-bold">{user?.name || 'Shakib Ahmed'}</div>
                    <small className="text-secondary">{user?.email || 'shakib@example.com'}</small>
                    <Badge bg="success" className="mt-2">
                      <i className="bi bi-star-fill me-1"></i>
                      {user?.greenPoints || '1,250'} Green Points
                    </Badge>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => navigate('/account')} className="py-2">
                    <i className="bi bi-person me-2"></i>My Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/bookings')} className="py-2">
                    <i className="bi bi-ticket me-2"></i>My EV Bookings
                    <Badge bg="primary" className="ms-2">{user?.totalTrips || '6'}</Badge>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/wallet')} className="py-2">
                    <i className="bi bi-wallet2 me-2"></i>Wallet
                    <Badge bg="success" className="ms-2">₹{user?.walletBalance || '2,450'}</Badge>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/pass')} className="py-2">
                    <i className="bi bi-ticket-perforated me-2"></i>EV Monthly Pass
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/loyalty')} className="py-2">
                    <i className="bi bi-star me-2"></i>Green Points
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => setShowLogoutModal(true)} className="py-2 text-danger">
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              /* Mobile Login Button */
              <Button 
                variant="outline-primary" 
                size="sm" 
                className="d-md-none rounded-pill px-3"
                onClick={() => navigate('/login')}
              >
                <i className="bi bi-box-arrow-in-right me-1"></i>
                Login
              </Button>
            )}
          </div>
        </Container>
      </Navbar>

      {/* Mobile Search Bar */}
      <div className="d-md-none bg-white border-bottom py-2 px-3">
        <form onSubmit={handleSearchSubmit} className="d-flex align-items-center bg-light rounded-pill px-3 py-1">
          <i className="bi bi-search text-secondary me-2"></i>
          <input
            type="text"
            placeholder="Search EV routes..."
            className="form-control form-control-sm bg-light border-0 p-2"
            style={{ boxShadow: 'none' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Mobile Top Menu */}
      <div className="d-md-none bg-white border-bottom py-2 px-3 overflow-auto" style={{ whiteSpace: 'nowrap' }}>
        <div className="d-flex gap-2">
          {topMenuItems.map(item => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "primary" : "outline-secondary"}
              size="sm"
              onClick={() => {
                if (!isAuthenticated && item.path !== '/') {
                  setShowLoginPrompt(true);
                } else {
                  navigate(item.path);
                }
              }}
              className="d-inline-flex align-items-center gap-1 rounded-pill"
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow-1" style={{ paddingBottom: '70px' }}>
        <Container fluid className="px-4 py-4">
          {/* Welcome Banner for Logged-in Users - Only shown when authenticated */}
          {isAuthenticated && (
            <Card className="border-0 shadow-sm mb-4 overflow-hidden">
              <Card.Body className="p-4" style={{ background: 'linear-gradient(135deg, #0d6efd, #6610f2)' }}>
                <Row className="align-items-center">
                  <Col>
                    <h4 className="text-white fw-bold mb-2">
                      Welcome back, {user?.name?.split(' ')[0] || 'Shakib'}! 🎉
                    </h4>
                    <p className="text-white-50 mb-0">
                      <i className="bi bi-wallet2 me-1"></i> ₹{user?.walletBalance?.toFixed(2) || '2,450.75'} in wallet • 
                      <i className="bi bi-star-fill mx-1 text-warning"></i> {user?.greenPoints || 1250} Green Points
                    </p>
                  </Col>
                  <Col xs="auto">
                    <Button 
                      variant="light" 
                      className="rounded-pill" 
                      onClick={() => navigate('/wallet')}
                    >
                      <i className="bi bi-wallet2 me-2"></i>
                      View Wallet
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          {/* EV Booking Type Selector */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-3">
              <div className="d-flex gap-3 justify-content-center">
                <Button
                  variant={bookingType === 'bus' ? 'primary' : 'outline-primary'}
                  className="d-flex align-items-center gap-2 px-4 py-2"
                  onClick={() => setBookingType('bus')}
                >
                  <i className="bi bi-bus-front fs-4"></i>
                  <div className="text-start">
                    <div className="fw-bold">EV Buses</div>
                    <small>100% Electric AC</small>
                  </div>
                </Button>
                <Button
                  variant={bookingType === 'car' ? 'success' : 'outline-success'}
                  className="d-flex align-items-center gap-2 px-4 py-2"
                  onClick={() => setBookingType('car')}
                >
                  <i className="bi bi-car-front fs-4"></i>
                  <div className="text-start">
                    <div className="fw-bold">EV Cars</div>
                    <small>4+1 & 7+1 Seater</small>
                  </div>
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Hero Search Card */}
          <Card className="border-0 shadow-lg mb-5 overflow-hidden">
            <Card.Body className="p-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
              <Row className="align-items-center">
                <Col lg={7}>
                  <h1 className="display-5 fw-bold mb-3">
                    <span className="text-primary">Book Your</span>
                    <br />
                    <span className="text-success">100% Electric {bookingType === 'bus' ? 'Bus' : 'Car'}</span>
                  </h1>
                  <p className="lead text-secondary mb-4">
                    {bookingType === 'bus' 
                      ? 'Zero-emission EV buses across Andhra Pradesh. Safe, comfortable & eco-friendly travel.'
                      : 'Rent premium EV cars for local and outstation trips. Available in 4+1 and 7+1 seater options.'}
                  </p>
                  
                  {/* EV Bus Search Form */}
                  {bookingType === 'bus' && (
                    <Card className="border-0 shadow">
                      <Card.Body className="p-4">
                        <Row className="g-3">
                          <Col md={5}>
                            <Form.Group>
                              <Form.Label className="fw-medium text-secondary">
                                <i className="bi bi-geo-alt-fill text-primary me-1"></i>
                                From
                              </Form.Label>
                              <Form.Select 
                                value={selectedFrom}
                                onChange={(e) => setSelectedFrom(e.target.value)}
                                size="lg"
                                className="border-0 bg-light"
                              >
                                <option value="">Select departure city</option>
                                {cities.map(city => (
                                  <option key={city} value={city}>{city}</option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          
                          <Col md={1} className="d-flex align-items-center justify-content-center">
                            <Button 
                              variant="light" 
                              className="rounded-circle p-2 shadow-sm"
                              onClick={swapLocations}
                              style={{ width: '40px', height: '40px' }}
                            >
                              <i className="bi bi-arrow-left-right"></i>
                            </Button>
                          </Col>
                          
                          <Col md={5}>
                            <Form.Group>
                              <Form.Label className="fw-medium text-secondary">
                                <i className="bi bi-geo-alt-fill text-success me-1"></i>
                                To
                              </Form.Label>
                              <Form.Select 
                                value={selectedTo}
                                onChange={(e) => setSelectedTo(e.target.value)}
                                size="lg"
                                className="border-0 bg-light"
                              >
                                <option value="">Select arrival city</option>
                                {cities.map(city => (
                                  <option key={city} value={city}>{city}</option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          
                          <Col md={8}>
                            <Form.Group>
                              <Form.Label className="fw-medium text-secondary">
                                <i className="bi bi-calendar-date me-1"></i>
                                Journey Date
                              </Form.Label>
                              <Form.Control 
                                type="date" 
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                size="lg"
                                className="border-0 bg-light"
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={4} className="d-flex align-items-end">
                            <Button 
                              variant="primary" 
                              size="lg" 
                              className="w-100 fw-bold"
                              onClick={handleSearch}
                              disabled={!selectedFrom || !selectedTo || loading}
                              style={{ 
                                background: 'linear-gradient(135deg, #0d6efd, #0a58ca)', 
                                border: 'none',
                                height: '48px'
                              }}
                            >
                              {loading ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2"></span>
                                  Searching...
                                </>
                              ) : (
                                <>
                                  <i className="bi bi-search me-2"></i>
                                  Search EV Buses
                                </>
                              )}
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  )}

                  {/* EV Car Search Form */}
                  {bookingType === 'car' && (
                    <Card className="border-0 shadow">
                      <Card.Body className="p-4">
                        <Row className="g-3">
                          <Col md={5}>
                            <Form.Group>
                              <Form.Label className="fw-medium text-secondary">
                                <i className="bi bi-geo-alt-fill text-primary me-1"></i>
                                Pickup Location
                              </Form.Label>
                              <Form.Select 
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                                size="lg"
                                className="border-0 bg-light"
                              >
                                <option value="">Select pickup city</option>
                                {cities.map(city => (
                                  <option key={city} value={city}>{city}</option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          
                          <Col md={1} className="d-flex align-items-center justify-content-center">
                            <Button 
                              variant="light" 
                              className="rounded-circle p-2 shadow-sm"
                              onClick={swapCarLocations}
                              style={{ width: '40px', height: '40px' }}
                            >
                              <i className="bi bi-arrow-left-right"></i>
                            </Button>
                          </Col>
                          
                          <Col md={5}>
                            <Form.Group>
                              <Form.Label className="fw-medium text-secondary">
                                <i className="bi bi-geo-alt-fill text-success me-1"></i>
                                Drop Location
                              </Form.Label>
                              <Form.Select 
                                value={dropLocation}
                                onChange={(e) => setDropLocation(e.target.value)}
                                size="lg"
                                className="border-0 bg-light"
                              >
                                <option value="">Select drop city</option>
                                {cities.map(city => (
                                  <option key={city} value={city}>{city}</option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label className="fw-medium text-secondary">
                                <i className="bi bi-calendar-date me-1"></i>
                                Pickup Date
                              </Form.Label>
                              <Form.Control 
                                type="date" 
                                value={pickupDate}
                                onChange={(e) => setPickupDate(e.target.value)}
                                size="lg"
                                className="border-0 bg-light"
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={2}>
                            <Form.Group>
                              <Form.Label className="fw-medium text-secondary">
                                <i className="bi bi-clock me-1"></i>
                                Time
                              </Form.Label>
                              <Form.Control 
                                type="time" 
                                value={pickupTime}
                                onChange={(e) => setPickupTime(e.target.value)}
                                size="lg"
                                className="border-0 bg-light"
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label className="fw-medium text-secondary">
                                <i className="bi bi-calendar-date me-1"></i>
                                Drop Date
                              </Form.Label>
                              <Form.Control 
                                type="date" 
                                value={dropDate}
                                onChange={(e) => setDropDate(e.target.value)}
                                size="lg"
                                className="border-0 bg-light"
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label className="fw-medium text-secondary">
                                <i className="bi bi-car-front me-1"></i>
                                Car Type
                              </Form.Label>
                              <Form.Select 
                                value={carType}
                                onChange={(e) => setCarType(e.target.value)}
                                size="lg"
                                className="border-0 bg-light"
                              >
                                {evCarTypes.map(type => (
                                  <option key={type} value={type}>{type}</option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label className="fw-medium text-secondary">
                                <i className="bi bi-people-fill me-1"></i>
                                Capacity
                              </Form.Label>
                              <Form.Select 
                                value={carCapacity}
                                onChange={(e) => setCarCapacity(e.target.value)}
                                size="lg"
                                className="border-0 bg-light"
                              >
                                {capacityOptions.map(option => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          
                          <Col md={12} className="d-flex align-items-end">
                            <Button 
                              variant="success" 
                              size="lg" 
                              className="w-100 fw-bold"
                              onClick={handleSearch}
                              disabled={!pickupLocation || !dropLocation || loading}
                              style={{ 
                                background: 'linear-gradient(135deg, #28a745, #20c997)', 
                                border: 'none',
                                height: '48px'
                              }}
                            >
                              {loading ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2"></span>
                                  Searching...
                                </>
                              ) : (
                                <>
                                  <i className="bi bi-search me-2"></i>
                                  Search EV Cars
                                </>
                              )}
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  )}

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="mt-4 pt-3 border-top">
                      <small className="text-secondary me-3">
                        <i className="bi bi-clock-history me-1"></i>
                        Recent EV searches:
                      </small>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {recentSearches.map((search, index) => (
                          <Button
                            key={index}
                            variant="outline-primary"
                            size="sm"
                            className="rounded-pill"
                            onClick={() => {
                              if (search.type === 'bus') {
                                setBookingType('bus');
                                setSelectedFrom(search.from);
                                setSelectedTo(search.to);
                                setSelectedDate(search.date);
                                handleSearch();
                              } else {
                                setBookingType('car');
                                setPickupLocation(search.from);
                                setDropLocation(search.to);
                                setPickupDate(search.date);
                                handleSearch();
                              }
                            }}
                          >
                            <i className="bi bi-arrow-right-short"></i>
                            {search.type === 'bus' ? '🚌' : '🚗'} {search.from} → {search.to}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </Col>
                
                <Col lg={5}>
                  <div className="position-relative">
                    <img 
                      src={bookingType === 'bus' 
                        ? "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80"
                        : "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80"
                      }
                      alt={bookingType === 'bus' ? "EV Bus" : "EV Car"} 
                      className="img-fluid rounded-4 shadow"
                    />
                    <div className="position-absolute bottom-0 start-0 end-0 p-3 text-white" 
                         style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                      <small>
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        {bookingType === 'bus' ? '4.8 (10k+ reviews)' : '4.7 (5k+ reviews)'} • 100% Electric Fleet
                      </small>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* EV Bus Search Results */}
          {showSearchResults && bookingType === 'bus' && (
            <div id="search-results" className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="h4 fw-bold mb-1">
                    <i className="bi bi-bus-front text-primary me-2"></i>
                    Available EV Buses
                  </h3>
                  <p className="text-secondary mb-0">
                    {selectedFrom} → {selectedTo} • {new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <Badge bg="primary" className="px-3 py-2">
                  {searchResults.length} EV buses found
                </Badge>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-secondary">Searching for available EV buses...</p>
                </div>
              ) : (
                <>
                  {/* Filter Tabs */}
                  {searchResults.length > 0 && (
                    <div className="mb-4">
                      <Tabs
                        activeKey={filterType}
                        onSelect={(k) => setFilterType(k)}
                        className="mb-3"
                      >
                        <Tab eventKey="all" title="All EV Buses" />
                        <Tab eventKey="sleeper" title="EV Sleeper" />
                        <Tab eventKey="seater" title="EV Seater" />
                        <Tab eventKey="semi-sleeper" title="EV Semi-Sleeper" />
                      </Tabs>
                    </div>
                  )}

                  {/* Direct EV Buses */}
                  {searchResults.length > 0 ? (
                    <>
                      <h5 className="fw-bold mb-3">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Direct EV Buses
                      </h5>
                      <Row className="g-4 mb-5">
                        {filterByBusType(filterType).map((bus) => (
                          <Col key={bus.id} md={6} lg={6}>
                            <BusCard bus={bus} onBook={handleBookNow} isAuthenticated={isAuthenticated} />
                          </Col>
                        ))}
                      </Row>
                    </>
                  ) : (
                    <Alert variant="info" className="mb-4">
                      <i className="bi bi-info-circle-fill me-2"></i>
                      No direct EV buses found. Check out alternatives below.
                    </Alert>
                  )}

                  {/* Alternative EV Routes */}
                  {alternativeRoutes.length > 0 && (
                    <>
                      <h5 className="fw-bold mb-3 mt-4">
                        <i className="bi bi-arrow-left-right text-primary me-2"></i>
                        Alternative EV Routes
                      </h5>
                      <Row className="g-4">
                        {alternativeRoutes.map((bus) => (
                          <Col key={bus.id} md={6} lg={6}>
                            <AlternativeBusCard bus={bus} onBook={handleBookNow} isAuthenticated={isAuthenticated} />
                          </Col>
                        ))}
                      </Row>
                    </>
                  )}
                </>
              )}
            </div>
          )}

          {/* EV Car Search Results */}
          {showSearchResults && bookingType === 'car' && (
            <div id="search-results" className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="h4 fw-bold mb-1">
                    <i className="bi bi-car-front text-success me-2"></i>
                    Available EV Cars
                  </h3>
                  <p className="text-secondary mb-0">
                    {pickupLocation} → {dropLocation} • {new Date(pickupDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} {pickupTime}
                  </p>
                </div>
                <Badge bg="success" className="px-3 py-2">
                  {carSearchResults.length} EV cars found
                </Badge>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-success mb-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-secondary">Searching for available EV cars...</p>
                </div>
              ) : (
                <>
                  {/* EV Car Filter Tabs */}
                  {carSearchResults.length > 0 && (
                    <div className="mb-4">
                      <Tabs
                        activeKey={carFilterType}
                        onSelect={(k) => setCarFilterType(k)}
                        className="mb-3"
                      >
                        <Tab eventKey="all" title="All EV Cars" />
                        <Tab eventKey="Electric SUV" title="EV SUV" />
                        <Tab eventKey="Electric Hatchback" title="EV Hatchback" />
                        <Tab eventKey="Electric MPV" title="EV MPV" />
                      </Tabs>
                    </div>
                  )}

                  {/* EV Car Listings */}
                  {carSearchResults.length > 0 ? (
                    <Row className="g-4">
                      {filterByCarType(carFilterType).map((car) => (
                        <Col key={car.id} md={6} lg={6}>
                          <CarCard car={car} onBook={handleBookCarNow} isAuthenticated={isAuthenticated} />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <Alert variant="info" className="mb-4">
                      <i className="bi bi-info-circle-fill me-2"></i>
                      No EV cars available for this route. Please try different locations.
                    </Alert>
                  )}
                </>
              )}
            </div>
          )}

          {/* Featured EV Bus Routes */}
          {!showSearchResults && bookingType === 'bus' && (
            <div className="mb-5">
              <h3 className="h4 fw-bold mb-4">
                <i className="bi bi-stars text-primary me-2"></i>
                Popular EV Bus Routes in AP
              </h3>
              <Row className="g-4">
                {featuredRoutes.map((route) => (
                  <Col key={route.id} md={6} lg={3}>
                    <Card className="border-0 shadow-sm h-100">
                      <Card.Img variant="top" src={route.image} style={{ height: '160px', objectFit: 'cover' }} />
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold mb-0">{route.from} → {route.to}</h6>
                          <Badge bg="success">{route.price}</Badge>
                        </div>
                        <small className="text-secondary d-block mb-2">
                          <i className="bi bi-clock me-1"></i> {route.duration}
                        </small>
                        <small className="text-secondary d-block mb-3">
                          <i className="bi bi-bus-front me-1"></i> {route.departures} EV buses
                        </small>
                        <Button 
                          variant="outline-success" 
                          size="sm" 
                          className="w-100"
                          onClick={() => {
                            setBookingType('bus');
                            setSelectedFrom(route.from);
                            setSelectedTo(route.to);
                            handleSearch();
                          }}
                        >
                          Check Availability
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Featured EV Cars */}
          {!showSearchResults && bookingType === 'car' && (
            <div className="mb-5">
              <h3 className="h4 fw-bold mb-4">
                <i className="bi bi-stars text-success me-2"></i>
                Popular EV Cars for Rent
              </h3>
              <Row className="g-4">
                {featuredCars.map((car) => (
                  <Col key={car.id} md={6} lg={3}>
                    <Card className="border-0 shadow-sm h-100">
                      <Card.Img variant="top" src={car.image} style={{ height: '160px', objectFit: 'cover' }} />
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold mb-0">{car.name}</h6>
                          <Badge bg="success">{car.price}</Badge>
                        </div>
                        <small className="text-secondary d-block mb-2">
                          <i className="bi bi-people me-1"></i> {car.capacity} • {car.type} • {car.range}
                        </small>
                        <div className="d-flex gap-1 flex-wrap mb-3">
                          {car.features.slice(0, 2).map((feature, idx) => (
                            <Badge key={idx} bg="light" text="dark" className="px-2 py-1">
                              <i className={`bi ${getAmenityIcon(feature)} me-1`}></i>
                              {feature}
                            </Badge>
                          ))}
                          {car.features.length > 2 && (
                            <Badge bg="light" text="dark">+{car.features.length - 2}</Badge>
                          )}
                        </div>
                        <Button 
                          variant="outline-success" 
                          size="sm" 
                          className="w-100"
                          onClick={() => {
                            setBookingType('car');
                          }}
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Offers Section - Visible Before Login */}
          <div className="mb-5">
            <h3 className="h4 fw-bold mb-4">
              <i className="bi bi-gift text-danger me-2"></i>
              Exclusive EV Offers
            </h3>
            <Row className="g-4">
              {offers.map((offer) => (
                <Col key={offer.id} md={6} lg={3}>
                  <Card className={`border-0 shadow-sm h-100 bg-${offer.bgColor} bg-opacity-10`}>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <Badge bg={offer.bgColor} className="px-3 py-2">
                          <i className="bi bi-tag-fill me-1"></i>
                          LIMITED
                        </Badge>
                        <i className={`bi bi-gift-fill text-${offer.bgColor} fs-2`}></i>
                      </div>
                      <h5 className="fw-bold mb-2">{offer.title}</h5>
                      <p className="text-secondary mb-2">{offer.description}</p>
                      <div className="bg-white p-2 rounded-3 mb-2">
                        <code className="fw-bold text-dark">Use code: {offer.code}</code>
                      </div>
                      <small className="text-muted">
                        <i className="bi bi-calendar me-1"></i>
                        Valid till {offer.validTill}
                      </small>
                      <Button 
                        variant={`outline-${offer.bgColor}`} 
                        size="sm" 
                        className="w-100 mt-3"
                        onClick={() => {
                          if (!isAuthenticated) {
                            setShowLoginPrompt(true);
                          } else {
                            navigate('/offers');
                          }
                        }}
                      >
                        Claim Offer
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          {/* EV Benefits Section */}
          <Row className="g-4 mb-5">
            <Col md={3}>
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Body>
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                    <i className="bi bi-tree text-success fs-2"></i>
                  </div>
                  <h6 className="fw-bold">Zero Emissions</h6>
                  <small className="text-secondary">100% Electric, 0% Pollution</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Body>
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                    <i className="bi bi-wallet2 text-primary fs-2"></i>
                  </div>
                  <h6 className="fw-bold">Save Money</h6>
                  <small className="text-secondary">70% cheaper than diesel</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Body>
                  <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                    <i className="bi bi-battery-charging text-warning fs-2"></i>
                  </div>
                  <h6 className="fw-bold">Fast Charging</h6>
                  <small className="text-secondary">30 min to 80% charge</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Body>
                  <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                    <i className="bi bi-shield-check text-info fs-2"></i>
                  </div>
                  <h6 className="fw-bold">Safety First</h6>
                  <small className="text-secondary">Advanced EV safety features</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* EV App Download Section */}
          <Card className="border-0 shadow-sm mb-5 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d6efd, #198754)' }}>
            <Card.Body className="p-5">
              <Row className="align-items-center">
                <Col lg={7}>
                  <h2 className="text-white fw-bold mb-3">Download the BONUS BUS App</h2>
                  <p className="text-white-50 mb-4">
                    Get exclusive discounts on EV bookings, receive instant fare alerts, and track your carbon savings!
                  </p>
                  <div className="d-flex gap-3">
                    <Button 
                      variant="light" 
                      size="lg" 
                      className="d-flex align-items-center gap-2 rounded-3"
                      onClick={() => window.open('https://play.google.com/store', '_blank')}
                    >
                      <i className="bi bi-google-play fs-3"></i>
                      <div className="text-start">
                        <small>GET IT ON</small>
                        <div className="fw-bold">Google Play</div>
                      </div>
                    </Button>
                    <Button 
                      variant="light" 
                      size="lg" 
                      className="d-flex align-items-center gap-2 rounded-3"
                      onClick={() => window.open('https://apple.com/app-store', '_blank')}
                    >
                      <i className="bi bi-apple fs-3"></i>
                      <div className="text-start">
                        <small>Download on the</small>
                        <div className="fw-bold">App Store</div>
                      </div>
                    </Button>
                  </div>
                  <div className="mt-4">
                    <Badge bg="light" text="dark" className="p-2 me-2">⭐ 4.8 ★★★★★</Badge>
                    <Badge bg="light" text="dark" className="p-2">5M+ EV Rides</Badge>
                    <Badge bg="light" text="dark" className="p-2">🌱 10k tons CO₂ saved</Badge>
                  </div>
                </Col>
                <Col lg={5} className="text-center">
                  <div className="position-relative">
                    <img 
                      src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                      alt="Mobile App" 
                      className="img-fluid rounded-4 shadow-lg"
                      style={{ maxHeight: '300px' }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                      <div className="bg-white bg-opacity-25 rounded-circle p-3">
                        <i className="bi bi-play-circle-fill text-white fs-1"></i>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Login Prompt Modal - Shows only when trying to book */}
          <Modal show={showLoginPrompt} onHide={() => setShowLoginPrompt(false)} centered>
            <Modal.Body className="text-center p-4">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                <i className="bi bi-box-arrow-in-right text-primary fs-1"></i>
              </div>
              <h4 className="fw-bold mb-2">Login to Continue Booking</h4>
              <p className="text-secondary mb-4">Please login to complete your EV bus or car booking and access your account.</p>
              <div className="d-flex gap-2 justify-content-center">
                <Button variant="outline-secondary" onClick={() => setShowLoginPrompt(false)}>
                  Later
                </Button>
                <Button variant="primary" onClick={() => {
                  setShowLoginPrompt(false);
                  navigate('/login');
                }}>
                  Login Now
                </Button>
              </div>
            </Modal.Body>
          </Modal>

          {/* Logout Confirmation Modal */}
          <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
            <Modal.Body className="text-center p-4">
              <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                <i className="bi bi-box-arrow-right text-danger fs-1"></i>
              </div>
              <h4 className="fw-bold mb-2">Logout Confirmation</h4>
              <p className="text-secondary mb-4">Are you sure you want to logout?</p>
              <div className="d-flex gap-2 justify-content-center">
                <Button variant="outline-secondary" onClick={() => setShowLogoutModal(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </Modal.Body>
          </Modal>

          {/* EV Bus Booking Modal */}
          <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} centered size="lg">
            <Modal.Header closeButton className="border-0 pb-0">
              <Modal.Title className="text-primary">Complete Your EV Bus Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedBus && (
                <>
                  <Card className="bg-light border-0 mb-4">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 className="fw-bold mb-1">{selectedBus.name}</h5>
                          <p className="text-secondary mb-0">{selectedBus.operator} • {selectedBus.busNumber}</p>
                        </div>
                        <Badge bg="success" className="px-3 py-2 fs-6">₹{selectedBus.price}</Badge>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="text-center">
                          <div className="fw-bold">{selectedBus.departureTime}</div>
                          <small className="text-secondary">{selectedBus.from}</small>
                        </div>
                        <div className="text-center">
                          <i className="bi bi-arrow-right text-secondary"></i>
                          <div className="small text-secondary">{selectedBus.duration}</div>
                        </div>
                        <div className="text-center">
                          <div className="fw-bold">{selectedBus.arrivalTime}</div>
                          <small className="text-secondary">{selectedBus.to}</small>
                        </div>
                      </div>

                      <Row className="mb-3">
                        <Col md={6}>
                          <small className="text-secondary d-block">Range</small>
                          <div className="fw-bold">{selectedBus.range}</div>
                        </Col>
                        <Col md={6}>
                          <small className="text-secondary d-block">Charging Stops</small>
                          <div className="fw-bold">{selectedBus.chargingStops} stops</div>
                        </Col>
                      </Row>

                      <div className="d-flex gap-2 mb-3">
                        {selectedBus.amenities.map((amenity, idx) => (
                          <Badge key={idx} bg="light" text="dark" className="px-2 py-1">
                            <i className={`bi ${getAmenityIcon(amenity)} me-1`}></i>
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>

                  <Form>
                    <h6 className="fw-bold mb-3">Select Seats</h6>
                    <Row className="g-2 mb-4">
                      {['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D'].map((seat, idx) => (
                        <Col key={seat} xs={3} sm={2}>
                          <Form.Check 
                            type="checkbox"
                            id={`seat-${seat}`}
                            label={seat}
                            className="seat-checkbox"
                            disabled={idx < 2}
                          />
                        </Col>
                      ))}
                    </Row>

                    <h6 className="fw-bold mb-3">Contact Details</h6>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Control 
                          type="text" 
                          placeholder="Full Name" 
                          defaultValue={user?.name || ''}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control 
                          type="tel" 
                          placeholder="Phone Number" 
                          defaultValue={user?.phone || ''}
                        />
                      </Col>
                    </Row>
                  </Form>
                </>
              )}
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">
              <Button variant="outline-secondary" onClick={() => setShowBookingModal(false)}>
                Cancel
              </Button>
              <Button variant="success" onClick={handleConfirmBooking} className="px-4">
                <i className="bi bi-check-circle me-2"></i>
                Confirm EV Booking
              </Button>
            </Modal.Footer>
          </Modal>

          {/* EV Car Booking Modal */}
          <Modal show={showCarBookingModal} onHide={() => setShowCarBookingModal(false)} centered size="lg">
            <Modal.Header closeButton className="border-0 pb-0">
              <Modal.Title className="text-success">Complete Your EV Car Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedCar && (
                <>
                  <Card className="bg-light border-0 mb-4">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 className="fw-bold mb-1">{selectedCar.name}</h5>
                          <p className="text-secondary mb-0">{selectedCar.operator} • {selectedCar.regNumber}</p>
                        </div>
                        <Badge bg="success" className="px-3 py-2 fs-6">₹{selectedCar.price}/{selectedCar.priceUnit}</Badge>
                      </div>
                      
                      <Row className="mb-3">
                        <Col md={4}>
                          <small className="text-secondary d-block">Car Type</small>
                          <div className="fw-bold">{selectedCar.type}</div>
                        </Col>
                        <Col md={4}>
                          <small className="text-secondary d-block">Capacity</small>
                          <div className="fw-bold">
                            <Badge bg={selectedCar.capacity === '7+1' ? 'warning' : 'info'} className="me-1">
                              <i className="bi bi-people-fill me-1"></i>
                              {selectedCar.capacity}
                            </Badge>
                          </div>
                        </Col>
                        <Col md={4}>
                          <small className="text-secondary d-block">Range</small>
                          <div className="fw-bold">{selectedCar.range}</div>
                        </Col>
                      </Row>

                      <div className="d-flex gap-2 mb-3 flex-wrap">
                        {selectedCar.features.map((feature, idx) => (
                          <Badge key={idx} bg="light" text="dark" className="px-2 py-1">
                            <i className={`bi ${getAmenityIcon(feature)} me-1`}></i>
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="bg-white p-3 rounded-3">
                        <Row>
                          <Col md={6}>
                            <small className="text-secondary d-block">Pickup</small>
                            <div className="fw-bold">{pickupLocation}</div>
                            <div>{new Date(pickupDate).toLocaleDateString()} {pickupTime}</div>
                          </Col>
                          <Col md={6}>
                            <small className="text-secondary d-block">Drop</small>
                            <div className="fw-bold">{dropLocation}</div>
                            <div>{new Date(dropDate).toLocaleDateString()}</div>
                          </Col>
                        </Row>
                      </div>
                    </Card.Body>
                  </Card>

                  <Form>
                    <h6 className="fw-bold mb-3">Additional Options</h6>
                    <Row className="g-3 mb-4">
                      <Col md={6}>
                        <Form.Check 
                          type="checkbox"
                          id="withDriver"
                          label="Include EV Certified Driver (+₹500/day)"
                          defaultChecked
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Check 
                          type="checkbox"
                          id="extraLuggage"
                          label="Extra Luggage Carrier (+₹200)"
                        />
                      </Col>
                      {selectedCar.capacity === '7+1' && (
                        <Col md={6}>
                          <Form.Check 
                            type="checkbox"
                            id="tourGuide"
                            label="Tour Guide (₹800/day)"
                          />
                        </Col>
                      )}
                    </Row>

                    <h6 className="fw-bold mb-3">Contact Details</h6>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Control 
                          type="text" 
                          placeholder="Full Name" 
                          defaultValue={user?.name || ''}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control 
                          type="tel" 
                          placeholder="Phone Number" 
                          defaultValue={user?.phone || ''}
                        />
                      </Col>
                      {selectedCar.capacity === '7+1' && (
                        <Col md={12}>
                          <Form.Control 
                            type="number" 
                            placeholder="Number of Passengers (Max 7+1)" 
                            defaultValue="7"
                          />
                        </Col>
                      )}
                    </Row>
                  </Form>
                </>
              )}
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">
              <Button variant="outline-secondary" onClick={() => setShowCarBookingModal(false)}>
                Cancel
              </Button>
              <Button variant="success" onClick={handleConfirmCarBooking} className="px-4">
                <i className="bi bi-check-circle me-2"></i>
                Confirm EV Car Booking
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </main>

      {/* Bottom Tab Bar - Mobile */}
      <nav className="bottom-tab-bar fixed-bottom bg-white border-top d-md-none">
        <div className="d-flex justify-content-around align-items-center py-1">
          {bottomMenuItems.map(item => (
            <Link
              key={item.path}
              to={isAuthenticated ? item.path : '#'}
              className={`text-decoration-none text-center ${
                location.pathname === item.path ? 'text-primary' : 'text-secondary'
              }`}
              style={{ flex: 1 }}
              onClick={(e) => {
                if (!isAuthenticated) {
                  e.preventDefault();
                  setShowLoginPrompt(true);
                }
              }}
            >
              <div className="d-flex flex-column align-items-center">
                <i className={`bi ${item.icon} fs-4`}></i>
                <small className="mt-0" style={{ fontSize: '0.65rem' }}>{item.label}</small>
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop Bottom Bar */}
      <nav className="bg-white border-top d-none d-md-block fixed-bottom shadow-sm">
        <Container>
          <div className="d-flex justify-content-around align-items-center py-2">
            {bottomMenuItems.map(item => (
              <Link
                key={item.path}
                to={isAuthenticated ? item.path : '#'}
                className={`text-decoration-none text-center px-4 py-2 rounded ${
                  location.pathname === item.path ? 'bg-primary text-white' : 'text-secondary hover-bg-light'
                }`}
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    setShowLoginPrompt(true);
                  }
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <i className={`bi ${item.icon}`}></i>
                  <span className="fw-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </nav>

      <style>{`
        .hover-bg-light:hover {
          background-color: #f8f9fa;
        }
        .bottom-tab-bar {
          box-shadow: 0 -4px 12px rgba(0,0,0,0.05);
          z-index: 1030;
        }
        .seat-checkbox .form-check-input {
          margin-right: 5px;
        }
        .nav-tabs .nav-link {
          color: #6c757d;
          font-weight: 500;
        }
        .nav-tabs .nav-link.active {
          color: #0d6efd;
          font-weight: 600;
        }
        @media (min-width: 768px) {
          body {
            padding-bottom: 70px;
          }
        }
      `}</style>
    </div>
  );
};

// EV Bus Card Component
const BusCard = ({ bus, onBook, isAuthenticated }) => {
  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: 'bi-wifi',
      charging: 'bi-battery-charging',
      ac: 'bi-snow2',
      water: 'bi-droplet',
      snacks: 'bi-cup-hot',
      blankets: 'bi-snow'
    };
    return icons[amenity] || 'bi-check-circle';
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="fw-bold mb-0">{bus.name}</h5>
            <p className="text-secondary mb-0">{bus.type}</p>
          </div>
          <Badge bg="success" className="px-3 py-2 fs-6">₹{bus.price}</Badge>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="text-center">
            <div className="fw-bold fs-5">{bus.departureTime}</div>
            <small className="text-secondary">{bus.from}</small>
          </div>
          <div className="text-center">
            <i className="bi bi-arrow-right text-secondary"></i>
            <div className="small text-secondary">{bus.duration}</div>
          </div>
          <div className="text-center">
            <div className="fw-bold fs-5">{bus.arrivalTime}</div>
            <small className="text-secondary">{bus.to}</small>
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap mb-3">
          {bus.amenities.map((amenity, idx) => (
            <Badge key={idx} bg="light" text="dark" className="px-2 py-1">
              <i className={`bi ${getAmenityIcon(amenity)} me-1`}></i>
              {amenity}
            </Badge>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <i className="bi bi-star-fill text-warning me-1"></i>
            <span className="fw-bold">{bus.rating}</span>
            <small className="text-secondary"> ({bus.reviews})</small>
          </div>
          <div>
            <i className="bi bi-battery-charging text-success me-1"></i>
            <span>{bus.range}</span>
          </div>
          <div>
            <i className="bi bi-people-fill text-primary me-1"></i>
            <span className={bus.availableSeats < 10 ? 'text-danger fw-bold' : 'text-success fw-bold'}>
              {bus.availableSeats} seats
            </span>
          </div>
        </div>

        <Button 
          variant="success" 
          className="w-100 fw-bold"
          onClick={() => onBook(bus)}
        >
          <i className="bi bi-ticket-perforated me-2"></i>
          Book EV Bus
        </Button>
        
        {!isAuthenticated && (
          <small className="text-muted d-block text-center mt-2">
            <i className="bi bi-info-circle me-1"></i>
            Login required to book
          </small>
        )}
      </Card.Body>
    </Card>
  );
};

// EV Car Card Component
const CarCard = ({ car, onBook, isAuthenticated }) => {
  const getAmenityIcon = (amenity) => {
    const icons = {
      'Fast Charging': 'bi-lightning-charge',
      'Eco-friendly': 'bi-tree',
      'Pushback Seats': 'bi-arrow-bar-right',
      'Sunroof': 'bi-brightness-high',
      'Music System': 'bi-music-note',
      'Premium': 'bi-gem',
      'Smart Tech': 'bi-cpu',
      'Compact': 'bi-box',
      'Spacious': 'bi-arrows-angle-expand',
      'V2L Charging': 'bi-plug',
      'Entertainment System': 'bi-tv',
      'Extra Luggage': 'bi-bag'
    };
    return icons[amenity] || 'bi-check-circle';
  };

  // Determine badge color based on capacity
  const capacityBadgeVariant = car.capacity === '7+1' ? 'warning' : 'info';
  const capacityText = car.capacity === '7+1' ? 'Group (7+1)' : 'Family (4+1)';

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="fw-bold mb-0">{car.name}</h5>
            <p className="text-secondary mb-0">{car.type}</p>
          </div>
          <Badge bg="success" className="px-3 py-2 fs-6">₹{car.price}/{car.priceUnit}</Badge>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <div>
            <Badge bg={capacityBadgeVariant} className="me-2">
              <i className="bi bi-people-fill me-1"></i>
              {car.capacity} {car.capacity === '7+1' ? '(Group)' : '(Family)'}
            </Badge>
          </div>
          <div>
            <i className="bi bi-battery-charging text-success me-1"></i>
            <span>{car.range}</span>
          </div>
          <div>
            <i className="bi bi-star-fill text-warning me-1"></i>
            <span>{car.rating} ({car.trips})</span>
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap mb-3">
          {car.features.slice(0, 3).map((feature, idx) => (
            <Badge key={idx} bg="light" text="dark" className="px-2 py-1">
              <i className={`bi ${getAmenityIcon(feature)} me-1`}></i>
              {feature}
            </Badge>
          ))}
          {car.features.length > 3 && (
            <Badge bg="light" text="dark">+{car.features.length - 3}</Badge>
          )}
        </div>

        <div className={`bg-${capacityBadgeVariant} bg-opacity-10 p-2 rounded-3 mb-3`}>
          <small className={`text-${capacityBadgeVariant} d-block text-center`}>
            <i className="bi bi-people-fill me-1"></i>
            {car.capacity === '7+1' ? 'Perfect for Groups' : 'Ideal for Family'} • {car.capacity} Seater
          </small>
        </div>

        <Button 
          variant="success" 
          className="w-100 fw-bold"
          onClick={() => onBook(car)}
        >
          <i className="bi bi-car-front me-2"></i>
          Book EV Car
        </Button>
        
        {!isAuthenticated && (
          <small className="text-muted d-block text-center mt-2">
            <i className="bi bi-info-circle me-1"></i>
            Login required to book
          </small>
        )}
      </Card.Body>
    </Card>
  );
};

// Alternative EV Bus Card
const AlternativeBusCard = ({ bus, onBook, isAuthenticated }) => (
  <Card className="border-0 shadow-sm h-100">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h5 className="fw-bold mb-0">{bus.name}</h5>
          <p className="text-secondary mb-0">{bus.type}</p>
        </div>
        <Badge bg="success" className="px-3 py-2 fs-6">₹{bus.price}</Badge>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="text-center">
          <div className="fw-bold fs-5">{bus.departureTime}</div>
          <small className="text-secondary">{bus.from}</small>
        </div>
        <div className="text-center">
          <i className="bi bi-arrow-right text-secondary"></i>
          <div className="small text-secondary">{bus.duration}</div>
        </div>
        <div className="text-center">
          <div className="fw-bold fs-5">{bus.arrivalTime}</div>
          <small className="text-secondary">{bus.to}</small>
        </div>
      </div>
      <Button 
        variant="outline-primary" 
        className="w-100 fw-bold"
        onClick={() => onBook(bus)}
      >
        <i className="bi bi-ticket-perforated me-2"></i>
        Book This EV Route
      </Button>
      
      {!isAuthenticated && (
        <small className="text-muted d-block text-center mt-2">
          <i className="bi bi-info-circle me-1"></i>
          Login required to book
        </small>
      )}
    </Card.Body>
  </Card>
);

export default HomePage;