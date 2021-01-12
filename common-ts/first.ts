interface MyFirst {
    readonly x: String,

    readonly test: () => string
}

const a: MyFirst = {
    x: "5",
    test: () => {
        console.log(1);
        return "a";
    }
}

export default a;