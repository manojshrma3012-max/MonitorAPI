function count(){
    let count =0;
    return ()=>{
        return count++;
    }
}


const fn = count();
console.log(fn()); // 0
console.log(fn()); // 1
console.log(fn()); // 2
console.log(fn()); // 3