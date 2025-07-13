const cities = require('./cities.js');

// Utility: case-insensitive string match
function normalize(str) {
  return (str || '').toLowerCase().trim();
}

// Get all cities
function getAllCities() {
  return cities;
}

// Find all cities by state
function findCitiesByState(state) {
  return cities.filter(c => normalize(c.state) === normalize(state));
}

// Find all states in a country
function getStatesByCountry(country) {
  return [...new Set(
    cities
      .filter(c => normalize(c.country) === normalize(country))
      .map(c => c.state)
  )];
}

// Find by city name (exact)
function findByCity(city) {
  return cities.filter(c => normalize(c.city) === normalize(city));
}

// Fuzzy search by city (basic: contains, not typo-tolerant)
function fuzzyFindCities(query, limit = 10) {
  const q = normalize(query);
  return cities
    .filter(c => normalize(c.city).includes(q))
    .slice(0, limit);
}

// Autocomplete cities (starts with)
function autocompleteCities(prefix, limit = 10) {
  const p = normalize(prefix);
  return cities
    .filter(c => normalize(c.city).startsWith(p))
    .slice(0, limit);
}

// Fuzzy search by state (contains)
function fuzzyFindStates(query, limit = 10) {
  const q = normalize(query);
  const states = [
    ...new Set(
      cities
        .filter(c => normalize(c.state).includes(q))
        .map(c => c.state)
    ),
  ];
  return states.slice(0, limit);
}

// Get cities for a given country
function findCitiesByCountry(country) {
  return cities.filter(c => normalize(c.country) === normalize(country));
}

// List all cities in a state/country (combo)
function findCitiesByStateCountry(state, country) {
  return cities.filter(
    c =>
      normalize(c.state) === normalize(state) &&
      normalize(c.country) === normalize(country)
  );
}

// Autocomplete states for a country
function autocompleteStates(prefix, country, limit = 10) {
  const p = normalize(prefix);
  return [
    ...new Set(
      cities
        .filter(
          c =>
            normalize(c.country) === normalize(country) &&
            normalize(c.state).startsWith(p)
        )
        .map(c => c.state)
    ),
  ].slice(0, limit);
}

// Advanced: fuzzy (typo-tolerant) search using Levenshtein distance
function levenshtein(a, b) {
  const dp = Array(a.length + 1)
    .fill()
    .map(() => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[a.length][b.length];
}

function typoFuzzyFindCities(query, maxDistance = 2, limit = 5) {
  const q = normalize(query);
  const matches = cities
    .map(c => ({
      ...c,
      distance: levenshtein(q, normalize(c.city)),
    }))
    .filter(x => x.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
  return matches;
}

// Export
module.exports = {
  cities,
  getAllCities,
  findCitiesByState,
  getStatesByCountry,
  getAllCountries,
  findByCity,
  fuzzyFindCities,
  autocompleteCities,
  fuzzyFindStates,
  findCitiesByCountry,
  findCitiesByStateCountry,
  autocompleteStates,
  typoFuzzyFindCities,
};
