# VinylVault Record Store

VinylVault is an online store where users can browse and buy indie vinyl records. The website is built using React, Vite, and React Router.

Users can browse albums, filter them by genre, view album details, add albums to their shopping cart, change quantities, and complete checkout using a form.

## 1. Project Setup and How to Run

### Requirements

Before running the project, make sure you have these installed:

- **Node.js:** Version 22 or newer. Check with `node -v`.
- **npm:** Comes with Node.js. Check with `npm -v`.
- **Git:** Used to download the project from GitHub.

### Installation

Open Terminal and run these commands:

```bash
git clone https://github.com/Suhani6786/vinylvault-record-store.git
cd vinylvault-record-store
npm install
```

### Run the website

Start the development server by running:

```bash
npm run dev
```

Vite will show a local link, usually `http://localhost:5173/`. Open that link in your browser to see the website.

After opening the website, check that:

1. The catalog page displays all 8 albums.
2. The genre buttons (All, Jazz, Electronic, Rock, Classical) filter the albums correctly.
3. Clicking "Add to Cart" opens the cart drawer and updates the cart count in the header.

### Project Structure

`src/data/albums.js` holds the album data, and `src/main.jsx` starts the app inside `BrowserRouter`. `src/App.jsx` manages the shared cart state and the three routes. Reusable pieces (Navbar, CartDrawer, AlbumCard) are in `src/components/`, and the three pages (CatalogPage, AlbumDetailPage, CheckoutPage) are in `src/pages/`. Styling is in `src/styles.css`.

## 2. React Components and How Data Moves Between Them

### Component Structure

The component tree shows how the different parts of the website are connected. It also shows which component manages the data and which components receive that data.

```text
<BrowserRouter>                         // src/main.jsx
│
└── <App />                              // src/App.jsx
    │
    │   MAIN STATE (data managed by App):
    │
    │   cart [Array]
    │     Stores the albums added to the shopping cart.
    │     Each item also has a quantity.
    │
    │   isCartOpen [Boolean]
    │     Stores whether the cart drawer is open or closed.
    │
    │   DATA:
    │     ALBUMS [Array]
    │     Contains all the album information from albums.js.
    │
    │   cartCount [Number]
    │     Calculates the total number of items in the cart.
    │
    │   FUNCTIONS:
    │     handleAddToCart(album, qty)
    │       Adds an album to the cart or increases its quantity.
    │
    │     handleUpdateQuantity(id, change)
    │       Increases or decreases an album's quantity.
    │       Does not allow the quantity to go above available stock.
    │       Removes the item when its quantity reaches 0.
    │
    │     handleRemove(id)
    │       Removes one album from the cart.
    │
    │     handleClearCart()
    │       Removes everything from the cart.
    │
    │     handleToggleCart()
    │       Opens or closes the cart drawer.
    │
    ├── <Navbar />                         // components/Navbar.jsx
    │     State: None
    │     Props:
    │       cartCount [Number]
    │       onToggleCart() [Function]
    │
    │     Shows the website logo, Catalog link,
    │     and shopping cart button with the item count.
    │
    ├── <CartDrawer />                     // components/CartDrawer.jsx
    │     State: None
    │     Props:
    │       isOpen [Boolean]
    │       cart [Array]
    │       onClose() [Function]
    │       onUpdateQuantity(id, change) [Function]
    │       onRemove(id) [Function]
    │
    │     Shows the cart items, quantity buttons,
    │     remove buttons, and subtotal.
    │
    │     Uses useNavigate() to go to checkout.
    │     Shows nothing when the cart is closed.
    │
    └── <Routes>
        │
        ├── <Route path="/">
        │   └── <CatalogPage />            // pages/CatalogPage.jsx
        │         State:
        │           selectedGenre [String]
        │           Stores the currently selected genre.
        │
        │         Props:
        │           albums [Array]
        │           onAddToCart(album) [Function]
        │
        │         Shows the genre buttons and album grid.
        │         Filters albums based on the selected genre.
        │
        │         └── <AlbumCard />        // components/AlbumCard.jsx
        │               State: None
        │               Props:
        │                 album [Object]
        │                 onAddToCart(album) [Function]
        │
        │               Displays one album and links to its details page.
        │
        ├── <Route path="/album/:albumId">
        │   └── <AlbumDetailPage />        // pages/AlbumDetailPage.jsx
        │         State:
        │           qty [Number]
        │           Stores the quantity selected by the user.
        │
        │         Props:
        │           albums [Array]
        │           onAddToCart(album, qty) [Function]
        │
        │         Uses useParams() to get the album ID from the URL.
        │         Shows album details, tracklist, and quantity selection.
        │         Shows "Album Not Found" if the album does not exist.
        │
        └── <Route path="/checkout">
            └── <CheckoutPage />            // pages/CheckoutPage.jsx
                  State:
                    formData [Object]
                      Stores the user's checkout information:
                      fullName, address, city, postalCode, cardNumber.

                    isSubmitted [Boolean]
                      Tracks whether the form was submitted.

                    error [String]
                      Stores any validation error message.

                  Props:
                    cart [Array]
                    onClearCart() [Function]

                  Functions:
                    handleChange(e)
                      Updates the form values when the user types.

                    handleSubmit(e)
                      Handles form submission and validation.

                  Shows the checkout form, order summary,
                  order confirmation, or empty-cart message.
```

### Route Mapping

React Router allows users to move between different pages without creating a separate HTML page for each one.

| URL | Component | What it displays |
|---|---|---|
| `/` | CatalogPage | Shows all albums and genre filters. |
| `/album/:albumId` | AlbumDetailPage | Shows details for the selected album. |
| `/checkout` | CheckoutPage | Shows the checkout form and order summary. |

### How State and Data Work

**1. Shared State**

The `cart` and `isCartOpen` states are stored in the main `App` component.

They are kept in `App` because different parts of the website need this information. For example, the Navbar needs to show the cart count, and the CartDrawer needs to show the albums in the cart.

**2. Props: Passing Data Between Components**

Props allow one component to send information or functions to another component.

For example:
- `App` sends the cart count to `Navbar`.
- `App` sends cart information and button functions to `CartDrawer`.
- `App` sends the album list and add-to-cart function to `CatalogPage` and `AlbumDetailPage`.
- `App` sends the cart and clear-cart function to `CheckoutPage`.

This allows child components to use the information and call functions without directly changing the state inside `App`.

**3. Updating the Cart**

When users add, remove, or update albums, the code uses React's `setCart()` function.

It uses methods such as `.map()`, `.filter()`, and the spread operator (`...`) to create updated copies of the cart instead of changing the original array directly. This is how the project avoids directly modifying React state.

**4. Local State**

Some information is only needed on one page, so it stays inside that page's component.

For example:
- `selectedGenre` keeps track of the selected genre on the catalog page.
- `qty` stores the selected album quantity on the detail page.
- `formData`, `isSubmitted`, and `error` manage the checkout form.

**5. Checkout Process**

The checkout process works like this:

1. The user opens the cart drawer and clicks "Proceed to Checkout."
2. The drawer closes and `useNavigate()` takes the user to `/checkout`.
3. The user fills in the checkout form.
4. `handleSubmit()` checks the form values.
5. If the form is valid, the order confirmation is displayed.
6. `onClearCart()` empties the shopping cart, and the cart count in the header updates.

This keeps the cart information in one place while allowing the different pages and components to use it.
