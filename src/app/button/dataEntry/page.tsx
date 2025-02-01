'use client'
import axios from "axios";
import { FormEvent, useState } from "react";

const ComponentName = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const add = async( e:FormEvent) => {
       e.preventDefault();
        const res = await axios.post('http://localhost:3000/product/add',
            {
                "name" : name,	
                "price" : price
            }
        );
    }
        

  return (
    <form >
        <label htmlFor="name">Product Name:</label>
        <input type="text" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="price">Product Price:</label>
        <input type="text" placeholder="Enter Price"  value={price} onChange={(e) => setPrice(e.target.value)}/>
        <button type="submit">Add</button>
    </form>
    
  );
}
