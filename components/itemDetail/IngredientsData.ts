export interface Ingredient {
  name: string;
  amount: string;
  emoji: string;
}

export const ingredientsMap: Record<string, Ingredient[]> = {
  '1': [ // Morning Coffee
    { name: 'Double espresso', amount: '2 shots', emoji: '☕' },
    { name: 'Medjool dates', amount: '2 pieces', emoji: '🌴' },
  ],
  '3': [ // Breakfast
    { name: 'Eggs', amount: '3 large', emoji: '🥚' },
    { name: 'Greek yogurt', amount: '200g', emoji: '🥛' },
  ],
  '4': [ // Lunch
    { name: 'Rice', amount: '200g', emoji: '🍚' },
    { name: 'Chicken breast', amount: '300g', emoji: '🍗' },
  ],
  '5': [ // Pre Workout
    { name: 'Banana', amount: '1 medium', emoji: '🍌' },
    { name: 'Coffee', amount: '1 cup', emoji: '☕' },
  ],
  '7': [ // Dinner
    { name: 'Steak', amount: '250g', emoji: '🥩' },
    { name: 'Potatoes', amount: '300g', emoji: '🥔' },
  ],
};

export const getIngredients = (eventId: string): Ingredient[] => {
  return ingredientsMap[eventId] || [];
};