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
    sha256 = "da217044d24abd16667324626a33581f3eaccabf80985b2688d6a08ed2f864be",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/0.37.1/rules_nodejs-0.37.1.tar.gz"],
)

# Setup the Node.js toolchain
load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories", "yarn_install")

node_repositories(
    # https://github.com/bazelbuild/rules_nodejs/blob/master/internal/node/node_repositories.bzl
    node_repositories = {
        "12.10.0-darwin_amd64": ("node-v12.10.0-darwin-x64.tar.gz", "node-v12.10.0-darwin-x64", "4c16d1f6454f5dc3977ad00cea123792b8d4e1d6d1bf42bbc82a4202039a5971"),
        "12.10.0-linux_amd64": ("node-v12.10.0-linux-x64.tar.xz", "node-v12.10.0-linux-x64", "e8d2e6b62dd8183dc59a139a9ca3edc7c419a0d3d92e90fea9cb0ad52489843a"),
        "12.10.0-windows_amd64": ("node-v12.10.0-win-x64.zip", "node-v12.10.0-win-x64", "de341476711c71f82d06fabcc9874c1ff9e865fd7274334d64a67b1e31a53fd0"),
    },
    node_urls = ["https://nodejs.org/dist/v{version}/{filename}"],
    node_version = "12.10.0",
    package_json = ["//:package.json"],
    yarn_repositories = {
        "1.17.3": ("yarn-v1.17.3.tar.gz", "yarn-v1.17.3", "e3835194409f1b3afa1c62ca82f561f1c29d26580c9e220c36866317e043c6f3"),
    },
    yarn_urls = ["https://github.com/yarnpkg/yarn/releases/download/v{version}/{filename}"],
    yarn_version = "1.17.3",
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
    sha256 = "9ff889216e28c918811b77999257d4ac001c26c1f7c7fb17a79bc28abf74182e",
    strip_prefix = "rules_docker-0.10.1",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.10.1/rules_docker-v0.10.1.tar.gz"],
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
