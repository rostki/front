import React, { useEffect, useState } from 'react';
import MaterialItem from '../components/MaterialItem';


// import axios from 'axios';

function Materials() {

const [materials, setMaterials] = useState([])
const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  

useEffect(() => {
    const fetchMaterials = async () => {
      // const result = await axios(
      //   'http://35.215.80.104/api/v1/materials/',
      // );

      // setMaterials(result.data);
        fetch('http://35.215.80.104/api/v1/materials/')
        .then(response => response.json())
        .then(data => setMaterials(data))
        
    }

    fetchMaterials()
    .catch(console.error);
}, [])

  return (
  <div className='category'>
  <header>
        <p className='pageHeader'>
          Materials list
        </p>
        </header>
        <main>
            <ul className='categoryListings'>
              {materials.map((material) => (
                <MaterialItem
                  material={material}
                  id={material.id}
                  
                />
              ))}
            </ul>
          </main>
  {/* <ul>
  {materials.map(item => (
    <li key={item.id}>
      {item.name} {item.base_price}
    </li>
  ))}
</ul>; */}
  </div>
  )
}

export default Materials;
