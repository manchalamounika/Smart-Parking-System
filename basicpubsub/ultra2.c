
// gcc -Wall -pthread -o ultrasonic_distance ultrasonic_distance.c -lpigpio


#include </usr/include/python2.7/Python.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include <pigpio.h>



#define TRIG 18

#define ECHO  24



int main(int argc, char *argv[]) {

    double start, stop, measure;
    char filename[100];
    
    //char * script = filename;
    //system(script);	
    if (gpioInitialise() < 0) {

        fprintf(stderr, "pigpio initialisation failed\n");

        return 1;

    }


    /* Set GPIO modes */

    gpioSetMode(TRIG , PI_OUTPUT);  // trigger

    gpioSetMode(ECHO , PI_INPUT);  // echo

    fprintf(stdout, "Set GPIO modes\n");


    while(1) {
    filename[0] ='\0';
    strcpy(filename, "./pubsubtrigger.sh");	
    strcat(filename, " 9431");
    char * script = filename;
    //sending a trigger wave for 10 us
        gpioWrite(TRIG, 1);

        gpioSleep(PI_TIME_RELATIVE, 0, 10); // sleep for 10us seconds

        gpioWrite(TRIG, 0);

    //the sensor sends the sonic waves and start the time
        while (gpioRead(ECHO) == 0)

    	start = time_time();
    //the sensor stops reading when the wave returns
        while (gpioRead(ECHO) == 1)

            stop = time_time();

    //speed of sound = 343m/s = 34300cm/s
    //distance  = speed * time

        measure = (stop-start) *17150.0;



        fprintf(stdout, "Measure: %lf\n", measure);
	if(measure<=15) {
	  printf("entered parking befro %s",filename);

	  strcat(filename, " no");
	 printf("entered parking after %s",filename);
	  system(script);
	}
	else {
	  printf("moved away parking  %s", filename);
	  strcat(filename, " yes");
printf("moved away parking %s",filename);
	  system(script);
	}
    	gpioSleep(PI_TIME_RELATIVE,1,50000);
    }
    //while(measure >= 15);


    /* Stop, release resources */
    printf("TOO CLOSE\n");
    return 0;

}
