FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run check


FROM nginx:1.28-alpine

COPY deploy/nginx-container.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/docs/.vitepress/dist/ /usr/share/nginx/html/docs/

EXPOSE 80