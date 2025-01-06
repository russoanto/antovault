#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

	int gid = getuid();

	printf("GID reale del processo = %d\n", gid);
	exit(EXIT_SUCCESS);
}
