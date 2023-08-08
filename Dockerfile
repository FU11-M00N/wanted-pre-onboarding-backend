FROM node:18

LABEL Description="This is nodejs Container"

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install
RUN npm install pm2 -g

COPY . .

CMD ["pm2-runtime", "start", "ecosystem.config.js", "—env", "production"]

EXPOSE 3001

