import React, { useState, useEffect } from 'react';

const giphyKey = process.env.REACT_APP_GIPHY_KEY;

function useGiphy(query) {

  const [results, setRestults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData ()  {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${query}&limit=10&offset=0&rating=PG-13&lang=en`
        );
        const json = await res.json();
        console.log({ json });
        setRestults(
          json.data.map(item =>{
            return item.images.preview.mp4;
          })
        );
      } finally {
        setLoading(false);
      }
    }
    if (query !== '') {
      fetchData();
    }
  }, [query]);
  return [results, loading];
}

export default function AsyncHooks() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, loading] = useGiphy(query);

  return (
    <div>
      <h1>Async React Hooks</h1>
      <form onSubmit={e => {
        e.preventDefault();
        setQuery(search);
        }}
        >
        <input
          value={search}
          onChange={e => setSearch( e.target.value ) }
          placeholder="Search"
        />
        <button type="submit">Search</button>
      </form>
      <br />
      {loading ? (
        <h1>Give me GIFS!</h1>
      ) : (
        results.map(item => <video autoPlay loop key={item} src={item}/>)
      )}
    </div>
  );
}