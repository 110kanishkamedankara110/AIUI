# Use the official Nginx image as the base
FROM nginx:latest

# Copy the custom Nginx configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080
EXPOSE 8484

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
