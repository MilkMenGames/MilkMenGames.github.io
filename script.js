// Assuming your game folders are directly under the /games folder
const gamesFolder = "games";

// Get a list of folder names in the games folder
fetch(`https://api.github.com/repos/your_username/your_repo_name/contents/${gamesFolder}`)
  .then(response => response.json())
  .then(data => {
    const gameList = document.querySelector("ul");

    data.forEach(game => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = game.html_url;
      link.textContent = game.name;
      listItem.appendChild(link);
      gameList.appendChild(listItem);
    });

    // Add scrollable class to the game list
    const gameListContainer = document.querySelector('.game-list');
    gameListContainer.classList.add('scrollable');
  })
  .catch(error => {
    console.error("Error fetching game list:", error);
  });
