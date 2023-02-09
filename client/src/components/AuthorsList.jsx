import React, { useState } from 'react'
import AuthorItem from './AuthorItem'


const AuthorsList= ({data,setData, refreshData}) => {
        const [addAuthor, setAddAuthor ]=useState("")


        const url = `http://localhost:3001/graphql`;
        
        const handleAddAuthor = (e, id) => {
                e.preventDefault();

                const mutation = `  mutation { addAuthor(name:"${addAuthor}"){id name} }`   //an error with double and single quotes to watch out for with queries
                
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
                        console.log("add",data.data.addAuthor)
                        if(data.data.addAuthor){
                                refreshData()                     
                                setAddAuthor("");
                        }
                })
                .catch(error => {
                        console.error("error",error);
                });
        };


  return (
        <div className='myBooks myAuthors'>
                <h2 className='myBooks__heading'>Authors</h2>
                {
                        data.authors?.map(author=>(
                                <AuthorItem author={author} key={author.id} data={data} setData={setData}/>
                        ))
                }

                <form className='addData__Item' onSubmit={(e) => handleAddAuthor(e)}  >
                        <p>add new author</p> 
                       <div className="inputbox" style={{marginBottom:"1.6rem"}}>
                                <input
                                        type="text"
                                        value={addAuthor}
                                        onChange={(e) => setAddAuthor(e.target.value)}
                                        placeholder="Author name"
                                />
                        </div>
                </form>
        </div>
  )
}

export default AuthorsList