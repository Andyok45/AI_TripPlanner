export const SelectTravelLists = [
  {
    id: 1,
    title: "Solo-Travel",
    description: "Traveling alone",
    icon: "👤",
    people: '1',
  },
  {
    id: 2,
    title: 'Couple',
    description: 'Have a travel partner',
    icon: '🫂',
    people: '2',
  },
  {
    id: 3,
    title: 'Family',
    description: 'Fun loving family',
    icon: '🧳',
    people: '3-5',
  },
  {
    id: 4,
    title: 'Group',
    description: 'Adventurous group',
    icon: '🚌',
    people: '5+',
  }
]

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Not too high',
    description: 'Saving for something Big',
    icon: '💰',

  },
  {
    id: 2,
    title: 'Bit More',
    description: 'Can afford more',
    icon: '💵',

  },
  {
    id: 3,
    title: 'Want the Best Experience',
    description: 'Money is not a problem',
    icon: '💳',
  }
]

export const AI_PROMPT = 'Im planning a trip from {fromLocation} to {location} for {noOfDays} days with {people} people. Can you help me create a comprehensive travel budget with different spending ranges (budget, mid-range, and luxury options), Please include estimated costs for Accommodation (hotels, hostels, or vacation rentals), Transportation (flights, local transit, car rentals), Food and dining (breakfast, lunch, dinner, snacks), Activities and attractions (entrance fees, tours, experiences), Shopping and souvenirs, Miscellaneous expenses (travel insurance, visa fees), keep the currency in the currency of {fromLocation} and respond in JSON format'
