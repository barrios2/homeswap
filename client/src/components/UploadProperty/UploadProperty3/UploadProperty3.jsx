import React, { useState, useRef } from "react";
// import { Link } from "react-router-dom";
import "./UploadProperty3.css";

function UploadProperty3() {
  let [productCount, setProductCount] = useState(0);
  let [productCountBath, setProductCountBath] = useState(0);

  function displayFormattedProductsCount() {
    return productCount > 0 ? productCount : 0;
  }

  let incrementProductCount = function () {
    setProductCount((prev) => prev + 1);
  };

  let decrementProductCount = function () {
    setProductCount((prev) => prev - 1);
  };

  function displayFormattedProductsCountBath() {
    return productCountBath > 0 ? productCountBath : 0;
  }

  let incrementProductCountBath = function () {
    setProductCountBath((prev) => prev + 1);
  };

  let decrementProductCountBath = function () {
    setProductCountBath((prev) => prev - 1);
  };

  const fileInputRef = useRef(null);

  const handleAddPhotoClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="upload-property3-container">
        <div className="upload-property3-details">
          <header className="upload-property3-header">
            <h1 className="upload-property3-title">
              How many bedrooms and bathrooms are in your home?
            </h1>
            <div className="bathrooms-input">
              <div className="bathrooms-input1">
                <div className="input-h2">
                  <h2>Bedroomes</h2>
                </div>
                <div className="input-btn">
                  <button
                    onClick={decrementProductCount}
                    disabled={productCount === 0}
                  >
                    -
                  </button>
                  <span>{displayFormattedProductsCount()}</span>
                  <button onClick={incrementProductCount}>+</button>
                </div>
              </div>
              <div className="bathrooms-input1">
                <div className="input-h2">
                  <h2>Bathrooms</h2>
                </div>
                <div className="input-btn">
                  <button
                    onClick={decrementProductCountBath}
                    disabled={productCountBath === 0}
                  >
                    -
                  </button>
                  <span>{displayFormattedProductsCountBath()}</span>
                  <button onClick={incrementProductCountBath}>+</button>
                </div>
              </div>
            </div>
            <br />

            <h1 className="upload-property3-title">
              Please add some photos of your home
            </h1>
            <div className="bathrooms-input">
              <div className="bathrooms-input1">
                <div className="input-h2">
                  <h2>Photoes</h2>
                </div>
                <div className="add-photoes">
                  <button onClick={handleAddPhotoClick}>+</button>
                  <input
                    type="file"
                    className="uploadimg"
                    id="img"
                    name="img"
                    accept="image/*"
                    ref={fileInputRef}
                  />
                  <button onClick={handleAddPhotoClick}>+</button>
                  <input
                    type="file"
                    className="uploadimg"
                    id="img"
                    name="img"
                    accept="image/*"
                    ref={fileInputRef}
                  />
                  <button onClick={handleAddPhotoClick}>+</button>
                  <input
                    type="file"
                    className="uploadimg"
                    id="img"
                    name="img"
                    accept="image/*"
                    ref={fileInputRef}
                  />
                </div>
              </div>
            </div>
          </header>
        </div>

        <div className="propety-image">
          <img
            src="https://img.freepik.com/vrije-vector/ontspannen-freelancer-man-zittend-op-bed-met-laptop-vooraanzicht-platte-vectorillustratie_1150-40336.jpg?size=626&ext=jpg&ga=GA1.2.1450317072.1715328804&semt=ais"
            alt=""
            className="propety-pic"
          />
          <div className="upload-property3-footer">
            <button type="button">
              <span>Continue</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadProperty3;
