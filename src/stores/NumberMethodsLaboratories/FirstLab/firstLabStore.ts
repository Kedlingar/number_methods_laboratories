import {defineStore} from "pinia";
import {IFirstLabStore, IMatrixCell, IMatrixRow} from "@/types";

export const useNumberMethodsFirstLab = defineStore('numberMethodsFirstLab', {
    state: (): IFirstLabStore => ({
        matrix: [],
        solutions: [],
    }),
    actions: {
        createMatrix(newRowCount: number, newColumnCount: number) {
            if ((newRowCount && newRowCount > 0) && (newColumnCount && newColumnCount > 0)) {
                /**
                 * Локальное значение матрицы устанавливаем как текущее значение матрицы
                 * чтобы отслеживать изменения
                 */

                const localMatrix: IMatrixRow[] = [...this.matrix]
                /**
                 * Здесь происходит заполнение матрицы, если новое установленное значение больше
                 * чем текущее
                 */
                for (let i = 0; i < newRowCount; i++) {
                    let newRow: IMatrixRow = {
                        id: localMatrix.length,
                        values: []
                    }
                    for (let j = 0; j < newColumnCount; j++) {
                        newRow.values.push({
                            id: j,
                            value: 0,
                        })
                    }
                    localMatrix.push(newRow)
                }

                while (localMatrix.length > newRowCount) {
                    localMatrix.pop()
                }

                for (let i = 0; i < localMatrix.length; i++) {
                    const row = localMatrix[i]
                    if (row.values.length < newColumnCount) {
                        const diff = newColumnCount - row.values.length;
                        for (let j = 0; j < diff; j++) {
                            row.values.push({
                                id: row.values.length,
                                value: 0
                            })
                        }
                    } else if (row.values.length > newColumnCount) {
                        row.values.splice(newColumnCount)
                    }
                }

                this.matrix = localMatrix
            } else {
                this.matrix = []
            }
        },
        //Заполнение матрицы случайными значениями
        setRandomValues() {
            this.matrix.map((matrixRow: IMatrixRow) => {
                matrixRow.values.map((matrixCell: IMatrixCell) => {
                    matrixCell.value = Math.floor(Math.random() * 99) + 1
                })
            })
        },
        // Функция для приведения матрицы к ступенчатому виду (метод Гаусса)
        setStepMatrix() {
            const numRows = this.matrix.length;
            const numCols = this.matrix[0].values.length;

            for (let i = 0; i < numRows; i++) {
                // На каждом шаге выбираем главный элемент (pivot)
                const pivot = this.matrix[i].values[i].value;

                // Если главный элемент равен нулю, ищем другую строку для обмена
                if (pivot === 0) {
                    for (let j = i + 1; j < numRows; j++) {
                        if (this.matrix[j].values[i].value !== 0) {
                            // Обменять строки i и j
                            const temp = this.matrix[i];
                            this.matrix[i] = this.matrix[j];
                            this.matrix[j] = temp;
                            break;
                        }
                    }
                    // Если не удалось найти строку для обмена, пропустить этот столбец
                    if (this.matrix[i].values[i].value === 0) {
                        continue;
                    }
                }

                // Делим всю текущую строку на главный элемент (pivot)
                for (let j = i; j < numCols; j++) {
                    this.matrix[i].values[j].value /= pivot;
                }

                // Обнуляем элементы под главным элементом
                for (let k = i + 1; k < numRows; k++) {
                    const factor = this.matrix[k].values[i].value;
                    for (let j = i; j < numCols; j++) {
                        this.matrix[k].values[j].value -= factor * this.matrix[i].values[j].value;
                    }
                }
            }
        },
        //Решение обратной подстановкой
        backSubstitution() {
            const numRows = this.matrix.length
            const numCols = this.matrix[0].values.length;
            const solutions = new Array(numRows);
            //проходим по строкам в обратном порядке
            for (let i = numRows - 1; i >= 0; i--) {
                let sum = 0;
                for (let j = i + 1; j < numCols - 1; j++) {
                    //Вычисляем сумму коэффициентов и решения
                    sum += this.matrix[i].values[j].value * solutions[j];
                }
                //Ищем решение для текущей строки
                solutions[i] = (this.matrix[i].values[numCols - 1].value - sum) / this.matrix[i].values[i].value;
            }
            this.solutions = solutions;
        },
        updateValueCell(idRow: number, idCell: number, newValue: number) {
            if ((idRow || idRow === 0) && (idCell || idCell === 0) && (newValue || newValue === 0)) {
                this.matrix.map((row: IMatrixRow) => {
                    if (row.id === idRow) {
                        row.values.map((cell: IMatrixCell) => {
                            if (cell.id === idCell) {
                                if (newValue !== null) {
                                    cell.value = newValue
                                } else {
                                    cell.value = 0
                                }
                            }
                        })
                    }
                })
                return 'success'
            } else {
                return undefined
            }
        },
        resetMatrixAndSolutions(newRowCount = 3, newColumnCount = 3) {
            this.matrix = []
            this.solutions = []
            this.createMatrix(newRowCount, newColumnCount)
        }
    },
    getters: {
        //Для определения, является ли столбец последним (разрешающим)
        isLastCellOfColumn: (state: IFirstLabStore) => (idCell: IMatrixCell['id'], idRow: IMatrixRow['id']): boolean => {
            let isLastLocal = false
            state.matrix.map((row: IMatrixRow) => {
                if (row.id === idRow) {
                    isLastLocal = row.values.length > 0 && row.values[row.values.length - 1].id === idCell
                }
            })
            return isLastLocal
        }
    },
})