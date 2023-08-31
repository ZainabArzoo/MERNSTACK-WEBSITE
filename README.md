# MERNSTACK-WEBSITE

# LIVE URL

https://ill-tan-beetle-shoe.cyclic.app/

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
