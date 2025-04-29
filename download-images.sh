#!/bin/bash

# Create the images directory if it doesn't exist
mkdir -p public/images

# Download city images from Unsplash
curl https://images.unsplash.com/photo-1509356843151-3e7d96241e11 -o public/images/stockholm.jpg
curl https://images.unsplash.com/photo-1560525942-fca0ea0acade -o public/images/oslo.jpg
curl https://images.unsplash.com/photo-1557261651-a6beab93541f -o public/images/helsinki.jpg
curl https://images.unsplash.com/photo-1513622470522-26c3c8a854bc -o public/images/copenhagen.jpg
curl https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b -o public/images/berlin.jpg
# Download a placeholder for the logo
curl https://via.placeholder.com/200x50.png?text=Nordnet -o public/images/nordnet-logo.png

echo "Images downloaded successfully!"