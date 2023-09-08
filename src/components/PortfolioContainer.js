import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio , onRemove }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolio.map((portfolio)=>(
        <Stock
          key={portfolio.id}
          stock={portfolio}
          onClickTo={onRemove}
        />
      ))}
    </div>
  );
}

export default PortfolioContainer;
