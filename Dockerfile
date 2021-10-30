# Stage 1
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs14:14.17.6 AS builder

USER root

WORKDIR /app

COPY . .

RUN npm run build

USER node

# Stage 2
FROM registry1.dso.mil/ironbank/opensource/nginx/nginx:1.21.1

# USER 0

COPY --from=builder --chown=appuser:appuser /app/build /var/www

# USER appuser

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]
