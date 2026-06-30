FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 8000

# Command to run when the container starts
CMD ["node", "index.js"]