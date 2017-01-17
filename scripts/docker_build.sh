#!/bin/bash

set -ev

echo "TRAVIS_EVENT_TYPE ${TRAVIS_EVENT_TYPE}"
echo "TRAVIS_PULL_REQUEST ${TRAVIS_PULL_REQUEST}"

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]
then
  echo docker build -t apinf/platform:$DOCKER_TAG .
  echo docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
  echo docker push apinf/platform:$DOCKER_TAG
else
  echo "From a PULL REQUEST - what would be best"
  echo "docker push mauriciovieira/platform:${TRAVIS_PULL_REQUEST_BRANCH} TRAVIS_PULL_REQUEST_BRANCH"
  echo "docker push mauriciovieira/platform:${TRAVIS_PULL_REQUEST_SHA} TRAVIS_PULL_REQUEST_SHA"
fi

  echo "docker push mauriciovieira/platform:${TRAVIS_BRANCH} TRAVIS_BRANCH"
  echo "docker push mauriciovieira/platform:${TRAVIS_BUILD_ID} TRAVIS_BUILD_ID"
  echo "docker push mauriciovieira/platform:${TRAVIS_BUILD_NUMBER} TRAVIS_BUILD_NUMBER"
