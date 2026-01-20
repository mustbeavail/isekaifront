FROM node:20-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextuser -u 1001
COPY package*.json ./
RUN npm install
COPY --chown=nextuser:nodejs . .
RUN npm run build
USER nextuser
EXPOSE 3000
CMD ["npm", "start"]