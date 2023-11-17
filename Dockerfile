#Primera Etapa
FROM node:18-alpine as build-step
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
#Segunda Etapa y
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/pamper-ur-pet-app-front-end /usr/share/nginx/html

