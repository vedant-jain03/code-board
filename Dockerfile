FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm i -f
CMD [ "npm", "start" ]
