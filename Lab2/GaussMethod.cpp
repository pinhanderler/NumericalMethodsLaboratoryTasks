// GaussMethod.cpp: определяет точку входа для консольного приложения.
//

#include "stdafx.h"
#include <cstdlib>
#include <stdio.h>
#include <conio.h>
#include <math.h>
#include <windows.h>
#include <iostream>

#define K 50
using namespace std;

void maxelem(int k, double matrix[][K + 1], int n, int numb[]);



int main(void)
{
	system("color F0"); //колір консолі
	SetConsoleCP(1251);// щоб можна було вводити дані укр
	SetConsoleOutputCP(1251); // виводити дані укр

	double matrix[K][K + 1];
	double x[K]; //Корені системи
	int r[4]; //Вектор нев'язки
	int numb[K]; //відповідає за порядок коренів
	int i, j, k, n;
	//Вводимо дані
	system("cls");
	do
	{
		printf("Введіть кількість рівнянь системи: ");
		scanf_s("%d", &n);
	} while (K < n);
	printf("Введіть систему:\n");
	for (i = 0; i < n; i++)
		for (j = 0; j < n + 1; j++)
			scanf_s("%lf", &matrix[i][j]);
	//Виводимо на екран введену систему
	system("cls");
	printf("Система:\n\n");
	for (i = 0; i < n; i++)
	{
		for (j = 0; j < n + 1; j++)
			printf("%7.6f ", matrix[i][j]);		
		printf("\n");		
	}
	
	//Спочатку всі корені по порядку
	for (i = 0; i < n + 1; i++)
		numb[i] = i;
	//Прямий хід метода Гаусса
	for (k = 0; k < n; k++)
	{ //на якій позиції мусить стояти головний елемент
		maxelem(k, matrix, n, numb); //встановлюємо головний елемент
		if (fabs(matrix[k][k]) < 0.0001)
		{
			printf("______________________________________");
			printf("Система не має єдиного рішення");
			return (0);
		}
		printf("______________________________________");
		printf("\nДілимо рядок %d на %3.6f:\n\n", k + 1, matrix[k][k]);
		for (j = n; j >= k; j--)
			matrix[k][j] /= matrix[k][k];
		for (int g = 0; g < n; g++)
		{
			for (int h = 0; h < n + 1; h++)
				printf("%7.6f ", matrix[g][h]);
			printf("\n");
		}

		for (i = k + 1; i < n; i++) {
			printf("______________________________________");
			printf("\nВід рядка %d віднімаємо рядок %d, помножений на на %3.6f:\n\n", i + 1, k + 1, matrix[i][k]);
			for (j = n; j >= k; j--) {
				matrix[i][j] -= matrix[k][j] * matrix[i][k];
			}
			for (int g = 0; g < n; g++)
			{
				for (int h = 0; h < n + 1; h++)
					printf("%7.6f ", matrix[g][h]);
				printf("\n");
			}
		}

	}
	//зворотний хід

	for (i = 0; i < n; i++)
		x[i] = matrix[i][n];
	printf("______________________________________");
	printf("\nЗначення невідомих:\n\nХ%d:\n\n%3.6f\n", n, x[n - 1]);
	for (i = n - 2; i >= 0; i--) {
		printf("\nХ%d:\n\n", i + 1);
		for (j = i + 1; j < n; j++) {
			printf("%3.6f - (%3.6f * %3.6f) =  ", x[i], x[j], matrix[i][j]);
			x[i] -= x[j] * matrix[i][j];
			printf("%3.6f\n", x[i]);
		}
	}

	int ch = 0;

	//виводимо результат
	printf("______________________________________");
	printf("\nКорені:\n\n");
	for (i = 0; i < n; i++)
		for (j = 0; j < n; j++)
			if (i == numb[j])
			{ //ставимо корені по порядку
				printf("X%d = %3.6f\n", i + 1, x[j]);
				r[ch] = matrix[i][n] - x[j] * matrix[i][j];
				ch++;
				break;
			}
	printf("______________________________________");
	printf("\nВектор нев`язки:\n");
	printf("\nR = [ ");
	for (int col = 0; col < ch; col++)
	{
		printf("%f ", r[col]);
	}
	printf("]\n");
	system("pause");
	return 0;
}

//опис функції
void maxelem(int k, double matrix[][K + 1], int n, int numb[])
{
	int i, j, i_max = k, j_max = k;
	double temp;
	//пошук максимального за модулем елемента
	for (i = k; i < n; i++)
		for (j = k; j < n; j++)
			if (fabs(matrix[i_max][j_max]) < fabs(matrix[i][j]))
			{
				i_max = i;
				j_max = j;
			}
	//переставляємо рядки

	for (j = k; j < n + 1; j++)
	{
		temp = matrix[k][j];
		matrix[k][j] = matrix[i_max][j];
		matrix[i_max][j] = temp;
	}
	printf("______________________________________");
	printf("\nВираховуємо рядок %d:\nМiняємо рядки і стовпці місцями:\n\n", k + 1);
	for (int g = 0; g < n; g++)
	{
		for (int h = 0; h < n + 1; h++)
			printf("%7.6f ", matrix[g][h]);
		printf("\n");
	}

	//переставляємо стовпці
	for (i = 0; i < n; i++)
	{
		temp = matrix[i][k];
		matrix[i][k] = matrix[i][j_max];
		matrix[i][j_max] = temp;
	}
	printf("\n");
	for (int g = 0; g < n; g++)
	{
		for (int h = 0; h < n + 1; h++)
			printf("%7.6f ", matrix[g][h]);
		printf("\n");
	}
	//враховуємо зміну порядку коренів
	i = numb[k];
	numb[k] = numb[j_max];
	numb[j_max] = i;


}


