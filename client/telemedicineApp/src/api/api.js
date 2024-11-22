import axios from 'axios';

axios.get('http://localhost:4000')  // Ganti port dengan 4000
  .then(response => {
    console.log(response.data); // Tampilkan hasil dari backend
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
