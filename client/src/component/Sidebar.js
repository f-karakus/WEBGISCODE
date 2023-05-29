import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ category }) => {
  const [itemName, setItemName] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const saveData = async () => {
    const selectedCategory = category.find((item) => item.name === categoryId);
    const itemName = document.getElementById("dataInput").value;
  
    if (!selectedCategory || !itemName) {
      console.error('Invalid data!');
      return;
    }
  
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
  
        try {
          const response = await fetch('http://localhost:8000/item', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              item_name: itemName,
              category_id: selectedCategory.id,
              location: { type: 'Point', coordinates: [longitude, latitude] }
            })
          });
  
          if (response.ok) {
            console.log('Data saved successfully!');
            alert("Veri Girildi.")
            // Do something after successful data save
          } else {
            console.error('Failed to save data!');
          }
        } catch (error) {
          console.error(error);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div className="container">
      <div id="optionsAndInputBox">
        <div id="optionsBox">
          <h2>Category</h2>
          <select id="optionsSelect" onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Select a category</option>
            {category.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div id="inputBox">
          <h2>Data Name</h2>
          <input type="text" id="dataInput" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        </div>

        <div id="saveBox">
          <button onClick={saveData}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;