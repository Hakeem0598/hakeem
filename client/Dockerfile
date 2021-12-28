FROM node:14-alpine as build-stage

RUN mkdir -p /home/node/app && chown node:node -R /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
ARG REACT_APP_STRIPE_PUBLISHABLE_KEY
ENV REACT_APP_STRIPE_PUBLISHABLE_KEY=$REACT_APP_STRIPE_PUBLISHABLE_KEY
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

FROM caddy:alpine

ARG CADDYFILE
COPY ./caddy/${CADDYFILE} /etc/caddy/Caddyfile
COPY --from=build-stage /home/node/app/build /srv
EXPOSE 80
EXPOSE 443