import React, { useEffect, useRef, useState } from 'react'
import {AiFillEdit,AiFillDelete} from "react-icons/ai"
import {MdDone} from "react-icons/md"




const BookItem = ({book, data,setData}) => {
        const [edit, setEdit] = useState(false)
        const [editBook, setEditBook] = useState(book.name);

        

        // const handleDone =(id)=>{
        //         setMyBooks(myBooks.map(todo=>todo.id===id?{...todo,isDone:!book.isDone}:todo))
        // }
        const handleEdit = (e, id) => {
                e.preventDefault();

                const query = `  mutation {
                                                editBookName(id: "${bookId}", name: "${editBookName}") {
                                                                        id
                                                                        name
                                                                        author {
                                                                        name
                                }
                                }
                        }`
                const url = `http://localhost:3001/graphql`;
                
                setData({...data,books:data.books.map((book) => (book.id === id ? { ...book, name: editBook } : book))});
                setEdit(false);

                fetch("http://localhost:3001/graphql", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                        query: query
                        })
                })
    .then(res => res.json())
    .then(data => {
      // handle the returned data
    })
    .catch(error => {
      console.error(error);
    });
};

        };
        // const handleDelete =(id)=>{
        //         setMyBooks(myBooks.filter(todo=>todo.id!==id))
        // }

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
                        <span className="icon" onClick={() =>""}>
                                {/* handleDelete(book.id)} */}
                                <AiFillDelete />
                        </span>
                        <span className="icon" onClick={() => ""}>
                                {/* handleDone(book.id) */}
                                <MdDone />
                        </span>
                </div>
        </form>
        }
        </>
  )
}

export default BookItem