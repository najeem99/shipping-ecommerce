const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample data (JSON)
let users = [
  {
    user: {
      id: 1,
      name: "Mirza",
      phoneNumber: "+971562738467",
      email: "test@test.com",
      currency: "AED",
      language: "en",
      image: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
      address: [
        {
          id: 1,
          city: "Dubai",
          country: "UAE",
          area: "Barsha",
          building: "Al wasl 203",
          landmark: "Near mall of the emirates",
          isDefault: true
        },
        {
          id: 2,
          city: "Sharjah",
          country: "UAE",
          area: "Barsha",
          building: "Al wasl 203",
          landmark: "Near mall of the emirates",
          isDefault: false
        },
        {
          id: 3,
          city: "Ajman",
          country: "UAE",
          area: "Barsha",
          building: "Al wasl 203",
          landmark: "Near mall of the emirates",
          isDefault: false
        },
        {
          id: 4,
          city: "India",
          country: "India",
          area: "India",
          building: "yes store,karama",
          landmark: "Near mall of the taj mahal",
          isDefault: false
        },
      ],
      password: "12345",
      orders: [
        {
          id: "order-1",  // Unique ID for the first order
          products: [
            { productId: "1" },
            { productId: "2" }
          ],
          deliveryAddress: "1",
          paymentMethod: {
            type: "COD",
            currency: "AED"
          },
          baseAmount: "120.00",
          taxAmount: "6.75",
          totalAmount: "126.75",
          currency: "AED"
        },
        {
          id: "order-2",  // Unique ID for the second order
          products: [
            { productId: "2" }
          ],
          deliveryAddress: "2",
          paymentMethod: {
            type: "Credit Card",
            currency: "AED"
          },
          baseAmount: "250.00",
          taxAmount: "12.50",
          totalAmount: "262.50",
          currency: "AED"
        }
      ],
      cartItems: [
        {
          "createdAt": "2024-10-06T14:41:55.691Z",
          "department": "Computers",
          "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
          "id": "6",
          "inCart": false,
          "name": "Ergonomic Steel Chips",
          "price": "213.00",
          "productImage": "https://loremflickr.com/640/480/fashion",
          "quantityInStock": 53259
        },
        {
          "createdAt": "2024-10-06T16:36:14.600Z",
          "department": "Kids",
          "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
          "id": "7",
          "inCart": false,
          "name": "Awesome Fresh Sausages",
          "price": "257.00",
          "productImage": "https://loremflickr.com/640/480/nightlife",
          "quantityInStock": 45263
        },
        {
          "createdAt": "2024-10-06T07:58:41.126Z",
          "department": "Tools",
          "description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
          "id": "1",
          "inCart": true,
          "name": "Handcrafted Rubber Sausages",
          "price": "65.00",
          "productImage": "https://loremflickr.com/640/480/business",
          "quantityInStock": 60157
        },

      ]
    }
  }
];
// Counter for user IDs
let userIdCounter = users.length > 0 ? Math.max(...users.map(u => u.user.id)) : 0;


// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.user.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// POST (create new user)
app.post('/users', (req, res) => {
  const newUser = req.body;
  userIdCounter += 1; // Increment the user ID counter
  newUser.user.id = userIdCounter; // Assign the new user ID
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT (update user by ID)
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.user.id === userId);

  if (userIndex !== -1) {
    users[userIndex].user = { ...users[userIndex].user, ...req.body };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE (delete user by ID)
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.user.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: `User with id ${userId} deleted` });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// PATCH (update only specific field of user by ID)
app.patch('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.user.id === userId);

  if (user) {
    Object.assign(user.user, req.body);
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// CHILD RESOURCES: GET, POST, PUT, DELETE for address, orders, cartItems

// GET address for user
app.get('/users/:id/address', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.user.id === userId);

  if (user) {
    res.json(user.user.address);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// POST new address for user
app.post('/users/:id/address', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.user.id === userId);

  if (user) {
    // Generate a new sequential ID for the address
    const newAddressId = user.user.address.length > 0 
      ? Math.max(...user.user.address.map(addr => addr.id)) + 1 
      : 1; // Start with 1 if no addresses exist

    const newAddress = {
      ...req.body,
      id: newAddressId, // Assign the new sequential ID
    };

    if (req.body.isDefault) {
      // Set all other addresses' isDefault to false
      user.user.address.forEach(addr => addr.isDefault = false);
    }

    user.user.address.push(newAddress);
    res.status(201).json(newAddress); // Return the newly created address
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// PUT (update address by ID)
app.put('/users/:id/address/:addressId', (req, res) => {
  console.log('/users/:id/address/:addressId',req.body)
  const userId = parseInt(req.params.id);
  const addressId = parseInt(req.params.addressId);
  const user = users.find(u => u.user.id === userId);

  if (user) {
    const addressIndex = user.user.address.findIndex(addr => addr.id === addressId);

    if (addressIndex !== -1) {
      if (req.body.isDefault) {
        // Set all other addresses' isDefault to false
        user.user.address.forEach(addr => addr.isDefault = false);
      }
      user.user.address[addressIndex] = { ...user.user.address[addressIndex], ...req.body };
      res.json(user.user.address[addressIndex]);
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE address by ID
app.delete('/users/:id/address/:addressId', (req, res) => {
  const userId = parseInt(req.params.id);
  const addressId = parseInt(req.params.addressId);
  const user = users.find(u => u.user.id === userId);

  if (user) {
    const addressIndex = user.user.address.findIndex(addr => addr.id === addressId);

    if (addressIndex !== -1) {
      const deletedAddress = user.user.address.splice(addressIndex, 1)[0];

      // If the deleted address was the default, make the first address default
      if (deletedAddress.isDefault && user.user.address.length > 0) {
        user.user.address[0].isDefault = true;
      }

      res.json({ message: `Address with id ${addressId} deleted` });
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// GET cart items for user
app.get('/users/:id/cartItems', (req, res) => {
  console.log('/users/:id/cartItems')
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.user.id === userId);

  if (user) {
    res.json(user.user.cartItems);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// POST item to cart for user
app.post('/users/:id/cartItems', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.user.id === userId);

  if (user) {
    user.user.cartItems.push(req.body);
    res.status(201).json(req.body);
    console.log('added to cart ',req.body)

  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// PUT (update cart item by ID)
app.put('/users/:id/cartItems/:itemId', (req, res) => {
  const userId = parseInt(req.params.id);
  const itemId = req.params.itemId;
  const user = users.find(u => u.user.id === userId);

  if (user) {
    const cartItemIndex = user.user.cartItems.findIndex(item => item.productId === itemId);

    if (cartItemIndex !== -1) {
      user.user.cartItems[cartItemIndex] = { ...user.user.cartItems[cartItemIndex], ...req.body };
      res.json(user.user.cartItems[cartItemIndex]);
      console.log('added to cart ',req.body)
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE item from cart
app.delete('/users/:id/cartItems/:itemId', (req, res) => {
  const userId = parseInt(req.params.id);
  const itemId = req.params.itemId;
  const user = users.find(u => u.user.id === userId);
  if (user) {

    const cartItemIndex = user.user.cartItems.findIndex(item => {
      return (item.id.toString() == itemId.toString())
    });
    if (cartItemIndex !== -1) {
      user.user.cartItems.splice(cartItemIndex, 1);
      res.json({ message: `Cart item with id ${itemId} removed` });
      console.log(`Cart item with id ${itemId} removed`)

    } else {
      console.log(`cart item not found ${itemId}`)
      res.status(404).json({ message: "Cart item not found" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE all items from cart
app.delete('/users/:id/cartItems', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.user.id === userId);

  if (user) {
      // Clear all cart items
      user.user.cartItems = [];
      res.json({ message: "All cart items removed" });
      console.log(`All cart items removed for user with id ${userId}`);
  } else {
      res.status(404).json({ message: "User not found" });
  }
});


// GET orders for user
app.get('/users/:id/orders', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.user.id === userId);

  if (user) {
    console.log(`Fetching orders for user with id ${userId}`);
    res.json(user.user.orders);
  } else {
    console.error(`User with id ${userId} not found`);
    res.status(404).json({ message: "User not found" });
  }
});

// POST new order for user
app.post('/users/:id/orders', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.user.id === userId);

  if (user) {
    const newOrder = req.body;
    user.user.orders.push(newOrder);
    console.log(`New order added for user with id ${userId}`);
    res.status(201).json(newOrder);
  } else {
    console.error(`User with id ${userId} not found`);
    res.status(404).json({ message: "User not found" });
  }
});

// PUT (update an order or its products by ID for user)
app.put('/users/:id/orders/:orderId', (req, res) => {
  const userId = parseInt(req.params.id);
  const orderId = req.params.orderId;
  const user = users.find(u => u.user.id === userId);

  if (user) {
    // Find the order by orderId
    const orderIndex = user.user.orders.findIndex(order =>
      order.products.some(product => product.productId === orderId)
    );

    if (orderIndex !== -1) {
      // Update the entire order or a specific product within it
      user.user.orders[orderIndex] = { ...user.user.orders[orderIndex], ...req.body };

      console.log(`Order with productId ${orderId} updated for user ${userId}`);
      res.json(user.user.orders[orderIndex]);
    } else {
      console.error(`Order with productId ${orderId} not found for user ${userId}`);
      res.status(404).json({ message: "Order not found" });
    }
  } else {
    console.error(`User with id ${userId} not found`);
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE a product from an order by productId for user
app.delete('/users/:id/orders/:orderId', (req, res) => {
  const userId = parseInt(req.params.id);
  const productId = req.params.orderId;  // Using `orderId` as `productId` here
  const user = users.find(u => u.user.id === userId);

  if (user) {
    // Find the order containing the product
    const orderIndex = user.user.orders.findIndex(order =>
      order.products.some(product => product.productId === productId)
    );

    if (orderIndex !== -1) {
      // Remove the product from the order's products array
      const productIndex = user.user.orders[orderIndex].products.findIndex(product =>
        product.productId === productId
      );

      if (productIndex !== -1) {
        user.user.orders[orderIndex].products.splice(productIndex, 1);

        console.log(`Product with id ${productId} deleted from order for user ${userId}`);
        res.json({ message: `Product with id ${productId} deleted` });
      } else {
        res.status(404).json({ message: "Product not found in order" });
      }
    } else {
      console.error(`Order with productId ${productId} not found for user ${userId}`);
      res.status(404).json({ message: "Order not found" });
    }
  } else {
    console.error(`User with id ${userId} not found`);
    res.status(404).json({ message: "User not found" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
