# Online Shop

# LIVE URL

ll-tan-beetle-shoe.cyclic.app/

# Introduction
Welcome to "Online Shop" this project is a full-stack application build using the Mern (MongoDB , Express.js, React.js, node.js) Stack. Our aim is to provide an online shoping platform for ordering different products.

# Technologies Used: 
1.Frontend: React.js
2.Backend: Express.js
3.Database: MongoDB

# User Management
Online Shop is an e-commerce platform that aims to provide users with a seamless shopping experience. Our platform offers a wide range of products from various categories, allowing users to discover their style and shop with ease.

# To use online shop, follow these guidelines:
User Registration & Authentication system : user can sign up(register) or log in to our online shop account securely.
Product Browsing: Click on a product to view its details, including images, descriptions, prices, and customer reviews.
Add the desired products to your cart. Proceed to the checkout page, review your order, and provide the necessary details.

## API REFERENCE

#### USERS

```http
  GET /api/allusers
  POST /api/signup
  POST /api/login
  GET /api/userbyid/:_id
  GET /api/userbyemail/:email
  PUT /api/updateuser
  DELETE /api/deleteuser
```

#### PRODUCTS

```http
  GET /api//allproducts
  POST /api/addproduct
  GET /api/productbyid/:_id
  GET /api/productbycategory/:category
  GET /api/productbybrand/:brand
  GET /productbyname/:name
  PUT /api/updateproduct
  DELETE /api/updateproduct
```

#### BRANDS

```http
  GET /api/allbrands
  POST /api/addbrand
  GET /api/brandbyid/:_id
  GET /api/brandbyname/:brand
  PUT /api/updatebrand
  DELETE /api/deletebrand
```

#### CATEGORIES

```http
  GET /api/allcategories
  POST /api/addcategory
  GET /api/categorybyid/:_id
  GET /api/categorybyname/:Category
  PUT /api/updatecategory
  DELETE /api/deletecategory
```

#### ORDERS

```http
  GET /api/allorders
  POST /api/addorder
  GET /api/orderbyid/:_id
  PUT /api/updateorder
```

# Contact
If you have any questions or need further assistance, feel free to contact us at zainabarzoo.14@gmail.com
