FROM kong/kong-gateway:latest

#Ensure any patching steps are executed as root user
USER root

ENV KONG_PLUGINS=bundled

EXPOSE 8000 8443 8001 8444

STOPSIGNAL SIGQUIT

HEALTHCHECK --interval=10s --timeout=10s --retries=10 CMD kong health