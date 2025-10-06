import React from 'react';
import styled from 'styled-components';

const Input1 = () => {
  return (
    <StyledWrapper>
      <div className="input-container">
        <input placeholder="Enter text" className="input-field" type="text" />
        <label htmlFor="input-field" className="input-label">Enter text</label>
        <span className="input-highlight" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Input container */
  .input-container {
    position: relative;
    margin: 20px;
  }

  /* Input field */
  .input-field {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-bottom: 2px solid #ccc;
    outline: none;
    background-color: transparent;
  }

  /* Input label */
  .input-label {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 16px;
    color: rgba(204, 204, 204, 0);
    pointer-events: none;
    transition: all 0.3s ease;
  }

  /* Input highlight */
  .input-highlight {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background-color: #007bff;
    transition: all 0.3s ease;
  }

  /* Input field:focus styles */
  .input-field:focus + .input-label {
    top: -20px;
    font-size: 12px;
    color: #007bff;
  }

  .input-field:focus + .input-label + .input-highlight {
    width: 100%;
  }`;

export default Input1;
