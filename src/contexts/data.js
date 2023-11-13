import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

const DataContext = createContext({});

const DataContextWrapper = ({ children }) => {
  const [animes, setAnimes] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getAnimes();
    getSongs();
  }, []);

  const getAnimes = async () => {
    const { data: fetchedAnimes } = await supabase.from("animes").select();
    setAnimes(fetchedAnimes);
  };
  const getSongs = async () => {
    const { data: fetchedSongs } = await supabase.from("songs").select();
    setSongs(fetchedSongs);
  };
  return (
    <DataContext.Provider value={{ animes, songs }}>
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = () => useContext(DataContext);

export { useDataContext, DataContextWrapper, supabase };
