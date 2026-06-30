    #Build the React app 
    FROM node:20-alpine AS build

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    
    # Accept the API URL as a build-time argument
    ARG VITE_API_URL
    ENV VITE_API_URL=$VITE_API_URL
    
    RUN npm run build
    
    #Serve the built files with Nginx
    FROM nginx:alpine
    
    COPY --from=build /app/dist /usr/share/nginx/html
    
    EXPOSE 80