# Currency Exchange Public API

## Introduction

This project is a simple system that exposes a public API for currency exchange. It integrates with a public currency conversion API to provide the latest exchange rates between different currencies.

## Features

- Fetch latest currency exchange rates from a public API
- Provide a public API endpoint to get exchange rates given `from` and `to` currency parameters
- Graceful error handling and meaningful feedback

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/yahiaahmed4/currency-exchange-api.git
   cd currency-exchange-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The server will start on port 3000 by default. You can access it at `http://localhost:3000`.

## API Documentation

### Get Exchange Rate

**Endpoint:** `/exchange`

**Method:** `GET`

**Query Parameters:**

- `from` (required): The currency code to convert from (e.g., `USD`, `EUR`).
- `to` (required): The currency code to convert to (e.g., `USD`, `EUR`).

**Response:**

- `200 OK`: Returns the exchange rate for the given currencies.

  ```json
  {
    "from": "USD",
    "to": "EUR",
    "rate": 0.85
  }
  ```

- `400 Bad Request`: Missing required parameters or unsupported currency code.

  ```json
  {
    "error": "Missing required parameters. Please provide both from and to parameters."
  }
  ```

  or

  ```json
  {
    "error": "Currency EUR is not supported or invalid."
  }
  ```

- `500 Internal Server Error`: Failed to fetch exchange rate due to an error with the external API or server issue.

  ```json
  {
    "error": "Failed to fetch exchange rate. Please try again later."
  }
  ```

## Error Handling

The application includes middleware for error handling and logging. Any unhandled errors will be logged to the console, and a 500 status code with a generic error message will be returned to the client.

