import React, { useState } from 'react';
import Book from '../components/Book.js'
import Nav from '../components/Nav.js'



export default function search() {
  // create a search box
  // start an api query
  //display the response from api
  // the book have like button and unlike button
  const [books, setBooks] = useState([])

  // AIzaSyCII8FgqP289MMPY4J0rvIotk0mYT-eqLA
  async function queryBooks(keyWords) {
    const f = `flowers`;
    console.log('???', keyWords);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${keyWords}&key=AIzaSyCII8FgqP289MMPY4J0rvIotk0mYT-eqLA`;
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        const queryArr = res.items;
        console.log('???', queryArr);
        const newBooks = []
        for (let i = 0; i < queryArr.length; i++) {
          newBooks.push(<Book book={queryArr[i]} key={i} />);
        }
        // console.log(newBooks)
        setBooks(newBooks);
      })
      .catch((err => console.log('query api err')));


    /* 
    queryArr elements look like:  

    accessInfo: {country: 'US', viewability: 'PARTIAL', embeddable: true, publicDomain: false, textToSpeechPermission: 'ALLOWED', …}
    etag: "20XxkNn+8FI"
    id: "_qpwCgAAQBAJ"
    kind: "books#volume"
    saleInfo: {country: 'US', saleability: 'FOR_SALE', isEbook: true, listPrice: {…}, retailPrice: {…}, …}
    searchInfo: {textSnippet: 'A Study Guide for Daniel Keyes&#39;s &quot;Flowers…ography; study questions; historical context; ...'}
    selfLink: "https://www.googleapis.com/books/v1/volumes/_qpwCgAAQBAJ"
    volumeInfo: {title: "A Study Guide for Daniel Keyes's Flowers for Algernon", authors: Array(1), publisher: 'Gale, Cengage Learning ', publishedDate: '2015-03-13', description: `A Study Guide for Daniel Keyes's "Flowers for Alge…vels for Students for all of your research needs.`, …}
    [[Prototype]]: Object
    
  */

  };

  return (

    <div className='searchBody'>

      <h1 className='searchbar'>Search for a book!</h1>
      <form className='searchbar'>
        <input type='text' id="search" placeholder='My favorite title'></input>
        <button className='search-button' type='button' onClick={() => { queryBooks(document.getElementById('search').value) }}>Search</button>
      </form>



      <div className='favorite_books'>
        <div className="card text-center">
          <div className="card-body">
            <h3 className="card-title">Results</h3>
            <p className="card-text"></p>
            {books}
          </div>
        </div>
      </div>

    </div>






  )

}