// import { config } from 'dotenv';
// config();

export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '38d0b93254msh57e9e2661d73783p13c5e7jsn7c9266731df4',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key':'54b8156b90msh3f3a98b5caa481ap16df0fjsn607644a94834',
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
