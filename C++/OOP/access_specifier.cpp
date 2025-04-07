#include<iostream>
using namespace std;

class parent{  
    //access specifier
    public:
        int x;

    protected:
        int y;

    private:
         int z;
};

class child1: public parent{
    //x will remain public
    //y will remain protected
    //z will not be accessible
};

class child2: private parent{
    //x will remain private
    //y will remain private
    //z will not be accessible
};

class child3: protected parent{
    //x will remain protected
    //y will remain protected
    //z will not be accessible
};


int main(){
    parent p;
    p.x;
}