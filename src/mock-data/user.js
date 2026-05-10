export const mockUser = {
  id: 1,
  name: 'Alex Rivera',
  email: 'alex@traveloop.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  bio: 'Passionate traveler. 23 countries and counting.',
  language: 'English',
  notifications: {
    email: true,
    push: true,
    tripReminders: true,
    newsletter: false,
  },
  savedDestinations: ['Tokyo', 'Santorini', 'Cape Town'],
}

export const mockNotes = [
  {
    id: 1,
    title: 'Tokyo Tips',
    content: 'Get a Suica card for easy transit. Best ramen at Ichiran Shinjuku. Book TeamLab 2 weeks ahead.',
    date: '2026-05-08',
    pinned: true,
    tripId: 1,
  },
  {
    id: 2,
    title: 'Packing Reminder',
    content: 'Don\'t forget universal adapter, portable charger, and light rain jacket for Kyoto.',
    date: '2026-05-07',
    pinned: false,
    tripId: 1,
  },
  {
    id: 3,
    title: 'Bali Memories',
    content: 'The sunrise at Mount Batur was absolutely worth the 3am wake-up. Tegallalang rice terraces — go early!',
    date: '2026-03-10',
    pinned: false,
    tripId: 2,
  },
]

export const mockPackingList = [
  { id: 1, item: 'Passport', category: 'Documents', checked: true },
  { id: 2, item: 'Travel Insurance', category: 'Documents', checked: true },
  { id: 3, item: 'Flight Tickets', category: 'Documents', checked: false },
  { id: 4, item: 'T-Shirts (5)', category: 'Clothing', checked: false },
  { id: 5, item: 'Jeans (2)', category: 'Clothing', checked: false },
  { id: 6, item: 'Rain Jacket', category: 'Clothing', checked: true },
  { id: 7, item: 'Laptop', category: 'Electronics', checked: false },
  { id: 8, item: 'Phone Charger', category: 'Electronics', checked: true },
  { id: 9, item: 'Universal Adapter', category: 'Electronics', checked: false },
  { id: 10, item: 'Painkillers', category: 'Medicines', checked: false },
  { id: 11, item: 'Sunscreen', category: 'Accessories', checked: false },
  { id: 12, item: 'Sunglasses', category: 'Accessories', checked: true },
]
