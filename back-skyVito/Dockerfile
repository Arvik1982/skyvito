# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18 as build-stage

WORKDIR /app/

COPY package*.json /app/

RUN npm install

COPY . /app/

ENV REACT_APP_FRONTEND_ENV=PRODUCTION

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
# CMD ["nginx"]


COPY --from=build-stage /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf
