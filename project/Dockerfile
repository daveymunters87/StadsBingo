# 1. Base image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install deps
COPY package.json package-lock.json ./
RUN npm install

# 4. Copy rest of project
COPY . .

# 5. Generate Prisma client
RUN npx prisma generate

# 6. Expose port
EXPOSE 3000

# 7. Start dev server
CMD ["npm", "run", "dev"]
