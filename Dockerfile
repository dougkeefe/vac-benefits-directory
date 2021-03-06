FROM node:alpine
MAINTAINER Max Neuvians <max.neuvians@tbs-sct.gc.ca>
LABEL Description="Government of Canada VAC Proof of Concept" Vendor="Canadian Digital Service"

WORKDIR /app
ADD . .

ARG CIRCLE_SHA1
ENV CIRCLE_SHA1 ${CIRCLE_SHA1}

ARG SENTRY_DSN
ENV SENTRY_DSN ${SENTRY_DSN}

ARG GA_UA
ENV GA_UA ${GA_UA}

ARG CIRCLE_REPOSITORY_URL
ENV CIRCLE_REPOSITORY_URL ${CIRCLE_REPOSITORY_URL}

ARG WEBHOOK_URL
ENV WEBHOOK_URL ${WEBHOOK_URL}

ARG CIRCLE_BRANCH
ENV CIRCLE_BRANCH ${CIRCLE_BRANCH}

ARG CIRCLE_PROJECT_REPONAME
ENV CIRCLE_PROJECT_REPONAME ${CIRCLE_PROJECT_REPONAME}

ARG AIRTABLE_WRITE_KEY
ENV AIRTABLE_WRITE_KEY ${AIRTABLE_WRITE_KEY}

ARG GOOGLE_MAPS_KEY
ENV GOOGLE_MAPS_KEY ${GOOGLE_MAPS_KEY}

RUN yarn install --ignore-engines && yarn build
USER node

EXPOSE 3000
CMD yarn start
