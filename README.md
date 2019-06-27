# Nest Bazel example

Example of [Bazel](https://bazel.build/) build configuration for [NestJS](https://nestjs.com/) app.

# Introduction

Basically, this is a scaffold of Nest app merged with scaffold of [rules_nodejs](https://github.com/bazelbuild/rules_nodejs/#quickstart):

    nest new AppName
    
\+

    yarn create @bazel APP_NAME --packageManager=yarn --typescript 

\+ added `src/BUILD.bazel`


# Build and run

With Bazel installed:

    bazel run //src:server

Without Bazel installed:

    yarn install -D
    yarn bazel:run


# Docker

Build Docker image:

    bazel build //src:docker

Push image to the registry (currently set to `gcr.io`):

    bazel run --define push_tag=${IMAGE_TAG} --define push_repository=${REPOSITORY} //src:push_container
