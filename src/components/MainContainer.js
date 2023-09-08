import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState('Alphabetically');
  const [filterBy, setFilterBy] = useState("Tech")

  useEffect(()=>{
    fetch('http://localhost:3001/stocks')
      .then(r=>r.json())
      .then(setStocks)
  },[]);

  const handleAddToPortfolio = (addStock) => {
    const stockInPortfolio = portfolio.find((stock)=> stock.id === addStock.id
    );
    if(!stockInPortfolio){
      setPortfolio([...portfolio,addStock]);
    }
  }

  const handleRemoveFromPortfolio = (removeStock) => {
    const removedStock = portfolio.filter((stock)=>stock.id !== removeStock.id
    );
    setPortfolio(removedStock);
  }

  const sortedStocks = [...stocks.sort((a,b)=>{
    if(sortBy === 'Alphabetically') {
      return a.name.localeCompare(b.name);
    }else{
      return a.price - b.price;
    }
  })]

  const filteredStocks = sortedStocks.filter((stock)=> stock.type === filterBy)

  return (
    <div>
      <SearchBar 
      sortBy={sortBy}
      onChangeSort={setSortBy}
      filterBy={filterBy}
      onChangeFilter={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer
            stocks={filteredStocks}
            onAdd={handleAddToPortfolio}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer 
          portfolio={portfolio}
          onRemove={handleRemoveFromPortfolio}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
