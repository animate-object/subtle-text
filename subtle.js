main = (manipulator) => {
    let elements = document.body.getElementsByTagName('*');
    for (const element of elements) {
        if (["SCRIPT", "STYLE"].includes(element.tagName)) { continue }
        for (const child of element.childNodes) {
            if (child.nodeType === 3 && child.nodeValue !== null && child.nodeValue !== undefined) {
                manipulated = manipulator(text);
                if (manipulated !== null) {
                    element.replaceChild(document.createTextNode(manipulated), child);
                }
            }
        }
    }
}

random_in_range = (range) => { return Math.floor(Math.random() * range); } 

n_random_in_range = (n, range) => {
    const n_random = [];
    for (i = 0; i < n; i++) {
        n_random.push(random_in_range(range));
    }
    return n_random;
}


weight_bounded_random = (n, weight) => {
    // generates a random number between 0 and ceil(n/weight),
    // s.t.
    // n = 1, weight = 100 has a 1 % chance to return 1, 
    // n = 150, weight = 100 has a 25% chance to return 2, a 50% chance to return 1, and a 25% chance to return 0
    sum_randoms = 0;
    for (i = 0; i < Math.ceil(n/weight); i++) { 
        sum_randoms = sum_randoms + Math.random();
    }
    return Math.floor(sum_randoms);
}


random_word_additions = (text) => {
    const words = text.split(" ");
    const addition_count = weight_bounded_random(words.length, 100);
    const addition_indices = n_random_in_range(addition_count, words.length);
    copy = [];

    for (i = 0; i < words.length; i++) {
        copy.push(words[i]);
        if (addition_indices.includes(i)) {
            copy.push(words[i]);
            // probably need to check for punctuation in this block and handle appropriately
        }
    }

    return copy.join(" ");
}

random_letter_additions = (text) => {
    const addition_count = random_in_range(Math.floor(text.length / 20));
    let addition_indices = [];
    for (i = 0; i < addition_count; i++) {
        addition_indices.push(random_in_range(text.length));
    }
    if (addition_indices.length === 0) { return null; }

    let copy = "";
    for (i = 0; i < text.length; i ++) {
        copy = copy + text[i];
        if (addition_indices.includes(i)){
            copy = copy + text[i];
        }
    }
    return copy;
}

main(random_letter_additions);

