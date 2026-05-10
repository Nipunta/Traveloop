export const mockItinerary = {
  tripId: 1,
  tripName: 'Jaipur Royal Escape',
  days: [
    {
      id: 1,
      date: '2026-09-05',
      city: 'Jaipur',
      hotel: 'Rambagh Palace',
      transport: 'Flight from Delhi',
      activities: [
        { id: 1, name: 'Check-in & Rest', time: '14:00', cost: 0, duration: '2h', category: 'Relaxation', notes: '' },
        { id: 2, name: 'Evening at Jal Mahal', time: '18:00', cost: 0, duration: '1.5h', category: 'Sightseeing', notes: '' },
        { id: 3, name: 'Chokhi Dhani Dinner + Cultural Show', time: '20:00', cost: 1200, duration: '3h', category: 'Cultural', notes: '' },
      ],
    },
    {
      id: 2,
      date: '2026-09-06',
      city: 'Jaipur',
      hotel: 'Rambagh Palace',
      transport: 'Private Cab',
      activities: [
        { id: 4, name: 'Amber Fort & Elephant Ride', time: '09:00', cost: 500, duration: '3h', category: 'Historical', notes: '' },
        { id: 5, name: 'City Palace & Hawa Mahal', time: '13:00', cost: 300, duration: '2h', category: 'Historical', notes: '' },
        { id: 6, name: 'Jawahar Kala Kendra Art Gallery', time: '16:00', cost: 100, duration: '1.5h', category: 'Art', notes: '' },
        { id: 7, name: 'Johari Bazaar Shopping', time: '18:30', cost: 0, duration: '2h', category: 'Shopping', notes: '' },
      ],
    },
    {
      id: 3,
      date: '2026-09-07',
      city: 'Jaipur',
      hotel: 'Rambagh Palace',
      transport: 'Auto-rickshaw',
      activities: [
        { id: 8, name: 'Jantar Mantar Observatory', time: '10:00', cost: 50, duration: '1h', category: 'Educational', notes: '' },
        { id: 9, name: 'Stepwell Panna Meena Ka Kund', time: '12:00', cost: 0, duration: '1h', category: 'Photography', notes: '' },
        { id: 10, name: 'Jaipur Street Food Tour', time: '19:00', cost: 800, duration: '2.5h', category: 'Food', notes: '' },
      ],
    },
  ],
}

export const mockExpenses = {
  total: 125000,
  spent: 0,
  categories: [
    { name: 'Hotel', amount: 45000, color: '#2563eb' },
    { name: 'Food', amount: 18000, color: '#38bdf8' },
    { name: 'Transport', amount: 12000, color: '#0f172a' },
    { name: 'Activities', amount: 8000, color: '#10b981' },
    { name: 'Shopping', amount: 15000, color: '#f59e0b' },
  ],
  daily: [
    { day: 'Sep 05', amount: 8000 },
    { day: 'Sep 06', amount: 12000 },
    { day: 'Sep 07', amount: 6000 },
  ],
}
