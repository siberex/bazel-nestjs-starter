![Bazel at Scalio](https://raw.githubusercontent.com/scalio/bazel-status/master/assets/scalio-bn.svg?sanitize=true)

<h1 align="center">Bazel Nest Starter</h1>

<p align="center">
  A starter app written in Typescript for <a href="https://nestjs.com/">NestJS</a> -- built <b>using <a href="https://bazel.build/">Bazel</a></b>
</p>

&nbsp;
## Overview

This project was created by invoking the default Nest app scaffold via the Nest CLI, and then the addition of simple `BUILD.bazel` and `WORKSPACE` files, making use of [rules_nodejs](https://github.com/bazelbuild/rules_nodejs/#quickstart).

To create this from scratch in a new project, run the following:

```bash
nest new AppName
yarn create @bazel APP_NAME --packageManager=yarn --typescript
```

and now add the files `WORKSPACE` and `src/BUILD.bazel` to your new directory root and `src` folders, respectively.

## Build and run

With Bazel installed:

```bash
bazel run //src:server
```

Without Bazel installed:

```bash
yarn install -D
yarn bazel:run
```

## Docker

Build Docker image:

```bash
bazel build --platforms=@build_bazel_rules_nodejs//toolchains/node:linux_amd64 //src:docker
```

Push image to the registry (currently set to `gcr.io`):

```bash
bazel run --define push_tag=${IMAGE_TAG} --define push_repository=${REPOSITORY} //src:push_container
```

## Credits

Created by [@siberex](https://github.com/siberex/) @ [Scalio](https://scal.io/)


## About us
<p align="center">
    <br/>
    <a href="https://scal.io/">
        <img src="https://raw.githubusercontent.com/scalio/bazel-status/master/assets/scalio-logo.svg?sanitize=true" />
    </a>
    <br/>
</p>
