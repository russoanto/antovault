#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

	int euid = geteuid();

	printf("UID effettivo del processo = %d\n", euid);
	exit(0);
}
