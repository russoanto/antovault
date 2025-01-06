#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

	int uid = getuid();

	printf("UID reale del processo = %d\n", uid);
	exit(EXIT_SUCCESS);
}
