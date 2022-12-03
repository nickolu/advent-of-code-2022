ROOT_DIR := $(shell pwd)

# Use `make print-make-phonies` to generate this list
.PHONY: run-advent-day \

ifeq ($(day),)
$(error No day specified.)
endif

# Use this to generate the .PHONY list
print-make-phonies:
	@grep -E '^[a-z0-9\-]+:' Makefile | cut -d : -f 1 | sort

run-advent-day:
	yarn run-day src/day-$(day)/index.ts
