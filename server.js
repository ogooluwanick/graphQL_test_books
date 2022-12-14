const express=require("express")
const app=express() 
let expressGraphQL = require('express-graphql')
let {GraphQLSchema,GraphQLObjectType,GraphQLString,GraphQLList, GraphQLInt,GraphQLNonNull} = require('graphql')

const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

const AuthorType=new GraphQLObjectType({
        name:"Author",
        description:"This is a single author",
        fields:()=>({
                id:{type:GraphQLNonNull(GraphQLInt)},
                name:{type:GraphQLNonNull(GraphQLString)},
                books:{type:new GraphQLList(BookType),
                                resolve:(author)=>{
                                return books.filter(book=>book.authorId===author.id)
                }}
        })
})

const BookType=new GraphQLObjectType({
        name:"Book",
        description:"This is a single book",
        fields:()=>({
                id:{type:GraphQLNonNull(GraphQLInt)},
                name:{type:GraphQLNonNull(GraphQLString)},
                authorId:{type:GraphQLNonNull(GraphQLInt)},
                author:{type:AuthorType,
                                resolve:(book)=>{
                                        return authors.find(author=>author.id===book.id)
                                } 
                }
        })
})





const RootQueryType=new      GraphQLObjectType({
        name:"Query",
        description:"Root query",
        fields:()=>({
                book:{type: BookType,
                        description:"A Book",
                        args:{
                                id:{type:GraphQLInt}
                        },
                        resolve:(parent,args)=>books.find(book=>args.id===book.id)
                },
                books:{type: new GraphQLList(BookType),
                                description:"List of Books",
                                resolve:()=>books
                        },
                authors:{type: new GraphQLList(AuthorType),
                                description:"List of Authors",
                                resolve:()=>authors
                        },
                author:{type: AuthorType,
                                description:"An Author",
                                args:{
                                        id:{type:GraphQLInt}
                                },
                                resolve:(parent,args)=>authors.find(author=>author.id===args.id)
                        }
        })
})

const RootMutationType=new GraphQLObjectType({
        name:"Mutations",
        description:"Root Mutations",
        fields:()=>({
                addBook:{
                        type:BookType,
                        description:"add in a book",
                        args:{
                                name:{type:GraphQLNonNull(GraphQLString)},
                                authorId:{type:GraphQLNonNull(GraphQLInt)}
                        },
                        resolve:(parent,args)=>{
                                const book={
                                                        id: books.length+1,
                                                        name:args.name,
                                                        authorId:args.authorId
                                                }
                                                books.push(book)
                                                return book
                        }
                },
                addAuthor:{
                        type:AuthorType,
                        description:"add in an author",
                        args:{
                                name:{type:GraphQLNonNull(GraphQLString)},
                        },
                        resolve:(parent,args)=>{
                                const author={
                                                        id: authors.length+1,
                                                        name:args.name
                                                }
                                                authors.push(author)
                                                return author
                        }
                },
                updateAuthor:{
                        type:AuthorType,
                        description:"update in an author",
                        args:{
                                id:{type:GraphQLNonNull(GraphQLInt)},
                                newId:{type:GraphQLNonNull(GraphQLInt)},
                                name:{type:GraphQLNonNull(GraphQLString)},

                        },
                        resolve:(parent,args)=>{
                                const author=authors.find(author=>args.id===author.id)
                                                author.name=args.name
                                                author.id=args.newId
                                                return author
                        }
                },
                deleteAuthor:{
                        type:AuthorType,
                        description:"delete  an author",
                        args:{
                                id:{type:GraphQLNonNull(GraphQLInt)},
                        },
                        resolve:(parent,args)=>{
                                

                                for (let x = 0; x <authors.length; x++) {
                                        if  (authors[x].id===args.id){
                                                authors.splice(x,1)
                                        }
                                }

                                 console.log(authors)
                                return authors
                        }
                }
        })
})

const schema=new GraphQLSchema({
        query:RootQueryType,
        mutation:RootMutationType

})

app.use('/graphql', expressGraphQL({
        schema: schema,
        graphiql: true
      }))

app.listen(3000,()=>{
        console.log("Server running at 3000")
})