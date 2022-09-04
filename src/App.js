import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "804a084b";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header= styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  color: white;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 4px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 45px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 8px;
  border-radius: 10px;
  margin-left: 20px;
  width: 25%;
  background-color: #E2F7F9;
  align-items: center;
`;
const SearchIcon = styled.img`
  width: 30px;
  height: 30px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-style: italic;
  background-color: #E2F7F9;
  border: none;
  outline: none;
  width: 75%;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState();
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData =async (searchString)=>{
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
      );
      updateMovieList(response.data.Search)
  };
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  }
  return (<Container>
    <Header>
      <AppName>
        <MovieImage src="/video-camera.png" />
        The Movie Haven
      </AppName>
      <SearchBox>
        <SearchIcon src="/search.png" />
        <SearchInput
          placeholder="Search Movie..."
          value={searchQuery}
          onChange={onTextChange}
        />
      </SearchBox>
    </Header>
    {selectedMovie && (
      <MovieInfoComponent
        selectedMovie={selectedMovie}
        onMovieSelect={onMovieSelect}
        />
    )}
    <MovieListContainer>
      {movieList?.length? movieList.map((movie, index) => (
      <MovieComponent 
        key={index} 
        movie={movie} 
        onMovieSelect={onMovieSelect}
        />
      ))
      :<Placeholder src="/video-camera.png"/>}
    </MovieListContainer>
  </Container>
  );
}

export default App;
