FROM node:18-alpine
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install
COPY . /app
EXPOSE 8080
CMD [ "npm", "run", "dev" ]