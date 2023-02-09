import React, { useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import BookItem from './BookItem'


const BooksList= ({data,setData, refreshData}) => {
        const [ addBook , setAddBook ]= useState("")
        const [ addAuthorId , setAddAuthorId ]= useState(1)


        const url = `http://localhost:3001/graphql`;
        
        const handleAddBook = (e) => {
                console.log("test my func")

                e.preventDefault();

                const mutation = `  mutation { addBook(name:"${addBook}" authorId:${addAuthorId} ) {id name author{ name } }   } `   //an error with double and single quotes to watch out for with queries
                
                fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ query: mutation })
                })
                .then(response => {
                        if (!response.ok) {
                                throw new Error(response.statusText);
                        }
                        return response.json();
                })
                .then( data => {
                        console.log("add",data.data.addBook)
                        if(data.data.addBook){
                                refreshData()                     
                                setAddAuthorId(null);
                                setAddBook("")

                        }
                })
                .catch(error => {
                        console.error("error",error);
                });
        };


  return (
        <div className='myBooks'>
                <h2 className='myBooks__heading'>Books</h2>
                {
                        data.books?.map(book=>(
                                <BookItem book={book} key={book.id} data={data} setData={setData}/>
                        ))
                }

                <form className='addData__Item' onSubmit={(e) => { console.log("test my func")  }  }>
                       <p>add new book</p>  
                       <div className="inputbox flexBox">
                                <input 
                                        type="number"
                                        value={addAuthorId}
                                        onChange={(e) => setAddAuthorId(e.target.value)}
                                        placeholder="Author Id"
                                />
                                <input
                                        type="text"
                                        value={addBook}
                                        onChange={(e) => setAddBook(e.target.value)}
                                        placeholder="Book name"
                                />
                                <button className='input_submit' type="button" onClick={ (e)=> handleAddBook(e) }><BsPlusLg /></button>
                       </div>
                </form>
        </div>
  )
}

export default BooksList