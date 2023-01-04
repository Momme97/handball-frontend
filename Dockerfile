## Use Node Slim image
FROM node:16-slim

## Copy source code
COPY . .

## Start the application
CMD ["node", "dist/handball-frontend/server/main.js"]