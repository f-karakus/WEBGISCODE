import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import React, { useEffect, useState } from 'react';
import './App.css';
import MapComponent from "./component/Base";

function App() {
  const [category, setCategory] = useState([]);
  const [setCategoryName] = useState(null);
  const [items, setItems] = useState([]);

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
      const categoryMap = new Map(
        categoryJson.map((row) => [row.id, row.name])
      );
  
      const response = await fetch("http://localhost:8000/item");
      const json = await response.json();
      const items = json.map((row) => ({
        name: row.item_name,
        latitude: row.latitude,
        longitude: row.longitude,
        category: categoryMap.get(row.category_id), // Kategori adını alın
      }));
      console.log(items);
      setItems(items);
    } catch (error) {
      console.error(error);
    }
  };




  useEffect(() => {
    getCategory();
    getItems();

  }, []);

  const handleCategory = (selectedOption) => {
    setCategoryName(selectedOption);
    const selectedCategory = category.find((item) => item.name === selectedOption);
    if (selectedCategory) {
      const categoryElement = document.getElementById("categorySelect");
      if (categoryElement) {
        categoryElement.textContent = selectedCategory.name;
      }
    }
  };


  return (
    <div className="app-container">
      <MapComponent 
      items={items} />
      <Sidebar handleCategory={handleCategory} category={category} />
      
      <Header />
      
      
    </div>
  );
}

export default App;