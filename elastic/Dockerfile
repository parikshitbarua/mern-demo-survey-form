ARG STACK_VERSION=9.0.0

FROM docker.elastic.co/logstash/logstash:${STACK_VERSION}


RUN logstash-plugin install logstash-input-mongodb
