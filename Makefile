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
	yarn tsc src/day-$(day).ts --outfile compiled/day-$(day).js
	node compiled/day-$(day).js
