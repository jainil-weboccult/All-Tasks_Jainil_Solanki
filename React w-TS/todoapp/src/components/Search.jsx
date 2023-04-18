import React, { useState } from 'react'

export default function Search(data) {

  var count=0;
  const [search, setSearch] = useState("")
  var { id, name, checked } = data



  function searchFunc(e) {

    setSearch(e.target.value);

    if(search.localeCompare() === 0) 
    {
      console.log("Match Found");
    }

  }
  return (
    <div className='' style={{ paddingLeft: "10px" }}>
      <input
        onChange={(e) => { searchFunc(e) }}
        value={search}
        type="text"
        placeholder='Search Your Tasks'
        className="text-center border-r-2 rounded hover:shadow-xl cursor-pointer"
        style={{ padding: "0.25rem" }}
      />
      <p>{count} Tasks found</p>
    </div>
  )
}
