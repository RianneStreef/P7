function fetchData() {
  console.log('fetching data');
  const data = fetch('http://localhost:3001/api/articles')
    .then((response) => response.json())
    .then((json) => data);
}
