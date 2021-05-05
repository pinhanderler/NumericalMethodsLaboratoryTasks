let A = [
    [7.03, 1.08, 0.99, 1.135],
    [1.08, 3.39, 1.30, 0.16],
    [0.99, 1.30, 6.21, 2.10],
    [1.135, 0.16, 2.10, 5.33]
]
let S = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
]
let M1 = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
]
let M2 = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
]

for (let i = 1; i < A.length; i++) {
    const ind = A.length - i
    const row = A[ind].slice()
    M1[ind - 1] = row.slice()

    for (let j = 0; j < A.length; j++)
        row[j] = -row[j]
    row[ind - 1] = 1
    for (let j = 0; j < A.length; j++) {
        row[j] = row[j] / A[ind][ind - 1]
    }
    M2[A.length - i - 1] = row.slice()

    S = multiplyMatrix(S, M2)
    A = multiplyMatrix(M1, A)
    A = multiplyMatrix(A, M2)

    console.log('\nМ^-1:')
    for (let j = 0; j < A.length; j++) {
        console.log(M1[j].map(num => num.toFixed(7)).join("  "))
    }
    console.log('\nP:')
    for (let j = 0; j < A.length; j++) {
        console.log(A[j].map(num => num.toFixed(7)).join("  "))
    }
    console.log('\nМ:')
    for (let j = 0; j < A.length; j++) {
        console.log(M2[j].map(num => num.toFixed(7)).join("  "))
    }

    M1 = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]
    M2 = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]
}
console.log('\nS:')
for (let j = 0; j < A.length; j++) {
    console.log(S[j].map(num => num.toFixed(7)).join("  "))
}

function multiplyMatrix(A, B) {
    let b = []
    const result = []
    for (let i = 0; i < A.length; i++)
        result.push([])
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B.length; j++) {
            b.push(B[j][i])
        }
        const a = multiply(A, b)
        for (let j = 0; j < A.length; j++)
            result[j].push(a[j])
        b = []
    }
    return result
}

function multiply(A, b) {
    const result = []
    for (let i = 0; i < A.length; i++) {
        result.push(0)
        for (let j = 0; j < A.length; j++) {
            result[i] += b[j] * A[i][j]
        }
    }
    return result
}