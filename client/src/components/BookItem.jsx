import React, { useEffect, useRef, useState } from 'react'
import {AiFillEdit,AiFillDelete} from "react-icons/ai"
import {MdDone} from "react-icons/md"




const BookItem = ({book, myBooks,setMyBooks}) => {
        const [edit, setEdit] = useState(false)
        const [editBook, setEditBook] = useState(book.book);

        const handleDone =(id)=>{
                setMyBooks(myBooks.map(todo=>todo.id===id?{...todo,isDone:!book.isDone}:todo))
        }
        const handleEdit = (e, id) => {
                e.preventDefault();
                setMyBooks(myBooks.map((todo) => (todo.id === id ? { ...todo, todo: editBook } : todo)));
                setEdit(false);
        };
        const handleDelete =(id)=>{
                setMyBooks(myBooks.filter(todo=>todo.id!==id))
        }

        const inputRef=useRef(null)

        useEffect(() => {
                inputRef.current?.focus();
        }, [edit])
        

  return (
        <form className='myBooks__single' onSubmit={(e) => handleEdit(e, book.id)}>
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
                        book.isDone ? (
                                <s className="myBooks__single--text">{book.todo}</s>
                                ) : 
                                (<span className="myBooks__single--text">{book.todo}</span>)
                }
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !book.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(book.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(book.id)}>
              <MdDone />
            </span>
          </div>
        </form>
  )
}

export default BookItem