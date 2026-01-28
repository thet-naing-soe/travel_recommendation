async function fetchData() {
  const response = await fetch("travel_recommendation_api.json");
  const data = await response.json();
  return data;
}

async function search() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const data = await fetchData();
  let results = [];

  if (keyword.includes("beach")) {
    results = data.beaches;
  } else if (keyword.includes("temple")) {
    results = data.temples;
  } else if (keyword.includes("country")) {
    data.countries.forEach((country) => {
      country.cities.forEach((city) => results.push(city));
    });
  } else {
    data.countries.forEach((country) => {
      if (country.name.toLowerCase().includes(keyword)) {
        country.cities.forEach((city) => results.push(city));
      }
    });
  }

  displayResults(results);
}

function displayResults(places) {
  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "";

  if (places.length === 0) {
    resultDiv.innerHTML = "<p>No results found</p>";
    return;
  }

  places.forEach((place) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <img src="${place.imageUrl}" alt="${place.name}">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
        `;
    resultDiv.appendChild(card);
  });
}

function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
}
