FROM node:18-alpine

WORKDIR /app

COPY . .

EXPOSE 80

CMD ["node", "launcher_v2.js"]