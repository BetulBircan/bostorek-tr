/* 
shift + alt + a --> comment multiple lines

let a = 4;

let b = 5;

let sum = a + b;

console.log(sum, 'sum');

a = 8;

console.log(sum, 'sum'); */

/* let a  = 4;
let b = 5;

function calculateSum() {
    return a + b;
}

let sum = calculateSum();

console.log(sum, 'sum1');

a = 8;

sum = calculateSum();

console.log(sum, 'sum2'); */

/* let data = {
    a : 4,
    b : 5,

    calculateSum : function() {
        return this.a + this.b;
    }
}

console.log(data.calculateSum(), 'sum1');


data.a = 8;
console.log(data.calculateSum(), 'sum2'); */


/* vue 3 composiiton api ile birlikte tanıtılan ref fonksiyoni bir diğeri  reactive  bir referans oluşturmak için kullanılır
ve örneğin eğer biz bu a nın değerini yazdırmak istersek a.value şeklinde yazmamız gerekmektedir. */

/* import { ref, computed } from 'vue';

let a = ref(29);
let b = ref(71);

buradaki sum ın reaktif değişkenlerdeki herhangi bir değişimi algılaması için computed fonksiyonu kullanılır.
let sum = computed(() => a.value + b.value);

console.log(sum.value, 'sum1');

a.value = -3

console.log(sum.value, 'sum2');

 console.log(a, 'a');

 console.log(a.value, 'a.value');

 a.value = 100;

Burada ref fonksiyonu yardımıyla a nın değerindeki herhangi bir değişimde vue otomatik olarak bu değişimi algılar ve 
bu değişkenin etkilediği bölümleri tekrar render eder. computed 
console.log(a.value, 'a2.value'); */

import { ref, computed } from 'vue';

const user = ref({
    name : "Eslem",
    age : 5
});

let message = computed(() => `Selam, ben ${user.value.name} ve ${user.value.age} yaşındayım.`);

console.log(message.value, 'message');

user.value.name = "Etka Beran";
user.value.age = 6;

console.log(message.value, 'message2');








