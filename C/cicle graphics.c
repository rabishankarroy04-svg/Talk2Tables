#include<graphics.h>
#include<conio.h>

void main()
{
	int gd=DETECT , gm;
	initgraph(&gd,&gm,"C:\Turbo\TC\BGI");
	
	circle(350,250,100);
	
	getch();
	closegraph();
}
