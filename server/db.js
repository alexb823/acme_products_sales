const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

// // For cloud9 db
// const db = new Sequelize('products_sales_db', 'ubuntu', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',`
//   logging: false,
// });


const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      msg: 'Product name must be unique',
    },
    validation: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validation: {
      isDecimal: true,
    },
  },
  discountPercentage: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validation: {
      min: 0,
      max: 100,
    },
  },
  availability: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeValidate: (product, options) => {
      if (product.discountPercentage === '') product.discountPercentage = 0;
      product.name = product.name.toLowerCase();
    }
  }
});

const syncAndSeed = () => {
  return db
    .sync({ force: true })
    .then(() =>
      Promise.all([
        Product.create({ name: 'foo', price: 10, availability: 'instock' }),
        Product.create({
          name: 'bar',
          price: 12,
          discountPercentage: 10,
          availability: 'backordered',
        }),
        Product.create({ name: 'baz', price: 8, availability: 'discontinued' }),
      ])
    )
    .then(() => console.log('db synced and seeded'))
    .catch(err => console.error(err));
};

module.exports = { Product, syncAndSeed };
