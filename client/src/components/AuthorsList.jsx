import React from 'react'
import AuthorItem from './AuthorItem'


const AuthorsList= ({data,setData}) => {
  return (
        <div className='myBooks myAuthors'>
                <h2 className='myBooks__heading'>Authors</h2>
                {
                        data.authors?.map(author=>(
                                <AuthorItem author={author} key={author.id} data={data} setData={setData}/>
                        ))
                }
        </div>
  )
}

export default AuthorsList