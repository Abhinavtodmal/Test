
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# We build the project with Node.js — install, build, done.
# We throw away the unnecessary stuff (like Node.js).
# We only keep the final, built static files.
# We use NGINX to serve those files — lightweight, production-ready.


#---------------------------------------------------------------------#

# Imagine NGINX as:

# ✔ A super-efficient waiter that quickly serves pre-cooked food (your static files) to customers (the users).
# ✔ Node.js helped cook the food (build the app), but you don't need the entire kitchen when serving at the table — just the efficient waiter.