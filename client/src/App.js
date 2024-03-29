import React,{ useState, useEffect } from 'react';

import './App.css';
import AuthorsList from './components/AuthorsList';
import BooksList from './components/BooksList';
import InputField from './components/InputField';

function App() {
        const [search, setSearch] = useState("")
        const [data, setData] = useState({books:null,authors:null})


        const handleBookSelection = (e) =>{
                e.preventDefault();
                search &&
                setData({
                        books:    data.books.filter(book=> book.name.includes(search) )      ,
                        authors:   data.authors.filter(author=> author.name.toLowerCase().includes(search.toLowerCase())  )  
                })
        }


        const booksQuery = ` books {  id name author { name } } `
        const authorsQuery = ` authors {  id name  } `
        const query = ` query {  books: ${booksQuery}   authors: ${authorsQuery}  }`
        const url = `http://localhost:3001/graphql`;


        const refreshData= async ()=>{
                console.log("worked")
                fetch(url, {
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
                        setData({books:[...data.data.books], authors:[...data.data.authors]});
                })
                .catch(error => { 
                        console.error(error);
                });
        }

        useEffect(() => {
                refreshData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
                
                
               
            

        console.log("Data",data)
        
  return (
    <div className="App">
        <h1 className="heading">LIBRARY Tool</h1>
        <InputField search={search} setSearch={setSearch}  data={data}   setData={setData}  handleBookSelection={handleBookSelection} refreshData={refreshData} />
        <AuthorsList data={data} setData={setData} refreshData={refreshData} />
        <BooksList data={data} setData={setData} refreshData={refreshData}  />
    </div>
  );
}

export default App;
