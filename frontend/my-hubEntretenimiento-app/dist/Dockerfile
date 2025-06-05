FROM node:20.19-bookworm AS builder
WORKDIR /app
COPY .. /app
RUN npm install && npm run build 

# Server
FROM nginx:stable
COPY --from=builder /app/dist/my-hubEntretenimiento-app /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx","-g","daemon off;"]