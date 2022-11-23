FROM node:lts

ARG DATABASE_URL

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /usr/src/app

COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

RUN echo $DATABASE_URL > .env

COPY . .

RUN npx prisma generate --schema ./prisma/schema.prisma

# RUN npx prisma migrate deploy

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]