# Bazel workspace created by @bazel/create 0.31.1

# Declares that this directory is the root of a Bazel workspace.
# See https://docs.bazel.build/versions/master/build-ref.html#workspace
workspace(
    # How this workspace would be referenced with absolute labels from another workspace
    name = "bazel_nestjs_starter",
    # Map the @npm bazel workspace to the node_modules directory.
    # This lets Bazel use the same node_modules as other local tooling.
    managed_directories = {"@npm": ["node_modules"]},
)

# Install the nodejs "bootstrap" package
# This provides the basic tools for running and packaging nodejs programs in Bazel
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "3d7296d834208792fa3b2ded8ec04e75068e3de172fae79db217615bd75a6ff7",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/0.39.1/rules_nodejs-0.39.1.tar.gz"],
)

# Setup the Node.js toolchain
load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "yarn_install")

node_repositories(
    # https://github.com/bazelbuild/rules_nodejs/blob/master/internal/node/node_repositories.bzl
    node_repositories = {
        "12.13.0-darwin_amd64": ("node-v12.13.0-darwin-x64.tar.gz", "node-v12.13.0-darwin-x64", "49a7374670a111b033ce16611b20fd1aafd3296bbc662b184fe8fb26a29c22cc"),
        "12.13.0-linux_amd64": ("node-v12.13.0-linux-x64.tar.xz", "node-v12.13.0-linux-x64", "7a57ef2cb3036d7eacd50ae7ba07245a28336a93652641c065f747adb2a356d9"),
        "12.13.0-windows_amd64": ("node-v12.13.0-win-x64.zip", "node-v12.13.0-win-x64", "6f920cebeecb4957b4ef0def6d9b04c49d4582864f8d1a207ce8d0665865781a"),
    },
    node_urls = ["https://nodejs.org/dist/v{version}/{filename}"],
    node_version = "12.13.0",
    package_json = ["//:package.json"],
    yarn_repositories = {
        "1.19.1": ("yarn-v1.19.1.tar.gz", "yarn-v1.19.1", "34293da6266f2aae9690d59c2d764056053ff7eebc56b80b8df05010c3da9343"),
    },
    yarn_urls = ["https://github.com/yarnpkg/yarn/releases/download/v{version}/{filename}"],
    yarn_version = "1.19.1",
)

# The yarn_install rule runs yarn anytime the package.json or yarn.lock file changes.
# It also extracts and installs any Bazel rules distributed in an npm package.
yarn_install(
    # Name this npm so that Bazel Label references look like @npm//package
    name = "npm",
    # https://bazelbuild.github.io/rules_nodejs/npm_install/npm_install.html#npm_install.always_hide_bazel_files
    always_hide_bazel_files = True,
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

# Install any Bazel rules which were extracted earlier by the yarn_install rule.
load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")

install_bazel_dependencies()

# Set up TypeScript toolchain
load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")

ts_setup_workspace()

# Download the rules_docker repository
http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "14ac30773fdb393ddec90e158c9ec7ebb3f8a4fd533ec2abbfd8789ad81a284b",
    strip_prefix = "rules_docker-0.12.1",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.12.1/rules_docker-v0.12.1.tar.gz"],
)

load(
    "@io_bazel_rules_docker//repositories:repositories.bzl",
    container_repositories = "repositories",
)

container_repositories()

# Download base image for nodejs
load(
    "@io_bazel_rules_docker//nodejs:image.bzl",
    _nodejs_image_repos = "repositories",
)

_nodejs_image_repos()
