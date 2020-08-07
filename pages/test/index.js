import { useEffect, useState } from 'react';
import fetch from 'isomorphic-fetch';

import Layout from '../../components/layout';

const inspectForZeroError = (response) => {
  // request 0 error
  if (response.status === 0) {
    const error = new Error(response.statusText);
    error.response = response;
    error.status = 500;
    throw error;
  }

  return response;
};

const parseResponse = (response) => {
  const bodilessStatusCodes = [204, 205, 304];
  if (bodilessStatusCodes.includes(response.status)) {
    return [response, {}];
  }

  return Promise.all([response, response.json()]);
};

const inspectForErrors = ([response, data]) => {
  if (response.status >= 400) {
    const error = new Error(data.error || response.statusText);
    error.response = response;
    error.data = data;
    error.status = response.status;
    throw error;
  }

  return data;
};

const get = async (path, options = {}) => {
  const opts = {
    ...options,
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(path, opts);
  const partiallySanitizedResponse = inspectForZeroError(response);
  const parsedResponse = await parseResponse(partiallySanitizedResponse);
  return inspectForErrors(parsedResponse);
};

const createSearchGiphyEffectFn = (setImage, setSearch) => (search) => () => {
  (async () => {
    const response = await get(`//api.giphy.com/v1/gifs/translate?s=${encodeURIComponent(search)}&api_key=K653GUwH6PIHlSjm4MDMGZWjaoZ2sY8h`);

    const { data: { images: { 'fixed_height': { url } } } } = response;

    setImage(url);
    setSearch(search);
  })();
};

const Test = () => {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('shenanigans');
  const [lastSearchOnce, setLastSearchOnce] = useState('shenanigans');
  const [lastSearch, setLastSearchEvery] = useState('shenanigans');
  const [searchButton, setSearchButton] = useState(true);
  const [gifImgOnce, setGifImageOnce] = useState('');
  const [gifImgEvery, setGifImageEvery] = useState('');

  const searchGiphyOnce = createSearchGiphyEffectFn(setGifImageOnce, setLastSearchOnce);
  const searchGiphyEvery = createSearchGiphyEffectFn(setGifImageEvery, setLastSearchEvery);
  useEffect(searchGiphyOnce(search), []);
  useEffect(searchGiphyEvery(search), [searchButton, count]);

  return (
    <Layout>
      <h1>Hello World!</h1>
      <div>Total Count: {count}</div>

      <button onClick={() => setCount(c => c - 1)}>decrement</button>
      <button onClick={() => setCount(c => c + 1)}>increment</button>

      <div>Fetch once</div>
      <img style={{ display: 'block' }} src={gifImgOnce} alt={lastSearchOnce} />
      <div>Fetch every time</div>
      <img style={{ display: 'block' }} src={gifImgEvery} alt={lastSearch} />
      <form onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSearchButton(b => !b);
      }}>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Fetch!</button>
      </form>
    </Layout>
  );
};

export default Test;
