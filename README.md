# Starting with product-cart backend

#### Live website Link: https://task-management-frontend-6cqf.vercel.app/

#### backend Host URL: https://product-cart-backend-rose.vercel.app/

### Feature of Task management application

- User can register / Login account after login user can see his own previous added roduct he can add new products with update delete functionality.

### API documentation

#### Auth / User api

- /api/v1/auth/register (POST) ====> user registration api endpoint with jwt authentication.
- /api/v1/auth/signin (POST) ====> user sign api endpoint with jwt authentication.
- /api/v1/auth/refresh-token (POST) ====> to get new access token by refresh token api.

#### Products Api

- /api/v1/products (POST) ====> add task api endpoint.

- /api/v1/products?searchTerm=title&category (get) ====> get products api endpoint with search query parameter. user can search by title or category.

- /api/v1/products/:id (get) ====> get single product api endpoint.

#### AddToCart Api

- /api/v1/carts (POST) ====> add product to cart api endpoint.

- /api/v1/carts (get) ====> get all added cart products api endpoint.

- /api/v1/carts/:id (get) ====> get single add to cart product api endpoint.
- /api/v1/carts/:id (update) ====> update single add to cart product api endpoint.
- /api/v1/carts/:id (delete) ====> delete single add to cart product api endpoint.

### Technology

- TypeScript
- Node JS
- Express JS
- Jsonwebtoken
- Mongodb
- Prisma
- Zod
