import React, { useEffect, useRef, useState } from 'react'
import {AiFillEdit,AiFillDelete} from "react-icons/ai"




const BookItem = ({book, data : globalData,setData}) => {
        const [edit, setEdit] = useState(false)
        const [editBook, setEditBook] = useState(book.name);

        

        const url = `http://localhost:3001/graphql`;
        
        const handleEdit = (e, id) => {
                e.preventDefault();

                const mutation = `  mutation { updateBook(id: ${id}, name: "${editBook}") {   id  name  author { name } } }`   //an error with double and single quotes to watch out for with queries
                
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
                .then(data => {
                        console.log("edit",data.data.updateBook)
                        if(data.data.updateBook){
                                setData({...globalData,books:globalData.books.map((book) => (book.id === id ? { ...book, name: data.data.updateBook.name } : book))});
                                setEdit(false);
                        }
                })
                .catch(error => {
                        console.error("error",error);
                });
        };

        
        const handleDelete =(id)=>{
                const mutation = `  mutation { deleteBook(id: ${id}) {   id  name   } }`   //an error with double and single quotes to watch out for with queries
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
                .then(data => {
                        console.log("edit",data.data.deleteBook)
                        if(data.data.deleteBook){
                                setData({...globalData,books:globalData.books.filter((book) => (book.id !== id  && book))});
                                setEdit(false);
                        }
                })
                .catch(error => {
                        console.error("error",error);
                });
        }

        const inputRef=useRef(null)

        useEffect(() => {
                inputRef.current?.focus();
        }, [edit])
        

  return (
        <>
        { book.name &&
        <form className='myBooks__single'  onSubmit={(e) => handleEdit(e, book.id)} >  
                {
                        edit ? (
                                <input
                                        value={editBook}
                                        onChange={(e) => setEditBook(e.target.value)}
                                        className="myBooks__single--text"
                                        ref={inputRef}
                                />
                        ) 
                        : 
                        (<span className="myBooks__single--text">{book.name}</span>)
                }
                <div>
                        <span className="icon"onClick={() => {!edit &&  setEdit(!edit)  }} >
                                <AiFillEdit />
                        </span>
                        <span className="icon" onClick={() => handleDelete(book.id)}>
                                
                                <AiFillDelete  />
                        </span>
                </div>
        </form>
        }
        </>
  )
}

export default BookItem