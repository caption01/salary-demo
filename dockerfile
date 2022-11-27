FROM node:lts

ARG DATABASE_URL
ARG APP_PORT
ARG APP_SECRET

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /usr/src/app

COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

RUN echo $DATABASE_URL >> .env
RUN echo $APP_PORT >> .env
RUN echo $APP_SECRET >> .env

COPY . .

RUN npx prisma generate --schema ./prisma/schema.prisma

# RUN npx prisma migrate deploy

EXPOSE 3000

CMD [ "npm", "run", "dev" ]