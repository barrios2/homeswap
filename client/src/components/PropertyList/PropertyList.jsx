import React, { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState([]); //1.
  const propertiesPerPage = 6;
  //Fetching the data from the backend /////
  const { isLoading, error, performFetch } = useFetch(
    "/property/get",
    onDataReceived,
  );

  useEffect(() => {
    performFetch();
  }, []);

  function onDataReceived(data) {
    setProperties(data.data);
  }
  // till here //////
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty,
  );

  const pages = Math.ceil(properties?.length / propertiesPerPage);

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
    for (let i = 1; i <= pages; i++) {
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
    return currentProperties.map((property) => (
      <PropertyCard key={property._id} property={property} />
    ));
  };

  //You can handle "isLoading" and "error" in better way ////
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="property-list-section">
      <h2 className="avail-home-header">Available Homes</h2>
      <div className="property-card-container">{renderPropertyCards()}</div>
      <div className="pagination-container">
        {currentPage * propertiesPerPage < properties.length &&
          currentPage == 1 && (
            <button onClick={handleNext} className="see-more-btn btn-default">
              See More
            </button>
          )}
        {currentPage > 1 && (
          <div>
            <button onClick={handlePrev} className="pagination-btn btn-default">
              Prev
            </button>
            {pagination}
            {currentPage !== pages && (
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
    </section>
  );
};

export default PropertyList;
/*
// FAKE DATA - to be deleted once the db is done
const properties = [
  {
    _id: "1",
    title: "Modern Loft in the Heart of the City",
    bedrooms: 2,
    bathrooms: 1,
    photos: [
      "https://images.unsplash.com/photo-1597509288493-c1fff98a4bd3?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Germany",
      street: "Berliner Straße",
      city: "Berlin",
      house_number: "123",
      postcode: "10115",
    },
  },
  {
    _id: "2",
    title: "Charming Apartment near the Canal",
    bedrooms: 2,
    bathrooms: 1,
    photos: [
      "https://images.unsplash.com/photo-1505819244306-ef53954f9648?q=80&w=2656&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Netherlands",
      street: "Prinsengracht",
      city: "Amsterdam",
      house_number: "356",
      postcode: "1016JA",
    },
  },
  {
    _id: "3",
    title: "Lakefront Cabin Getaway",
    bedrooms: 3,
    bathrooms: 2,
    photos: [
      "https://images.unsplash.com/photo-1585544314038-a0d3769d0193?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Finland",
      street: "Mannerheimintie",
      city: "Helsinki",
      house_number: "2",
      postcode: "00100",
    },
  },
  {
    _id: "4",
    title: "Cozy Cottage in the Countryside",
    bedrooms: 1,
    bathrooms: 1,
    photos: [
      "https://images.unsplash.com/photo-1522759531475-b05ba50ae2b7?q=80&w=3330&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "France",
      street: "Rue de la République",
      city: "Paris",
      house_number: "45",
      postcode: "75011",
    },
  },
  {
    _id: "5",
    title: "Secluded Cottage Retreat",
    bedrooms: 2,
    bathrooms: 1,
    photos: [
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Sweden",
      street: "Drottninggatan",
      city: "Stockholm",
      house_number: "12",
      postcode: "111 51",
    },
  },
  {
    _id: "6",
    title: "Modern Loft in the Heart of the City",
    bedrooms: 2,
    bathrooms: 1,
    photos: [
      "https://images.unsplash.com/photo-1602250652987-4a0e86d469fd?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Germany",
      street: "Berliner Straße",
      city: "Berlin",
      house_number: "123",
      postcode: "10115",
    },
  },
  {
    _id: "7",
    title: "Luxurious Penthouse with Panoramic Terrace",
    bedrooms: 2,
    bathrooms: 2,
    photos: [
      "https://images.unsplash.com/photo-1669669259569-b28ecb82ff2c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "United Kingdom",
      street: "Baker Street",
      city: "London",
      house_number: "221B",
      postcode: "NW1 6XE",
    },
  },
  {
    _id: "8",
    title: "Mountain Chalet Retreat",
    bedrooms: 3,
    bathrooms: 2,
    photos: [
      "https://images.unsplash.com/photo-1679939153963-ff44f5deeba2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Switzerland",
      street: "Bahnhofstrasse",
      city: "Zurich",
      house_number: "87",
      postcode: "8001",
    },
  },
  {
    _id: "9",
    title: "Nice house in the city center",
    bedrooms: 3,
    bathrooms: 2,
    photos: [
      "https://images.unsplash.com/photo-1683491360986-6a0bb5182bf2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Netherlands",
      street: "Houtenstraat",
      city: "Rotterdam",
      house_number: "",
      postcode: "1254NB",
    },
  },
  {
    _id: "10",
    title: "Riverside Cabin Escape",
    bedrooms: 2,
    bathrooms: 1,
    photos: [
      "https://images.unsplash.com/photo-1602699905588-a6c9f58bad2b?q=80&w=2649&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Portugal",
      street: "Rua de Santa Catarina",
      city: "Porto",
      house_number: "78",
      postcode: "4000-447",
    },
  },
  {
    _id: "11",
    title: "Ski Resort Lodge",
    bedrooms: 5,
    bathrooms: 3,
    photos: [
      "https://image.winudf.com/v2/image1/Y29tLkdyZWF0bWluZHMuSG91c2V3YWxscGFwZXJzX3NjcmVlbl8wXzE1NDkyMjE5MTVfMDI1/screen-0.jpg?fakeurl=1&type=.jpg",
    ],
    address: {
      country: "Belgium",
      street: "Grand Place",
      city: "Brussels",
      house_number: "10",
      postcode: "1000",
    },
  },
  {
    _id: "12",
    title: "Artistic Studio in Bohemian District",
    bedrooms: 1,
    bathrooms: 1,
    photos: ["https://wallpapershome.com/images/pages/pic_v/860.jpg"],
    address: {
      country: "Austria",
      street: "Kärntner Straße",
      city: "Vienna",
      house_number: "21",
      postcode: "1010",
    },
  },
  {
    _id: "13",
    title: "Castle Estate Experience",
    bedrooms: 10,
    bathrooms: 5,
    photos: [
      "https://images.unsplash.com/photo-1505819244306-ef53954f9648?q=80&w=2656&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Ireland",
      street: "Dublin Street",
      city: "Dublin",
      house_number: "4",
      postcode: "D04 C932",
    },
  },
  {
    _id: "14",
    title: "Secluded Cottage Retreat",
    bedrooms: 2,
    bathrooms: 1,
    photos: [
      "https://images.unsplash.com/photo-1556580004-7eca73f3a3ea?q=80&w=2878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Sweden",
      street: "Drottninggatan",
      city: "Stockholm",
      house_number: "12",
      postcode: "111 51",
    },
  },
  {
    _id: "15",
    title: "Seaside Villa with Stunning Views",
    bedrooms: 4,
    bathrooms: 3,
    photos: [
      "https://images.unsplash.com/photo-1585943870848-879f4b3918d1?q=80&w=3330&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Italy",
      street: "Via Roma",
      city: "Rome",
      house_number: "67",
      postcode: "00184",
    },
  },
  {
    _id: "16",
    title: "Lakefront Cabin Getaway",
    bedrooms: 3,
    bathrooms: 2,
    photos: [
      "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=1870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Finland",
      street: "Mannerheimintie",
      city: "Helsinki",
      house_number: "2",
      postcode: "00100",
    },
  },
  {
    _id: "17",
    title: "Another Cabin Getaway",
    bedrooms: 3,
    bathrooms: 2,
    photos: [
      "https://images.unsplash.com/photo-1534430198509-8a3091682aa8?q=80&w=2563&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Finland",
      street: "Mannerheimintie",
      city: "Helsinki",
      house_number: "2",
      postcode: "00100",
    },
  },
  {
    _id: "18",
    title: "Another Cabin Getaway",
    bedrooms: 3,
    bathrooms: 2,
    photos: [
      "https://images.unsplash.com/photo-1487975460695-a2e5c4ea12c9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Finland",
      street: "Mannerheimintie",
      city: "Helsinki",
      house_number: "2",
      postcode: "00100",
    },
  },
  {
    _id: "19",
    title: "Secluded Cottage Retreat",
    bedrooms: 2,
    bathrooms: 1,
    photos: [
      "https://images.unsplash.com/photo-1611602132416-da2045990f76?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Sweden",
      street: "Drottninggatan",
      city: "Stockholm",
      house_number: "12",
      postcode: "111 51",
    },
  },
  {
    _id: "20",
    title: "Mountain Chalet Retreat",
    bedrooms: 3,
    bathrooms: 2,
    photos: [
      "https://plus.unsplash.com/premium_photo-1687960116947-11ecc22f45c0?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Switzerland",
      street: "Bahnhofstrasse",
      city: "Zurich",
      house_number: "87",
      postcode: "8001",
    },
  },
  {
    _id: "21",
    title: "Nice house in the city center",
    bedrooms: 3,
    bathrooms: 2,
    photos: [
      "https://images.unsplash.com/photo-1683491360986-6a0bb5182bf2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    address: {
      country: "Netherlands",
      street: "Houtenstraat",
      city: "Rotterdam",
      house_number: "",
      postcode: "1254NB",
    },
  },
];
*/
