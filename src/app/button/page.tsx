// 'use client';
// import { useState } from "react";
// function MyComponent() {
//   const [name, setName] = useState('John'); // useState inside the component

//   return (
//     <div>
//       <p>{name}</p>
//       <button onClick={() => setName('Doe')}>Change Name</button>
//     </div>
//   );
// }

// export default MyComponent;


'use client'
import axios from "axios";
import { FormEvent, useState } from "react";

const ComponentName = () => {

  
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [vendorId, setId] = useState('');
    const [stockLevel, setStock] = useState('');

    const add = async( e:FormEvent) => {
       e.preventDefault();
       try{
        const res = await axios.post('http://localhost:3000/product/create',
            {
                "name" : name,	
                "price" : price,
                "vendorId" : vendorId,
                "stockLevel" : stockLevel	
            }
        );
      alert("Added")
        //console.log(res);
    }
    catch(err){
      alert("Not added")
    }	

  }

  return (
    <form onSubmit={add}>
        <label htmlFor="name">Product Name:</label>
        <input type="text" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="price">Product Price:</label>
        <input type="text" placeholder="Enter Price"  value={price} onChange={(e) => setPrice(e.target.value)}/>
        <label htmlFor="vendorId">VendorId:</label>
        <input type="text" placeholder="Enter ID"  value={vendorId} onChange={(e) => setId(e.target.value)}/>
        <label htmlFor="stockLevel">StockLevel:</label>
        <input type="text" placeholder="Enter Stock"  value={stockLevel} onChange={(e) => setStock(e.target.value)}/>
        <button type="submit">Add</button>
    </form>
    
  );
}

export default ComponentName;
