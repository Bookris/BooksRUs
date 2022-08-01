import * as React from 'react';



export default function search() {
  // create a search box
  // start an api query
  //display the response from api
  // the book have like button and unlike button

  // AIzaSyCII8FgqP289MMPY4J0rvIotk0mYT-eqLA
  async function queryBooks(keyWords) {
    const f = `flowers`;
    console.log('???', keyWords);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${keyWords}+intitle:keyes&key=AIzaSyCII8FgqP289MMPY4J0rvIotk0mYT-eqLA`
    const data = await fetch(url)
      .then(res => res.json())
      .catch((err => console.log('query api err')));
    console.log(data);
    // render the each book returned

  };

  return (
    <div>
      <h1>search page</h1>
      <form>
        <input type='text' id="search" ></input>
        <label htmlFor="search"></label>
        <button type='button' onClick={() => { queryBooks(document.getElementById('search').value) }}>search</button>
      </form>

    </div >

  )

}