import React, { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [properties, setProperties] = useState([]);
  const { isLoading, error, performFetch } = useFetch(
    `/property/get?page=${currentPage}`,
    onDataReceived,
  );

  useEffect(() => {
    performFetch();
  }, [currentPage]);

  function onDataReceived(data) {
    setProperties(data.data);
    setCurrentPage(data.page);
    setTotalPages(data.totalPages);
  }

  // set current page to be whichever number is clicked on
  const handlePagination = (e) => {
    setCurrentPage(Number(e.target.textContent));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPagesToArray = () => {
    const pageNumberList = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumberList.push(i);
    }
    return pageNumberList;
  };

  const pageList = totalPagesToArray(); // get array results that totalPagesToArray returns so it can be mapped through

  // create a btn for each number from the pageList array
  const pagination = pageList?.map((n) => (
    <button
      key={n}
      onClick={handlePagination}
      className={`pagination-btn btn-default ${currentPage == n ? "active" : ""}`}
    >
      {n}
    </button>
  ));

  const renderPropertyCards = () => {
    return properties?.map((property) => (
      <PropertyCard key={property._id} property={property} />
    ));
  };

  return (
    <section className="property-list-section">
      <h2 className="header">Available Homes</h2>
      {isLoading ? (
        <p className="header">Loading...</p>
      ) : error ? (
        <p className="header">There was a problem loading the data</p>
      ) : (
        <>
          <div className="property-card-container">{renderPropertyCards()}</div>
          <div className="pagination-container">
            {currentPage == 1 && (
              <button onClick={handleNext} className="see-more-btn btn-default">
                See More
              </button>
            )}
            {currentPage > 1 && (
              <div>
                <button
                  onClick={handlePrev}
                  className="pagination-btn btn-default"
                >
                  Prev
                </button>
                {pagination}
                {currentPage !== totalPages && (
                  <button
                    onClick={handleNext}
                    className="pagination-btn btn-default"
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default PropertyList;
