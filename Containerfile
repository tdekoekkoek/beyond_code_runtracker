FROM node:alpine AS build
WORKDIR /app
copy package*.json ./
RUN npm ci
copy . .
RUN npm run build


FROM node:alpine
WORKDIR /app
COPY --from=build /app/dist/runTracker/browser ./dist

EXPOSE 4200

CMS ["npx", "server" , "dist", "-p", "4200"]
