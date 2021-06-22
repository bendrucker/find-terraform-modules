# Find Terraform Modules Action [![build-test](https://github.com/bendrucker/find-terraform-modules/actions/workflows/test.yml/badge.svg)](https://github.com/bendrucker/find-terraform-modules/actions/workflows/test.yml)

A GitHub Action that finds all Terraform module directories in a monorepo. Results can be passed to matrix jobs or looped in other steps.

## Usage

```yaml
name: Validate
on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  find-modules:
    runs-on: ubuntu-latest
    steps:
      - id: find
        uses: bendrucker/find-terraform-modules@v1
        with:
          working-directory: ./modules
    outputs:
      modules: ${{ steps.find.outputs.modules }}
  validate:
    runs-on: ubuntu-latest
    needs: find-modules
    strategy:
      matrix:
        module: ${{ fromJson(needs.find-modules.outputs.modules) }}
    steps:
      - uses: actions/checkout@v2
      - uses: hashicorp/setup-terraform@v1
      - run: terraform fmt -check
      - run: terraform init
      - run: terraform validate -chdir ${{ matrix.module }}
```

## Releasing

```sh
npm version $inc && git push --follow-tags
```