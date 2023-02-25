const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function (email) {
  const userEmail = email.toLowerCase();
  const query = {
    text: `SELECT * FROM users WHERE email = $1`,
    values: [userEmail],
  };
    return pool
    .query(query)
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error('Error in getUserWithEmail', error.message);
      throw error;
    });
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = function (id) {
  const query = {
    text: `SELECT * FROM users WHERE id = $1`,
    values: [id],
  };
  return pool
    .query(query)
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error('Error in getUserWithID', error.message);
      throw error;
    });
};

exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

const addUser = function (user) {
  const query = {
    text: `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
    values: [user.name, user.email, user.password],
  };
    return pool
    .query(query)
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error('Error in addUser', error.message);
      throw error;
    });
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

const getAllReservations = function (guest_id, limit = 10) {
  const query = {
    text: `SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
    FROM property_reviews
    JOIN properties ON property_reviews.property_id = properties.id
    JOIN reservations ON property_reviews.property_id = reservations.property_id
    WHERE reservations.guest_id = $1
    AND reservations.end_date < now()::date
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date
    LIMIT $2; 
      `,
    values: [guest_id, limit],
  };
   return pool
    .query(query)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.error('Error in getAllReservations', error.message);
      throw error;
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1 = 1`;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    const minPrice = parseInt(options.minimum_price_per_night, 10) * 100;
    queryParams.push(minPrice);
    queryString += `AND cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    const maxPrice = parseInt(options.maximum_price_per_night, 10) * 100;
    queryParams.push(maxPrice);
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  }

  queryString += `GROUP BY properties.id `;

  if (options.minimum_rating) {
    const rating = parseInt(options.minimum_rating);
    queryParams.push(rating);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
    ORDER BY cost_per_night
   LIMIT $${queryParams.length};
  `;

  return pool
  .query(queryString, queryParams)
  .then((result) => {
    return result.rows;
  })
  .catch((error) => {
    console.error('errorWithGetAllProperties', error.message);
    throw error;
  });
};

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

const addProperty = function (property) {
  const propertyValues = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
  ];

  const queryString = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
  RETURNING *;
  `;

  return pool
    .query(queryString, propertyValues)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.error('Error in getAllProperties', error.message);
      throw error;
    });
};

exports.addProperty = addProperty;
