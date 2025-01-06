#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

	int egid = getegid();

	printf("GID effettivo del processo = %d\n", egid);
	exit(0);
}
