# Nest Bazel example

Example of [Bazel](https://bazel.build/) build configuration for [NestJS](https://nestjs.com/) app.

# Introduction

Basically, this is a scaffold of Nest app merged with scaffold of [rules_nodejs](https://github.com/bazelbuild/rules_nodejs/#quickstart):

    nest new AppName
    
\+

    yarn create @bazel APP_NAME --packageManager=yarn --typescript 

\+ added `src/BUILD.bazel`


# Build and run

    bazel run //src:server
