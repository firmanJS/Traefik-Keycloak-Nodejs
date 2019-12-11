#### Setup Traefic,Keycloak Nodejs With Docker
```sh
docker-compose -f docker-compose.yml up --build -d
```

### Test in Browser 
- `keycloack web admin` keycloak.localhost
- `example user service` user-service.localhost
- `traefik web server` localhost:8080