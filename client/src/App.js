import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import React, { useEffect, useState } from 'react';
import './App.css';
import MapComponent from "./component/Base";

function App() {
  const [category, setCategory] = useState([]);
  const [setCategoryName] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const getCategory = async () => {
    try {
      const response = await fetch("http://localhost:8000/category");
      const json = await response.json();
      const category = json.map((row) => ({
        name: row.name,
        id:row.id,
      }));

      setCategory(category);
    } catch (error) {
      console.error(error);
    }
  };
  
  const getItems = async () => {
    try {
      const categoryResponse = await fetch("http://localhost:8000/category");
      const categoryJson = await categoryResponse.json();
      const categoryMap = new Map(categoryJson.map((row) => [row.id, row.name]));
  
      let query = 'SELECT ST_X(ST_Transform(location, 4326)) AS longitude, ST_Y(ST_Transform(location, 4326)) AS latitude, item_name, category_id FROM item';
  
      if (selectedCategories.length > 0) {
        const categoryNames = selectedCategories.map((categoryName) => {
          return `'${categoryName}'`;
        });
        query += ` WHERE category_id IN (SELECT id FROM category WHERE name IN (${categoryNames.join(',')}))`;
      }
  
      const response = await fetch(
        `http://localhost:8000/item?query=${encodeURIComponent(query)}`
      );
      const json = await response.json();
      const items = json.map((row) => ({
        name: row.item_name,
        latitude: row.latitude,
        longitude: row.longitude,
        category: categoryMap.get(row.category_id),
      }));
  
      if (selectedCategories.length === 0) {
        setItems(items);
      } else {
        setItems(items.filter(item => selectedCategories.includes(item.category)));
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    getCategory();
    getItems();
  }, [selectedCategories]);
  

  const handleCategory = (selectedOption) => {
    const isSelected = selectedCategories.includes(selectedOption);
  
    if (isSelected) {
      // Category is already selected, remove it
      setSelectedCategories(selectedCategories.filter(category => category !== selectedOption));
    } else {
      // Category is not selected, add it
      setSelectedCategories([...selectedCategories, selectedOption]);
    }
  };
  
  


  return (
    <div className="app-container">
      <MapComponent 
      items={items} />
      <Sidebar handleCategory={handleCategory}  category={category}  selectedCategories={selectedCategories}/>
      
      <Header />
      
      
    </div>
  );
}

export default App;