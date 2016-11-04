FROM mhart/alpine-node:6
# FROM node:latest

#copy package first to cache npm-install and speed up build
COPY server server
COPY build www

WORKDIR server
RUN npm --quiet --no-color install

EXPOSE 8081

CMD ["npm", "start"]
