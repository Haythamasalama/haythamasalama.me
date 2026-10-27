/** The three families of design patterns on /learn/design-patterns, in the order they are taught. */
export const patternGroups = [
  { name: 'Creational', id: 'creational', description: 'How objects get created, so the code that uses them doesn’t depend on how.' },
  { name: 'Structural', id: 'structural', description: 'How classes and objects fit together into larger structures.' },
  { name: 'Behavioral', id: 'behavioral', description: 'How objects share the work and talk to each other.' }
] as const;

type PatternGroupName = typeof patternGroups[number]['name'];

export const patternGroupNames = patternGroups.map(group => group.name) as [PatternGroupName, ...PatternGroupName[]];
