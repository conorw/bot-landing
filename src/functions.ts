async function fetchBots() {
    const response = await fetch('/api');
    // waits until the request completes...
    console.log(response);
    return response.json()
  }

  document.addEventListener('DOMContentLoaded', async (event) => {
    const bots = await fetchBots()
    console.log(bots)
  })