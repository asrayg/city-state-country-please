

````markdown
# city-state-country-please

A blazing-fast JavaScript utility for city, state, and country lookups—**autocomplete, fuzzy search, typo correction, and more**—all from a local dataset.  
Perfect for forms, apps, and location-based features in Node.js or the browser.

---

## 🚀 Installation

```bash
npm install city-state-country-please
````

---

## 🏁 Quick Start

```js
const {
  findByCity,
  findCitiesByState,
  findCitiesByCountry,
  findCitiesByStateCountry,
  fuzzyFindCities,
  autocompleteCities,
  typoFuzzyFindCities,
  getStatesByCountry,
  getAllCountries,
  autocompleteStates,
  fuzzyFindStates,
  getAllCities,
  cities,
} = require('city-state-country-please');

console.log(findByCity('Chicago'));
// [{ city: 'Chicago', state: 'Illinois', country: 'United States' }]

console.log(findCitiesByState('California'));
// [ ...all cities in California ]

console.log(fuzzyFindCities('angel'));
// [ { city: 'Los Angeles', ... } ]

console.log(autocompleteCities('San'));
// [ { city: 'San Diego', ... }, { city: 'San Francisco', ... }, ... ]

console.log(typoFuzzyFindCities('Huston'));
// [ { city: 'Houston', ... } ]

console.log(getStatesByCountry('United States'));
// [ 'California', 'Texas', ... ]

console.log(getAllCountries());
// [ 'United States' ]

console.log(autocompleteStates('Ne', 'United States'));
// [ 'Nebraska', 'Nevada', ... ]
```

---

## 📖 API Reference

### **Data**

* `cities`: Full array of `{ city, state, country }` objects.

### **Lookup Functions**

* `findByCity(city: string): Array`

  > All cities with exact name (case-insensitive).

* `findCitiesByState(state: string): Array`

  > All cities in a state.

* `findCitiesByCountry(country: string): Array`

  > All cities in a country.

* `findCitiesByStateCountry(state: string, country: string): Array`

  > All cities matching state & country.

### **Autocomplete & Fuzzy Search**

* `autocompleteCities(prefix: string, [limit]): Array`

  > Cities starting with prefix.

* `fuzzyFindCities(query: string, [limit]): Array`

  > Cities where name contains query.

* `typoFuzzyFindCities(query: string, [maxDistance], [limit]): Array`

  > Cities with names typo-matching query (Levenshtein).

* `autocompleteStates(prefix: string, country: string, [limit]): Array`

  > State names for a country starting with prefix.

* `fuzzyFindStates(query: string, [limit]): Array`

  > State names containing query.

### **Other Utilities**

* `getStatesByCountry(country: string): Array`

  > All unique states in a country.

* `getAllCountries(): Array`

  > List of all unique countries.

* `getAllCities(): Array`

  > Returns the whole city list.

---

## ⚡️ Performance Tips

* For very large lookups or frequent fuzzy searches, consider pre-indexing or offloading to a database for production.
* Works great for autocomplete fields and quick lookups!

---

## 📝 License

MIT
(c) 2025 \[Asray Gopa]

---

## 🌎 Contributing

Pull requests and suggestions welcome!
For feature requests or bug reports, [open an issue](https://github.com/asrayg/city-state-country-please/issues).

---

## ⭐ Example

```js
const { autocompleteCities } = require('city-state-country-please');
console.log(autocompleteCities('Denv'));
// [ { city: 'Denver', state: 'Colorado', country: 'United States' } ]
```