var sum_to_n_a = function (n) {
  if (n >= 0) {
    return (n * (n + 1)) / 2;
  } else {
    return -(-n * (-n + 1)) / 2;
  }
};

var sum_to_n_b = function (n) {
  if (n >= 0) {
    let sum = 0;
    for (let i = 0; i <= n; i++) {
      sum += i;
    }
    return sum;
  } else {
    let sum = 0;
    for (let i = 0; i >= n; i--) {
      sum += i;
    }
    return sum;
  }
};

var sum_to_n_c = function sum_to_n(n) {
  if (n >= 0) {
    if (n === 1) {
      return 1;
    }
    if (n === 0) {
      return 0;
    }
    return n + sum_to_n(n - 1);
  } else {
    if (n === -1) {
      return -1;
    }
    return n + sum_to_n(n + 1);
  }
};

// Ví dụ sử dụng:
console.log(sum_to_n_a(5)); // Kết quả: 15
console.log(sum_to_n_a(-3)); // Kết quả: -6

console.log(sum_to_n_b(5)); // Kết quả: 15
console.log(sum_to_n_b(-3)); // Kết quả: -6

console.log(sum_to_n_c(5)); // Kết quả: 15
console.log(sum_to_n_c(-3)); // Kết quả: -6
