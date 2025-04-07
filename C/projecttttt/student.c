#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Student {
    char name[50];
    char email[50];
    char phone[15];
    char university[50];
    char universityID[20];
    char dept[50];
    float ygpa;
    int totalMarks;
} student; 


student* createStudent() {
    return (student*)malloc(sizeof(student));
}


void addStudent() {
    student* newStudent = createStudent();
    FILE* file = fopen("students.txt", "r");
    int isDuplicate = 0;

    printf("\nEnter Name: ");
    scanf(" %[^\n]", newStudent->name);
    printf("Enter Email ID: ");
    scanf(" %[^\n]", newStudent->email);
    printf("Enter Phone Number: ");
    scanf(" %[^\n]", newStudent->phone);
    printf("Enter University Name: ");
    scanf(" %[^\n]", newStudent->university);

    do {
        printf("Enter University ID: ");
        scanf(" %[^\n]", newStudent->universityID);

        isDuplicate = 0; 
        if (file != NULL) {
            student* currentStudent = createStudent();
            while (fread(currentStudent, sizeof(student), 1, file)) {
                if (strcmp(currentStudent->universityID, newStudent->universityID) == 0) {
                    printf("University ID '%s' already exists. Please enter a different University ID.\n", newStudent->universityID);
                    isDuplicate = 1;
                    break;
                }
            }
            fclose(file);
        }

        if (isDuplicate) {
            file = fopen("students.txt", "r");  
        }

    } while (isDuplicate);

    printf("Enter Department: ");
    scanf(" %[^\n]", newStudent->dept);
    printf("Enter YGPA: ");
    scanf("%f", &newStudent->ygpa);
    printf("Enter Total Marks: ");
    scanf("%d", &newStudent->totalMarks);

    file = fopen("students.txt", "a");
    if (file == NULL) {
        printf("Error opening students file.\n");
        free(newStudent);
        return;
    }
    fwrite(newStudent, sizeof(student), 1, file);
    fclose(file);

    char filename[50];
    snprintf(filename, sizeof(filename), "%s_%s.txt", newStudent->name, newStudent->universityID);
    FILE* studentFile = fopen(filename, "w");
    if (studentFile == NULL) {
        printf("Error creating student file.\n");
        free(newStudent);
        return;
    }

    fprintf(studentFile, "Name: %s\n", newStudent->name);
    fprintf(studentFile, "Email: %s\n", newStudent->email);
    fprintf(studentFile, "Phone: %s\n", newStudent->phone);
    fprintf(studentFile, "University: %s\n", newStudent->university);
    fprintf(studentFile, "University ID: %s\n", newStudent->universityID);
    fprintf(studentFile, "Department: %s\n", newStudent->dept);
    fprintf(studentFile, "YGPA: %.2f\n", newStudent->ygpa);
    fprintf(studentFile, "Total Marks: %d\n", newStudent->totalMarks);
    fclose(studentFile);
    free(newStudent);

    printf("\nStudent added successfully! File created: %s\n", filename);
}


void displayStudents() {
    student* currentStudent = createStudent();
    FILE* file = fopen("students.txt", "r");
    if (file == NULL) {
        printf("\nNo students found.\n");
        free(currentStudent);
        return;
    }


    printf("\nList of Students:\n");
    printf("-------------------------------------------------------------------------------------------------------------------------------------\n");
    printf("| %-20s | %-20s | %-15s | %-13s | %-15s | %-7s | %-6s | %-12s |\n", 
           "Name", "Email", "Phone", "University", "University ID", "Dept", "YGPA", "Total Marks");
    printf("-------------------------------------------------------------------------------------------------------------------------------------\n");
    

    while (fread(currentStudent, sizeof(student), 1, file)) {
        printf("| %-20s | %-20s | %-15s | %-13s | %-15s | %-7s | %-6.2f | %-12d |\n",
               currentStudent->name,
               currentStudent->email,
               currentStudent->phone,
               currentStudent->university,
               currentStudent->universityID,
               currentStudent->dept,
               currentStudent->ygpa,
               currentStudent->totalMarks);
    }

    printf("-------------------------------------------------------------------------------------------------------------------------------------\n");
    fclose(file);
    free(currentStudent);
}


void searchStudent() {
    char searchName[50], searchUniversityID[20];
    student* currentStudent = createStudent();
    int found = 0;

    printf("\nEnter the Name of the student to search: ");
    scanf(" %[^\n]", searchName);

    printf("Enter the University ID of the student to search: ");
    scanf(" %[^\n]", searchUniversityID);

    FILE* file = fopen("students.txt", "r");
    if (file == NULL) {
        printf("\nNo students found.\n");
        free(currentStudent);
        return;
    }

    while (fread(currentStudent, sizeof(student), 1, file)) {
        if (strcmp(currentStudent->name, searchName) == 0 && strcmp(currentStudent->universityID, searchUniversityID) == 0) {
            printf("\nStudent Found:\n");
            printf("Name: %s\nEmail: %s\nPhone: %s\nUniversity: %s\nUniversity ID: %s\nDepartment: %s\nYGPA: %.2f\nTotal Marks: %d\n",
                   currentStudent->name, currentStudent->email, currentStudent->phone, currentStudent->university,
                   currentStudent->universityID, currentStudent->dept, currentStudent->ygpa, currentStudent->totalMarks);
            found = 1;
            break;
        }
    }

    if (!found) {
        printf("\nStudent with name '%s' and university ID '%s' not found.\n", searchName, searchUniversityID);
    }

    fclose(file);
    free(currentStudent);
}


void modifyStudent() {
    char searchName[50], searchUniversityID[20];
    student* currentStudent = createStudent();
    int found = 0;
    int choice;

    printf("\nEnter the Name of the student to modify: ");
    scanf(" %[^\n]", searchName);

    printf("Enter the University ID of the student to modify: ");
    scanf(" %[^\n]", searchUniversityID);

    FILE* file = fopen("students.txt", "r");
    FILE* tempFile = fopen("temp.txt", "w");

    if (file == NULL || tempFile == NULL) {
        printf("\nError opening file.\n");
        free(currentStudent);
        return;
    }

    while (fread(currentStudent, sizeof(student), 1, file)) {
        if (strcmp(currentStudent->name, searchName) == 0 && strcmp(currentStudent->universityID, searchUniversityID) == 0) {
            found = 1;
            printf("\nStudent Found. Choose the field to modify:\n");
            printf("1. Name\n");
            printf("2. Email\n");
            printf("3. Phone\n");
            printf("4. University\n");
            printf("5. University ID\n");
            printf("6. Department\n");
            printf("7. YGPA\n");
            printf("8. Total Marks\n");
            printf("Enter your choice: ");
            scanf("%d", &choice);

            switch (choice) {
                case 1:
                    printf("Enter new Name: ");
                    scanf(" %[^\n]", currentStudent->name);
                    break;
                case 2:
                    printf("Enter new Email: ");
                    scanf(" %[^\n]", currentStudent->email);
                    break;
                case 3:
                    printf("Enter new Phone: ");
                    scanf(" %[^\n]", currentStudent->phone);
                    break;
                case 4:
                    printf("Enter new University: ");
                    scanf(" %[^\n]", currentStudent->university);
                    break;
                case 5:
                    printf("Enter new University ID: ");
                    scanf(" %[^\n]", currentStudent->universityID);
                    break;
                case 6:
                    printf("Enter new Department: ");
                    scanf(" %[^\n]", currentStudent->dept);
                    break;
                case 7:
                    printf("Enter new YGPA: ");
                    scanf("%f", &currentStudent->ygpa);
                    break;
                case 8:
                    printf("Enter new Total Marks: ");
                    scanf("%d", &currentStudent->totalMarks);
                    break;
                default:
                    printf("Invalid choice.\n");
                    break;
            }


            char filename[100];
            snprintf(filename, sizeof(filename), "%s_%s.txt", currentStudent->name, currentStudent->universityID);
            FILE* studentFile = fopen(filename, "w");
            if (studentFile == NULL) {
                printf("Error updating student file.\n");
                free(currentStudent);
                return;
            }
            fprintf(studentFile, "Name: %s\n", currentStudent->name);
            fprintf(studentFile, "Email: %s\n", currentStudent->email);
            fprintf(studentFile, "Phone: %s\n", currentStudent->phone);
            fprintf(studentFile, "University: %s\n", currentStudent->university);
            fprintf(studentFile, "University ID: %s\n", currentStudent->universityID);
            fprintf(studentFile, "Department: %s\n", currentStudent->dept);
            fprintf(studentFile, "YGPA: %.2f\n", currentStudent->ygpa);
            fprintf(studentFile, "Total Marks: %d\n", currentStudent->totalMarks);
            fclose(studentFile);
        }

        fwrite(currentStudent, sizeof(student), 1, tempFile);
    }

    fclose(file);
    fclose(tempFile);

    if (found) {
        remove("students.txt");
        rename("temp.txt", "students.txt");
        printf("\nStudent record modified successfully.\n");
    } else {
        printf("\nNo student found with the name '%s' and university ID '%s'.\n", searchName, searchUniversityID);
    }

    free(currentStudent);
}


void deleteStudent() {
    char searchName[50], searchUniversityID[20];
    student* currentStudent = createStudent();
    int found = 0;

    printf("\nEnter the Name of the student to delete: ");
    scanf(" %[^\n]", searchName);

    printf("Enter the University ID of the student to delete: ");
    scanf(" %[^\n]", searchUniversityID);

    if (strlen(searchName) == 0 || strlen(searchUniversityID) == 0) {
        printf("\nBoth Name and University ID are required.\n");
        free(currentStudent);
        return;
    }

    FILE* file = fopen("students.txt", "r");
    FILE* tempFile = fopen("temp.txt", "w");

    if (file == NULL || tempFile == NULL) {
        printf("\nError opening file.\n");
        free(currentStudent);
        return;
    }

    while (fread(currentStudent, sizeof(student), 1, file)) {
        if (strcmp(currentStudent->name, searchName) == 0 && strcmp(currentStudent->universityID, searchUniversityID) == 0) {
            found = 1;

            char filename[100];
            snprintf(filename, sizeof(filename), "%s_%s.txt", currentStudent->name, currentStudent->universityID);
            if (remove(filename) == 0) {
                printf("\nStudent file '%s' deleted successfully.\n", filename);
            } else {
                printf("\nError deleting student file '%s'.\n", filename);
            }
            continue;  
        }

        fwrite(currentStudent, sizeof(student), 1, tempFile);
    }

    fclose(file);
    fclose(tempFile);

    if (found) {
        remove("students.txt");
        rename("temp.txt", "students.txt");
        printf("\nStudent record deleted from the system.\n");
    } else {
        printf("\nNo student found with the name '%s' and university ID '%s'.\n", searchName, searchUniversityID);
    }

    free(currentStudent);
}

int main() {
	system("color F0");
    int choice;
    while (1) {
        printf("\nStudent Management System\n");
        printf("1. Add Student\n");
        printf("2. Display Students\n");
        printf("3. Search Student\n");
        printf("4. Modify Student\n");
        printf("5. Delete Student\n");
        printf("6. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                addStudent();
                break;
            case 2:
                displayStudents();
                break;
            case 3:
                searchStudent();
                break;
            case 4:
                modifyStudent();
                break;
            case 5:
                deleteStudent();
                break;
            case 6:
                exit(0);
            default:
                printf("Invalid choice. Please try again.\n");
        }
    }
    return 0;
}

