document.getElementById('search-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchQuery = document.getElementById('search-input').value;

  try {
      const response = await fetch(`https://api.github.com/search/users?q=${searchQuery}`, {
          headers: {
              'Accept': 'application/vnd.github.v3+json'
          }
      });
      const data = await response.json();
      if (data.items && data.items.length > 0) {
          displayResults(data.items);
      } else {
          displayResults([]);
      }
  } catch (error) {
      console.error('Error fetching data:', error);
  }
});

function displayResults(users) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.innerHTML = `
          <h3>${user.login}</h3>
          <img src="${user.avatar_url}" alt="${user.login}">
          <button onclick="getUserRepos('${user.login}')">View Repos</button>
      `;
      resultsDiv.appendChild(userDiv);
  });
}

async function getUserRepos(username) {
  try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
              'Accept': 'application/vnd.github.v3+json'
          }
      });
      const data = await response.json();
      if (data && data.length > 0) {
          displayRepos(data);
      } else {
          displayRepos([]);
      }
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

function displayRepos(repos) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  repos.forEach(repo => {
      const repoDiv = document.createElement('div');
      repoDiv.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      resultsDiv.appendChild(repoDiv);
  });
}