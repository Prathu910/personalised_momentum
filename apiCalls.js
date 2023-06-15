export async function getRandomBg() {
  const response = await fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
  );
  return await response.json();
}

export async function getRandomQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random", {
      headers: {
        "X-Api-Key": "4bwIcwEeD5J0wJjPJbmXjA==KrsrzX07zXwH2LPH",
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getWeather(latitude, longitude) {
  const response = await fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`
  );
  return await response.json();
}
