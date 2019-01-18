# Backend API of an Online Marketplace
## Set up
1. Set up local mysql server
2. Using MySQL cli, run `$mysql> source \this_repo\db\db.sql;`
3. Modify MySQL credentials to `app.js` on line 27
4. Run `npm install` on repo directory
5. Run node app.js
6. Server should now be running on `localhost:8000/`

## API Usage

#### GET `/store`
- store frontpage, fetches all products

#### GET `/store/details/{productId}`
- fetches details of a product with id of productId

#### GET `/store/add_to_cart/{productId}`
- adds the product once to the cart

**Note:**  If quantity of the product in the cart is equal to the inventory_count, adding that product again will no longer increment the quantity in the cart.

#### GET `/store/remove_from_cart/{productId}`
- removes the product once from the cart

#### GET `/store/cart`
- displays details of the cart

Example Cart format:
```
{
    "items": {
        "1": {
            "title": "New Toy",
            "price": 35.12,
            "quantity": 11,
            "itemPriceTotal": 386.32
        },
        "2": {
            "title": "New New Toy",
            "price": 35.11,
            "quantity": 1,
            "itemPriceTotal": 35.11
        }
    },
    "totalPrice": "421.43"
}
```

#### GET `/store/submit_cart`
- submits the current cart and updates the database accordingly

#### POST `/authenticate`
- Receives a JWT token for making requests to protected routes

POST Data Format:

```
{
  "username": "testaccount",
  "password": "password123"
}
```

### The following routes require JWT token validation
________________________
#### POST `/store/add_product`
- Adds a new product to the store

Example POST Data Format:

```
{
  "title": "Awesome Crazy Toy",
  "price": 23.99,
  "inventory_count": 50
}
```

#### POST `/store/add_product_inventory`
- Increase the product inventory_count by a given amount

Example POST Data Format:

```
{
  "title": "Awesome Crazy Toy",
  "add_amount": 10
}
```
