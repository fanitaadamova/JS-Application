function loadRepos() {
   let url = 'https://api.github.com/users/testnakov/repos';
   fetch(url)
      .then(response => response.json())
      .then(data => {
         document.getElementById('res').textContent = data;
         //console.log(data);
      })




}