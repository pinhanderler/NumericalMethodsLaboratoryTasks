const x = [6, 8, 10, 12, 14]
const f = (x) => x * x / 15 + Math.cos(x + 3)
const y = x.map(v => f(v))

//---------------- Поліном Лагранжа ------------------------
console.log('Поліном Лагранжа')
for (let k = 0; k < 5; k++) {
    console.log(y[k] + ' * ')
    for (let i = 0; i < 5; i++) {
        if (i === k) continue
        console.log('(x - ' + x[i] + ') * ')
    }
    let denum = 1.0
    for (let i = 0; i < 5; i++) {
        if (i === k) continue
        denum *= (x[k] - x[i])
    }
    console.log('1 / ' + denum + ' + ')
}

console.log('похибки:')
const gottenF = (x) => 1.4888697381153229 * (x - 8) * (x - 10) * (x - 12) * (x - 14) / 384 +
                        4.271092364654717 * (x - 6) * (x - 10) * (x - 12) * (x - 14) / (-96) +
                        7.574113448116863 * (x - 6) * (x - 8) * (x - 12) * (x - 14) / 64 +
                        8.840312087141179 * (x - 6) * (x - 8) * (x - 10) * (x - 14) / (-96) +
                        12.79150332861507 * (x - 6) * (x - 8) * (x - 10) * (x - 12) / 384

for (let i = 6; i <= 14; i += 0.25) {
    console.log('' + i + ':  ' + (f(i) - gottenF(i)))
}

//------------------- Сплайн інтерполяція --------------------

console.log('\nСплайн інтерполяція')
const A =[[8, 4, 0, 0],
    [4, 8, 4, 0],
    [0, 4, 8, 4],
    [0, 0, 4, 8]]
const b = [0, 0, 0, 0, 0]

for (let i = 0; i < 4; i++) {
    let y0 = i === 0 ? 0 : y[i - 1]
    let y1 = y[i]
    let y2 = y[i + 1]
    b[i] = 3 * (y0 + y2 - 2 * y1)
}
const c = gaussMethod(A, b)
for (let i = 0; i < 4; i++) {
    const di = ((c[i + 1] || 0) - c[i]) / 2
    const bi = (y[i + 1] - y[i]) / 2 - 2 / 3 * di - c[i]
    console.log('f' + (i+1))
    console.log(`${y[i]} + ${bi}(x - ${x[i]}) + ${c[i]/2}(x - ${x[i]})^2 + ${di/6}(x - ${x[i]})^3`)
}

console.log('похибки:')
const f1 = (x) => 1.4888697381153229
    + 1.0677730911636791 * (x - 6)
    - 0.23607159812979056 * (x - 6) * (x - 6)
    + 0.1988703545913998 * (x - 6) * (x - 6) * (x - 6)
const f2 = (x) => 4.271092364654717
    + 1.3639298620805242 * (x - 8)
    + 0.9571505294186081 * (x - 8) * (x - 8)
    + -0.4066800947966669 * (x - 8) * (x - 8) * (x - 8)
const f3 = (x) => 7.574113448116863
    + 1.780405283567354 * (x - 10)
    - 1.4829300393613933 * (x - 10) * (x - 10)
    + 0.45463852866689763 * (x - 10) * (x - 10) * (x - 10)
const f4 = (x) => 8.840312087141179
    + 0.3157274438836226 * (x - 12)
    + 1.2449011326399921 * (x - 12) * (x - 12)
    - 0.20748352210666535 * (x - 12) * (x - 12) * (x - 12)

for (let i = 6; i < 8; i += 0.25) {
    console.log('' + i + ':  ' + (f(i) - f1(i)))
}
for (let i = 8; i < 10; i += 0.25) {
    console.log('' + i + ':  ' + (f(i) - f2(i)))
}
for (let i = 10; i < 12; i += 0.25) {
    console.log('' + i + ':  ' + (f(i) - f3(i)))
}
for (let i = 12; i <= 14; i += 0.25) {
    console.log('' + i + ':  ' + (f(i) - f4(i)))
}

function gaussMethod(A, b) {
    let y = [0, 0, 0, 0]
    let x = [0, 0, 0, 0]
    const t = [[0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]]
    const n = A.length - 1

    for (let i = 0; i < A.length; i++) {
        for (let j = i; j < A.length; j++) {
            if (i === j) {
                let kt = 0
                for (let k = 0; k < i; k++) {
                    kt += t[k][i] * t[k][i]
                }
                t[i][i] = Math.sqrt(A[i][i] - kt)
            } else {
                let kt = 0
                for (let k = 0; k < i; k++)
                    kt += t[k][i] * t[k][j]
                t[i][j] = (A[i][j] - kt) / t[i][i]
            }
        }
    }
    y[0] = b[0] / t[0][0]
    for (let i = 1; i < A.length; i++) {
        let kt = 0
        for (let k = 0; k < i; k++)
            kt += t[k][i] * y[k]
        y[i] = (b[i] - kt) / t[i][i]
    }
    for (let i = n; i >= 0; i--) {
        let kt = 0
        for (let k = i + 1; k < A.length; k++)
            kt += t[i][k] * x[k]
        x[i] = (y[i] - kt) / t[i][i]
    }
    return x
}

