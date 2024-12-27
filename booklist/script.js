//Book Class: Represent the Book

class Book
{

    constructor(title,author,isbn)
    {
        this.title=title
        this.author=author
        this.isbn=isbn
    }

}

//UI Class:Handle UI tasks
//display,remove,add
class UI
{
    static displayBooks()
    {
        const storedBooks=Store.getBooks()
         const books=storedBooks

         books.forEach(book=>
         {
            UI.addBookToList(book)
         }
         )
    }

    static addBookToList(book)
    {
          const list=document.getElementById('book-list')
          const row=document.createElement('tr')
          row.innerHTML=`
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a class="delete">X</a></td>`
          list.appendChild(row)
    }
    static deleteBook(val)
    {
       if(val.classList.contains('delete'))
       {
        val.parentElement.parentElement.remove()
       }
    
    }

    static clearFields()
    {
        document.getElementById('title').value=''
        document.getElementById('author').value=''
        document.getElementById('isbn').value=''
    }

    static showAlert(message,className)
    {
        const div=document.createElement('div')
        div.className=`alert ${className}`
        div.innerHTML=`<p>${message}</p>`
        const container=document.querySelector('.container')
        const form=document.querySelector('#book-form')
        container.insertBefore(div,form)

        setTimeout(()=>
        {
            document.querySelector('.alert').remove()
        },2000)
    }
}

//Store Class:Handle Storage
class Store
{
    static getBooks()
    {
      let books;
      if(localStorage.getItem('books')===null)
      {
        books=[]
      }
      else
      {
        books=JSON.parse(localStorage.getItem('books'))
      }

      return books
    }

    static addBook(book)
    {
    const books=Store.getBooks()
    books.push(book)
    localStorage.setItem('books',JSON.stringify(books))

    }

   static removeBook(isbn)
    {  
       const books=Store.getBooks()
       books.forEach((book,index)=>
    {
        if(book.isbn===isbn)
        {
            books.splice(index,1)
        }
    })
    localStorage.setItem('books',JSON.stringify(books))
    }
}

//Event to display books

document.addEventListener('DOMContentLoaded',UI.displayBooks())

//Event to Add Book
document.getElementById('book-form').addEventListener('submit',(e)=>
{
    e.preventDefault()
    const title=document.querySelector('#title').value
    const author=document.querySelector('#author').value
    const isbn=document.querySelector('#isbn').value
    if(title!==''&& author!=='' && isbn!=='')
    {
    // instance for book
    const book=new Book(title,author,isbn)
    // console.log(book);

    //add book
    UI.addBookToList(book)
    Store.addBook(book)
    //clear fields
    UI.clearFields()

    UI.showAlert("Successfully added book",'success')
    }
    else
    {
        UI.showAlert("Please enter all fields.",'danger')
       
    }
    
})



//Event to Remove Book

document.querySelector('#book-list').addEventListener('click',(e)=>
{   console.log(e.target);
    // e.preventDefault()
    UI.deleteBook(e.target)
    console.log(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert("Book Removed",'success')
})
