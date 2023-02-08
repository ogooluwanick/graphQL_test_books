import React,{ useState, useEffect } from 'react';
import axios from "axios"
import './App.css';
import BooksList from './components/BooksList';
import InputField from './components/InputField';

function App() {
        const [search, setSearch] = useState("")
        const [myBooks, setMyBooks] = useState([])
        const [data, setData] = useState(null)

        const handleBookSelection=(e)=>{
                e.preventDefault();
                if(search){
                        setMyBooks([...myBooks,{id:Date.now(),book:search,isBorrowed:true,isReturned:false}])  ;
                        setSearch("");
                }
        }

        const query = ` query { books {  id name author { name } } }`
        const url = `http://localhost:3001/graphql`;


        useEffect(() => {
                fetch("http://localhost:3001/graphql", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({ query: query })
                })
                .then(response => {
                        if (!response.ok) {
                                throw new Error(response.statusText);
                        }
                        return response.json();
                })
                .then(data => {
                        setData(data.data.books);
                })
                .catch(error => {
                        console.error(error);
                });
        }, []);
            

        console.log("Data",data)
        
  return (
    <div className="App">
        <h1 className="heading">LIBRARY Tool</h1>
        <InputField search={search} setSearch={setSearch} handleBookSelection={handleBookSelection}/>
        <BooksList myBooks={myBooks} setMyBooks={setMyBooks} />
    </div>
  );
}

export default App;