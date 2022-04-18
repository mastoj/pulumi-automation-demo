.SILENT: ;
.DEFAULT_GOAL := help

GIT_SHA:=$(shell git rev-parse --short HEAD)

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

hello: ## Hello make file
	echo hello

install: ## Install app application
	yarn install

build: install ## Build app application
	yarn run build

start: install ## Start app
	yarn run start

watch: install ## Start app in watch mode
	yarn run dev
