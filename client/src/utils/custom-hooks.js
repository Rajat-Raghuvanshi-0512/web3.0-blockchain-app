import { useCallback } from "react";
import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

export const useFetch = (keyword) => {
  const [gifUrl, setGifUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchGifs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
          .split(" ")
          .join("")}&limit=1`
      );
      const { data } = await response.json();
      setLoading(false);
      setGifUrl(data[0]?.images?.downsized_medium?.url);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setGifUrl(
        "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284"
      );
    }
  }, [keyword]);

  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword, fetchGifs]);

  return { loading, gifUrl };
};
