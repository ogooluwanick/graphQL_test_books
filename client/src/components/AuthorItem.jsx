import React, { useEffect, useRef, useState } from 'react'
import {AiFillEdit,AiFillDelete} from "react-icons/ai"
import useOnclickOutside from "react-cool-onclickoutside";





const BookItem = ({author, data : globalData,setData}) => {
        const [edit, setEdit] = useState(false)
        const [editBook, setEditBook] = useState(author.name);

        

        const url = `http://localhost:3001/graphql`;
        
        const handleEdit = (e, id) => {
                e.preventDefault();

                const mutation = `  mutation { updateAuthor(id: ${id}, name: "${editBook}") {   id  name  } }`   //an error with double and single quotes to watch out for with queries
                
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
                        console.log("edit",data.data.updateAuthor)
                        if(data.data.updateAuthor){
                                setData({...globalData,authors:globalData.authors.map((author) => (author.id === id ? { ...author, name: data.data.updateAuthor.name } : author))});
                                setEdit(false);
                        }
                })
                .catch(error => {
                        console.error("error",error);
                });
        };

        
        const handleDelete =(id)=>{
                const mutation = `  mutation { deleteAuthor(id: ${id}) {   id  name   } }`   //an error with double and single quotes to watch out for with queries
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
                        console.log("edit",data.data.deleteAuthor)
                        if(data.data.deleteAuthor){
                                setData({...globalData,authors:globalData.authors.filter((author) => (author.id !== id  && author))});
                                setEdit(false);
                        }
                })
                .catch(error => {
                        console.error("error",error);
                });
        }

        const inputRef=useRef(null)

        const ref = useOnclickOutside(() => setEdit(false));

        useEffect(() => {
                inputRef.current?.focus();
        }, [edit])
        

  return (
        <>
        { author.name &&
        <form className='myBooks__single myAuthors__single'  onSubmit={(e) => handleEdit(e, author.id)}  ref={ref}>  
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
                        (<span className="myBooks__single--text">{author.name}</span>)
                }
                <div>
                        <span className="icon"onClick={() => {!edit &&  setEdit(!edit)  }} >
                                <AiFillEdit />
                        </span>
                        <span className="icon" onClick={() => handleDelete(author.id)}>
                                
                                <AiFillDelete />
                        </span>
                </div>
        </form>
        }
        </>
  )
}

export default BookItem