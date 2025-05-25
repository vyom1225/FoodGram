FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies with peer dependency builds
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"] 